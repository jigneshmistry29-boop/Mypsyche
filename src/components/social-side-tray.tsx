"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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

export default function SocialSideTray() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`social-side-tray ${isCollapsed ? "is-collapsed" : ""}`}
      aria-label="Official @yelotrip social channels"
    >
      {/* Side Tray Toggle Button */}
      <button
        className="tray-toggle-btn"
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? "Expand @yelotrip social channels" : "Collapse social channels"}
        title={isCollapsed ? "Expand @yelotrip channels" : "Collapse social channels"}
      >
        <span className="tray-toggle-badge">@yelotrip</span>
        {isCollapsed ? <ChevronRight size={15} aria-hidden="true" /> : <ChevronLeft size={15} aria-hidden="true" />}
      </button>

      {/* Social Icons Column */}
      <div className="tray-items-column" role="menu">
        {thematicSocialChannels.map((channel) => {
          const Icon = iconMap[channel.id];
          return (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              className="tray-link-item"
              role="menuitem"
              style={{ "--channel-color": channel.color } as React.CSSProperties}
              aria-label={`${channel.name} (@yelotrip) - ${channel.actionText}`}
            >
              <span
                className="tray-icon-box"
                style={{ background: channel.bgGradient || channel.color }}
                aria-hidden="true"
              >
                <Icon size={18} className="tray-icon" />
              </span>

              {/* Slide-out tooltip label */}
              <span className="tray-flyout-label">
                <strong className="channel-name">{channel.name}</strong>
                <span className="channel-handle">{channel.handle}</span>
                <span className="channel-action">{channel.actionText} →</span>
              </span>
            </a>
          );
        })}
      </div>
    </aside>
  );
}
