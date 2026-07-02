const { execSync } = require("child_process");
const os = require("os");
const path = require("path");

const BIN_DIR = path.join(os.homedir(), ".biyatrix", "bin");
const OPENCODE_CHECK = process.platform === "win32" ? "where opencode" : "which opencode";

try {
  execSync(OPENCODE_CHECK, { stdio: "pipe" });
  console.log("biyatrix: opencode found, setting up...");
} catch {
  console.log("biyatrix: installing opencode engine...");
  if (process.platform === "win32") {
    execSync('powershell -NoProfile -Command "irm https://opencode.ai/install | iex"', { stdio: "inherit" });
  } else {
    execSync("curl -fsSL https://opencode.ai/install | bash", { stdio: "inherit" });
  }
}

require("fs").mkdirSync(BIN_DIR, { recursive: true });
console.log("biyatrix: ready.");
