import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, ExperimentOutlined, InboxOutlined, MonitorOutlined } from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import ConcurrencyTest from './pages/ConcurrencyTest';
import InventoryManagement from './pages/InventoryManagement';
import SystemMonitor from './pages/SystemMonitor';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{
          display: 'flex',
          alignItems: 'center',
          background: '#001529',
          padding: '0 24px'
        }}>
          <div style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            marginRight: '40px'
          }}>
            库存管理系统
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[window.location.pathname]}
            style={{ flex: 1, minWidth: 0 }}
          >
            <Menu.Item key="/" icon={<DashboardOutlined />}>
              主页
            </Menu.Item>
            <Menu.Item key="/concurrency" icon={<ExperimentOutlined />}>
              并发测试
            </Menu.Item>
            <Menu.Item key="/inventory" icon={<InboxOutlined />}>
              库存管理
            </Menu.Item>
            <Menu.Item key="/system" icon={<MonitorOutlined />}>
              系统监控
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/concurrency" element={<ConcurrencyTest />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/system" element={<SystemMonitor />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
