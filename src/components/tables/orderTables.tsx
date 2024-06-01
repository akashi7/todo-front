import { Table } from 'antd'
import dayjs from 'dayjs'
import { FC, ReactElement } from 'react'
import { EStatus } from '../../config/constant'
import { Role } from '../../helpers/userType'
import { Order } from '../../lib/api/user/userEndpoints'
import CustomButton from '../common/button/CustomButton'

interface props {
  data: Array<Order> | undefined
  isFetching: boolean
  role: Role
  onApprove: (orderId: string) => void
  onDecline: (orderId: string) => void
}

const { Column } = Table

const OrderTable: FC<props> = ({
  data,
  isFetching,
  role,
  onApprove,
  onDecline,
}): ReactElement => {
  return (
    <Table
      className='data_table'
      dataSource={data}
      rowKey={(record) => {
        return record?.id
      }}
      rowClassName='shadow'
      pagination={false}
      loading={isFetching}
      bordered={false}
      scroll={{ x: 0 }}
    >
      <Column
        title='Date'
        key='createdAt'
        render={(record: Order) => (
          <span className='font-bold  text-blue-500'>
            {dayjs(record?.createdAt).format('DD/MM/YYYY')}
          </span>
        )}
      />
      <Column
        title='Fertilizer'
        key='fertilizerName'
        render={(record: Order) => (
          <span className='font-bold  text-blue-500'>
            {record?.fertilizerName}
          </span>
        )}
      />
      <Column
        title='Seed'
        key='seedName'
        render={(record: Order) => (
          <span className='font-bold  text-blue-500'>{record?.seedName}</span>
        )}
      />
      <Column
        title='Fertilizer Qty'
        key='fertilizerQuantity'
        render={(record: Order) => (
          <span className='font-bold  text-blue-500'>
            {record?.fertilizerQuantity}
          </span>
        )}
      />
      <Column
        title='Seed Qty'
        key='seedQuantity'
        render={(record: Order) => (
          <span className='font-bold  text-blue-500'>
            {record?.seedQuantity}
          </span>
        )}
      />
      <Column
        title='Status'
        key='status'
        render={(record: Order) => (
          <span
            className={`p-2 ${
              record?.status === EStatus.APPROVED
                ? 'text-white bg-[#198754]  '
                : record?.status === EStatus.REJECTED
                ? 'text-white bg-[#ff0000]'
                : 'text-gray-500 '
            }`}
          >
            {record?.status ? record?.status : EStatus.PENDING}
          </span>
        )}
      />
      {role === 'ADMIN' && (
        <Column
          title='Actions'
          key='actions'
          width={200}
          render={(record: Order) => (
            <div className='flex gap-4'>
              <CustomButton
                className=' bg-green-400 hover:bg-green-600'
                type='default'
                onClick={() => onApprove(record.id)}
              >
                APPROVE
              </CustomButton>

              <CustomButton
                className=' bg-red-500 hover:bg-red-600'
                type='default'
                onClick={() => onDecline(record.id)}
              >
                DELCINE
              </CustomButton>
            </div>
          )}
        />
      )}
    </Table>
  )
}

export default OrderTable
