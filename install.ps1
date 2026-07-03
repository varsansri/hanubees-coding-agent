param(
    [string]$Version,
    [string]$BinaryPath,
    [switch]$NoModifyPath
)

$ErrorActionPreference = "Stop"
$APP = "hanubees"
$APP_EXE = "$APP.exe"
$INSTALL_DIR = Join-Path $env:USERPROFILE ".hanubees\bin"

# Clean up old biyatrix install if present
$OLD_DIR = Join-Path $env:USERPROFILE ".biyatrix"
if (Test-Path $OLD_DIR) {
    Write-Host "Cleaning up old biyatrix installation..."
    Remove-Item -Recurse -Force $OLD_DIR -ErrorAction SilentlyContinue
    $oldPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if ($oldPath -like "*\.biyatrix\bin*") {
        [Environment]::SetEnvironmentVariable("Path", ($oldPath -split ";" | Where-Object { $_ -notmatch "\.biyatrix" }) -join ";", "User")
    }
    Write-Host "Old installation removed."
}

if ($BinaryPath) {
    if (-not (Test-Path $BinaryPath)) {
        Write-Host "Error: Binary not found at $BinaryPath" -ForegroundColor Red
        exit 1
    }
    Write-Host "Installing hanubees from: $BinaryPath"
    New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null
    Copy-Item $BinaryPath (Join-Path $INSTALL_DIR $APP_EXE) -Force
} else {
    $arch = if ($env:PROCESSOR_ARCHITECTURE -eq "ARM64") { "arm64" } else { "x64" }

    $baseline = ""
    try {
        $avx2 = (Add-Type -MemberDefinition '[DllImport("kernel32.dll")]public static extern bool IsProcessorFeaturePresent(int);' -Name K32 -Namespace W32 -PassThru)::IsProcessorFeaturePresent(40)
        if (-not $avx2 -and $arch -eq "x64") { $baseline = "-baseline" }
    } catch { }

    $target = "windows-$arch$baseline"
    $filename = "$APP-$target.zip"

    New-Item -ItemType Directory -Force -Path $INSTALL_DIR | Out-Null

    if ($Version) {
        $Version = $Version -replace "^v", ""
        $url = "https://github.com/varsansri/hanubees-coding-agent/releases/download/v$Version/$filename"
    } else {
        try {
            $release = Invoke-RestMethod -Uri "https://api.github.com/repos/varsansri/hanubees-coding-agent/releases/latest" -UseBasicParsing
            $Version = $release.tag_name -replace "^v", ""
            $url = "https://github.com/varsansri/hanubees-coding-agent/releases/latest/download/$filename"
        } catch {
            Write-Host "Error: Failed to fetch latest version" -ForegroundColor Red
            exit 1
        }
    }

    $existing = Get-Command $APP_EXE -ErrorAction SilentlyContinue
    if ($existing) {
        $current = & $APP_EXE --version 2>$null
        if ($current -eq $Version) {
            Write-Host "hanubees v$Version is already up to date."
            exit 0
        }
        Write-Host "Upgrading hanubees v$current -> v$Version..."
    } else {
        Write-Host "Installing hanubees v$Version..."
    }
    $zip = Join-Path $env:TEMP "hanubees-install.zip"

    try {
        $ProgressPreference = 'SilentlyContinue'
        Write-Host -NoNewline "Downloading..."
        Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
        Write-Host " done."
    } catch {
        Write-Host " failed!" -ForegroundColor Red
        exit 1
    }

    Write-Host -NoNewline "Extracting..."
    Expand-Archive -Force -Path $zip -DestinationPath $INSTALL_DIR
    Write-Host " done."
    Remove-Item $zip -Force
}

Write-Host "hanubees v$Version installed to $INSTALL_DIR"

if (-not $NoModifyPath) {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User") -split ";"
    if ($INSTALL_DIR -notin $currentPath) {
        [Environment]::SetEnvironmentVariable("Path", "$INSTALL_DIR;" + [Environment]::GetEnvironmentVariable("Path", "User"), "User")
        $env:Path = "$INSTALL_DIR;$env:Path"
        Write-Host "Added to PATH"
    }
}

Write-Host ''
Write-Host '██╗  ██╗ █████╗ ███╗   ██╗██╗   ██╗' -ForegroundColor Yellow
Write-Host '██║  ██║██╔══██╗████╗  ██║██║   ██║' -ForegroundColor Yellow
Write-Host '███████║███████║██╔██╗ ██║██║   ██║' -ForegroundColor Yellow -NoNewline
Write-Host '██████╗ ███████╗███████╗███████╗' -ForegroundColor Cyan
Write-Host '██╔══██║██╔══██║██║╚██╗██║██║   ██║' -ForegroundColor Yellow -NoNewline
Write-Host '██╔══██╗██╔════╝██╔════╝██╔════╝' -ForegroundColor DarkGreen
Write-Host '██║  ██║██║  ██║██║ ╚████║╚██████╔╝' -ForegroundColor Yellow -NoNewline
Write-Host '██████╔╝███████╗███████╗███████║' -ForegroundColor Blue
Write-Host '╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ' -ForegroundColor Yellow -NoNewline
Write-Host '╚═════╝ ╚══════╝╚══════╝╚══════╝' -ForegroundColor Cyan

Write-Host '              AI coding agent for your terminal' -ForegroundColor DarkGray
Write-Host ''

@'
cd <project>  # Open directory
hanubees      # Run command

For more: https://github.com/varsansri/hanubees-coding-agent
'@ | Write-Host
