import React, { useState, useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import './index.css'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/LinkButton'

export default function Index() {
  const [date,setDate] = useState({
    currentTime: formateDate(Date.now())
  }); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate({
        currentTime: formateDate(Date.now())
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
 
  const navigate = useNavigate()
  const logOut = () => {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK')
        storageUtils.deleteUser()
        navigate('/', { replace: true })
      }
    })
  }

  return (
    <div className='header'>
      <div className='header-top'>
        <span className='wel'>欢迎, {storageUtils.getUser()} </span>
        <LinkButton onClick={logOut}>退出</LinkButton>
      </div>
      <div className='header-bottom'>
        <span>{date.currentTime}</span>
        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
        <span className='sta'>晴</span>
      </div>
    </div>
  )
}
