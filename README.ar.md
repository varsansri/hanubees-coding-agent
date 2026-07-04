<p align="center">
  <a href="https://hanbees.com">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="شعار HanuBees">
    </picture>
  </a>
</p>
<p align="center">وكيل برمجة بالذكاء الاصطناعي مفتوح المصدر.</p>
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

### التثبيت

```bash
# YOLO
curl -fsSL https://hanbees.com/install | bash

# مديري الحزم
npm i -g hanubees@latest        # او bun/pnpm/yarn
```

> [!TIP]
> احذف الاصدارات الاقدم من 0.1.x قبل التثبيت.

### تطبيق سطح المكتب (BETA)

يتوفر HanuBees ايضا كتطبيق سطح مكتب. قم بالتنزيل مباشرة من [صفحة الاصدارات](https://github.com/varsansri/hanubees-coding-agent/releases) او من [hanbees.com/download](https://hanbees.com/download).

| المنصة                | التنزيل                            |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `hanubees-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `hanubees-desktop-mac-x64.dmg`     |
| Windows               | `hanubees-desktop-windows-x64.exe` |
| Linux                 | `.deb` او `.rpm` او AppImage       |

```bash
# macOS (Homebrew)
brew install --cask hanubees-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/hanubees-desktop
```

#### مجلد التثبيت

يحترم سكربت التثبيت ترتيب الاولوية التالي لمسار التثبيت:

1. `$HANUBEES_INSTALL_DIR` - مجلد تثبيت مخصص
2. `$XDG_BIN_DIR` - مسار متوافق مع مواصفات XDG Base Directory
3. `$HOME/bin` - مجلد الثنائيات القياسي للمستخدم (ان وجد او امكن انشاؤه)
4. `$HOME/.hanubees/bin` - المسار الافتراضي الاحتياطي

```bash
# امثلة
HANUBEES_INSTALL_DIR=/usr/local/bin curl -fsSL https://hanbees.com/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hanbees.com/install | bash
```

### Agents

يتضمن HanuBees وكيليْن (Agents) مدمجين يمكنك التبديل بينهما باستخدام زر `Tab`.

- **build** - الافتراضي، وكيل بصلاحيات كاملة لاعمال التطوير
- **plan** - وكيل للقراءة فقط للتحليل واستكشاف الكود
  - يرفض تعديل الملفات افتراضيا
  - يطلب الاذن قبل تشغيل اوامر bash
  - مثالي لاستكشاف قواعد كود غير مألوفة او لتخطيط التغييرات

بالاضافة الى ذلك يوجد وكيل فرعي **general** للبحث المعقد والمهام متعددة الخطوات.
يستخدم داخليا ويمكن استدعاؤه بكتابة `@general` في الرسائل.

تعرف على المزيد حول [agents](https://hanbees.com/docs/agents).

### التوثيق

لمزيد من المعلومات حول كيفية ضبط HanuBees، [**راجع التوثيق**](https://hanbees.com/docs).

### المساهمة

اذا كنت مهتما بالمساهمة في HanuBees، يرجى قراءة [contributing docs](./CONTRIBUTING.md) قبل ارسال pull request.

### البناء فوق HanuBees

اذا كنت تعمل على مشروع مرتبط بـ HanuBees ويستخدم "HanuBees" كجزء من اسمه (مثل "hanubees-dashboard" او "hanubees-mobile")، يرجى اضافة ملاحظة في README توضح انه ليس مبنيا بواسطة فريق HanuBees ولا يرتبط بنا بأي شكل.

---

**انضم الى مجتمعنا** [Discord](https://discord.gg/hanubees) | [X.com](https://x.com/hanubees)
