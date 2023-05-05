import {PlusOutlined} from '@ant-design/icons'
import React from 'react'
import { useState,useEffect } from 'react'
import { Card, Table, Button, message } from 'antd'
import LinkButton from '../../components/LinkButton'
import { reqCategorys } from '../../api'

//全局变量
let columns = []

export default function Index() {

  const[categorys,setCategory] = useState({
    categorys:[],
  })
  //初始化
  const initColumns = ()=>{
    columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: '30%',
        render: () => (
          <span style={{ marginLeft: '-20px' }}>
            <LinkButton style={{ margin: '0 20px' }}>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    ]
  }
  //异步获取一级分类列表
  const getCategory = async ()=>{
    const res = await reqCategorys('0')
    const data = res.data
    console.log(data.status)
    if (data.status=== 0){
      const categorys = data.data
      setCategory({
        categorys
      })
    }else{
      message.error('获取分类列表失败')
    }
  }
  //只渲染一次
  useEffect(()=>{
    initColumns()
  },[])
  //执行异步请求
  useEffect( () => {
    getCategory()
  }, [])

  const title = '一级分类列表'
  const extra = (
    <Button type='primary'>
      <PlusOutlined/>
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
      rowKey='_id'
      dataSource={categorys.categorys}
      columns={columns} 
      bordered />
    </Card>
  )
}
