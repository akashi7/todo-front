import { Layout } from 'antd'
import { FC, ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentWrapper from '../components/common/contentwrapper/contentWrapper'
import NavBar from '../components/common/header/header'
import Sidebar from '../components/common/sidebar/sidebar'
import Farm from '../components/dashboard/farms/farms'
import Order from '../components/dashboard/orders/order'
import NotFound from '../components/notFound'
import { Role } from '../helpers/userType'
import { isTokenValid } from '../helpers/verifyToken'
import Private from './private'

const DEFAULT_ROLE: Role = 'FARMER'

const DashboardRoutes: FC = (): ReactElement => {
  const { role: userRole } = isTokenValid()
  const role: Role = userRole || DEFAULT_ROLE

  return (
    <Layout className='h-[100vh] bg-white'>
      <div className='flex h-[100%]'>
        <Sidebar />
        <div className='flex-1 h-[100%] overflow-y-hidden'>
          <NavBar role={role} />
          <ContentWrapper>
            <Routes>
              <Route path='/' element={<Farm />} />
              <Route path='/order' element={<Order />} />
              <Route path='/admin' element={<Order />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </ContentWrapper>
        </div>
      </div>
    </Layout>
  )
}

const PrivateDashboard = Private(DashboardRoutes)
export default PrivateDashboard
