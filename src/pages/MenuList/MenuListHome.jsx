import React, {useEffect, useState}from 'react'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate, Outlet} from 'react-router-dom';
import { Card, Table, Button, Select, message, Input, Tooltip } from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqItems, reqSearchItems, reqUpdateItemsStatus } from '../../api'
import {PAGE_SIZE} from '../../utils/constants'

let pageNumGlobal = 1
export default function MenuListHome() {
    const [columns,setColumns]=useState([])
    const [itemList,setItemList] = useState([])
    const [total,setTotal]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchType, setSearchType] = useState('name')
    const [searchName, setSearchName] = useState('')
    const [forSearch, setForSearch]=useState(false)
    const [pageNum, setPageNum] = useState(pageNumGlobal)

    console.log(pageNum)
    const navigate = useNavigate()
    
    const initColumns = () => {
        setColumns([
            {
                title: '菜名',
                width: '20%',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                width: '40%',
                dataIndex: 'desc',
                render:(desc)=>(
                    <Tooltip
                        title={desc}
                        color='white'
                        overlayInnerStyle={{ color: 'black' }}
                    >
                        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '350px' }}>
                            {desc}
                        </div>
                    </Tooltip>
                )
            },
            {
                title: '价格',
                align: 'center',
                dataIndex: 'price',
                width: '8%',
                render:(price)=>'$'+price
            },
            {
                title: '状态',
                align: 'center',
                //dataIndex: 'status',
                render:(item)=>{
                    const {_id,status} = item
                    return(
                        <div>
                            <Button 
                                type='primary' 
                                onClick={() => { updateItemsStatus(_id, status===1?0:1)}}
                                style={{ backgroundColor: (status === 1 ? 'gray' : '#1890ff') }}
                                >
                                {status ===1?'下架':'上架'}
                            </Button>
                            <div style={{ textAlign: 'center', color:(status === 1?'green':'red')}}>{status === 1 ? 'onSale':'soldOut'}</div>
                        </div>
                    )
                }
            },
            {
                title: '操作',
                align: 'center',
                width: '10%',
                //category is the object of each row
                render: (category) => (
                        <div>
                            <LinkButton style={{ margin: '0 20px' }} onClick={() => showDetail(category)}>详情</LinkButton>
                            <LinkButton style={{ margin: '0 20px' }} onClick={() => showUpdateDetail(category)}>修改</LinkButton>
                        </div>
                    
                )
            }
        ])
    }
    
    const updateItemsStatus= async (_id, status)=>{
        const res = await reqUpdateItemsStatus(_id, status)
        const data = res.data
        console.log(pageNum)
        if (data.status===0){
            message.success('operation successfully!')
            getItems(pageNumGlobal)
        }
    }
    const showAddCategory = () => {
        console.log('to addupdate page')
        navigate('/layout/menu_list/add_update/', { replace: true })
    }
    const showUpdateDetail=(category)=>{
        console.log('to addupdate page')
        navigate('/layout/menu_list/add_update/', { replace: true, state: { category}})
    }
    const showDetail=(category)=>{
        console.log('to addupdate page')
        navigate('/layout/menu_list/detail/', { replace: true, state: { category } })
    }
    //发送异步请求
    const getItems = async (pageNumber)=>{
        pageNumGlobal = pageNumber
        setLoading(true)
        let result = {}
        if (!forSearch){
            console.log('normal')
            result = await reqItems(pageNumber, PAGE_SIZE)
        }else{
            console.log('search')
            console.log({ pageNumber, PAGE_SIZE, searchName, searchType })
            //
            result = await reqSearchItems({ pageNumber, pageSize:PAGE_SIZE, searchName, searchType})
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
    useEffect(() => {
        initColumns()
    }, [])
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
                <Select.Option key='1' value='desc'>按照描述</Select.Option>
            </Select>
            <Input placeholder="Basic usage" 
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

        <Button type='primary' onClick={showAddCategory}>
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