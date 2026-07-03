import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { RunCommand } from "./cli/cmd/run"
import { GenerateCommand } from "./cli/cmd/generate"
import { ConsoleCommand } from "./cli/cmd/account"
import { ProvidersCommand } from "./cli/cmd/providers"
import { AgentCommand } from "./cli/cmd/agent"
import { UpgradeCommand } from "./cli/cmd/upgrade"
import { UninstallCommand } from "./cli/cmd/uninstall"
import { ModelsCommand } from "./cli/cmd/models"
import { UI } from "./cli/ui"
import { InstallationVersion } from "@opencode-ai/core/installation/version"
import { FormatError } from "./cli/error"
import { ServeCommand } from "./cli/cmd/serve"
import { DebugCommand } from "./cli/cmd/debug"
import { StatsCommand } from "./cli/cmd/stats"
import { McpCommand } from "./cli/cmd/mcp"
import { GithubCommand } from "./cli/cmd/github"
import { ExportCommand } from "./cli/cmd/export"
import { ImportCommand } from "./cli/cmd/import"
import { AttachCommand } from "./cli/cmd/attach"
import { TuiThreadCommand } from "./cli/cmd/tui"
import { AcpCommand } from "./cli/cmd/acp"
import { EOL, homedir } from "os"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import { createInterface } from "readline"
import { WebCommand } from "./cli/cmd/web"
import { PrCommand } from "./cli/cmd/pr"
import { SessionCommand } from "./cli/cmd/session"
import { DbCommand } from "./cli/cmd/db"
import { errorMessage } from "./util/error"
import { PluginCommand } from "./cli/cmd/plug"
import { Heap } from "./cli/heap"

const args = hideBin(process.argv)
const CONFIG_FILE = join(homedir(), ".hanubees", "api-key.conf")
const DASHBOARD_URL = "https://hanubees-dashboard.vercel.app"

function show(out: string) {
  const text = out.trimStart()
  if (!text.startsWith("opencode ")) {
    process.stderr.write(UI.logo() + EOL + EOL)
    process.stderr.write(text + EOL)
    return
  }
  process.stderr.write(out)
}

const cli = yargs(args)
  .parserConfiguration({ "populate--": true })
  .scriptName("opencode")
  .wrap(100)
  .help("help", "show help")
  .alias("help", "h")
  .version("version", "show version number", InstallationVersion)
  .alias("version", "v")
  .option("print-logs", {
    describe: "print logs to stderr",
    type: "boolean",
  })
  .option("log-level", {
    describe: "log level",
    type: "string",
    choices: ["DEBUG", "INFO", "WARN", "ERROR"],
  })
  .option("pure", {
    describe: "run without external plugins",
    type: "boolean",
  })
  .middleware(async (opts) => {
    if (opts.printLogs) process.env.OPENCODE_PRINT_LOGS = "1"
    if (opts.logLevel) process.env.OPENCODE_LOG_LEVEL = opts.logLevel
    if (opts.pure) {
      process.env.OPENCODE_PURE = "1"
    }

    Heap.start()

    process.env.AGENT = "1"
    process.env.OPENCODE = "1"
    process.env.OPENCODE_PID = String(process.pid)

    const hasHelpFlag = process.argv.includes("-h") || process.argv.includes("--help")
    if (opts.help || opts.version || hasHelpFlag) return

    let apiKey = process.env.HANUBEES_API_KEY
    if (!apiKey) {
      try {
        apiKey = readFileSync(CONFIG_FILE, "utf8").trim()
      } catch {}
    }

    if (!apiKey) {
      process.stderr.write(EOL)
      process.stderr.write(`  Go to ${DASHBOARD_URL} to get your API key` + EOL)
      process.stderr.write(EOL)
      const rl = createInterface({ input: process.stdin, output: process.stderr })
      const answer = await new Promise<string>((resolve) => {
        rl.question("  Paste your key: ", resolve)
      })
      rl.close()
      apiKey = answer.trim()
      if (!apiKey) {
        process.stderr.write("  No key entered." + EOL)
        process.exit(1)
      }
    }

    try {
      const res = await fetch(`${DASHBOARD_URL}/api/validate-key`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      const data = (await res.json()) as { valid?: boolean; error?: string }
      if (!data.valid) {
        process.stderr.write(`Access denied: ${data.error}` + EOL)
        process.stderr.write(`  Get a new key at ${DASHBOARD_URL}` + EOL)
        // Delete saved key if it's invalid
        try { readFileSync(CONFIG_FILE, "utf8") } catch { process.exit(1) }
        const { unlinkSync } = await import("fs")
        try { unlinkSync(CONFIG_FILE) } catch {}
        process.exit(1)
      }
    } catch {
      process.stderr.write("Warning: Could not verify key" + EOL)
    }

    // Save key and set env for downstream
    process.env.HANUBEES_API_KEY = apiKey
    try {
      mkdirSync(join(homedir(), ".hanubees"), { recursive: true })
      writeFileSync(CONFIG_FILE, apiKey, "utf8")
    } catch {}
  })
  .usage("")
  .completion("completion", "generate shell completion script")
  .command(AcpCommand)
  .command(McpCommand)
  .command(TuiThreadCommand)
  .command(AttachCommand)
  .command(RunCommand)
  .command(GenerateCommand)
  .command(DebugCommand)
  .command(ConsoleCommand)
  .command(ProvidersCommand)
  .command(AgentCommand)
  .command(UpgradeCommand)
  .command(UninstallCommand)
  .command(ServeCommand)
  .command(WebCommand)
  .command(ModelsCommand)
  .command(StatsCommand)
  .command(ExportCommand)
  .command(ImportCommand)
  .command(GithubCommand)
  .command(PrCommand)
  .command(SessionCommand)
  .command(PluginCommand)
  .command(DbCommand)
  .fail((msg, err) => {
    if (
      msg?.startsWith("Unknown argument") ||
      msg?.startsWith("Not enough non-option arguments") ||
      msg?.startsWith("Invalid values:")
    ) {
      if (err) throw err
      cli.showHelp(show)
    }
    if (err) throw err
    process.exit(1)
  })
  .strict()

try {
  if (args.includes("-h") || args.includes("--help")) {
    await cli.parse(args, (err: Error | undefined, _argv: unknown, out: string) => {
      if (err) throw err
      if (!out) return
      show(out)
    })
  } else {
    await cli.parse()
  }
} catch (e) {
  const formatted = FormatError(e)
  if (formatted) UI.error(formatted)
  if (formatted === undefined) {
    UI.error("Unexpected error" + EOL)
    process.stderr.write(errorMessage(e) + EOL)
  }
  process.exitCode = 1
} finally {
  // Some subprocesses don't react properly to SIGTERM and similar signals.
  // Most notably, some docker-container-based MCP servers don't handle such signals unless
  // run using `docker run --init`.
  // Explicitly exit to avoid any hanging subprocesses.
  process.exit()
}
