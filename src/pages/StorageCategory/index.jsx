import { PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/LinkButton'
import { reqStorageCategory, reqAddStorageCategory, reqUpdateStorageCategory, reqDeleteStorageCategory } from '../../api'
import AddRoleForm from './AddRoleForm'

export default function Index() {
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [category, setCategory] = useState({})
    const [showModal, setModalshow] = useState('0')//0: all close 1:1 open 2:2open
    const [form, setForm] = useState({})
    const [auth_name] = useState(storageUtils.getUser().username)
    //初始化
    const initColumns = () => {
        setColumns([
            {
                title: '类别名称',
                dataIndex: 'name',
            },
            {
                title: '添加时间',
                dataIndex: 'create_time',
            },
            {
                title: '操作用户',
                dataIndex: 'auth_name',
            },
            {
                title: '操作',
                width: '20%',
                //category is the object of each row
                render: (category) => (
                    <span style={{ marginLeft: '-20px' }}>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showUpdateCategoryName(category)}>修改名称</LinkButton>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => handleDeleteCategory(category)}>删除</LinkButton>
                    </span>
                )
            }
        ])
    }

    const showAddCategory = () => {
        setModalshow('1')
    }

    const showUpdateCategoryName = (category) => {
        setCategory(category)
        setModalshow('3')
    }

    //onOk
    const updateCategoryName = async () => {
        console.log('updateName')
        const name = form.getFieldsValue().input
        //发送请求修改名字
        setModalshow('0')
        form.resetFields()
        const res = await reqUpdateStorageCategory(category._id, { name,auth_name})
        const data = res.data
        if (data.status === 0) {
            message.success('update category name successfully!')
            getCategorys()
            setCategory({})
        } else {
            message.error('update category name failed!')
        }
    }

    const handleDeleteCategory = (category) => {
        setCategory(category)
        Modal.confirm({
            title: 'Do you Want to delete this role?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                setModalshow('0')
                const res = await reqDeleteStorageCategory(category._id)
                const data = res.data
                if (data.status === 0) {
                    message.success('delete role successfully!')
                    getCategorys()
                    setCategory({})
                } else {
                    message.error('delete role failed!')
                }
            }
        })
    }
    const addCategory = async () => {
        console.log('addrole:', form.getFieldsValue().input)
        const name = form.getFieldsValue().input
        setModalshow('0')
        form.resetFields()
        const res = await reqAddStorageCategory({ name, create_time: formateDate(Date.now()), auth_name})
        const data = res.data
        console.log(data)
        if (data.status === 0) {
            setCategorys((prevRoles) => [...prevRoles, data.data])
            getCategorys()
            message.success('add role successfully!')
        } else {
            message.error('add role failed!')
        }
    }

    const handleCancel = () => {
        setModalshow('0')
        setCategory({})
        form.resetFields()
    }
    // //异步获取一级分类列表
    const getCategorys = async () => {
        //请求发生前,显示loading
        setLoading(true)
        const result = await reqStorageCategory()
        //请求发生后
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            //get data arr
            setCategorys(data.data)
        } else {
            message.error('获取分类列表失败')
        }
    }
    const getForm = (form) => {
        console.log('form:',form.getFieldsValue())
        setForm(form);
    };
    // 只渲染一次
    useEffect(() => {
        initColumns()
        console.log('hehe')
    }, [])

    //执行异步请求
    useEffect(() => {
        getCategorys()
        console.log('haha')
    }, [])

    const title = (
        <span>
            <Button
                type='primary'
                onClick={showAddCategory}
                style={{ marginRight: '10px' }}>
                <PlusOutlined />
                添加类别
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
                dataSource={categorys}
                columns={columns}
                bordered
                pagination={{ defaultPageSize: 3, showQuickJumper: true }} />
            <Modal title="添加类别"
                open={showModal === '1'}
                onOk={addCategory}
                onCancel={handleCancel}>
                <AddRoleForm
                    getForm={getForm}
                />
            </Modal>
            <Modal title="修改类别名称"
                open={showModal === '3'}
                onOk={updateCategoryName}
                onCancel={handleCancel}>
                <AddRoleForm
                    getForm={getForm}
                    category={category}
                />
            </Modal>
        </Card>
    )
}