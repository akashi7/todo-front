import { Pagination } from 'antd'
import { FC, ReactElement } from 'react'

interface PaginatorProps {
  total?: number
  setCurrentPage?: (page: number) => void
  pageSize?: number
  totalPages?: number
}

const Paginator: FC<PaginatorProps> = ({
  total = 0,
  setCurrentPage = () => null,
  pageSize = 5,
  totalPages,
}): ReactElement | null => {
  const onChange = (page: number) => {
    setCurrentPage(page - 1)
  }

  if ((totalPages ?? 0) <= 1) {
    return null
  }

  return (
    <div className='grid justify-end mt-[32px] w-[100%]'>
      <Pagination
        onChange={onChange}
        showSizeChanger={false}
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
      />
    </div>
  )
}

export default Paginator
