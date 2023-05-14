import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { reqLogin } from '../../api'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils'
import './Login.css'

export default function Login() {
 
  const navigate = useNavigate();
  //if user has been loged in goto layout
  const user = storageUtils.getUser()
  useEffect(()=>{
    
    if (user && Object.keys(user).length > 0) {
      navigate('/layout', { replace: true })
    }
  }, [storageUtils.getUser()])
  
  const onFinish = async(values) => {
    // console.log('Received values of form: ', values);
    console.log(values)
    const {username,password} = values
    //get response
    const response = await reqLogin(username, password)
    console.log("成功",response.data) //{status:0,data:user} {status:1,msg:'xxx'}

    const result = response.data
    
    if(result.status=== 0){
      message.success('welcome~ ' + result.data.username)
      //save user
      const user = result.data
      memoryUtils.user = user
      storageUtils.saveUser(user)
      //transfer params
      navigate('/layout', { replace: true })
    }else{
      message.error(result.msg)
    }
  };

  return (
    <div className="login">
      <div className="loginHeader">
      </div>
      <div className="loginContent">
        <p>welcome to Miyabi!</p>
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
      </div>
    </div>
  )
}
