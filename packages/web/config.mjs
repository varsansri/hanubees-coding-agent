const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://hanubees.com" : `https://${stage}.hanubees.com`,
  console: stage === "production" ? "https://hanubees.com/auth" : `https://${stage}.hanubees.com/auth`,
  email: "help@hanubees.com",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/varsansri/hanubees-coding-agent",
  discord: "https://hanubees.com/discord",
  headerLinks: [
    { name: "Home", url: "/" },
    { name: "Docs", url: "/config" },
  ],
}
