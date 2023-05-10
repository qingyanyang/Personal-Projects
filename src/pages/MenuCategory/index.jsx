import { PlusOutlined, RightOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Table, Button, message, Modal} from 'antd'

import LinkButton from '../../components/LinkButton'
import { reqCategorys, reqAddCategory, reqUpdateCategory, reqDeleteCategory } from '../../api'
import CategoryForm from './CategoryForm'
import CategoryName from './CategoryName'

//全局变量
let columns = []
let selectCategory = {}
// let formHere = {}
export default function Index() {
    // let formHere = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [categorys, setCategorys] = useState([])
    const [subCategorys, setSubCategorys] = useState([])
    const [parentId, setParentId] = useState('0')
    const [parentName, setParentName] = useState('')
    const [showModal, setModalshow]=useState('0')//0: all close 1:1 open 2:2open
    const [formValue,setFormValue]=useState({
        select:'',
        input:'',
        form:[]
    })
    //初始化
    const initColumns = () => {
        columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: '30%',
                //category is the object of each row
                render: (category) => (
                    <span style={{ marginLeft: '-20px' }}>
                        <LinkButton style={{ margin: '0 20px' }} onClick={()=>showUpdateCategory(category)}>修改分类</LinkButton>
                        {
                            parentId==='0'?
                            <LinkButton onClick={() => showSubCategorys(category)}>查看子分类</LinkButton>
                            :null
                        }
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showDeleteCategory(category)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }
    //show modal
    const showAddCategory = () => {
        setModalshow('1')
    }
    const showUpdateCategory=(category)=>{
        selectCategory = category
        setModalshow('2')
    }

    const showDeleteCategory = (category)=>{
        selectCategory = category
        Modal.confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleFilled />,
            onOk() {
                deleteCategory()
            }
        })
    }
    //onOK method
    const addCategory = async ()=>{
        console.log('add cate' + formValue.select + formValue.input)
        //关闭窗口
        setModalshow('0')
        //发送添加数据请求
        const categoryName = formValue.input
        formValue.form.resetFields();
        const result = await reqAddCategory(categoryName, parentId)
        const data = result.data
        if (data.status === 0) {
            //发送获取数据请求
            getCategory()
        }
        
    }
    const updateCategory = async () => {
        console.log('update cate' + formValue.input)
        setModalshow('0')
        //关闭窗口
        //发送修改数据请求
        const categoryId = selectCategory._id
        const categoryName = formValue.input
        formValue.form.resetFields();
        
        // console.log(categoryId, categoryName)
        const result = await reqUpdateCategory(categoryId, categoryName)
        const data = result.data
        if (data.status===0){
            //发送获取数据请求
            getCategory()
        }
    }

    const deleteCategory = async ()=>{
        const categoryId = selectCategory._id
        const result = await reqDeleteCategory(categoryId)
        const data = result.data
        if (data.status === 0) {
            //发送获取数据请求
            getCategory()
        }
    }
    //onCancel method
    const handleCancel = () => {
        // formValue.form.resetFields()
        console.log()
        setModalshow('0');
        
        formValue.form.resetFields()
        
        //setModalshow('0')
    }

    const getFormValue = (data, form)=>{
        //data from child 
        console.log('childdata: ',data)
        console.log('childform: ', form)
        console.log(typeof data)
        if(typeof data === 'string'){
            setFormValue({
                select: '',
                input: data,
                form: form
            })
        }else{
            setFormValue({
                select: data.select,
                input: data.input,
                form: form
            })
        } 
    }
    const showSubCategorys=(category)=>{
        //update state
        //异步的,所以要加回调保证先更新state再发送请求
        setParentId(category._id)
        setParentName(category.name)
        console.log('showSubCategorys:',parentId)
    }

    const showCategorys = () => {
        setParentId('0');
        setParentName('');
        setSubCategorys([]);
    };

    //异步获取一级分类列表
    const getCategory = async () => {
        //请求发生前,显示loading
        setLoading(true)
        const result = await reqCategorys(parentId)
        //请求发生后
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            //get data arr
            const cate = data.data
            if (parentId ==='0'){
                //update first class list
                setCategorys(cate)
            }else{
                //update second class list
                setSubCategorys(cate)
            }
        } else {
            message.error('获取分类列表失败')
        }
    }

    // 只渲染一次
    useEffect(() => {
        initColumns()
    }, [parentId])

    //执行异步请求
    useEffect(() => {
        getCategory()
    }, [parentId])

    const title = parentId === '0' ? '一级分类列表' : (
        <span>
            <LinkButton onClick={showCategorys} style={{fontSize:'16px',fontWeight: 'bold'}}>一级分类列表</LinkButton>
            <RightOutlined style={{ marginRight: 3 }} />
            <span>{parentName}</span>
        </span>
    )
    const extra = (
        <Button type='primary' onClick={showAddCategory}>
            <PlusOutlined />
            添加
        </Button>
    )
    console.log('current:',parentId)
    return (
        <Card
            title={title}
            extra={extra}
            style={{
                width: '100%'
            }}
        >
            <Table
                rowKey='_id'
                loading={loading}
                dataSource={parentId === '0' ? categorys:subCategorys}
                columns={columns}
                bordered
                pagination={{defaultPageSize:5, showQuickJumper:true}} />
            <Modal title="添加分类" 
                open={showModal === '1'} 
                onOk={addCategory} 
                onCancel={handleCancel}>
                <CategoryForm 
                    categorys={categorys}
                    parentId={parentId}
                    getFormValue={(data, form) => getFormValue(data, form)} />
            </Modal>
            <Modal title="修改分类"
                open={showModal ==='2'}
                onOk={updateCategory}
                onCancel={handleCancel}>
                <CategoryName 
                selectCategory={selectCategory.name} 
                getFormValue={(data, form) => getFormValue(data, form)} />
            </Modal>
        </Card>
    )
}