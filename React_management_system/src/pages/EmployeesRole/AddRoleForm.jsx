import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';

AddRoleForm.protoTypes = {
  getFormValue: PropTypes.func.isRequired
}

export default function AddRoleForm({getForm, role}) {

  const [form] = Form.useForm();
  const formRef = useRef(form);

  role = role || {}

  useEffect(() => {
    getForm(formRef.current);
  }, [getForm]);

  return (
    <Form form={form}>
      <Form.Item
        name="name"
        style={{ margin: '0' }}
        rules={[
          { required: true, message: '不能为空!' },
          { max: 20, message: '名称不能超过 20 个字符!' }
        ]}
        trigger="onChange"
      >
        <Input
          maxLength={20}
          style={{ margin: '20px 0', width:'470px' }}
          placeholder={Object.keys(role).length > 0 ? role.name:'请输入角色名称'}
        />
      </Form.Item>
      <Form.Item
        name="rate"
        style={{ margin: '0' }}
        rules={[
          { required: true, message: '不能为空!' },
          { max: 20, message: '名称不能超过 20 个字符!' }
        ]}
        trigger="onChange"
      >
        <Input
          maxLength={20}
          style={{ margin: '20px 0', width: '470px' }}
          placeholder={Object.keys(role).length > 0 ? role.rate : '请输入时薪'}
        />
      </Form.Item>
    </Form>
  );
}
