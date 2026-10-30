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
    // One size for every card, photo in a ring, names centred, socials on one line at the bottom.
    // The card links to the speaker; their social links sit beside that link, not inside it.
    <div className="group flex h-60 w-44 flex-col items-center rounded-2xl bg-white px-4 pt-5 pb-4 text-center shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to="/panelis/$speakerId" params={{ speakerId: speaker.id }} className="flex flex-col items-center">
        <img
          src={speaker.imageUrl}
          alt=""
          loading="lazy"
          className="size-24 rounded-full object-cover ring-4 ring-tt-yellow/80 transition duration-300 group-hover:ring-tt-yellow"
        />
        <h3 className="mt-3 line-clamp-1 font-semibold text-gray-900 group-hover:text-tt-blue">{getSpeakerNickname(speaker)}</h3>
        <p className="line-clamp-1 text-xs text-gray-500">{speaker.name}</p>
      </Link>
      <div className="mt-auto flex h-7 items-center justify-center gap-0.5">
        {speaker.youtube && (
                <a
                  href={speaker.youtube}
                  className="p-1.5 rounded-full text-red-500 hover:text-red-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="YouTube"
                >
                  <FaYoutube className="w-3.5 h-3.5" />
                </a>
              )}
              {speaker.instagram && (
                <a
                  href={speaker.instagram}
                  className="p-1.5 rounded-full text-pink-500 hover:text-pink-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="Instagram"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
              )}
              {speaker.facebook && (
                <a
                  href={speaker.facebook}
                  className="p-1.5 rounded-full text-blue-500 hover:text-blue-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="Facebook"
                >
                  <FaFacebook className="w-3.5 h-3.5" />
                </a>
              )}
              {speaker.x && (
                <a
                  href={speaker.x}
                  className="p-1.5 rounded-full text-gray-700 hover:text-black transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="X (Twitter)"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </a>
              )}
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  className="p-1.5 rounded-full text-blue-600 hover:text-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                                    title="LinkedIn"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
              )}
      </div>
    </div>
  )
} 