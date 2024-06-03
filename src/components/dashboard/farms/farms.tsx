import { Form } from 'antd'
import { FC, ReactElement, useEffect, useState } from 'react'
import handleAPIRequests from '../../../helpers/handleApiRequests'
import {
  addFarmDTO,
  useAddFarmMutation,
  useGetFarmsQuery,
} from '../../../lib/api/user/userEndpoints'
import CustomButton from '../../common/button/CustomButton'
import ContentNavbar from '../../common/contentwrapper/contentNavBar'
import CustomModal from '../../common/modal/customModal'
import Paginator from '../../common/paginator/paginator'
import AddFarmForm from '../../forms/addFarm'
import FarmTable from '../../tables/farmsTables'

const Farm: FC = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [form] = Form.useForm()

  const size = 5
  const { data, isFetching, refetch } = useGetFarmsQuery({
    page: currentPage.toString(),
    size: size.toString(),
  })

  const [farm, { isLoading }] = useAddFarmMutation()

  const handleCancel = () => {
    setIsVisible(false)
    form.resetFields()
  }

  const onSuccess = () => {
    handleCancel()
  }

  useEffect(() => {
    refetch()
    //eslint-disable-next-line
  }, [])

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const RightSide = () => (
    <CustomButton
      onClick={() => setIsVisible(true)}
      type='primary'
      className='h-[50px]'
    >
      New farm
    </CustomButton>
  )

  const LeftSide = () => (
    <p className='text-[20px] text-dark font-semibold'>
      {data?.data?.totalItems || ''} farm
      {(data?.data.totalItems ?? 0) > 1 && 's'}
    </p>
  )

  const onFinish = (values: addFarmDTO) => {
    values.landSize.toString()
    handleAPIRequests({
      request: farm,
      ...values,
      onSuccess: onSuccess,
      notify: true,
    })
  }

  return (
    <>
      <CustomModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        loading={isLoading}
        title={'Add farm'}
        width={1000}
        handleCancel={handleCancel}
        footerContent={
          <CustomButton
            loading={isLoading}
            type='primary'
            htmlType='submit'
            form='add-farm'
            className='h-[50px] w-[70px]'
          >
            Save
          </CustomButton>
        }
      >
        <AddFarmForm form={form} onFinish={onFinish} />
      </CustomModal>
      <ContentNavbar left={<LeftSide />} right={<RightSide />} />
      <div className='border border-gray-300 p-6 rounded mt-4'>
        <FarmTable data={data?.data?.items} isFetching={isFetching} />
        <Paginator
          total={data?.data.totalItems}
          setCurrentPage={setCurrentPage}
          totalPages={data?.data.totalPages}
        />
      </div>
    </>
  )
}

export default Farm
