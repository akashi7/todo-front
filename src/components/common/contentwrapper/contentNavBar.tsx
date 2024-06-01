import { FC, ReactNode } from 'react'

interface ContentNavbarProps {
  left: ReactNode
  right: ReactNode
}

const ContentNavbar: FC<ContentNavbarProps> = ({ left, right }) => {
  return (
    <div className='flex justify-between items-center'>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

export default ContentNavbar
