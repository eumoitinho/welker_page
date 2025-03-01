"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const data = {
        email: e.target.email.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = "api/send";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSONdata,
      };
      const response = await fetch(endpoint, options);
      const resData = await response.json();
      console.log(resData);
      if (response.ok) {
        console.log("Mensagem enviada");
        setEmailSubmitted(true);
      }
    } catch (error) {
      console.error("Erro no manipulador POST:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-0 md:my-12 py-24 gap-4 relative items-center"
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
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">FOLLOW ME</h5>

        <div className="socials flex flex-row gap-4 items-center">
          <Link href="https://instagram.com/welkermusic" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="white"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
            </svg>
          </Link>
          <Link
            href="https://open.spotify.com/intl-pt/artist/2cKII1nypeEZZ1JsRSPs3t?si=WA0ghgi5TK2ik-00aimvGg"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="45"
              fill="white"
              className="bi bi-spotify"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
            </svg>
          </Link>
          <Link href="https://soundcloud.com/welkermusic" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="70"
              viewBox="0 0 64 64"
            >
              <defs>
                <linearGradient
                  x1="2041.438"
                  y1="733.806"
                  x2="2041.438"
                  y2="687.777"
                  gradientUnits="userSpaceOnUse"
                  spreadMethod="pad"
                  id="A"
                >
                  <stop offset="0" stopColor="#ffffff" />
                  <stop offset="1" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <path
                d="M1986.328 716.21c-.475-.183-.602-.373-.606-.74v-19.988c.01-.385.304-.706.68-.744.016-.001 17.345-.01 17.457-.01a6.3 6.3 0 0 1 6.298 6.298 6.3 6.3 0 0 1-8.733 5.809c-.5 5.675-5.26 10.128-11.066 10.128-1.42 0-2.805-.28-4.028-.754m-2.587-1.415l-.285-14.187.285-5.15c.01-.376.316-.686.694-.686a.7.7 0 0 1 .693.691v-.005l.31 5.15-.31 14.188c-.01.38-.316.69-.693.69a.7.7 0 0 1-.694-.693m-2.107-1.178l-.244-13.003c0-.01.244-5.228.244-5.228a.66.66 0 0 1 .65-.644.66.66 0 0 1 .65.647v-.003.003l.274 5.22-.274 13.01a.66.66 0 0 1-.65.646c-.352 0-.643-.3-.650-.647m-6.3-1.363l-.322-11.64.323-5.345c.01-.286.235-.512.518-.512s.51.227.52.514h0v.003l.363 5.34-.363 11.64c-.01.3-.237.516-.52.516a.52.52 0 0 1-.519-.516m2.083-.298l-.296-11.344.297-5.293c.01-.31.254-.558.563-.558s.553.247.562.56v-.003l.333 5.294-.333 11.344c-.01.314-.255.56-.562.56s-.557-.247-.564-.560m-4.15-.08l-.35-11.262.35-5.377a.48.48 0 0 1 .475-.469.48.48 0 0 1 .475.471l.393 5.375-.393 11.263c-.01.264-.22.47-.475.47a.48.48 0 0 1-.475-.472m6.25-.334l-.27-10.93.27-5.26c.01-.335.274-.6.607-.6s.598.264.605.603v-.004l.304 5.26-.304 10.93a.61.61 0 0 1-.605.604c-.333 0-.6-.266-.607-.604m-8.3-.53c0-.001-.374-10.394-.374-10.394l.374-5.433c.01-.238.2-.426.432-.426a.44.44 0 0 1 .432.427l.423 5.432-.423 10.394a.44.44 0 0 1-.432.427c-.232 0-.42-.188-.432-.427m-2.034-1.934l-.4-8.46.4-5.466c.01-.214.18-.382.387-.382s.376.168.388.383h0l.453 5.467-.453 8.46c-.013.214-.183.384-.388.384s-.377-.17-.387-.384m-4.018-2.853l-.452-5.605.452-5.422c.013-.168.142-.294.3-.294s.286.126.3.294l.512 5.422-.512 5.607c-.015.167-.143.294-.3.294s-.288-.128-.3-.296m-1.984-.148c0-.001-.478-5.456-.478-5.456l.478-5.256c.015-.147.122-.252.257-.252s.24.105.256.25l.543 5.257-.542 5.456c-.016.145-.124.25-.257.25s-.243-.107-.257-.25m3.985-.258l-.425-5.2.425-5.467a.35.35 0 0 1 .344-.34c.182 0 .33.146.344.34l.484 5.468-.484 5.202c-.015.19-.16.336-.344.336s-.332-.145-.344-.34m-5.953-.6c0-.001-.504-4.597-.504-4.597l.504-4.497c.015-.12.105-.207.214-.207s.195.084.212.206l.572 4.498-.572 4.597c-.02.122-.106.207-.213.207s-.2-.087-.214-.207m-1.885-1.754l-.374-2.843.374-2.795c.015-.118.1-.2.206-.2s.188.082.204.2l.444 2.796-.444 2.844c-.015.117-.1.2-.204.2s-.192-.082-.206-.2"
                fill="url(#A)"
                transform="matrix(1.25 0 0 -1.25 -2448.6946 912.30772)"
              />
            </svg>
          </Link>
          <Link href="https://www.youtube.com/@musicwelker" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="white">
  <path d="M23.499 6.203c-.273-1.422-1.45-2.537-2.901-2.802C18.145 3 12 3 12 3s-6.145 0-8.598.401C1.95 3.666.773 4.781.5 6.203.133 8.097 0 12 0 12s.133 3.903.5 5.797c.273 1.422 1.45 2.537 2.901 2.802C5.855 21 12 21 12 21s6.145 0 8.598-.401c1.451-.265 2.628-1.38 2.901-2.802.367-1.894.501-5.797.501-5.797s-.134-3.903-.501-5.797zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
</svg>
</Link>

        </div>
      </div>
      <div className="z-10">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-white block mb-2 text-sm font-medium"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="text-white block mb-2 text-sm font-medium"
            >
              Subject
            </label>
            <input
              name="subject"
              type="text"
              id="subject"
              required
              className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Say hi!"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              required
              className="bg-[#18191e] border border-[#33353f] placeholder-[#9ca2a9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Write your message here"
            />
          </div>
          <button
            type="submit"
            className={`${emailSubmitted
                ? "bg-green-500 hover:bg-green-600"
                : "bg-[#892e2e] hover:bg-[#6e1212]"
              } text-white font-medium py-2.5 px-5 rounded-lg w-full relative`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="flex justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    <path
                      fillRule="evenodd"
                      d="M0 11l2-2 5 5L18 3l2 2L7 18z"
                    />
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
    </section>
  );
};

export default EmailSection;