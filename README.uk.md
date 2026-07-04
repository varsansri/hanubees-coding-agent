<p align="center">
  <a href="https://github.com/varsansri/hanubees-coding-agent">
    <picture>
      <img src="logo.png" alt="HanuBees logo" width="200">
    </picture>
  </a>
</p>

<p align="center">AI-агент для програмування з відкритим кодом.</p>
<p align="center">
  <a href="https://hanbees.com/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/hanubees"><img alt="npm" src="https://img.shields.io/npm/v/hanubees?style=flat-square" /></a>
  <a href="https://github.com/varsansri/hanubees-coding-agent/actions/workflows/build-hanubees.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/varsansri/hanubees-coding-agent/build-hanubees.yml?style=flat-square&branch=master" /></a>
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

[![HanuBees Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://hanbees.com)

---

### Встановлення

```bash
# YOLO
curl -fsSL https://hanbees.com/install | bash

# Менеджери пакетів
npm i -g hanubees@latest        # або bun/pnpm/yarn
```

> [!TIP]
> Перед встановленням видаліть версії старші за 0.1.x.

### Десктопний застосунок (BETA)

HanuBees також доступний як десктопний застосунок. Завантажуйте напряму зі [сторінки релізів](https://github.com/varsansri/hanubees-coding-agent/releases) або [hanbees.com/download](https://hanbees.com/download).

| Платформа             | Завантаження                       |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `hanubees-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `hanubees-desktop-mac-x64.dmg`     |
| Windows               | `hanubees-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` або AppImage        |

```bash
# macOS (Homebrew)
brew install --cask hanubees-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/hanubees-desktop
```

#### Каталог встановлення

Скрипт встановлення дотримується такого порядку пріоритету для шляху встановлення:

1. `$HANUBEES_INSTALL_DIR` - Користувацький каталог встановлення
2. `$XDG_BIN_DIR` - Шлях, сумісний зі специфікацією XDG Base Directory
3. `$HOME/bin` - Стандартний каталог користувацьких бінарників (якщо існує або його можна створити)
4. `$HOME/.hanubees/bin` - Резервний варіант за замовчуванням

```bash
# Приклади
HANUBEES_INSTALL_DIR=/usr/local/bin curl -fsSL https://hanbees.com/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hanbees.com/install | bash
```

### Агенти

HanuBees містить два вбудовані агенти, між якими можна перемикатися клавішею `Tab`.

- **build** - Агент за замовчуванням із повним доступом для завдань розробки
- **plan** - Агент лише для читання для аналізу та дослідження коду
  - За замовчуванням забороняє редагування файлів
  - Запитує дозвіл перед запуском bash-команд
  - Ідеально підходить для дослідження незнайомих кодових баз або планування змін

Також доступний допоміжний агент **general** для складного пошуку та багатокрокових завдань.
Він використовується всередині системи й може бути викликаний у повідомленнях через `@general`.

Дізнайтеся більше про [agents](https://hanbees.com/docs/agents).

### Документація

Щоб дізнатися більше про налаштування HanuBees, [**перейдіть до нашої документації**](https://hanbees.com/docs).

### Внесок

Якщо ви хочете зробити внесок в HanuBees, будь ласка, прочитайте нашу [документацію для контриб'юторів](./CONTRIBUTING.md) перед надсиланням pull request.

### Проєкти на базі HanuBees

Якщо ви працюєте над проєктом, пов'язаним з HanuBees, і використовуєте "HanuBees" у назві, наприклад "hanubees-dashboard" або "hanubees-mobile", додайте примітку до свого README.
Уточніть, що цей проєкт не створений командою HanuBees і жодним чином не афілійований із нами.

---

**Приєднуйтеся до нашої спільноти** [Discord](https://discord.gg/hanubees) | [X.com](https://x.com/hanubees)
