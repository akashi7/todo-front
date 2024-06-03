import { Form } from 'antd'
import { FC, ReactElement, useState } from 'react'
import handleAPIRequests from '../../../helpers/handleApiRequests'
import userType, { Role } from '../../../helpers/userType'
import { isTokenValid } from '../../../helpers/verifyToken'
import {
  approveOrderDTO,
  GetOrderDTO,
  makeOrderDTO,
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useGetOrdersQuery,
  useMakOrderMutation,
} from '../../../lib/api/user/userEndpoints'
import CustomButton from '../../common/button/CustomButton'
import ContentNavbar from '../../common/contentwrapper/contentNavBar'
import CustomModal from '../../common/modal/customModal'
import Paginator from '../../common/paginator/paginator'
import MakeOrderForm from '../../forms/makeOrder'
import OrderTable from '../../tables/orderTables'

const DEFAULT_ROLE: Role = 'FARMER'

const Order: FC = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const size = 5

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  const [order, { isLoading }] = useMakOrderMutation()
  const [approve] = useApproveOrderMutation()
  const [decline] = useDeclineOrderMutation()

  const { id, role: useRole } = isTokenValid()

  const role: Role = useRole || DEFAULT_ROLE

  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const onSuccess = () => {
    handleCancel()
  }

  const queryParameters: GetOrderDTO = {
    size: size.toString(),
    page: currentPage.toString(),
  }

  if (role !== 'ADMIN') {
    queryParameters['userId'] = id
  }

  const { data, isFetching } = useGetOrdersQuery(queryParameters)

  const RightSide = () =>
    userType(role).isAdmin ? null : (
      <CustomButton
        onClick={() => setIsVisible(true)}
        type='primary'
        className='h-[50px]'
      >
        New Order
      </CustomButton>
    )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {data?.data?.totalItems || ''} order
      {(data?.data.totalItems ?? 0) > 1 && 's'}
    </p>
  )

  const onFinish = (values: makeOrderDTO) => {
    handleAPIRequests({
      request: order,
      ...values,
      onSuccess: onSuccess,
      notify: true,
    })
  }

  const onApprove = (orderId: string) => {
    const data: approveOrderDTO = {
      orderId,
    }
    handleAPIRequests({
      request: approve,
      ...data,
      notify: true,
      message: 'Order approved succesfully',
    })
  }

  const onDecline = (orderId: string) => {
    const data: approveOrderDTO = {
      orderId,
    }
    handleAPIRequests({
      request: decline,
      ...data,
      notify: true,
      message: 'Order declined succesfully',
    })
  }

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isLoading}
        title={'Add Order'}
        width={500}
        handleCancel={handleCancel}
        footerContent={
          <CustomButton
            loading={isLoading}
            type='primary'
            htmlType='submit'
            form='make-order'
            className='h-[50px] w-[70px]'
          >
            Save
          </CustomButton>
        }
      >
        <p className='text-[#31b0d5] font-semibold'>
          You can select multiple farms
        </p>
        <MakeOrderForm
          form={form}
          onFinish={onFinish}
          currentPage={currentPage}
          size={size}
        />
      </CustomModal>
      <ContentNavbar left={<LeftSide />} right={<RightSide />} />
      <div className='border border-gray-300 p-6 rounded mt-4'>
        <OrderTable
          data={data?.data?.items}
          isFetching={isFetching}
          role={role}
          onApprove={onApprove}
          onDecline={onDecline}
        />
        <Paginator
          total={data?.data.totalItems}
          setCurrentPage={setCurrentPage}
          totalPages={data?.data.totalPages}
        />
      </div>
    </>
  )
}

export default Order
