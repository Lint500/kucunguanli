import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>欢迎使用库存管理系统</h1>

      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card
            hoverable
            onClick={() => navigate('/concurrency')}
            style={{ textAlign: 'center' }}
          >
            <Statistic
              title="并发测试"
              value={0}
              suffix="次测试"
              valueStyle={{ color: '#1890ff' }}
            />
            <Button type="link" style={{ marginTop: '16px' }}>
              开始测试 <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            hoverable
            onClick={() => navigate('/inventory')}
            style={{ textAlign: 'center' }}
          >
            <Statistic
              title="库存管理"
              value={0}
              suffix="个商品"
              valueStyle={{ color: '#52c41a' }}
            />
            <Button type="link" style={{ marginTop: '16px' }}>
              管理库存 <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            hoverable
            onClick={() => navigate('/system')}
            style={{ textAlign: 'center' }}
          >
            <Statistic
              title="系统监控"
              value={0}
              suffix="项指标"
              valueStyle={{ color: '#faad14' }}
            />
            <Button type="link" style={{ marginTop: '16px' }}>
              查看监控 <ArrowRightOutlined />
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <Card
            title="快速操作"
            style={{ textAlign: 'center' }}
          >
            <Button
              type="primary"
              onClick={() => navigate('/inventory')}
              style={{ marginBottom: '8px', width: '100%' }}
            >
              增加库存
            </Button>
            <Button
              onClick={() => navigate('/concurrency')}
              style={{ width: '100%' }}
            >
              性能测试
            </Button>
          </Card>
        </Col>
      </Row>

      <Card title="系统简介">
        <p>本系统提供以下核心功能：</p>
        <ul>
          <li><strong>并发测试：</strong>支持单 API、阶梯式压力、自定义组合等多种测试模式</li>
          <li><strong>库存管理：</strong>查询、增加、减少、冻结、解冻、预占、释放等完整操作</li>
          <li><strong>系统监控：</strong>实时监控 CPU、内存、磁盘、网络、数据库连接池、Redis 等指标</li>
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
