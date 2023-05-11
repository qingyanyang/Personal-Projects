import React, { useState,useEffect,useRef } from 'react';
import {
    Card,
    Button,
    Cascader,
    Form,
    Input,
    InputNumber,
    Select,
    message
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import PicturesWall from './PicturesWall';
import { reqStorageCategory, reqAddOrUpdateStorageItem } from '../../api'

export default function StorageListAddUpdate() {
    const { Option } = Select
    const [form] = Form.useForm();

    const navigate = useNavigate();
    //get data from father
    const item = useLocation().state?.item;
    const product = item || {}
    const { name, category_id, price, imgs, buyer, supplier, supplier_phone } = product

    const [options, setOptions] = useState([]);
    const [imageNames,setImageNames] = useState([])

    const initOptions = async(categorys)=>{
        const option = categorys.map(item=>({
            value: item._id,
            label: item.name,
            isLeaf: true,
        }))
        setOptions(option)
    }
    //获取分类
    const getCategorys= async ()=>{
        const result = await reqStorageCategory()
        //请求发生后
        const data = result.data
        if (data.status === 0) {
            //get data arr
            const categorys = data.data
                initOptions(categorys)
        } else {
            message.error('获取分类列表失败')
        }
    }

    const getImagName=(names)=>{
        setImageNames(names)
        console.log('names:', imageNames)
    }

    useEffect(()=>{
        getCategorys()
    }, [])

    const onFinish = async (values) => {
        console.log('imgsname',imageNames)
        console.log('Received values of form: ', values);

        let itemNew={
            imgs: imageNames,
            name:values.name,
            price:values.price,
            buyer:values.buyer, 
            supplier: values.supplier, 
            supplier_phone: values.supplier_phone,
            create_time: Date.now(),
            category_id: values.category_id[0]
        }
        if (item){
            itemNew._id = item._id
        }
        console.log('item:', itemNew)
        const result = await reqAddOrUpdateStorageItem(itemNew)
        const data = result.data
        console.log('datares:', data)
        if(data.status===0){
            message.success(`${data.data ? 'item add successfully' : 'item update successfully'}`)
            navigate('../', { replace: true })
            form.resetFields()
        }else{
            message.success(`${data.data ? 'item add failed' : 'item update failed'}`)
        }

    };
    
    
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );

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
                {item ? '修改商品' : '添加商品'}
            </span>
        </span>
    )

  return (
      <Card
          title={title}
      >
          <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
          >
              <Form.Item
                  
                  name="name"
                  label="货物名称"
                  initialValue={name}
                  rules={[
                      {
                          required: true,
                          message: 'Please input item name!',
                          whitespace: true,
                      },
                  ]}
              >
                  <Input
                      style={{
                          minWidth: 600,
                      }} />
              </Form.Item>

              <Form.Item
                  initialValue={[category_id]}
                  name="category_id"
                  label="货物分类"
                  rules={[
                      {
                          type: 'array',
                          required: true,
                          message: 'Please select your item category!',
                      },
                  ]}
              >
                  <Cascader 
                      style={{
                          minWidth: 600,
                      }}
                    options={options} 
                    changeOnSelect
                   />
              </Form.Item>

              <Form.Item
                  initialValue={price}
                  name="price"
                  label="单价"
                  rules={[
                      {
                          required: true,
                          message: 'Please input item price!',
                      },
                  ]}
              >
                  <InputNumber
                      addonAfter={suffixSelector}
                      style={{
                          minWidth: 600,
                      }}
                  />
              </Form.Item>
              <Form.Item

                  name="supplier"
                  label="供应商名称"
                  initialValue={supplier}
                  rules={[
                      {
                          required: true,
                          message: 'Please input supplier!',
                          whitespace: true,
                      },
                  ]}
              >
                  <Input
                      style={{
                          minWidth: 600,
                      }} />
              </Form.Item>
              <Form.Item
                  initialValue={supplier_phone}
                  name="supplier_phone"
                  label="供应商电话"
                  rules={[
                      {
                          required: true,
                          message: 'Please input phone number of supplier',
                      },
                  ]}
              >
                  <InputNumber
                      style={{
                          minWidth: 600,
                      }}
                  />
              </Form.Item>
              <Form.Item

                  name="buyer"
                  label="购买人"
                  initialValue={buyer}
                  rules={[
                      {
                          required: true,
                          message: 'Please input buyer!',
                          whitespace: true,
                      },
                  ]}
              >
                  <Input
                      style={{
                          minWidth: 600,
                      }} />
              </Form.Item>
              <Form.Item
                  name="imgs"
                  label="货物图片"
              >
                  <PicturesWall 
                      getImagName={(names) => getImagName(names)}
                      imgs={imgs}
                  />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}
                  style={{
                      marginRight:-720,
                  }}
              > 
                  <Button 
                  type="primary" 
                  htmlType="submit"
                  >
                      {item ?'确认修改':'确认添加'}
                  </Button>
              </Form.Item>
    
          </Form>
      </Card>
  )
}
