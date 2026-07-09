import { createSignal, createEffect, onCleanup, Show } from "solid-js"
import { box, text } from "@opentui/solid"

type Announcement = {
  id: string
  title: string | null
  message: string
  type: "info" | "warning" | "critical"
  display_mode: "popup" | "banner" | "persistent_banner"
  duration: number
  frequency: "once" | "per_session" | "always"
}

const TYPE_COLORS: Record<string, string> = { info: "#f7e96c", warning: "#f97316", critical: "#ef4444" }

function parseAnnouncement(): Announcement | null {
  try {
    const raw = process.env.HANUBEES_ANNOUNCEMENT
    if (!raw) return null
    return JSON.parse(raw) as Announcement
  } catch {
    return null
  }
}

function saveSeen(id: string) {
  try {
    const fs = require("fs")
    const path = require("path")
    const os = require("os")
    const dir = path.join(os.homedir(), ".hanubees")
    const file = path.join(dir, "announcement-state.json")
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(file, JSON.stringify({ lastSeenId: id, seenAt: new Date().toISOString() }), "utf8")
  } catch {}
}

export function AnnouncementBar() {
  const ann = parseAnnouncement()
  const [visible, setVisible] = createSignal(ann !== null)
  const [dismissed, setDismissed] = createSignal(false)
  const isPersistent = ann?.display_mode === "persistent_banner"

  createEffect(() => {
    if (!ann || dismissed()) return
    if (ann.duration > 0 && !isPersistent) {
      const timer = setTimeout(() => {
        setVisible(false)
        if (ann.frequency === "once") saveSeen(ann.id)
      }, ann.duration * 1000)
      onCleanup(() => clearTimeout(timer))
    }
  })

  const handleDismiss = () => {
    setVisible(false)
    setDismissed(true)
    if (ann?.frequency === "once") saveSeen(ann.id)
  }

  return (
    <Show when={ann && visible()}>
      <box
        flexShrink={0}
        width="100%"
        zIndex={3000}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingTop={0}
        paddingBottom={0}
        paddingLeft={2}
        paddingRight={2}
        minHeight={1}
        borderColor={TYPE_COLORS[ann.type]}
        backgroundColor="#141414"
        border={["bottom"]}
      >
        <box flexDirection="row" alignItems="center" flexGrow={1} minHeight={2} paddingTop={0} paddingBottom={0}>
          <text color={TYPE_COLORS[ann.type]}>
            {ann.type === "critical" ? "✖" : ann.type === "warning" ? "⚠" : "●"}&nbsp;
          </text>
          <text>
            {ann.title ? <text bold>{ann.title}</text> : null}
            {ann.title ? <text color="#666">&nbsp;·&nbsp;</text> : null}
            {ann.message}
          </text>
        </box>
        {ann.duration === 0 || isPersistent ? (
          <box flexShrink={0} paddingLeft={2}>
            <text color="#666" onMouseDown={handleDismiss}>
              ✕
            </text>
          </box>
        ) : null}
      </box>
    </Show>
  )
}
