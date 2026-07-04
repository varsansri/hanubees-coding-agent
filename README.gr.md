<p align="center">
  <a href="https://github.com/varsansri/hanubees-coding-agent">
    <picture>
      <img src="logo.png" alt="HanuBees logo" width="200">
    </picture>
  </a>
</p>

<p align="center">Ο πράκτορας τεχνητής νοημοσύνης ανοικτού κώδικα για προγραμματισμό.</p>
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

### Εγκατάσταση

```bash
# YOLO
curl -fsSL https://hanbees.com/install | bash

# Διαχειριστές πακέτων
npm i -g hanubees@latest        # ή bun/pnpm/yarn
```

> [!TIP]
> Αφαίρεσε παλαιότερες εκδόσεις από τη 0.1.x πριν από την εγκατάσταση.

### Εφαρμογή Desktop (BETA)

Το HanuBees είναι επίσης διαθέσιμο ως εφαρμογή. Κατέβασε το απευθείας από τη [σελίδα εκδόσεων](https://github.com/varsansri/hanubees-coding-agent/releases) ή το [hanbees.com/download](https://hanbees.com/download).

| Πλατφόρμα             | Λήψη                               |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `hanubees-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `hanubees-desktop-mac-x64.dmg`     |
| Windows               | `hanubees-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, ή AppImage         |

```bash
# macOS (Homebrew)
brew install --cask hanubees-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/hanubees-desktop
```

#### Κατάλογος Εγκατάστασης

Το script εγκατάστασης τηρεί την ακόλουθη σειρά προτεραιότητας για τη διαδρομή εγκατάστασης:

1. `$HANUBEES_INSTALL_DIR` - Προσαρμοσμένος κατάλογος εγκατάστασης
2. `$XDG_BIN_DIR` - Διαδρομή συμβατή με τις προδιαγραφές XDG Base Directory
3. `$HOME/bin` - Τυπικός κατάλογος εκτελέσιμων αρχείων χρήστη (εάν υπάρχει ή μπορεί να δημιουργηθεί)
4. `$HOME/.hanubees/bin` - Προεπιλεγμένη εφεδρική διαδρομή

```bash
# Παραδείγματα
HANUBEES_INSTALL_DIR=/usr/local/bin curl -fsSL https://hanbees.com/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://hanbees.com/install | bash
```

### Πράκτορες

Το HanuBees περιλαμβάνει δύο ενσωματωμένους πράκτορες μεταξύ των οποίων μπορείτε να εναλλάσσεστε με το πλήκτρο `Tab`.

- **build** - Προεπιλεγμένος πράκτορας με πλήρη πρόσβαση για εργασία πάνω σε κώδικα
- **plan** - Πράκτορας μόνο ανάγνωσης για ανάλυση και εξερεύνηση κώδικα
  - Αρνείται την επεξεργασία αρχείων από προεπιλογή
  - Ζητά άδεια πριν εκτελέσει εντολές bash
  - Ιδανικός για εξερεύνηση άγνωστων αρχείων πηγαίου κώδικα ή σχεδιασμό αλλαγών

Περιλαμβάνεται επίσης ένας **general** υποπράκτορας για σύνθετες αναζητήσεις και πολυβηματικές διεργασίες.
Χρησιμοποιείται εσωτερικά και μπορεί να κληθεί χρησιμοποιώντας `@general` στα μηνύματα.

Μάθετε περισσότερα για τους [πράκτορες](https://hanbees.com/docs/agents).

### Οδηγός Χρήσης

Για περισσότερες πληροφορίες σχετικά με τη ρύθμιση του HanuBees, [**πλοηγήσου στον οδηγό χρήσης μας**](https://hanbees.com/docs).

### Συνεισφορά

Εάν ενδιαφέρεσαι να συνεισφέρεις στο HanuBees, διαβάστε τα [οδηγό χρήσης συνεισφοράς](./CONTRIBUTING.md) πριν υποβάλεις ένα pull request.

### Δημιουργία πάνω στο HanuBees

Εάν εργάζεσαι σε ένα έργο σχετικό με το HanuBees και χρησιμοποιείτε το "HanuBees" ως μέρος του ονόματός του, για παράδειγμα "hanubees-dashboard" ή "hanubees-mobile", πρόσθεσε μια σημείωση στο README σας για να διευκρινίσεις ότι δεν είναι κατασκευασμένο από την ομάδα του HanuBees και δεν έχει καμία σχέση με εμάς.

---

**Γίνε μέλος της κοινότητάς μας** [Discord](https://discord.gg/hanubees) | [X.com](https://x.com/hanubees)
