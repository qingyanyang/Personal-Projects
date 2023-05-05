import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';

CategoryForm.protoTypes={
  selectCategory: PropTypes.object.isRequired,
  getFormValue: PropTypes.func.isRequired
}

export default function CategoryForm(props) {
  const [form] = Form.useForm();
  const name = props.selectCategory
  const [formValues, setFormValues] = useState('');

  const handleInputChange = (e) => {
    setFormValues(e.target.value)
    console.log('input:' + e.target.value)
  }
  //通过props传到父级
  const handleSubmit = () => {
    console.log('Form values:', formValues);
    // transmit it to father
    props.getFormValue(formValues, form)
  };
  //formValues变化时,触发handleSubmit
  useEffect(()=>{
    handleSubmit()
  }, [formValues])
  
  return (
    <Form form = { form }>
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
          style={{ margin: '20px 0' }}
          placeholder={name}
        />
      </Form.Item>
    </Form>
  );
}
