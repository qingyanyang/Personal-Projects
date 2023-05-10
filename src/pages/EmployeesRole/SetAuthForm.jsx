import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Tree } from 'antd';
import menuList from '../../config/menuConfig'

SetAuthForm.protoTypes = {
  getFormValue: PropTypes.func.isRequired
}

export default function SetAuthForm(props) {
  const { role } = props
  
  console.log('get from father', role)

  //get tree list
  const convertToTreeData = (menuList) => {
    return menuList.map((menuItem) => {
      const { label, key, children } = menuItem;

      const treeNode = {
        title: label,
        key: key,
      };

      if (children) {
        treeNode.children = convertToTreeData(children);
      }

      return treeNode;
    });
  };

  const root = {
    title: "平台权限",
    key: "0-0",
  };

  root.children = convertToTreeData(menuList);
  const treeData = [root];

  const onCheck = (checkedKeys) => {
    props.getFormValue(checkedKeys)
    console.log('onCheck', checkedKeys);
  };
  return (
    <Form>
      <Form.Item
        name="input"
        label='角色名称'
        style={{ margin: '20px' }}
        rules={[
          { required: true, message: '不能为空!' },
          { max: 20, message: '名称不能超过 20 个字符!' }
        ]}
        trigger="onChange"
      >
        <Input
          maxLength={20}
          placeholder={role.name}
          disabled
        />
      </Form.Item>
      <Form.Item
        style={{ margin: '20px' }}
      >
        <Tree
          checkable
          defaultExpandAll={true}
          defaultCheckedKeys={role.menus}
          onCheck={onCheck}
          treeData={treeData}
        />
      </Form.Item>
    </Form>
  );
}

