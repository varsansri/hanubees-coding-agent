<p align="center">
  <a href="https://github.com/varsansri/hanubees-coding-agent">
    <picture>
      <img src="logo.png" alt="HanuBees logo" width="200">
    </picture>
  </a>
</p>

<p align="center">Открытый AI-агент для программирования.</p>
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

### Установка

```bash
# YOLO
curl -fsSL https://hanbees.com/install | bash

# Менеджеры пакетов
npm i -g hanubees@latest        # или bun/pnpm/yarn
```

> [!TIP]
> Перед установкой удалите версии старше 0.1.x.

### Десктопное приложение (BETA)

HanuBees также доступен как десктопное приложение. Скачайте его со [страницы релизов](https://github.com/varsansri/hanubees-coding-agent/releases) или с [hanbees.com/download](https://hanbees.com/download).

| Платформа             | Загрузка                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `hanubees-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `hanubees-desktop-mac-x64.dmg`     |
| Windows               | `hanubees-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` или AppImage        |

```bash
# macOS (Homebrew)
brew install --cask hanubees-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/hanubees-desktop
```

#### Каталог установки

Скрипт установки выбирает путь установки в следующем порядке приоритета:

1. `$HANUBEES_INSTALL_DIR` - Пользовательский каталог установки
2. `$XDG_BIN_DIR` - Путь, совместимый со спецификацией XDG Base Directory
3. `$HOME/bin` - Стандартный каталог пользовательских бинарников (если существует или можно создать)
4. `$HOME/.hanubees/bin` - Fallback по умолчанию

```bash
# Примеры
HANUBEES_INSTALL_DIR=/usr/local/bin curl -fsSL https://hanbees.com/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hanbees.com/install | bash
```

### Agents

В HanuBees есть два встроенных агента, между которыми можно переключаться клавишей `Tab`.

- **build** - По умолчанию, агент с полным доступом для разработки
- **plan** - Агент только для чтения для анализа и изучения кода
  - По умолчанию запрещает редактирование файлов
  - Запрашивает разрешение перед выполнением bash-команд
  - Идеален для изучения незнакомых кодовых баз или планирования изменений

Также включен сабагент **general** для сложных поисков и многошаговых задач.
Он используется внутренне и может быть вызван в сообщениях через `@general`.

Подробнее об [agents](https://hanbees.com/docs/agents).

### Документация

Больше информации о том, как настроить HanuBees: [**наши docs**](https://hanbees.com/docs).

### Вклад

Если вы хотите внести вклад в HanuBees, прочитайте [contributing docs](./CONTRIBUTING.md) перед тем, как отправлять pull request.

### Разработка на базе HanuBees

Если вы делаете проект, связанный с HanuBees, и используете "HanuBees" как часть имени (например, "hanubees-dashboard" или "hanubees-mobile"), добавьте примечание в README, чтобы уточнить, что проект не создан командой HanuBees и не аффилирован с нами.

---

**Присоединяйтесь к нашему сообществу** [Discord](https://discord.gg/hanubees) | [X.com](https://x.com/hanubees)
