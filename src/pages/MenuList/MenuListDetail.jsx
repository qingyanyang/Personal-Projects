import { Card, List, Typography } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import {reqCategoryName} from '../../api'

export default function MenuListDetail() {
    const navigate = useNavigate()
    //get category object from home, then can be displayed here
    const category = useLocation().state?.category
    const { pCategoryId, categoryId } = category 

    console.log('hello:',category)
    const [parentCategoryName, setParentCategoryName] = useState('')
    const [categoryName, setCategoryName] = useState('')

    const maps = {
        "商品名称": "name",
        "商品描述": 'desc',
        '商品价格': "price",
        '所属分类': '',
        '商品图片': "imgs",
        '商品详情':"detail"
    }
    const keys = Object.keys(maps);

    const itemDetail = (
        <span dangerouslySetInnerHTML={{ __html: category.detail }}></span>
    )
    const itemPic = (
        category.imgs.map((img,index)=>{
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
    const categoryBelong = (
        <span>
            {(parentCategoryName ? parentCategoryName + ' > ' :'')+categoryName}
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

    useEffect(() => {
        async function fetchData() {
            if (pCategoryId === '0') {
                const res = await reqCategoryName(categoryId);
                // Do something with res...
                const data = res.data
                if (data.status === 0){
                    setCategoryName(data.data.name)
                }
            } else {
                //many requests send at once
                const res = await Promise.all([reqCategoryName(pCategoryId), reqCategoryName(categoryId)])  
                const data01 = res[0].data
                const data02 = res[1].data
                if (data01.status === 0 && data02.status === 0) {
                    setParentCategoryName(data01.data.name)
                    setCategoryName(data02.data.name)
                }
            }
        }
        fetchData();
    }, [pCategoryId, categoryId])

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
                            item!=='所属分类'?
                              (typeof category[maps[item]]) === 'number' ? `$${category[maps[item]]}` : category[maps[item]]
                                  : categoryBelong
                              : itemPic
                          : itemDetail
                        }
                </List.Item>
              )}
          />
    </Card>
  )
}
