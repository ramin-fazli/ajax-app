"use client"

import { ReactTyped } from "react-typed"
import { useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function TypingText({ strings, typeSpeed, loop }: 
    { strings: string[], typeSpeed: number, loop: boolean }) 
    {
  return <ReactTyped strings={strings} typeSpeed={typeSpeed} loop={loop} />
}

export function TypingTextWrapper({ children }: { children: ReactNode }) {
  const [showTypingText, setShowTypingText] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setShowTypingText(true)
    const timer = setTimeout(() => {
      setShowTypingText(false)
    }, 5000) // Adjust the timeout duration as needed
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {showTypingText && (
        <div className="flex flex-col justify-center items-center h-1/2 text-2xl">
          {children}
        </div>
      )}
    </>
  )
}

