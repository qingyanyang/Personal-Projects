import { Card, Modal, Table } from 'antd'
import { LeftOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { reqOperationRecord, reqOperationRecordDelete } from '../../api'
import LinkButton from '../../components/LinkButton'
import { PAGE_SIZE } from '../../utils/constants'
import { convertDate, convertTime } from '../../utils/dateUtils'

export default function StorageListDetail() {
  const navigate = useNavigate()
  const [columns, setColumns] = useState([])
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(false)
  //get item object from home, then can be displayed here
  const initColumns = () => {
    setColumns([
      {
        title: 'date',
        align: 'center',
        width: '8%',
        dataIndex: 'date',
        render:(date)=>(
          <span>
            {convertDate(date)}&nbsp;
            {convertTime(date)}
          </span>
        )
      },
      {
        title: 'user',
        width: '6%',
        dataIndex: 'name',
      },
      
      {
        title: 'operation',
        align: 'center',
        dataIndex: 'operation',
        width: '3%',
      },
      {
        title: 'amount',
        align: 'center',
        dataIndex: 'amount',
        width: '3%',
        render: (amount) => (
          amount !== -1 ? amount: null
        )
      },
      {
        title: 'field',
        align: 'center',
        dataIndex: 'field',
        width: '3%',
      },
      {
        title: '',
        align: 'center',
        width: '5%',
        //category is the object of each row
        render: (item) => (
          <div>
            <LinkButton style={{ margin: '0 20px' }} onClick={() => showDeleteForm(item)}>delete</LinkButton>
          </div>

        )
      }
    ])
  }
  const showDeleteForm = (item) => {
    Modal.confirm({
      title: 'Do you Want to delete this record?',
      icon: <ExclamationCircleFilled />,
      async onOk() {
        const res = await reqOperationRecordDelete(item._id)
        const data = res.data
        if (data.status === 0) {
          getRecords()
        }
      }
    })
  }

  const getRecords= async()=>{
    setLoading(true)
    const res = await reqOperationRecord()
    setLoading(false)
    const data=res.data
    if(data.status===0){
      setItemList(data.data)
    }else{
      console.log('loading records failed!')
    }
  }

  useEffect(() => {
    initColumns()
  }, [])

  useEffect(() => {
    getRecords()
  }, [])

  const title = (
    <span>
      <LeftOutlined
        style={{
          marginRight: '8px',
          color: "#1890ff"
        }}
        onClick={() => navigate('../', { replace: true })}
      />
      <span>商品详情</span>
    </span>
  )

  return (
    <Card
      title={title}
    >
      <h1 style={{fontWeight:600,marginBottom:'20px',fontSize:'20px'}}>出入库记录</h1>
      <Table
        loading={loading}
        rowKey='_id'
        dataSource={itemList}
        columns={columns}
        pagination={{
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
        //这里传入了page number
        }} />
    </Card>
  )
}
