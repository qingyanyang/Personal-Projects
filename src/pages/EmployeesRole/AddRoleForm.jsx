import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

AddRoleForm.protoTypes = {
  getFormValue: PropTypes.func.isRequired
}

export default function AddRoleForm(props) {
  const { roleSelect }=props
  console.log('get from father', roleSelect)
  const handleInputChange = (e) => {
    props.getFormValue(e.target.value)
    console.log('input:' + e.target.value)
  }
  
  return (
    <Form>
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
          placeholder={roleSelect ? roleSelect.name:'请输入角色名称'}
        />
      </Form.Item>
    </Form>
  );
}
