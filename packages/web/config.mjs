const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://hanbees.com" : `https://${stage}.hanbees.com`,
  console: stage === "production" ? "https://hanbees.com/auth" : `https://${stage}.hanbees.com/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/anomalyco/opencode",
  discord: "https://hanbees.com/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
