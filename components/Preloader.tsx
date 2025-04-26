"use client"

import { useEffect, useState } from "react"

export default function Preloader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 relative mb-8 animate-pulse">
        <img src="/images/wtype.svg" alt="WELKER Logo" className="w-full h-full" />
      </div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#6e1212] transition-all duration-300" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  )
}
