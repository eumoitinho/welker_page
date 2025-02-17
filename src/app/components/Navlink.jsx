import React from 'react'
import Link from 'next/link'

const Navlink = ({ href, title}) => {
  return (
    <Link href={href} className="block py-2 pl-3 pr-4 text-[#F4F0EB] md:text-3xl sm:text-xl rounded md:p-0 hover:text-[#545454]">
        {title}
    </Link>
  )
}

export default Navlink