import { ExclamationCircleFilled, SearchOutlined } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal, Input } from 'antd'
import { convertDate, convertTime } from '../../utils/dateUtils'
import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/LinkButton'
import { reqRoles, reqDeleteEmployeesRecord, reqEmployeesRecords } from '../../api'

export default function Index() {
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    const [employees, setEmployees] = useState([])
    const [roles, setRoles] = useState([])
    const [searchType, setSearchType] = useState('*')
    const [searchName, setSearchName] = useState('*')

    const [selectTrigger, setSelectTrigger] = useState(true)
    //初始化
    const initColumns = () => {
        setColumns([
            {
                title: '日期',
                dataIndex: 'date',
                render:(date)=>(
                    convertDate(date)
                )
            },
            {
                title: '员工姓名',
                dataIndex: 'name',
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => {
                    const role = roles.find(role => role._id === role_id);
                    return role ? role.name : 'Not found';
                }
            },
            {
                title: '入店时间',
                dataIndex: 'on_time',
                render:(time)=>(
                    convertTime(time)
                )
            },
            {
                title: '出店时间',
                dataIndex: 'off_time',
                render: (time) => (
                    convertTime(time)
                )
            },
            {
                title: '工时',
                render: (employeeSelected) => {
                    const offTime = new Date(employeeSelected.off_time);
                    const onTime = new Date(employeeSelected.on_time);
                    const workingHours = Math.round((offTime - onTime) / 1000 / 60 / 60);
                    return<span>{ workingHours }hrs</span>
                }
            },
            {
                title: '操作',
                align: 'center',
                width: '12%',
                //category is the object of each row
                render: (employeeSelected) => (
                    <span >
                        <LinkButton style={{ margin: '0 5px' }} onClick={() => handleDeleteEmployee(employeeSelected)}>删除</LinkButton>
                    </span>
                )
            }
        ])
    }

   
    const handleDeleteEmployee = (employeeSelected) => {
        Modal.confirm({
            title: 'Do you Want to delete this employee?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const res = await reqDeleteEmployeesRecord(employeeSelected._id)
                const data = res.data
                if (data.status === 0) {
                    getEmployeeRecords()
                    message.success('delete record successfully!')
                } else {
                    message.error('delete record failed!')
                }
            }
        })
    }


    const handleInputChange = (e) => {
        setSearchType('name')
        setSearchName(e.target.value)
        console.log('input:' + e.target.value)
    }

    // //异步获取一级分类列表
    const getEmployeeRecords = async () => {
        console.log('find:',searchType, searchName)
        //请求发生前,显示loading
        setLoading(true)
        const result = await reqEmployeesRecords(searchType, searchName)
        //请求发生后
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            //get data arr
            console.log('receive:', data.data)
            setEmployees(data.data)
        } else {
            message.error('获取分类列表失败')
        }
    }
    const getRoles = async () => {
        //请求发生前,显示loading
        setLoading(true)
        const result = await reqRoles()
        //请求发生后
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            //get data arr
            console.log('receive:', data.data)
            setRoles(data.data)
        } else {
            message.error('获取分类列表失败')
        }
    }
    //only once
    useEffect(() => {
        getRoles()
    }, [])
    // 只渲染一次
    useEffect(() => {
        initColumns()
        console.log('hehe')
        console.log('roles:', roles)
    }, [roles])

    //执行异步请求
    useEffect(() => {
        getEmployeeRecords()
    }, [selectTrigger])

    const title = (
        <span>

            <Input placeholder="search employee name"
                style={{ marginRight: '10px', width: '200px' }}
                onChange={handleInputChange}
            />
            <Button type="primary"
                style={{ width: '80px' }}
                onClick={() => {
                    selectTrigger ?
                        setSelectTrigger(false)
                        : setSelectTrigger(true)
                }}
            >
                <SearchOutlined />
                搜索
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
        </Card>
    )
}
