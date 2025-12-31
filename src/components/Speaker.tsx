import { Link } from "@tanstack/react-router"
import { FaGlobe, FaLinkedin } from "react-icons/fa"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { ISpeakerCard } from "~/types/interfaces"
import { clx, getSpeakerNickname } from "~/utils/helpers"

export default function Speaker({
  speaker,
  className,
}: {
  speaker: ISpeakerCard
  className?: string
}) {
  return (
    <div
      className={clx(className)}
      key={speaker.id}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
            <Link
              to="/panelis/$speakerId"
              params={{ speakerId: speaker.id }}
              className="group flex-shrink-0"
            >
              <img
                src={speaker.imageUrl}
                alt={speaker.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl shadow-lg object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <div className="text-center lg:text-left flex-1">
              <Link
                to="/panelis/$speakerId"
                params={{ speakerId: speaker.id }}
                className="group"
              >
                <h1 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-tt-blue transition-colors duration-200">
                  <span className="text-lg lg:text-xl font-medium text-gray-600 block mb-1">
                    {getSpeakerNickname(speaker)}
                  </span>
                  {speaker.name}
                </h1>
                {speaker.bio && (
                  <div className="prose prose-sm max-w-none text-gray-600 group-hover:text-gray-700 transition-colors">
                    <div dangerouslySetInnerHTML={{ __html: speaker.bio }} />
                  </div>
                )}
              </Link>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
                {speaker.youtube && (
                  <a
                    href={speaker.youtube}
                    className="group/social p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                  >
                    <FaYoutube className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {speaker.instagram && (
                  <a
                    href={speaker.instagram}
                    className="group/social p-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                  >
                    <FaInstagram className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {speaker.facebook && (
                  <a
                    href={speaker.facebook}
                    className="group/social p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                  >
                    <FaFacebook className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {speaker.x && (
                  <a
                    href={speaker.x}
                    className="group/social p-2 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                  >
                    <FaXTwitter className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    className="group/social p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <FaLinkedin className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}

                {speaker.website && (
                  <a
                    href={speaker.website}
                    className="group/social p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                  >
                    <FaGlobe className="w-5 h-5 group-hover/social:scale-110 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="h-1 bg-gradient-to-r from-tt-yellow via-tt-blue to-tt-yellow"></div>
      </div>
    </div>
  )
} 