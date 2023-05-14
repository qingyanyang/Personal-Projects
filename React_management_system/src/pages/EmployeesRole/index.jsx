import { PlusOutlined, StopOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { formateDate } from '../../utils/dateUtils'

import LinkButton from '../../components/LinkButton'
import { reqRoles, reqAddRole, reqUpdateRoleName, reqDeleteRole, reqUpdateRoleAuth } from '../../api'
import AddRoleForm from './AddRoleForm'
import SetAuthForm from './SetAuthForm'

let roleSelect = {}
export default function Index() {
  const [columns, setColumns] = useState([])
  const [loading, setLoading] = useState(false)
  const [roles, setRoles] = useState([])
  const [role,setRole]=useState({})
  const [showModal, setModalshow] = useState('0')//0: all close 1:1 open 2:2open
  const [form, setForm] = useState('')
  const [checkedKeys, setCheckedKeys] = useState([])
  const [resetKey, setResetKey] = useState(0)
  //初始化
  const initColumns = () => {
    setColumns([
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
      },
      {
        title: '时薪',
        dataIndex: 'rate',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '操作',
        width: '10%',
        //category is the object of each row
        render: (category) => (
          <span style={{ marginLeft: '-20px' }}>
            <LinkButton style={{ margin: '0 20px' }} onClick={()=>showUpdateRoleName(category)}>修改名称</LinkButton>
            <LinkButton style={{ margin: '0 20px' }} onClick={()=>handleDeleteRoleName(category)}>删除</LinkButton>
          </span>
        )
      }
    ])
  }
  
  //checkbox get every row object
  const onRow=(role)=>{
    
    return{
      onClick:event=>{
        roleSelect = role
        setRole(role)
        console.log('role:',role)
      }
    }
  }

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setRole(selectedRows[0]);
    console.log('selectrow:',selectedRows[0]);
  };

  const showAddRole=()=>{
    setModalshow('1')
  }
  const showUpdateRole = () => {
    setModalshow('2')
  }
  const showUpdateRoleName = (category) => {
    setRole(category)
    roleSelect = category
    setModalshow('3')
  }

  //onOk
  const updateRoleName = async ()=>{
    console.log('updateName')
    //发送请求修改名字
    setModalshow('0')
    const res = await reqUpdateRoleName(role._id, form.getFieldsValue().rate, form.getFieldsValue().name)
    const data = res.data
    if(data.status===0){
      message.success('update role name successfully!')
      getRoles()
      form.resetFields()
    }else{
      message.error('update role name failed!')
    }
  }

  const handleDeleteRoleName = (category) => {
    setRole(category)
    roleSelect = category
    Modal.confirm({
      title: 'Do you Want to delete this role?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        setModalshow('0')
        const res = await reqDeleteRole(category._id)
        const data = res.data
        if(data.status===0){
          message.success('delete role successfully!')
          getRoles()
          setRole({})
        }else{
          message.error('delete role failed!')
        }
      }
    })
  }
  const addRole = async()=>{
    console.log('addrole:', form.getFieldsValue())
    setModalshow('0')
    const res = await reqAddRole(form.getFieldsValue().name, form.getFieldsValue().rate, formateDate(Date.now()))
    const data = res.data
    console.log(data)
    if(data.status===0){
      setRoles((prevRoles) => [...prevRoles, data.data])
      getRoles()
      form.resetFields()
      message.success('add role successfully!')
    }else{
      message.error('add role failed!')
    }

  }
  
  const updateRoleAuth = async() => {
    //发送请求
    console.log('updateRole',checkedKeys)
    setModalshow('0')
    const res = await reqUpdateRoleAuth(role._id, checkedKeys, formateDate(Date.now())) 
    const data =res.data
    if(data.status===0){
      message.success('update auth successfully!')
      getRoles()
      setResetKey(prevKey => prevKey + 1)
    }else{
      message.success('update auth failed!')
    }
  }

  const handleCancelAuth=()=>{
    setModalshow('0')
    setResetKey(prevKey => prevKey + 1)
  }
  const handleCancel=()=>{
    setModalshow('0')
    form.resetFields()
  }

  const getCheck = (checkedKeys)=>{
    console.log('value', checkedKeys)
    setCheckedKeys(checkedKeys)
  }

  const getForm = (form) => {
    console.log('form:', form.getFieldsValue())
    setForm(form);
  };
  // //异步获取一级分类列表
  const getRoles = async () => {
    //请求发生前,显示loading
    setLoading(true)
    const result = await reqRoles()
    //请求发生后
    setLoading(false)
    const data = result.data
    if (data.status === 0) {
      //get data arr
      setRoles(data.data)
    } else {
      message.error('获取分类列表失败')
    }
  }

  // 只渲染一次
  useEffect(() => {
    initColumns()
    console.log('hehe')
  }, [])

  //执行异步请求
  useEffect(() => {
    getRoles()
    console.log('haha')
  }, [])

  const title = (
    <span>
      <Button 
      type='primary' 
      onClick={showAddRole}
      style={{marginRight:'10px'}}>
        <PlusOutlined />
        创建角色
      </Button>
      <Button type='primary'
      disabled={role._id?false:true}
      onClick={showUpdateRole}
      >
        <StopOutlined />
        设置角色权限
      </Button>
    </span>
    
  )
  return (
    <Card
      title={title}
      style={{
        width: '100%'
      }}
    >
      <Table
        rowKey='_id'
        loading={loading}
        dataSource={roles}
        columns={columns}
        rowSelection={{ type: 'radio', selectedRowKeys: [role._id], onChange: handleRowSelection }}
        onRow={onRow} 
        bordered
        pagination={{ defaultPageSize: 5, showQuickJumper: true }} />
      <Modal title="添加角色"
        open={showModal === '1'}
        onOk={addRole}
        onCancel={handleCancel}>
        <AddRoleForm
          getForm={getForm}
           />
      </Modal>
      <Modal title="修改角色权限"
        open={showModal === '2'}
        onOk={updateRoleAuth}
        onCancel={handleCancelAuth}>
        <SetAuthForm
          role={role}
          getCheck={getCheck}
          resetFormKey={resetKey} 
           />
      </Modal>
      <Modal title="修改角色名称"
        open={showModal === '3'}
        onOk={updateRoleName}
        onCancel={handleCancel}>
        <AddRoleForm
          role={role}
          getForm={getForm}
        />
      </Modal>
    </Card>
  )
}