import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import ListForm from '../List/List'
import ContentInput from '../ContentInput/ContentInput'
import {connect} from 'react-redux'

const { Header, Sider, Content } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: '主页',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '热点',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '我的',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <div style={{display:'flex'}}>
          <ListForm/>
          <ContentInput/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );

};

const mapStateToProps = (state:any)=> {
  return {
    list: state.list
  }
}
const mapDispatchToProps = (dispatch:any)=> {
  return {
    updateList: ()=>{
      dispatch({type:'updateList'})
    }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);