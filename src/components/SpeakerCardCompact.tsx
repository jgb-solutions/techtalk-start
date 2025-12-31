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
      <Link
        to="/panelis/$speakerId"
        params={{ speakerId: speaker.id }}
        className="group block h-full"
      >
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
          {/* Speaker Image */}
          <div className="relative flex-shrink-0">
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Speaker Info - Using flex to ensure consistent height */}
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-tt-blue transition-colors line-clamp-1">
                {getSpeakerNickname(speaker)}
              </h3>
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {speaker.name}
              </p>
            </div>

            {/* Social Links - Always at bottom */}
            <div className="flex justify-center space-x-2 mt-auto">
              {speaker.youtube && (
                <a
                  href={speaker.youtube}
                  className="p-1 text-red-500 hover:text-red-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
} 