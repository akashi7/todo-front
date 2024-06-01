import { Table } from 'antd'
import dayjs from 'dayjs'
import { FC, ReactElement } from 'react'
import { Farm } from '../../lib/api/user/userEndpoints'

interface props {
  data: Array<Farm> | undefined
  isFetching: boolean
}

const { Column } = Table

const FarmTable: FC<props> = ({ data, isFetching }): ReactElement => {
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
        render={(record: Farm) => (
          <span className='font-bold  text-blue-500'>
            {dayjs(record?.createdAt).format('DD/MM/YYYY')}
          </span>
        )}
      />
      <Column
        title='Name'
        key='farmName'
        render={(record: Farm) => (
          <span className='font-bold  text-blue-500'>{record?.farmName}</span>
        )}
      />
      <Column
        title='Province'
        key='province'
        render={(record: Farm) => (
          <span className='font-bold  text-blue-500'>{record?.province}</span>
        )}
      />
      <Column
        title='Sector'
        key='sector'
        render={(record: Farm) => (
          <span className='font-bold  text-blue-500'>{record?.sector}</span>
        )}
      />
      <Column
        title='Land size'
        key='landSize'
        render={(record: Farm) => (
          <span className='font-bold  text-blue-500'>{record?.landSize}</span>
        )}
      />
    </Table>
  )
}

export default FarmTable
