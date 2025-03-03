import React from 'react'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

const NavlinkAbout = ({ href, title}) => {
  return (
    <Link href="/" className="flex z-10 items-center space-x-2 hover:text-[#6e1212] transition-colors">
          <ArrowLeftIcon className="h-5 w-5" />
          <span className="text-lg font-medium">BACK HOME</span>
        </Link>
  )
}

export default NavlinkAbout