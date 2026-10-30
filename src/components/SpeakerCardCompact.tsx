import { Link } from "@tanstack/react-router"
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { ISpeakerCard } from "../types/interfaces"
import { getSpeakerNickname } from "../utils/helpers"

export default function SpeakerCardCompact({
  speaker,
}: {
  speaker: ISpeakerCard
}) {
  return (
    <div className="flex-shrink-0 w-48 h-64">
      {/* The card links to the speaker; their social links sit beside that link, not inside it
          (a link inside a link is invalid HTML and broke hydration). */}
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
        <Link to="/panelis/$speakerId" params={{ speakerId: speaker.id }} className="flex-1 flex flex-col">
          {/* Speaker Image */}
          <div className="relative flex-shrink-0">
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Speaker Info */}
          <div className="px-4 pt-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-tt-blue transition-colors line-clamp-1">
                {getSpeakerNickname(speaker)}
              </h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {speaker.name}
              </p>
            </div>
          </div>
        </Link>

        {/* Social Links - Always at bottom */}
        <div className="flex justify-center space-x-2 mt-auto px-4 pb-4">
              {speaker.youtube && (
                <a
                  href={speaker.youtube}
                  className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="YouTube"
                >
                  <FaYoutube className="w-3 h-3" />
                </a>
              )}
              {speaker.instagram && (
                <a
                  href={speaker.instagram}
                  className="p-1 text-pink-500 hover:text-pink-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="Instagram"
                >
                  <FaInstagram className="w-3 h-3" />
                </a>
              )}
              {speaker.facebook && (
                <a
                  href={speaker.facebook}
                  className="p-1 text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="Facebook"
                >
                  <FaFacebook className="w-3 h-3" />
                </a>
              )}
              {speaker.x && (
                <a
                  href={speaker.x}
                  className="p-1 text-gray-700 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="X (Twitter)"
                >
                  <FaXTwitter className="w-3 h-3" />
                </a>
              )}
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  className="p-1 text-blue-600 hover:text-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="LinkedIn"
                >
                  <FaLinkedin className="w-3 h-3" />
                </a>
              )}
        </div>
      </div>
    </div>
  )
} 