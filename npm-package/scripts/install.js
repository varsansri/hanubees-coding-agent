const os = require("os");
const path = require("path");
const fs = require("fs");
const https = require("https");

const BIN_DIR = path.join(os.homedir(), ".biyatrix", "bin");
const BIYATRIX_BIN = path.join(BIN_DIR, process.platform === "win32" ? "biyatrix.exe" : "biyatrix");

if (fs.existsSync(BIYATRIX_BIN)) {
  console.log("biyatrix: engine already installed.");
  process.exit(0);
}

const opencodeCheck = process.platform === "win32" ? "where opencode" : "which opencode";
try {
  require("child_process").execSync(opencodeCheck, { stdio: "pipe" });
  console.log("biyatrix: using existing opencode engine.");
} catch {
  console.log("biyatrix: downloading engine...");

  const platformMap = { win32: "windows", darwin: "darwin", linux: "linux" };
  const archMap = { x64: "x64", arm64: "arm64" };
  const platform = platformMap[process.platform] || process.platform;
  const arch = archMap[process.arch] || process.arch;

  const ext = platform === "linux" ? ".tar.gz" : ".zip";
  const filename = `biyatrix-${platform}-${arch}${ext}`;
  const url = `https://github.com/varsansri/biyatrix/releases/latest/download/${filename}`;

  download(url, filename, () => {
    fs.mkdirSync(BIN_DIR, { recursive: true });

    if (ext === ".zip") {
      require("child_process").execSync(
        `powershell -NoProfile -Command "Expand-Archive -Path '${filename}' -DestinationPath '${BIN_DIR}' -Force"`,
        { stdio: "inherit" }
      );
    } else {
      require("child_process").execSync(`tar -xzf "${filename}" -C "${BIN_DIR}"`, { stdio: "inherit" });
    }

    fs.unlinkSync(filename);

    const binaryPath = path.join(BIN_DIR, process.platform === "win32" ? "biyatrix.exe" : "biyatrix");
    if (fs.existsSync(binaryPath)) {
      console.log("biyatrix: installed successfully.");
    }
  });
}

function download(url, dest, callback) {
  const parsedUrl = new URL(url);
  const mod = parsedUrl.protocol === "https:" ? require("https") : require("http");

  const file = fs.createWriteStream(dest);
  const request = mod.get(url, { headers: { "User-Agent": "biyatrix-installer" } }, (res) => {
    if (res.statusCode === 302 || res.statusCode === 301) {
      file.close();
      fs.unlinkSync(dest);
      request.destroy();
      return download(res.headers.location, dest, callback);
    }
    if (res.statusCode !== 200) {
      file.close();
      fs.unlinkSync(dest);
      console.error(`biyatrix: failed to download (HTTP ${res.statusCode}). Try installing opencode-ai manually.`);
      process.exit(1);
    }
    res.pipe(file);
    file.on("finish", () => {
      file.close();
      callback();
    });
  });

  request.on("error", (err) => {
    console.error("biyatrix: download failed:", err.message);
    console.error("Install opencode manually: npm install -g opencode-ai");
    process.exit(1);
  });
}
