param(
    [string]$Version,
    [string]$BinaryPath,
    [switch]$NoModifyPath
)

$ErrorActionPreference = "Stop"
$APP = "biyatrix"
$APP_EXE = "$APP.exe"
$INSTALL_DIR = Join-Path $env:USERPROFILE ".biyatrix\bin"

if ($BinaryPath) {
    if (-not (Test-Path $BinaryPath)) {
        Write-Host "Error: Binary not found at $BinaryPath" -ForegroundColor Red
        exit 1
    }
    Write-Host "Installing biyatrix from: $BinaryPath"
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
        $url = "https://github.com/varsansri/biyatrix/releases/download/v$Version/$filename"
    } else {
        try {
            $release = Invoke-RestMethod -Uri "https://api.github.com/repos/varsansri/biyatrix/releases/latest" -UseBasicParsing
            $Version = $release.tag_name -replace "^v", ""
            $url = "https://github.com/varsansri/biyatrix/releases/latest/download/$filename"
        } catch {
            Write-Host "Error: Failed to fetch latest version" -ForegroundColor Red
            exit 1
        }
    }

    $existing = Get-Command $APP_EXE -ErrorAction SilentlyContinue
    if ($existing) {
        $current = & $APP_EXE --version 2>$null
        if ($current -eq $Version) {
            Write-Host "biyatrix v$Version is already installed."
            exit 0
        }
    }

    Write-Host "Installing biyatrix v$Version..."
    Write-Host "Downloading $url"
    $zip = Join-Path $env:TEMP "biyatrix-install.zip"

    try {
        Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
    } catch {
        Write-Host "Error: Failed to download. Check your internet connection." -ForegroundColor Red
        Write-Host "URL: $url" -ForegroundColor Red
        exit 1
    }

    Write-Host "Extracting..."
    Expand-Archive -Force -Path $zip -DestinationPath $INSTALL_DIR
    Remove-Item $zip -Force
}

Write-Host "biyatrix v$Version installed to $INSTALL_DIR"

if (-not $NoModifyPath) {
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "User") -split ";"
    if ($INSTALL_DIR -notin $currentPath) {
        [Environment]::SetEnvironmentVariable("Path", "$INSTALL_DIR;" + [Environment]::GetEnvironmentVariable("Path", "User"), "User")
        $env:Path = "$INSTALL_DIR;$env:Path"
        Write-Host "Added to PATH"
    }
}

Write-Host ''
Write-Host '                    ▄'
Write-Host '█▀▀▄   █  █  █  █▀█ ▀▀▀▀ █▀▀▄   █  █░░█'
Write-Host '█▀▀▄   █   ▀▀█ █░░█   █  █▀▀▄   █  ░██░'
Write-Host '▀▀▀▀   ▀     ▀ ▀▀▀▀   ▀  ▀▀▀▀   ▀  ▀▀▀▀'

@'
cd <project>  # Open directory
biyatrix      # Run command

For more: https://github.com/varsansri/biyatrix
'@ | Write-Host
