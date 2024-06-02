import { Dropdown } from 'antd'
import { FC, ReactElement } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'
import { MdKeyboardArrowDown, MdMenuOpen } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromLocal } from '../../../helpers/handleStorage'
import userType, { Role } from '../../../helpers/userType'
import { isTokenValid } from '../../../helpers/verifyToken'

interface props {
  role: Role
}

const NavBar: FC<props> = ({ role }): ReactElement => {
  const navigate = useNavigate()

  const handleLogout = (): void => {
    removeFromLocal('token')
    navigate('/')
  }

  const { fullNames } = isTokenValid()

  const ProfileDropdown = (
    <div className='w-[100%] rounded shadow-md z-100 bg-white p-2 mt-6'>
      <p className='p-4 px-2 w-[100%] font-medium flex flex-row gap-2'>
        <span className='text-gray-400'>{fullNames}</span>
      </p>

      <div
        className='flex items-center gap-2 w-[100%] rounded p-2 bg-gray-100 font-[600] cursor-pointer   hover:bg-gray-200'
        onClick={handleLogout}
      >
        <IoIosLogOut size={20} className='text-[#31b0d5]' />
        <p className='flex-1 text-[#31b0d5]'>Logout</p>
      </div>
    </div>
  )

  return (
    <nav className='p-5  bg-[#31b0d5] flex  text-white justify-between items-center border-b border-gray-100'>
      <MdMenuOpen size={25} className='lg:block hidden' />
      <div className='flex lg:hidden'>
        <div className='flex flex-row gap-5 '>
          {userType(role).isAdmin ? (
            <>
              <Link to={'/fd/admin'} className=' hover:text-white'>
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link to={'/fd'} className=' hover:text-white'>
                Farms
              </Link>
              <Link to={'/fd/order'} className=' hover:text-white'>
                Orders
              </Link>
            </>
          )}
        </div>
      </div>
      <Dropdown overlay={ProfileDropdown} trigger={['click']}>
        <div className='flex items-center gap-2 lg:gap-4 cursor-pointer hover:bg-gray-200 hover:text-[#31b0d5]  p-2 px-2 rounded'>
          <FaRegUser />
          <div className='flex items-center gap-2'>
            <p className='hidden lg:block'>{fullNames}</p>
            <MdKeyboardArrowDown
              size={14}
              className='object-cover rounded-full'
            />
          </div>
        </div>
      </Dropdown>
    </nav>
  )
}

export default NavBar
