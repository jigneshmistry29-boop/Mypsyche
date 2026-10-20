export const socialProfiles = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/yelotrip",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/yelotrip",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/company/yelotrip",
  x: process.env.NEXT_PUBLIC_X_URL ?? "https://x.com/yelotrip",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "https://youtube.com/@yelotrip",
  pinterest: process.env.NEXT_PUBLIC_PINTEREST_URL ?? "https://pinterest.com/yelotrip",
  whatsapp: "https://wa.me/919667334803?text=Hello%20YeloTrip%2C%20I%20would%20like%20to%20plan%20a%20journey.",
} as const;

export interface SocialChannelMeta {
  id: keyof typeof socialProfiles;
  name: string;
  handle: string;
  href: string;
  color: string;
  bgGradient?: string;
  actionText: string;
  shortAction: string;
}

export const thematicSocialChannels: SocialChannelMeta[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+91 96673 34803",
    href: socialProfiles.whatsapp,
    color: "#25D366",
    actionText: "Chat Live",
    shortAction: "Chat",
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@yelotrip",
    href: socialProfiles.instagram,
    color: "#E1306C",
    bgGradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    actionText: "Follow Stories",
    shortAction: "Stories",
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "@yelotrip",
    href: socialProfiles.facebook,
    color: "#1877F2",
    actionText: "Join Community",
    shortAction: "Community",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "/company/yelotrip",
    href: socialProfiles.linkedin,
    color: "#0A66C2",
    actionText: "Corporate Desk",
    shortAction: "Corporate",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@yelotrip",
    href: socialProfiles.youtube,
    color: "#FF0000",
    actionText: "Watch Films",
    shortAction: "Films",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    handle: "@yelotrip",
    href: socialProfiles.pinterest,
    color: "#BD081C",
    actionText: "Trip Pins",
    shortAction: "Moodboards",
  },
  {
    id: "x",
    name: "X",
    handle: "@yelotrip",
    href: socialProfiles.x,
    color: "#14171A",
    actionText: "Direct Notes",
    shortAction: "Updates",
  },
];