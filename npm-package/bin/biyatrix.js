#!/usr/bin/env node
const { spawnSync } = require("child_process");

const result = spawnSync("opencode", process.argv.slice(2), {
  stdio: "inherit",
  shell: true,
});

process.exit(result.status || 0);
