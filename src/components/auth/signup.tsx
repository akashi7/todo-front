import { Col, Form, Row } from 'antd'
import { FC, ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ERoles } from '../../config/constant'
import { setToLocal } from '../../helpers/handleStorage'
import requiredField from '../../helpers/requiredField'

import handleAPIRequests from '../../helpers/handleApiRequests'
import {
  AuthResponse,
  SignupDTO,
  useSignupMutation,
} from '../../lib/api/auth/authEndpoints'
import CustomButton from '../common/button/CustomButton'
import CustomInput from '../common/input/CustomInput'

interface signupDto {
  email: string
  password: string
  fullNames: string
}

const Signup: FC = (): ReactElement => {
  const [form] = Form.useForm()

  const [signup, { isLoading }] = useSignupMutation()

  const navigate = useNavigate()

  const onSuccess = (res: AuthResponse): void => {
    if (res.data) {
      setToLocal('token', res.data.token)
      navigate('/fd')
    }
  }

  const onFinish = (values: signupDto) => {
    const data: SignupDTO = {
      ...values,
      role: ERoles.USER,
    }
    handleAPIRequests({
      request: signup,
      ...data,
      onSuccess: onSuccess,
      message: 'Signed up  successfully',
      notify: true,
    })
  }

  return (
    <div className='h-[100vh] w-[100%] items-center justify-center flex flex-row background'>
      <div className='w-[30%] h-[650px] lg:flex justify-center items-start flex-col bg-white shadow-md lg:p-8 bg-signup hidden'>
        <h2 className='ml-7 -mt-[60px] text-black  font-semibold text-lg'>
          Welcome to
        </h2>
        <h1 className='ml-6 text-black  text-[2rem]  font-bold'>FMS</h1>
      </div>
      <div className='p-4  lg:w-[30%] h-[650px] bg-white  w-[90%] shadow-md sm:p-6 lg:p-8'>
        <Form
          className='space-y-12'
          name='sign-up-form'
          form={form}
          onFinish={onFinish}
        >
          <h5 className='text-xl font-medium text-center text-black'>
            Create a account
          </h5>
          <Row className='w-[100%]'>
            <Col className='gutter-row mt-1 w-full '>
              <CustomInput
                placeholder='Email'
                label='Email'
                inputType='email'
                name='email'
                rules={requiredField('Email')}
              />
            </Col>
            <Col className='gutter-row mt-1 w-full '>
              <CustomInput
                placeholder='Full names'
                label='Name'
                inputType='text'
                name='fullNames'
                rules={requiredField('Full names')}
              />
            </Col>
            <Col className='gutter-row mt-1 w-full'>
              <CustomInput
                placeholder='Password'
                label='Password'
                inputType='password'
                name='password'
                rules={requiredField('Password')}
              />
            </Col>
          </Row>
          <div className='flex items-center justify-center '>
            <CustomButton
              type='primary'
              className=' w-[100%] h-[60px] -mt-5'
              form='sign-up-form'
              htmlType='submit'
              disabled={isLoading}
            >
              {isLoading ? 'LOADING....' : 'SIGNUP'}
            </CustomButton>
          </div>
          <div className='flex items-center'>
            <Link
              to='/'
              className=' text-md text-blue hover:underline dark:text-blue-500'
            >
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Signup
