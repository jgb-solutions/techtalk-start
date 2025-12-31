import { SITE_YOUTUBE_URL, SITE_INSTAGRAM_URL, SITE_FACEBOOK_URL, SITE_X_URL, SITE_LINKEDIN_URL } from "~/utils/constants"
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function Socials() {
  return (
    <div className="flex gap-4 mb-4">
      <a
        href={SITE_YOUTUBE_URL}
        className="hover:opacity-80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="w-6 h-6" />
      </a>

      <a
        href={SITE_INSTAGRAM_URL}
        className="hover:opacity-80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="w-6 h-6" />
      </a>

      <a
        href={SITE_FACEBOOK_URL}
        className="hover:opacity-80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="w-6 h-6" />
      </a>

      <a
        href={SITE_X_URL}
        className="hover:opacity-80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaXTwitter className="w-6 h-6" />
      </a>

      <a
        href={SITE_LINKEDIN_URL}
        className="hover:opacity-80 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="w-6 h-6" />
      </a>
    </div>
  )
} 