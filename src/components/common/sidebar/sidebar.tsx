import { FC, ReactElement, cloneElement } from 'react'
import { GiFarmer } from 'react-icons/gi'
import { IoHomeOutline } from 'react-icons/io5'
import { MdBookmarkBorder } from 'react-icons/md'
import { useMatch, useNavigate } from 'react-router-dom'
import userType, { Role } from '../../../helpers/userType'
import { isTokenValid } from '../../../helpers/verifyToken'

interface SidebarItemProps {
  icon: ReactElement
  text: string
  url: string
}

const DEFAULT_ROLE: Role = 'USER'

const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  url,
}): ReactElement => {
  const navigate = useNavigate()
  const isMatch = useMatch(url)

  const handleClick = (): void => {
    navigate(url)
  }

  return (
    <div
      className={`flex flex-row gap-5 items-center mb-5 ${
        isMatch ? 'bg-gray-100' : ''
      } cursor-pointer p-3 rounded-lg w-full`}
      onClick={handleClick}
    >
      {cloneElement(icon, { color: isMatch ? '#31b0d5' : undefined })}
      <p
        className={`text-base ${isMatch ? 'text-[#31b0d5]' : 'text-gray-400'}`}
      >
        {text}
      </p>
    </div>
  )
}

const SidebarHeader: FC = (): ReactElement => (
  <div className='flex flex-row items-center gap-3 mb-8'>
    <GiFarmer size={50} className='text-[#31b0d5]' />
    <h1 className='text-2xl text-black'>
      <span className='text-[#31b0d5]'>ORDER</span>YOURS
    </h1>
  </div>
)

const Sidebar: FC = (): ReactElement => {
  const { role: userRole } = isTokenValid()
  const role: Role = userRole || DEFAULT_ROLE

  return (
    <section className='w-[300px] h-[100%] lg:flex flex-col py-4 px-5 bg-[#F5F5F5] border-r border-gray-100 hidden'>
      <SidebarHeader />
      <div className='mt-0 w-full'>
        {!userType(role).isAdmin && (
          <SidebarItem
            icon={<IoHomeOutline size={30} />}
            text='Dashboard'
            url='/fd/'
          />
        )}
        <SidebarItem
          icon={<MdBookmarkBorder size={30} />}
          text='Order'
          url={userType(role).isAdmin ? '/fd/' : '/fd/order'}
        />
      </div>
    </section>
  )
}

export default Sidebar
