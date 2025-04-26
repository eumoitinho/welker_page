"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Instagram, Youtube, Music, Headphones } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setEmailSubmitted(true)
      setFormData({ email: "", subject: "", message: "" })
    }, 1500)
  }

  useEffect(() => {
    if (inView) {
      if (sectionRef.current) {
        sectionRef.current.classList.add("animate-fade-in-up")
      }

      if (leftColRef.current) {
        leftColRef.current.classList.add("animate-fade-in")
        leftColRef.current.style.animationDelay = "0.3s"
      }

      if (rightColRef.current) {
        rightColRef.current.classList.add("animate-fade-in")
        rightColRef.current.style.animationDelay = "0.6s"
      }
    }
  }, [inView])

  return (
    <section
      id="contact"
      ref={(el) => {
        // @ts-ignore - combining refs
        ref(el)
        sectionRef.current = el
      }}
      className="py-20 bg-gradient-to-b from-black to-[#6e1212]/30 relative opacity-0"
    >
      <div
        className="
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
            from-[#6e1212]
            via-[#892e2e]
            to-transparent 
            rounded-full 
            h-[28rem] 
            w-[28rem]
            md:h-[26rem] 
            md:w-[68rem] 
            z-0 
            blur-[130px] 
            absolute 
            top-[75px] 
            -left-4 
            transform 
            -translate-x-1/2 
            translate-1/2
            opacity-55
            "
      />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase">Contact</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={leftColRef} className="opacity-0">
            <h3 className="text-xl font-bold text-white mb-6">FOLLOW ME</h3>

            <div className="socials flex flex-row gap-6 items-center mb-8">
              <a
                href="https://instagram.com/welkermusic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                <Instagram size={32} />
              </a>
              <a
                href="https://www.youtube.com/@musicwelker"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                <Youtube size={32} />
              </a>
              <a
                href="https://open.spotify.com/artist/2cKII1nypeEZZ1JsRSPs3t"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                <Music size={32} />
              </a>
              <a
                href="https://soundcloud.com/welkermusic"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80 transition-colors"
              >
                <Headphones size={32} />
              </a>
            </div>

            <p className="text-lg mb-6">
              For booking inquiries, collaborations, or any questions, feel free to reach out using the contact form or
              directly via email.
            </p>
            <p className="text-lg">
              Email:{" "}
              <a href="mailto:contact@welkermusic.com" className="hover:text-white/80 transition-colors">
                contact@welkermusic.com
              </a>
            </p>
          </div>

          <div ref={rightColRef} className="opacity-0">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="your@email.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="text-white block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  name="subject"
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Say hi!"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="text-white block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5 min-h-[120px]"
                  placeholder="Write your message here"
                />
              </div>
              <button
                type="submit"
                className={`${
                  emailSubmitted ? "bg-green-500 hover:bg-green-600" : "bg-white text-black hover:bg-white/80"
                } font-medium py-2.5 px-5 rounded-lg w-full relative`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="flex justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014.7 15H2v2h4v-4.709zM16 2v2h4.7a7.965 7.965 0 01-2.29 5.291L16 4H8V2h8z"
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  </>
                ) : emailSubmitted ? (
                  <>
                    <div className="flex justify-center">
                      <svg
                        className="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                      Sent!
                    </div>
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
