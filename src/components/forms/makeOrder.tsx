import { Col, Form, FormInstance, Row } from 'antd'
import { FC, ReactElement } from 'react'
import requiredField from '../../helpers/requiredField'
import {
  makeOrderDTO,
  useGetFarmsQuery,
} from '../../lib/api/user/userEndpoints'
import CustomInput from '../common/input/CustomInput'

interface AddFarmFormProps {
  onFinish: (values: makeOrderDTO) => void
  form: FormInstance
  currentPage: number
  size: number
}

const MakeOrderForm: FC<AddFarmFormProps> = ({
  onFinish,
  form,
  currentPage,
  size,
}): ReactElement => {
  const { data, isFetching } = useGetFarmsQuery({
    page: currentPage.toString(),
    size: size.toString(),
  })

  const farmOptions = data
    ? data.data.items.map((item) => ({
        key: item.id,
        value: item.id,
        label: item.farmName,
      }))
    : []

  const fertizers = [
    {
      id: 1,
      fertilizerName: 'Fertizer 1',
    },
    {
      id: 2,
      fertilizerName: 'Fertizer 2',
    },
    {
      id: 3,
      fertilizerName: 'Fertizer 3',
    },
  ]

  const seeds = [
    {
      id: 1,
      seedName: 'seed 1',
    },
    {
      id: 2,
      seedName: 'seed 2',
    },
    {
      id: 3,
      seedName: 'seed 3',
    },
  ]

  return (
    <Form
      className='space-y-12'
      name='make-order'
      onFinish={onFinish}
      form={form}
    >
      <Row className='w-[100%]' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row mt-2 w-full'>
          <CustomInput
            label='Farms'
            name='farmIds'
            type='select-multiple'
            placeholder='Please select'
            rules={requiredField('farm')}
            options={farmOptions}
            isLoading={isFetching}
          />
        </Col>
        <Col className='gutter-row mt-2 w-full'>
          <CustomInput
            label='Fertilizers'
            name='fertilizerName'
            type='select'
            placeholder='Please select'
            rules={requiredField('Fertilizers')}
            options={fertizers.map((item) => ({
              key: item.id,
              value: item.fertilizerName,
              label: item.fertilizerName,
            }))}
          />
        </Col>
        <Col className='gutter-row mt-2 w-full'>
          <CustomInput
            label='Seeds'
            name='seedName'
            type='select'
            placeholder='Please select'
            rules={requiredField('seeds')}
            options={seeds.map((item) => ({
              key: item.id,
              value: item.seedName,
              label: item.seedName,
            }))}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default MakeOrderForm
