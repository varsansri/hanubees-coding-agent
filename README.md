<p align="center">
  <a href="https://github.com/varsansri/biyatrix">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="biyatrix logo">
    </picture>
  </a>
</p>
<p align="center">The AI coding agent.</p>
<p align="center">
  <a href="https://discord.gg/opencode"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/biyatrix"><img alt="npm" src="https://img.shields.io/npm/v/biyatrix?style=flat-square" /></a>
  <a href="https://github.com/varsansri/biyatrix/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/varsansri/biyatrix/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![biyatrix Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/varsansri/biyatrix)

---

### Installation

```bash
# YOLO
curl -fsSL https://github.com/varsansri/biyatrix/raw/dev/install | bash

# Package managers
npm i -g biyatrix@latest        # or bun/pnpm/yarn
```

> [!TIP]
> Remove prior versions before installing.

### Desktop App (BETA)

biyatrix is also available as a desktop application. Download directly from the [releases page](https://github.com/varsansri/biyatrix/releases).

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$BIYATRIX_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.biyatrix/bin` - Default fallback

```bash
# Examples
BIYATRIX_INSTALL_DIR=/usr/local/bin curl -fsSL https://github.com/varsansri/biyatrix/raw/dev/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://github.com/varsansri/biyatrix/raw/dev/install | bash
```

### Agents

biyatrix includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://opencode.ai/docs/agents).

### Documentation

For more info on how to configure biyatrix, [**head over to our docs**](https://opencode.ai/docs).

### Contributing

If you're interested in contributing to biyatrix, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on biyatrix

If you are working on a project that's related to biyatrix and is using "biyatrix" as part of its name, for example "biyatrix-dashboard" or "biyatrix-mobile", please add a note to your README to clarify that it is not built by the biyatrix team and is not affiliated with us in any way.

---

**Join our community** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
