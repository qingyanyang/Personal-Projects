import React, {useEffect, useState}from 'react'
import { PlusOutlined, SearchOutlined, ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons'
import { useNavigate, Outlet} from 'react-router-dom';
import { Card, Table, Button, Select, message, Input, Row, Col, Modal, InputNumber ,Form} from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqStorageItems, reqStorageCategory, reqSearchStorageItems, reqUpdateStorageItemStorage, reqStorageItemsSort, reqOperationRecordAdd} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import { convertDate, convertTime } from '../../utils/dateUtils'
import './StorageList.css'
import storageUtils from '../../utils/storageUtils'

let amountFinal = 0
let pageNumGlobal = 1
export default function StorageListHome() {
    const [form] = Form.useForm();
    const [columns,setColumns]=useState([])
    const [itemList,setItemList] = useState([])
    const [total,setTotal]=useState([])
    const [loading,setLoading]=useState(false)
    const [searchType, setSearchType] = useState('name')
    const [searchName, setSearchName] = useState('')
    const [forSearch, setForSearch]=useState(false)
    const [pageNum, setPageNum] = useState(pageNumGlobal)
    const [categorys,setCategorys]=useState([])
    const [showModal, setModalshow] = useState('0')
    const [recordSelect, setRecordSelect]=useState({})
    const [isAdd,setIsAdd]=useState(null)
    const [isAsend, setIsAsend] = useState(null)
    const [operation, setOperation] = useState('')
    const [amountTemp, SetAmountTemp] = useState(0)

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
                render: (date) => (
                    <span>
                        {convertDate(date)}&nbsp;
                        {convertTime(date)}
                    </span>
                )
            },
            {
                title: (
                    <div>
                        库存
                        <ArrowUpOutlined onClick={sortAsending} style={{marginLeft:'20px',color:'#1890ff'}}/>
                        <ArrowDownOutlined onClick={sortDesending} style={{ marginLeft: '5px', color: '#1890ff' }} />
                    </div>
                ),
                align: 'center',
                dataIndex: 'storage',
                width: '13%',
                render: (amount, record) => (
                    <Row style={{float:'right'}}>
                        <Col style={{ fontSize: '13px', marginRight: '25px', lineHeight: '25px', color: `${amount<5?'red':'gray'}` }}>余量: {amount}</Col>
                        <Col>
                            <Button
                                type='primary'
                                onClick={() => { showAddStorage(amount,record)}}
                                style={{ backgroundColor: 'green', height: '25px', width: '50px', fontSize: '11px', marginRight: '5px'}}
                            >
                                <p style={{ margin: '0 -7px', fontSize: '11px',fontWeight:'500',color:'white' }}>
                                    + 库存
                                </p>
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type='primary'
                                disabled={amount <= 0 ? true : false}
                                onClick={() => { showMinStorage(amount,record)}}
                                style={{ backgroundColor: `${amount <= 0 ?'lightGrey':'#1890ff'}`, height: '25px', width: '50px', fontSize: '11px', marginRight: '5px' }}
                            >
                                <p style={{ margin: '0 -7px', fontSize: '11px', fontWeight: '500', color: 'white' }}>
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
    const sortAsending=async()=>{
        setIsAsend(true)
    }

    const sortDesending=()=>{
        setIsAsend(false)
    }
    const showAddStorage = (amount,record)=>{
        console.log('showAddStorage:', record)
        setOperation('add storage')
        SetAmountTemp(amount)
        setIsAdd(true)
        setRecordSelect(record)
        setModalshow('1')
        
    }
    const showMinStorage = (amount,record)=>{
        setOperation('minus storage')
        SetAmountTemp(amount)
        setIsAdd(false)
        setRecordSelect(record)
        setModalshow('1')
    }
    //onOK
    
    const updateStorage=async ()=>{
        //get input value from form
        let { storage_update} = form.getFieldValue()
        console.log('storage_update:', storage_update)
        amountFinal = storage_update
        //get the item id
        const itemId = recordSelect._id
        //check is add or min
        if(!isAdd){
            storage_update = -storage_update
        }

        let amount = recordSelect.storage + storage_update
        amount = amount>0?amount:0
        console.log('amount', storage_update)
        //send update request
        const res = await reqUpdateStorageItemStorage(itemId,amount)
        const data=res.data
        if(data.status===0){
            getItems(pageNum)
            addRecord()
            message.success(`${isAdd?'add': 'reduce'} storage successfully!`)
        }else{
            message.error(`${isAdd ? 'add' : 'reduce'} storage failed!`)
        }
        //off the modal
        setModalshow('0')
        form.resetFields()
    }
    //oncancel
    const handleCancel = () => {
        setModalshow('0')
        form.resetFields()
    }
    const showHistory=()=>{
        console.log('to History page')
        navigate('/layout/storage_list/history/', { replace: true })
    }
    const showAddItem = () => {
        console.log('to addupdate page')
        setOperation('addItem')
        SetAmountTemp(-1)
        navigate('/layout/storage_list/add_update/', { replace: true })
    }
    const showUpdateDetail = (item)=>{
        console.log('to addupdate page')
        setOperation('update')
        SetAmountTemp(-1)
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
    const getItems = async (pageNumber, isAsend) => {
        pageNumGlobal = pageNumber;
        setLoading(true);
        let result = {};
        if (!forSearch) {
            console.log('normal');
            if(isAsend!=null){
                result = await reqStorageItemsSort(pageNumber, PAGE_SIZE, isAsend)
            }else{
                result = await reqStorageItems(pageNumber, PAGE_SIZE);
            }
            
        } else {
            console.log('search');
            console.log({ pageNumber, PAGE_SIZE, searchName, searchType });
            result = await reqSearchStorageItems({
                pageNumber,
                pageSize: PAGE_SIZE,
                searchName,
                searchType,
                isAsend,
            });
        }
        setLoading(false);
        const data = result.data;
        if (data.status === 0) {
            const { list, total } = data.data;
            setItemList(list);
            setTotal(total);
        }
    };

    const addRecord = async() => {
        const res = await reqOperationRecordAdd(operation, storageUtils.getUser().username, Date.now(), amountFinal, recordSelect.name)
        const data = res.data
        if(data.status===0){
            console.log('add record successfully!')
        }else{
            console.log('add record failed!')
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
        getItems(pageNum, isAsend)
        console.log('itemlist:', itemList)
    }, [pageNum, forSearch, isAsend])

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
        <span>
            <LinkButton style={{ margin: '0 20px' }} onClick={() => showHistory()}>出入库记录</LinkButton>
            <Button type='primary' onClick={showAddItem}>
                <PlusOutlined />
                添加
            </Button>
        </span>

        
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
            <Modal title="Please input the amount:"
                open={showModal === '1'}
                onOk={updateStorage}
                onCancel={handleCancel}
                width='350px'
                >
                <Form form={form}>
                    <Form.Item
                        name="storage_update"
                        rules={[
                            {
                                required: true,
                                message: 'Please input number',
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                minWidth: 300,
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Outlet />
        </Card>
    )
}
//当page num 改变时