export const SERVER_INFO = {
  name: "Eclipse Networks",
  logoSrc: "/assets/logo.svg",
  connectUrl: "https://cfx.re/join/bo795d",
  discordUrl: "https://discord.gg/6EnUzA2GUe",
  sourceUrl: "https://github.com/EclipseNetworks0/website",
  spiel1: "An Australian semi-serious FiveM RP community built by players, for players.",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  // { href: "/guide", label: "Guide" },
  { href: "https://eclipsenetworks.store", label: "Shop", external: true },
];

export const SOCIAL_LINKS = [
  { href: SERVER_INFO.discordUrl, label: "Discord", icon: "bx bxl-discord-alt" },
  { href: SERVER_INFO.connectUrl, label: "FiveM", icon: "bx bxs-joystick" },
  { href: SERVER_INFO.sourceUrl, label: "GitHub", icon: "bx bxl-github" },
];

export const FOOTER_SECTIONS = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      {
        href: SERVER_INFO.connectUrl,
        label: "Connect Server",
        icon: "bx bxs-joystick",
        external: true,
        highlight: true,
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        href: SERVER_INFO.discordUrl,
        label: "Join Discord",
        icon: "bx bxl-discord-alt",
        external: true,
      },
      {
        href: "https://www.youtube.com/@EclipseNetworks0",
        label: "YouTube",
        icon: "bx bxl-youtube",
        external: true,
      },
      {
        href: "https://www.tiktok.com/@EclipseNetworks0",
        label: "TikTok",
        icon: "bx bxl-tiktok",
        external: true,
      },
    ],
  },
  {
    title: "Developers",
    links: [
      {
        href: SERVER_INFO.sourceUrl,
        label: "Source Code",
        icon: "bx bxl-github",
        external: true,
      },
    ],
  },
];