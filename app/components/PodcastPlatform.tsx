import colors from "~/utils/colors"

export default function Footer() {
  const platforms = [
    {
      name: "Spotify",
      url: "https://bit.ly/techtalk-spotify",
      icon: "/assets/images/podcasts/spotify-icon.svg",
      color: colors.spotify
    },
    {
      name: "Amazon Music",
      url: "https://bit.ly/techtalk-amazon",
      icon: "/assets/images/podcasts/amazon-music.png",
      color: colors.amazonMusic
    },
    {
      name: "Apple Podcasts",
      url: "https://bit.ly/techtalk-apple",
      icon: "/assets/images/podcasts/apple-podcasts.jpg",
      color: colors.applePodcasts
    },
    {
      name: "iHeartRadio",
      url: "https://bit.ly/techtalk-iheartradio",
      icon: "/assets/images/podcasts/iheart-radio.png",
      color: colors.rss
    },
    {
      name: "YouTube",
      url: "https://bit.ly/techtalk-youtube",
      icon: "/assets/images/podcasts/youtube.svg",
      color: colors.youtubeBg
    }
  ]
  return (
    <div className="grid grid-cols-2 sm:flex sm:justify-around sm:flex-wrap gap-2">
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
