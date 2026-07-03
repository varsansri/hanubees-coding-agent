#!/usr/bin/env node
const { spawnSync } = require("child_process");
const os = require("os");
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const ext = process.platform === "win32" ? ".exe" : "";
const biyatrixBin = path.join(os.homedir(), ".biyatrix", "bin", `biyatrix${ext}`);

if (fs.existsSync(biyatrixBin)) {
  const result = spawnSync(biyatrixBin, args, { stdio: "inherit" });
  if (result.error === undefined) {
    process.exit(result.status || 0);
  }
}

const { execSync } = require("child_process");
const opencodeCheck = process.platform === "win32" ? "where opencode" : "which opencode";
try {
  execSync(opencodeCheck, { stdio: "pipe" });
  const result = spawnSync("opencode", args, { stdio: "inherit" });
  process.exit(result.status || 0);
} catch {
  console.error("biyatrix: engine not found.");
  console.error("Install it: curl -fsSL https://github.com/varsansri/biyatrix/raw/main/install | bash");
  console.error("Or install opencode: npm install -g opencode-ai");
  process.exit(1);
}
