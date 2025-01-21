import { SITE_NAME } from "~/utils/constants"
import Container from "./Container"
import { Link } from "@tanstack/react-router"
import Socials from "./Socials"
import colors from "~/utils/colors"

export default function Footer() {
  const platforms = [
    {
      name: "Spotify",
      url: "https://open.spotify.com/show/2Fyem0cWQ8bz3F1CRPnW5F",
      icon: "/assets/images/podcasts/spotify.svg",
      color: colors.spotify
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/podcasts/75410f3f-0086-4271-97f1-1c1349c6a01b/tech-talk",
      icon: "/assets/images/podcasts/amazon-music.png",
      color: colors.amazonMusic
    },
    {
      name: "Apple Podcasts",
      url: "https://podcasts.apple.com/us/podcast/tech-talk/id1780957821",
      icon: "/assets/images/podcasts/apple-podcasts.jpg",
      color: colors.applePodcasts
    },
    {
      name: "iHeartRadio",
      url: "https://www.iheart.com/podcast/269-tech-talk-255476996/",
      icon: "/assets/images/podcasts/iheart-radio.png",
      color: colors.rss
    },
    {
      name: "YouTube",
      url: "https://youtu.be/_0WlK1zwhwk?si=So83IAoOcDqOnmCk",
      icon: "/assets/images/podcasts/youtube.svg",
      color: colors.youtubeBg
    }
  ]
  return (
    <div className="flex sm:justify-around flex-wrap gap-2">
      {platforms.map((platform) => (
        <a
          className="btn btn-sm border-none"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: platform.color }}
          key={platform.name}
          href={platform.url}
        >
          <img className="w-4" src={platform.icon} alt={platform.name} />
          <span>{platform.name}</span>
        </a>
      ))}
    </div>
  )
}
