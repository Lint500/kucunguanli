import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Statistic, Spin, Alert, Button, Descriptions } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { Service } from '../generated/services/Service';

const SystemMonitor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [systemData, setSystemData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const fetchSystemMetrics = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await Service.getAllMetricsApiV1SystemMetricsGet();
      setSystemData(response);
    } catch (err: any) {
      setError('获取系统数据失败：' + (err.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemMetrics();
    const interval = setInterval(fetchSystemMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !systemData) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Spin size="large" tip="加载中..." />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1>系统监控</h1>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={fetchSystemMetrics}
          loading={loading}
        >
          刷新数据
        </Button>
      </div>

      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}

      {systemData && (
        <>
          <Card
            title="CPU 使用率"
            style={{ marginBottom: '16px' }}
            extra={<span style={{ fontSize: '16px', fontWeight: 'bold', color: (systemData.cpu?.usage_percent || 0) < 80 ? '#52c41a' : '#f5222d' }}>{(systemData.cpu?.usage_percent || 0).toFixed(1)}%</span>}
          >
            <Progress
              percent={(systemData.cpu?.usage_percent || 0).toFixed(1)}
              strokeColor={
                (systemData.cpu?.usage_percent || 0) < 60 ? '#52c41a' :
                (systemData.cpu?.usage_percent || 0) < 80 ? '#faad14' : '#f5222d'
              }
            />
            <Descriptions column={3} size="small" style={{ marginTop: '16px' }}>
              <Descriptions.Item label="CPU 核心数">{systemData.cpu?.cores}</Descriptions.Item>
              <Descriptions.Item label="逻辑处理器">{systemData.cpu?.logical_cores}</Descriptions.Item>
              <Descriptions.Item label="频率">{systemData.cpu?.frequency_mhz} MHz</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="内存使用"
            style={{ marginBottom: '16px' }}
            extra={<span style={{ fontSize: '16px', fontWeight: 'bold', color: (systemData.memory?.usage_percent || 0) < 80 ? '#52c41a' : '#f5222d' }}>{(systemData.memory?.usage_percent || 0).toFixed(1)}%</span>}
          >
            <Progress
              percent={(systemData.memory?.usage_percent || 0).toFixed(1)}
              strokeColor={
                (systemData.memory?.usage_percent || 0) < 60 ? '#52c41a' :
                (systemData.memory?.usage_percent || 0) < 80 ? '#faad14' : '#f5222d'
              }
            />
            <Descriptions column={3} size="small" style={{ marginTop: '16px' }}>
              <Descriptions.Item label="总内存">{(systemData.memory?.total_gb || 0).toFixed(2)} GB</Descriptions.Item>
              <Descriptions.Item label="已使用">{(systemData.memory?.used_gb || 0).toFixed(2)} GB</Descriptions.Item>
              <Descriptions.Item label="可用">{(systemData.memory?.available_gb || 0).toFixed(2)} GB</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card
            title="磁盘使用"
            style={{ marginBottom: '16px' }}
            extra={<span style={{ fontSize: '16px', fontWeight: 'bold', color: (systemData.disk?.usage_percent || 0) < 80 ? '#52c41a' : '#f5222d' }}>{(systemData.disk?.usage_percent || 0).toFixed(1)}%</span>}
          >
            <Progress
              percent={(systemData.disk?.usage_percent || 0).toFixed(1)}
              strokeColor={
                (systemData.disk?.usage_percent || 0) < 60 ? '#52c41a' :
                (systemData.disk?.usage_percent || 0) < 80 ? '#faad14' : '#f5222d'
              }
            />
            <Descriptions column={3} size="small" style={{ marginTop: '16px' }}>
              <Descriptions.Item label="总容量">{(systemData.disk?.total_gb || 0).toFixed(2)} GB</Descriptions.Item>
              <Descriptions.Item label="已使用">{(systemData.disk?.used_gb || 0).toFixed(2)} GB</Descriptions.Item>
              <Descriptions.Item label="可用">{(systemData.disk?.free_gb || 0).toFixed(2)} GB</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="网络流量" style={{ marginBottom: '16px' }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="发送数据"
                  value={(systemData.network?.bytes_sent_mb || 0).toFixed(2)}
                  suffix="MB"
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="接收数据"
                  value={(systemData.network?.bytes_recv_mb || 0).toFixed(2)}
                  suffix="MB"
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
            </Row>
          </Card>

          <Card
            title="数据库连接池"
            style={{ marginBottom: '16px' }}
            extra={
              <span style={{ fontSize: '14px' }}>
                使用中：{(systemData.database_pool?.connections_in_use || 0).toString()} / {(systemData.database_pool?.pool_size || 0).toString()}
              </span>
            }
          >
            <Progress
              percent={Number((((systemData.database_pool?.connections_in_use || 0) / ((systemData.database_pool?.pool_size || 1))) * 100).toFixed(1))}
              strokeColor="#1890ff"
            />
            <Descriptions column={3} size="small" style={{ marginTop: '16px' }}>
              <Descriptions.Item label="连接池大小">{systemData.database_pool?.pool_size}</Descriptions.Item>
              <Descriptions.Item label="溢出连接数">{systemData.database_pool?.overflow_count}</Descriptions.Item>
              <Descriptions.Item label="最大溢出数">{systemData.database_pool?.max_overflow}</Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="Redis 连接" style={{ marginBottom: '16px' }}>
            <Descriptions column={3} bordered>
              <Descriptions.Item label="连接数">{systemData.redis?.connected_clients}</Descriptions.Item>
              <Descriptions.Item label="内存使用">{(systemData.redis?.used_memory_mb || 0).toFixed(2)} MB</Descriptions.Item>
              <Descriptions.Item label="运行时间">{systemData.redis?.uptime_days} 天</Descriptions.Item>
              <Descriptions.Item label="命中数">{systemData.redis?.keyspace_hits}</Descriptions.Item>
              <Descriptions.Item label="未命中数">{systemData.redis?.keyspace_misses}</Descriptions.Item>
              <Descriptions.Item label="命中率">
                {(((systemData.redis?.keyspace_hits || 0) / ((systemData.redis?.keyspace_hits || 0) + (systemData.redis?.keyspace_misses || 0) + 0.001)) * 100).toFixed(1)}%
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </>
      )}
    </div>
  );
};

export default SystemMonitor;
