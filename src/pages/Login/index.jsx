import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {reqLogin} from '../../api'
import './index.css'
export default function Login() {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    // console.log('Received values of form: ', values);
      const response = await reqLogin(values.username,values.password)
      const res = response.data
    if (res.status===0){
        message.success('log in successful')
      navigate(`layout/${res.data}`,{
        replace:false,
      })
      }else{
      message.error(res.msg)
      }
  };

  return (
    <div className="login">
      <div className="loginHeader">
      </div>
      <section className="loginContent">
        <p>Management System</p>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "Must to be letter, number, underline"
              },
              {
                min:5,
                max:12,
                message:"Must greater than 4 and less than 12"
              }
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  )
}
