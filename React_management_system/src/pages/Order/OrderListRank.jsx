import React, { useEffect, useState } from 'react'
import { LeftOutlined } from '@ant-design/icons';
import { reqOrdersRank } from '../../api'
import { useNavigate} from 'react-router-dom';
import { Card, Progress, Statistic,Row,Col } from 'antd';


export default function OrderListRank() {
  const [data, setData] = useState([]) 
  const [total, setTotal] = useState(0) 
  const [totalSale, setTotalSale] = useState(0)
  const navigate = useNavigate();
  const title = (
    <span>
      <LeftOutlined
        style={{
          marginRight: '8px',
          color: "#1890ff"
        }}
        onClick={() => navigate('../', { replace: true })}
      />
      <span>
       销售排名
      </span>
    </span>
  )
  const getRank=async ()=>{
    const res = await reqOrdersRank()
    const data = res.data
    if(data.status===0){
      setData(data.data)
      setTotal(data.total)
      setTotalSale(data.total_sale)
    }
  }
  useEffect(()=>{
    getRank()
  },[])
  return(
    <Card
      title={title}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            style={{ marginLeft: '23px', marginBottom: '23px' }}
            title="Total sale:"
            value={`$${totalSale}`} />
        </Col>
        <Col span={12}>
          <Statistic
            style={{ marginLeft: '23px', marginBottom: '23px' }}
            title="Total quantity:"
            value={`${total}`} />
        </Col>
      </Row>
      {
        data.map((item,index)=>{
          return(
            <div key={index}
              style={{ marginLeft: '26px' }}
            >
              <span style={{ width: '100px' }}>{item.name}</span>
              <Progress style={{ width: '60%', margin:'10px 20px' }} percent={item.total_sales / total * 100} showInfo={false}/>
              <span>{item.total_sales}&nbsp;/&nbsp;
                <span style={{ color:'#1890ff'}}>{total}</span>
              </span>
            </div>
          )
        })
        
      }
    </Card>
  )
}
