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
import RichTextEditor from './RichTextEditor';
import PicturesWall from './PicturesWall';
import './MenuList.css'
import {reqCategorys} from '../../api'
import { reqAddOrUpdateItem } from '../../api'


let parentID='0'
export default function MenuListAddUpdate() {
    const editor = useRef(null)
    const { Option } = Select
    const navigate = useNavigate();
    const category = useLocation().state?.category;
    const product = category || {}
    const { name, desc, detail, categoryId, pCategoryId, price, imgs } = product
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [imageNames,setImageNames] = useState([])
    
    let cateBelong = []
    if (category) {
        if (pCategoryId === '0'){
            cateBelong.push(categoryId) 
        }else{
            cateBelong.push(pCategoryId)
            cateBelong.push(categoryId)
        }
    }


    const initOptions = async(categorys)=>{
        const option = categorys.map(item=>({
            value: item._id,
            label: item.name,
            isLeaf: false,
        }))
        if(pCategoryId!=='0'){
            const childrenOptions = await getCategorys(pCategoryId)
            const subOption = childrenOptions.map(item => ({
                label: item.name,
                value: item._id,
                isLeaf: true
            }))
            const targetOption = options.find(option => option.value === pCategoryId)
            if (targetOption){
                targetOption.children = subOption
            }
            
        }
        
        setOptions(option)
    }
    //获取数据
    const getCategorys= async (parentId)=>{
        const result = await reqCategorys(parentId)
        
        //请求发生后
        const data = result.data
        if (data.status === 0) {
            //get data arr
            const categorys = data.data
            if (parentId ==='0'){
                initOptions(categorys)
            }else{
                return categorys
            }
        } else {
            message.error('获取分类列表失败')
        }
    }
    const getImagName=(names)=>{
        setImageNames(names)
        console.log('names:', imageNames)
    }
    //parentId变化时
    useEffect(()=>{
        getCategorys(parentID)
    }, [])

    const onFinish = async (values) => {
        const richTextValue = editor.current.getDetail()
        console.log('rich',richTextValue)
        console.log('imgsname',imageNames)
        console.log('Received values of form: ', values);
        let item={
            imgs: imageNames,
            name:values.name,
            price:values.price,
            desc:values.desc,
            pCategoryId:values.category[0],
            categoryId: values.category[1],
            detail: richTextValue
        }
        if (category){
            item._id = category._id
        }
        console.log('item:',item)
        const result = await reqAddOrUpdateItem(item)
        const data = result.data
        console.log('datares:', data)
        if(data.status===0){
            message.success(`${data.data ? 'item add successfully' : 'item update successfully'}`)
            navigate('../', { replace: true })
        }else{
            message.success(`${data.data ? 'item add failed' : 'item update failed'}`)
        }
    };
    
    const onChangeCascader = (value, selectedOptions) => {
        console.log('俩:',value, selectedOptions);
    };
    
    const loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[0];
        parentID = targetOption.value
        const categorys = await getCategorys(parentID)
        console.log('我拿到了:',categorys)
        if (categorys && categorys.length>0){
            const subOption = categorys.map(item=>({
                label: item.name,
                value:  item._id,
                isLeaf:true
            }))
            targetOption.children = subOption;
        }else{
            targetOption.isLeaf=true
        }
        setOptions([...options])
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
                {category ? '修改商品' : '添加商品'}
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
                  style={{
                      width: '600px',
                  }}
                  name="name"
                  label="商品名称"
                  initialValue={name}
                  rules={[
                      {
                          required: true,
                          message: 'Please input item name!',
                          whitespace: true,
                      },
                  ]}
              >
                  <Input />
              </Form.Item>

              <Form.Item
                  style={{
                      width: '600px',
                  }}
                  initialValue={cateBelong}
                  name="category"
                  label="商品分类"
                  rules={[
                      {
                          type: 'array',
                          required: true,
                          message: 'Please select your item category!',
                      },
                  ]}
              >
                  <Cascader options={options} loadData={loadData} onChange={onChangeCascader} changeOnSelect />
              </Form.Item>

              <Form.Item
                  style={{
                      width: '600px',
                  }}
                  initialValue={price}
                  name="price"
                  label="商品价格"
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
                          width: '100%',
                      }}
                  />
              </Form.Item>

              <Form.Item
                  style={{
                      width: '600px',
                  }}
                  initialValue={desc}
                  name="desc"
                  label="商品描述"
                  rules={[
                      {
                          required: true,
                          message: 'Please input describtion of item',
                      },
                  ]}
              >
                  <Input.TextArea showCount maxLength={100} />
              </Form.Item>

              <Form.Item
                  style={{
                      width: '600px',
                  }}
                  name="imgs"
                  label="商品图片"
              >
                  <PicturesWall 
                  getImagName={(names) => getImagName(names)}
                      imgs={imgs}
                  />
              </Form.Item>

              <Form.Item
                  style={{
                      maxWidth: '900px',
                  }}
                  name="imgs"
                  label="商品详情"
              >
                  <RichTextEditor 
                  ref={editor}
                    detail={detail}
                   />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}
                  style={{
                      maxWidth: '240px',
                  }}
              >
                  <Button type="primary" htmlType="submit">
                      {category ?'确认修改':'确认添加'}
                  </Button>
              </Form.Item>
    
          </Form>
      </Card>
  )
}
