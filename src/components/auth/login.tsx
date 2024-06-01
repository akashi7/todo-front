/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from 'antd'
import { FC, ReactElement } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import handleAPIRequests from '../../helpers/handleApiRequests'
import { setToLocal } from '../../helpers/handleStorage'
import requiredField from '../../helpers/requiredField'
import {
  AuthResponse,
  LoginDTO,
  useLoginMutation,
} from '../../lib/api/auth/authEndpoints'
import CustomButton from '../common/button/CustomButton'
import CustomInput from '../common/input/CustomInput'

const Login: FC = (): ReactElement => {
  const [form] = Form.useForm()
  const [login, { isLoading }] = useLoginMutation()

  const navigate = useNavigate()

  const onSuccess = (res: AuthResponse): void => {
    if (res.data) {
      setToLocal('token', res.data.token)
      navigate('/fd')
    }
  }

  const onFinish = (values: LoginDTO) => {
    handleAPIRequests({
      request: login,
      ...values,
      onSuccess: onSuccess,
      message: 'Login success',
      notify: true,
    })
  }
  return (
    <div className='h-[100vh] w-[100%] items-center justify-center flex flex-row background'>
      <div className='w-[30%] h-[650px] lg:flex justify-center items-start flex-col bg-white shadow-md  lg:p-8 bg-login  hidden'>
        <h2 className='ml-7 -mt-[60px] text-black font-semibold text-lg'>
          Welcome back to
        </h2>
        <h1 className='ml-6 text-black  text-[2rem]   font-bold'>FMS</h1>
      </div>
      <div className='p-4 lg:w-[30%] w-[90%] h-[650px] bg-white    shadow-md sm:p-6 lg:p-8'>
        <Form
          className='space-y-12'
          name='login-form'
          form={form}
          onFinish={onFinish}
        >
          <h5 className='text-xl font-medium text-center text-black'>
            Create a account
          </h5>
          <Row className='w-[100%]'>
            <Col className='gutter-row mt-2 w-full'>
              <CustomInput
                placeholder='Email'
                label='Email'
                inputType='email'
                name='email'
                rules={requiredField('Email')}
              />
            </Col>
            <Col className='gutter-row mt-2 w-full'>
              <CustomInput
                placeholder='Password'
                label='Password'
                inputType='password'
                name='password'
                rules={requiredField('Password')}
              />
            </Col>
          </Row>
          <div className='flex items-center justify-center'>
            <CustomButton
              type='primary'
              className=' w-[100%] h-[60px]'
              form='login-form'
              htmlType='submit'
              disabled={isLoading}
            >
              {isLoading ? 'LOADING....' : 'LOGIN'}
            </CustomButton>
          </div>
          <div className='flex items-center'>
            <Link
              to='/signup'
              className=' text-md text-blue hover:underline dark:text-blue-500'
            >
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
