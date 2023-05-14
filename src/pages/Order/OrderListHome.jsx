import React, { useEffect, useState } from 'react'
import { BarChartOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate, Outlet } from 'react-router-dom';
import { Card, Table, Button, Modal, message, Input, Tooltip } from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqOrders, reqSearchOrders, reqDeleteOrder } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import { convertDate, convertTime } from '../../utils/dateUtils'
import './Order.css'

let pageNumGlobal = 1

export default function OrderList() {
    const [columns, setColumns] = useState([])
    const [itemList, setItemList] = useState([])
    const [total, setTotal] = useState([])
    const [loading, setLoading] = useState(false)
    const [forSearch, setForSearch] = useState(false)
    const [pageNum, setPageNum] = useState(pageNumGlobal)
    const [searchType, setSearchType] = useState('')
    const [searchName, setSearchName] = useState('')

    console.log(pageNum)
    const navigate = useNavigate()

    const initColumns = () => {
        setColumns([
            {
                title: '订单号码',
                width: '20%',
                dataIndex: '_id',
            },
            {
                title: '下单时间',
                width: '15%',
                dataIndex: 'create_time',
                render: (date) => (
                    <span>
                        {convertDate(date)}&nbsp;
                        {convertTime(date)}
                    </span>
                )
            },
            {
                title: '订单详情',
                width: '40%',
                dataIndex: 'item_list',
                render: (item_list) => (
                    <Tooltip
                        title={item_list.map((item) => `${item.item} x ${item.amount}`).join(', ')}
                        color='white'
                        overlayInnerStyle={{ color: 'black' }}
                    >
                        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', width: '350px' }}>
                            {item_list.map((item, index) => (
                                <span key={index} style={{ marginRight: '9px' }}>
                                    {item.item}&nbsp;x&nbsp;{item.amount}
                                </span>
                            ))}
                        </div>
                    </Tooltip>
                ),
            },
            {
                title: '订单总价',
                align: 'center',
                dataIndex: 'bill_amount',
                width: '8%',
                render: (price) => '$' + price
            },
            {
                title: '付款方式',
                align: 'center',
                dataIndex: 'pay_method',
                width: '8%',
            },
            {
                title: '操作',
                align: 'center',
                width: '10%',
                //category is the object of each row
                render: (category) => (
                    <div>
                        <LinkButton style={{ margin: '0 20px' }} onClick={() => showDeleteForm(category)}>删除</LinkButton>
                    </div>

                )
            }
        ])
    }
    const showDeleteForm = (category) => {
        Modal.confirm({
            title: 'Do you Want to delete this item?',
            icon: <ExclamationCircleFilled />,
            async onOk() {
                const res = await reqDeleteOrder(category._id)
                const data = res.data
                if(data.status===0){
                    getItems(pageNumGlobal)
                }
            }
        })
    }
    const showRankPage=()=>{
        navigate('/layout/order/sale_rank',{replace:true})
    }
    //发送异步请求
    const getItems = async (pageNumber) => {
        pageNumGlobal = pageNumber
        setLoading(true)
        let result = {}
        if (!forSearch) {
            console.log('normal')
            result = await reqOrders(pageNumber, PAGE_SIZE)
        } else {
            console.log('search')
            console.log({ pageNumber, PAGE_SIZE, searchType, searchName })
            //
            result = await reqSearchOrders({ pageNumber, pageSize: PAGE_SIZE, searchType,searchName })
        }
        setLoading(false)
        const data = result.data
        if (data.status === 0) {
            const { list, total } = data.data
            console.log('list:',list)
            setItemList(list)
            setTotal(total)
        }
    }

    //get onchange value under contral
    const handleInputChange = (e) => {
        setSearchName(e.target.value)
        console.log('input:' + e.target.value)
    }

    //只渲染一次
    useEffect(() => {
        initColumns()
    }, [])
    useEffect(() => {
        getItems(pageNum)
    }, [pageNum, forSearch])
    const title = (
        <span>
            <Input placeholder="order number"
                style={{ marginRight: '10px', width: '150px' }}
                onChange={handleInputChange}
            />
            <Button type="primary"
                style={{ width: '80px' }}
                onClick={() => {
                    if (forSearch) {
                        getItems(1)
                        setSearchType('_id')
                    } else {
                        setForSearch(true)
                        setSearchType('_id')
                    }
                }}
            >
                <SearchOutlined />
                搜索
            </Button>
        </span>
    )
    const extra = (
        <Button type='primary' onClick={showRankPage}>
            <BarChartOutlined />
            销售排名
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
                    total: total,
                    showSizeChanger:false,
                    defaultPageSize: PAGE_SIZE,
                    showQuickJumper: true,
                    onChange: page => setPageNum(page)//这里传入了page number
                }} />
            <Outlet />
        </Card>
    )
}
//当page num 改变时