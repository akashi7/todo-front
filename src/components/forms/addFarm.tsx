import { Col, Form, FormInstance, Row } from 'antd'
import { FC, ReactElement } from 'react'
import requiredField from '../../helpers/requiredField'
import { addFarmDTO } from '../../lib/api/user/userEndpoints'
import CustomInput from '../common/input/CustomInput'

interface AddFarmFormProps {
  onFinish: (values: addFarmDTO) => void
  form: FormInstance
}

const AddFarmForm: FC<AddFarmFormProps> = ({
  onFinish,
  form,
}): ReactElement => {
  return (
    <Form
      className='space-y-12'
      name='add-farm'
      onFinish={onFinish}
      form={form}
    >
      <Row className='w-[100%]' gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className='gutter-row mt-2 ' span={12}>
          <CustomInput
            placeholder='name'
            label='name'
            inputType='text'
            name='farmName'
            rules={requiredField('farm name')}
          />
        </Col>
        <Col className='gutter-row mt-2 ' span={12}>
          <CustomInput
            placeholder='Province'
            label='Province'
            inputType='text'
            name='province'
            rules={requiredField('Province')}
          />
        </Col>
        <Col className='gutter-row mt-2 ' span={12}>
          <CustomInput
            placeholder='Sector'
            label='Sector'
            inputType='text'
            name='sector'
            rules={requiredField('Sector')}
          />
        </Col>
        <Col className='gutter-row mt-2 ' span={12}>
          <CustomInput
            placeholder='land size'
            label='land size'
            inputType='number'
            name='landSize'
            rules={requiredField('land size')}
          />
        </Col>
      </Row>
    </Form>
  )
}

export default AddFarmForm
