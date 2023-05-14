import { Card, List, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation} from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export default function StorageListDetail() {
    const navigate = useNavigate()
    //get item object from home, then can be displayed here
    const itemSelect = useLocation().state?.item
    const categorysSelect = useLocation().state?.categorys

    const maps = {
        "货物名称": "name",
        '库存': 'storage',
        '商品单价': "price",
        '所属分类': '',
        '供应商':'supplier',
        '供应商电话':'supplier_phone',
        '购买人':'buyer',
        '货物图片': "imgs",
    }

    const keys = Object.keys(maps);

    const itemPic = (
        itemSelect.imgs.map((img,index)=>{
            return <span key={index}>
                <img
                    src={'http://127.0.0.1:3000/images/' + img}
                    alt={img}
                    style={{
                        width: '250px'
                    }}
                >
                </img>
            </span> 
        })
    )
    const itemBelong = (
        <span>
            {categorysSelect.find((category => category._id === itemSelect.category_id)).name}
        </span>
    )
    const title=(
        <span>
            <LeftOutlined
                style={{
                    marginRight: '8px',
                    color: "#1890ff"
                }}
                onClick={()=>navigate('../', { replace: true })}
            />
            <span>商品详情</span>
        </span>
    )

  return (
    <Card
          title={title}
    >
          <List
              style={{marginTop:'-20px', marginLeft:'24px'}}
              dataSource={keys}
              renderItem={(key) => (
                  <List.Item style={{ justifyContent:'flex-start'}}>
                    <Typography.Text style={{ 
                        fontWeight: 'bold', 
                        fontSize: '15px', 
                        marginRight: '10px' 
                        }}>
                          {key + ':'}
                    </Typography.Text> 
                        {
                          key !=='货物图片'?
                              key !=='所属分类'?
                                key !=='商品单价'?
                                    itemSelect[maps[key]]
                                      : `$${itemSelect[maps[key]]}`
                                  : itemBelong
                              : itemPic
                        }
                </List.Item>
              )}
          />
    </Card>
  )
}
