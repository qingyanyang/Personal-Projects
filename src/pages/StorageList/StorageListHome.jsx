import React, {useEffect, useState}from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate, Outlet} from 'react-router-dom';
import { Card, Table, Button, Select, message, Input,Row,Col } from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqStorageItems, reqStorageCategory, reqSearchStorageItems } from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import { formateDate } from '../../utils/dateUtils'

let pageNumGlobal = 1
export default function StorageListHome() {
    const [columns,setColumns]=useState([])
    const [itemList,setItemList] = useState([])
    const [total,setTotal]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchType, setSearchType] = useState('name')
    const [searchName, setSearchName] = useState('')
    const [forSearch, setForSearch]=useState(false)
    const [pageNum, setPageNum] = useState(pageNumGlobal)
    const [categorys,setCategorys]=useState([])

    const navigate = useNavigate()
    
    const initColumns = () => {
        setColumns([
            {
                title: '货物名称',
                width: '6%',
                dataIndex: 'name',
            },
            {
                title: '类别',
                align: 'center',
                width: '6%',
                dataIndex: 'category_id',
                render: (category_id) => {
                    const category  = categorys.find(category=> category._id === category_id);
                    return category ? category.name : 'Not found';
                }
            },
            {
                title: '添加时间',
                align: 'center',
                width: '8%',
                dataIndex: 'create_time',
                
            },
            {
                title: '库存',
                align: 'center',
                dataIndex: 'storage',
                width: '10%',
                render: (category) => (
                    <Row>
                        <Col style={{ fontSize: '13px', marginRight: '10px',lineHeight:'25px',color:'gray' }}>余量: 999</Col>
                        <Col>
                            <Button
                                type='primary'
                                onClick={() => { }}
                                style={{ backgroundColor: 'green', height: '25px', width: '50px', fontSize: '11px', marginRight: '5px'}}
                            >
                                <p style={{ margin: '0 -7px', fontSize: '11px',fontWeight:'500' }}>
                                    + 库存
                                </p>
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type='primary'
                                onClick={() => { }}
                                style={{ backgroundColor: '#1890ff', height: '25px', width: '50px', fontSize: '11px', marginRight: '5px' }}
                            >
                                <p style={{ margin: '0 -7px', fontSize: '11px', fontWeight: '500' }}>
                                    - 库存
                                </p>
                            </Button>
                        </Col>
                    </Row>

                )
            },
            {
                title: '购买人',
                align: 'center',
                dataIndex: 'buyer',
                width: '3%',
            },
            {
                title: '单价',
                align: 'center',
                dataIndex: 'price',
                width: '3%',
                render: (price) => '$' + price
            },
            {
                title: '操作',
                align: 'center',
                width: '5%',
                //category is the object of each row
                render: (item) => (
                        <div>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showDetail(item)}>详情</LinkButton>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showUpdateDetail(item)}>修改</LinkButton>
                        </div>
                    
                )
            }
        ])
    }
    
    const showAddItem = () => {
        console.log('to addupdate page')
        navigate('/layout/storage_list/add_update/', { replace: true })
    }
    const showUpdateDetail = (item)=>{
        console.log('to addupdate page')
        navigate('/layout/storage_list/add_update/', { replace: true, state: { item }})
    }
    const showDetail = (item)=>{
        console.log('to addupdate page')
        console.log('catogoryto sister:', categorys)
        navigate('/layout/storage_list/detail/', { replace: true, state: { item, categorys } })
    }
    const getCategorys = async ()=>{
        const res = await reqStorageCategory()
        const data = res.data
        if(data.status===0){
            console.log('I have:',data.data)
            setCategorys(data.data)
        }else{
            console.log('sth wrong!')
        }
    }
    //发送异步请求
    const getItems = async (pageNumber)=>{
        pageNumGlobal = pageNumber
        setLoading(true)
        let result = {}
        if (!forSearch){
            console.log('normal')
            result = await reqStorageItems(pageNumber, PAGE_SIZE)
        }else{
            console.log('search')
            console.log({ pageNumber, PAGE_SIZE, searchName, searchType })
            //
            result = await reqSearchStorageItems({ pageNumber, pageSize:PAGE_SIZE, searchName, searchType})
        }
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            const { list, total } = data.data
            setItemList(list)
            setTotal(total)
        }
    }

    //get onchange value under contral
    const handleSelectChange = (value) => {
        setSearchType(value)
        console.log('select:' + value)
    }
    const handleInputChange = (e) => {
        setSearchName(e.target.value)
        console.log('input:' + e.target.value)
    }
    //只渲染一次
    useEffect(()=>{
        getCategorys()
    },[])
    useEffect(() => {
        initColumns()
    }, [categorys])
    useEffect(()=>{
        getItems(pageNum)
    }, [pageNum, forSearch])
    const title = (
        <span>
            <Select
                style={{ marginRight: '10px', width: '150px' }}
                value={searchType}
                onChange={handleSelectChange}
            >
                <Select.Option key='0' value='name'>按照名称</Select.Option>
                <Select.Option key='1' value='buyer'>按照购买人</Select.Option>
            </Select>
            <Input placeholder="search all" 
                style={{ marginRight: '10px', width: '150px'}}
                onChange={handleInputChange}
            />
            <Button type="primary"
                style={{ width: '80px' }}
                onClick={() => {
                    if(forSearch){
                        getItems(1)
                    }else{
                        setForSearch(true)
                    }
                }}
            >
                <SearchOutlined />
                搜索
            </Button>
        </span>
    )
    const extra = (

        <Button type='primary' onClick={showAddItem}>
            <PlusOutlined />
            添加
        </Button>
    )
    return (
        <Card
            title={title}
            extra={extra}
            style={{
                width: '100%'
            }}
        >
            <Table
                loading={loading}
                rowKey='_id'
                dataSource={itemList}
                columns={columns}
                bordered
                pagination={{ 
                    total:total, 
                    defaultPageSize: PAGE_SIZE, 
                    showQuickJumper: true,
                    onChange: page => setPageNum(page)//这里传入了page number
                     }} />
            <Outlet />
        </Card>
    )
}
//当page num 改变时