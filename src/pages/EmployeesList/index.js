import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/LinkButton'
import { reqEmployees, reqAddEmployee, reqUpdateEmployee, reqDeleteEmployee } from '../../api'
import AddUpdateForm from './AddUpdateForm'

let roleSelect = {}
export default function Index() {
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])
    const [showModal, setModalshow] = useState('0')//0: all close 1:1 
    const [form, setForm] = useState({})
    const [formValue, setFormValue] = useState({})
    const [employeeSelected, setEmployeeSelected] = useState({})
    //初始化
    const initColumns = () => {
        setColumns([
            {
                title: '员工姓名',
                dataIndex: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render:(role_id)=>{
                    const role = roles.find(role => role._id === role_id);
                    return role ? role.name : 'Not found';
                }
            },
            {
                title: '操作',
                width: '10%',
                //category is the object of each row
                render: (employeeSelected) => (
                    <span style={{ marginLeft: '-20px' }}>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showUpdateRole(employeeSelected)}>修改</LinkButton>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => handleDeleteEmployee(employeeSelected)}>删除</LinkButton>
                    </span>
                )
            }
        ])
    }
    
    const showAddRole=()=>{
        console.log("formcheck:",form)
        //form.resetFields()
        setModalshow('1')
    }
    
    const showUpdateRole = (employeeSelected) => {
        setEmployeeSelected(employeeSelected)
        setModalshow('2')
    }
    //onOk
    const addUpdateEmployee = async () => {
        const employeeTemp = form.getFieldsValue()
        form.resetFields()
        //一些处理!!!!!!
        delete employeeTemp.prefix
        employeeTemp.create_time = formateDate(Date.now())
        employeeTemp.phone = parseInt(employeeTemp.phone, 10)
        console.log('employTemp:', employeeTemp)
        console.log('employeeSelected', employeeSelected)

        if (employeeSelected && Object.keys(employeeSelected).length > 0){
            //modification
            const res = await reqUpdateEmployee(employeeSelected._id,employeeTemp)
            console.log('hey modification')
            const data = res.data
            if (data.status === 0) {
                //get data arr
                //console.log('receive:',data.data)
                getEmployee()
                message.success('update employee successfully!')
            } else {
                message.error('update员工失败')
            }
        }else{
            
            //发送请求
            const res = await reqAddEmployee(employeeTemp)
            const data = res.data
            if (data.status === 0) {
                //get data arr
                //console.log('receive:',data.data)
                getEmployee()
                message.success('add employee successfully!')
            } else {
                message.error('添加员工失败')
            }
        }
        setModalshow('0')
    }

    const handleDeleteEmployee = (employeeSelected) => {
        Modal.confirm({
            title: 'Do you Want to delete this employee?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                setModalshow('0')
                const res = await reqDeleteEmployee(employeeSelected._id)
                const data = res.data
                if (data.status === 0) {
                    getEmployee()
                    setEmployeeSelected({})
                    message.success('delete employee successfully!')
                } else {
                    message.error('delete employee failed!')
                }
            }
        })
    }

    const handleCancel = () => {
        setModalshow('0')
        form.resetFields()
        setFormValue({})
    }
    const getForm = (form) => {
        setForm(form);
    };
    
    // //异步获取一级分类列表
    const getEmployee = async () => {
        //请求发生前,显示loading
        setLoading(true)
        const result = await reqEmployees()
        //请求发生后
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            //get data arr
            //console.log('receive:',data.data)
            setEmployees(data.data.employees)
            setRoles(data.data.roles)
        } else {
            message.error('获取分类列表失败')
        }
    }

    // 只渲染一次
    useEffect(() => {
        initColumns()
        console.log('hehe')
    }, [roles])


    //执行异步请求
    useEffect(() => {
        getEmployee()
        console.log('haha')
    }, [])

    const title = (
        <span>
            <Button
                type='primary'
                onClick={showAddRole}
                style={{ marginRight: '10px' }}>
                <PlusOutlined />
                添加员工
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
                dataSource={employees}
                columns={columns}
                bordered
                pagination={{
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    //这里传入了page number
                }} />
            <Modal title='添加员工'
                open={showModal === '1'}
                onOk={addUpdateEmployee}
                onCancel={handleCancel}>
                <AddUpdateForm 
                    getForm={getForm}
                    roles={roles}
                />
            </Modal>
            <Modal title='修改员工'
                open={showModal === '2'}
                onOk={addUpdateEmployee}
                onCancel={handleCancel}>
                <AddUpdateForm
                    employeeSelected={employeeSelected}
                    getForm={getForm}
                    roles={roles}
                />
            </Modal>
        </Card>
    )
}