import { Card, Divider, List, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import React from 'react'

export default function MenuListDetail() {
    const navigate = useNavigate()
    const res = {
        "status": 1,
        "imgs": [
            "1.jpg",
            '2.jpg'
        ],
        "_id": "5ca9e05db49ef916541160cd",
        "name": "联想ThinkPad 翼4809",
        "desc": "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9",
        "price": 65999,
        "pCategoryId": "5ca9d6c0b49ef916541160bb",
        "categoryId": "5ca9db9fb49ef916541160cc",
        "detail": "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span> 222</p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">99999</span></p>\n",
        "__v": 0
    };
    const maps = {
        "商品名称": "name",
        "商品描述": 'desc',
        '商品价格': "price",
        '所属分类': 'pCategoryId',
        '商品图片': "imgs",
        '商品详情':"detail"
    }
    const keys = Object.keys(maps);

    const itemDetail = (
        <span dangerouslySetInnerHTML={{ __html: res.detail }}></span>
    )
    const itemPic = (
        res.imgs.map((img,index)=>{
            return  <span>
                <img
                    key={index} src={'http://127.0.0.1:3000/images/' + img}
                    alt={img}
                    style={{
                        width: '250px'
                    }}
                >
                </img>
            </span> 
        })
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
              renderItem={(item) => (
                  <List.Item style={{ justifyContent:'flex-start'}}>
                    <Typography.Text style={{ 
                        fontWeight: 'bold', 
                        fontSize: '15px', 
                        marginRight: '10px' 
                        }}>
                        {item + ':'}
                    </Typography.Text> 
                        {item!=='商品详情'?
                          item!=='商品图片'?
                            (typeof res[maps[item]]) === 'number' ? `$${res[maps[item]]}` : res[maps[item]]
                              : itemPic
                          : itemDetail
                        }
                </List.Item>
              )}
          />
    </Card>
  )
}
