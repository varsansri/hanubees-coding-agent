#!/usr/bin/env node
const { spawnSync } = require("child_process");
const os = require("os");
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
const ext = process.platform === "win32" ? ".exe" : "";
const hanubeesBin = path.join(os.homedir(), ".hanubees", "bin", `hanubees${ext}`);

if (fs.existsSync(hanubeesBin)) {
  const result = spawnSync(hanubeesBin, args, { stdio: "inherit" });
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
  console.error("hanubees: engine not found.");
  console.error("Install it: curl -fsSL https://github.com/varsansri/hanubees-coding-agent/raw/main/install | bash");
  console.error("Or install opencode: npm install -g opencode-ai");
  process.exit(1);
}
