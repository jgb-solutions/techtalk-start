import { Link } from "@tanstack/react-router"
import { FaGlobe, FaLinkedin } from "react-icons/fa"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { ISpeakerCard } from "~/types/interfaces"
import { getSpeakerNickname } from "~/utils/helpers"

export default function Speaker({
  speaker,
  className,
}: {
  speaker: ISpeakerCard
  className?: string
}) {
  return (
    <Link
      className={className}
      to="/panelis/$speakerId"
      params={{ speakerId: speaker.id }}
      key={speaker.id}
    >
      <div className="bg-tt-yellow rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src={speaker.cdnImageUrl}
            alt={speaker.name}
            className="w-48 h-48 rounded-full shadow-lg border-4 border-white"
          />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4"><span className="text-lg font-medium">{getSpeakerNickname(speaker)}</span> <br />{speaker.name}</h1>
            {speaker.bio && (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: speaker.bio }} />
            )}

            <div className="flex gap-4 mt-4 justify-center sm:justify-start">
              {speaker.youtube && (
                <a
                  href={speaker.youtube}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="w-6 h-6" />
                </a>
              )}

              {speaker.instagram && (
                <a
                  href={speaker.instagram}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              )}

              {speaker.facebook && (
                <a
                  href={speaker.facebook}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="w-6 h-6" />
                </a>
              )}

              {speaker.x && (
                <a
                  href={speaker.x}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="w-6 h-6" />
                </a>
              )}

              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              )}

              {speaker.website && (
                <a
                  href={speaker.website}
                  className="text-black hover:text-black/80 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGlobe className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}