import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Form, Input } from 'antd';

CategoryForm.protoTypes = {
  categorys: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
  getFormValue: PropTypes.func.isRequired
}

export default function CategoryForm(props) {

  const [form] = Form.useForm();
  const { categorys, parentId } = props
  const [formValues, setFormValues] = useState({ select: '', input: '' });

  const handleSelectChange = (value)=>{
    setFormValues((prevValues)=>(
      {
        ...prevValues,
        select: value
      }
    ))
    console.log('select:' + value)
  }
  const handleInputChange = (e) => {
    setFormValues((prevValues) => (
      {
        ...prevValues,
        input: e.target.value
      }
    ))
    console.log('input:' + e.target.value)
  }
  //通过props传到父级
  const handleSubmit = () => {
    // transmit data to father
    props.getFormValue(formValues, form)
  };
  useEffect(() => {
    handleSubmit()
  }, [formValues])

  return (
    <Form form={form} initialValues={{ select: parentId }}>
      <Form.Item name="select">
        <Select
          onChange={handleSelectChange}
          style={{
            margin: '20px 0',
            width: '100%',
          }}
        >
          <Select.Option value='0'>一级分类</Select.Option>
          {
            categorys.map(c=>
              <Select.Option key={c._id} value={c._id} >{c.name}</Select.Option>
              )
          }
        </Select>
      </Form.Item>

      <Form.Item
        name="input"
        style={{ margin: '0' }}
        rules={[
          { required: true, message: '不能为空!' },
          { max: 20, message: '名称不能超过 20 个字符!' }
        ]}
        trigger="onChange"
      >
        <Input
          onChange={handleInputChange}
          maxLength={20}
          style={{ marginBottom: '20px' }}
          placeholder="请输入类别名称"
        />
      </Form.Item>
    </Form>
  );
}
