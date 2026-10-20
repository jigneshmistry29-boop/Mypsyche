"use client";

import { thematicSocialChannels } from "../../config/social";
import { FacebookIcon, InstagramIcon, LinkedinIcon, PinterestIcon, WhatsAppIcon, XIcon, YoutubeIcon } from "@/components/social-icons";

const iconMap = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  youtube: YoutubeIcon,
  pinterest: PinterestIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialLinks() {
  return (
    <div className="thematic-social-grid" aria-label="Official @yelotrip social channels">
      {thematicSocialChannels.map((channel) => {
        const Icon = iconMap[channel.id];
        return (
          <a
            key={channel.id}
            href={channel.href}
            target="_blank"
            rel="noreferrer"
            className="thematic-social-btn"
            style={{ "--social-color": channel.color } as React.CSSProperties}
            aria-label={`${channel.name} (@yelotrip) - ${channel.actionText}`}
            title={`${channel.name} · ${channel.handle}`}
          >
            <span
              className="thematic-social-icon-box"
              style={{ background: channel.bgGradient || channel.color }}
              aria-hidden="true"
            >
              <Icon size={16} />
            </span>
            <div className="thematic-social-label">
              <span className="thematic-channel-name">{channel.name}</span>
              <span className="thematic-channel-handle">{channel.handle}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default SocialLinks;
