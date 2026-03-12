import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Select, Space, Table, message, Row, Col, Tag } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Service } from '../generated/services/Service';

const { Option } = Select;

interface TestRecord {
  key: string;
  api: string;
  concurrency: number;
  requests: number;
  qps: number;
  avgTime: number;
  successRate: string;
  status: string;
}

const ConcurrencyTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [testRecords, setTestRecords] = useState<TestRecord[]>([]);

  const handleSingleTest = async (values: any) => {
    setLoading(true);
    try {
      const response: any = await Service.testSingleApiApiV1PerfSinglePost({
        api_name: 'custom_test',
        path: values.api_path,
        method: values.method,
        concurrency: values.concurrency,
        total_requests: values.requests,
      });

      const newRecord: TestRecord = {
        key: Date.now().toString(),
        api: values.api_path,
        concurrency: values.concurrency,
        requests: values.requests,
        qps: (response as any).qps || 0,
        avgTime: (response as any).average_time_ms || 0,
        successRate: (response as any).success_count && (response as any).total_requests ? (((response as any).success_count / (response as any).total_requests) * 100).toFixed(2) + '%' : '0%',
        status: '完成',
      };

      setTestRecords([newRecord, ...testRecords]);
      message.success('测试完成！');
    } catch (error: any) {
      message.error('测试失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleHealthTest = async (values: any) => {
    setLoading(true);
    try {
      const response: any = await Service.testHealthApiV1PerfHealthGet(
        values.concurrency,
        values.requests
      );

      const newRecord: TestRecord = {
        key: Date.now().toString(),
        api: '/api/v1/perf/health',
        concurrency: values.concurrency,
        requests: values.requests,
        qps: (response as any).qps || 0,
        avgTime: (response as any).average_time_ms || 0,
        successRate: (response as any).success_count && (response as any).total_requests ? (((response as any).success_count / (response as any).total_requests) * 100).toFixed(2) + '%' : '0%',
        status: '完成',
      };

      setTestRecords([newRecord, ...testRecords]);
      message.success('健康检查测试完成！');
    } catch (error: any) {
      message.error('测试失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleInventoryTest = async (values: any) => {
    setLoading(true);
    try {
      const response: any = await Service.testInventoryApisApiV1PerfInventoryPost({
        product_id: 1,
        warehouse_id: values.warehouse_id || 'WH01',
        concurrency: values.concurrency,
        total_requests: values.requests,
      });

      const newRecord: TestRecord = {
        key: Date.now().toString(),
        api: '库存 API 套件',
        concurrency: values.concurrency,
        requests: values.requests,
        qps: (response as any).total_qps || 0,
        avgTime: (response as any).average_time_ms || 0,
        successRate: ((response as any).success_rate || 0) + '%',
        status: '完成',
      };

      setTestRecords([newRecord, ...testRecords]);
      message.success('库存 API 测试完成！');
    } catch (error: any) {
      message.error('测试失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: 'API 路径', dataIndex: 'api', key: 'api' },
    { title: '并发数', dataIndex: 'concurrency', key: 'concurrency' },
    { title: '请求数', dataIndex: 'requests', key: 'requests' },
    { title: 'QPS', dataIndex: 'qps', key: 'qps' },
    { title: '平均耗时 (ms)', dataIndex: 'avgTime', key: 'avgTime' },
    { title: '成功率', dataIndex: 'successRate', key: 'successRate' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color="green">{status}</Tag>,
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>并发性能测试</h1>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="单 API 测试" style={{ marginBottom: '16px' }}>
            <Form onFinish={handleSingleTest} layout="vertical">
              <Form.Item
                name="api_path"
                label="API 路径"
                rules={[{ required: true, message: '请输入 API 路径' }]}
                initialValue="/api/v1/inventory/stock/1"
              >
                <Input placeholder="例如：/api/v1/inventory/stock/1" />
              </Form.Item>

              <Form.Item
                name="method"
                label="请求方法"
                rules={[{ required: true, message: '请选择请求方法' }]}
                initialValue="GET"
              >
                <Select>
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="concurrency"
                label="并发数"
                rules={[{ required: true, message: '请输入并发数' }]}
                initialValue={100}
              >
                <InputNumber min={1} max={1000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="requests"
                label="请求数"
                rules={[{ required: true, message: '请输入请求数' }]}
                initialValue={1000}
              >
                <InputNumber min={1} max={10000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} icon={<PlayCircleOutlined />}>
                  开始测试
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="健康检查测试" style={{ marginBottom: '16px' }}>
            <Form onFinish={handleHealthTest} layout="vertical">
              <Form.Item
                name="concurrency"
                label="并发数"
                rules={[{ required: true, message: '请输入并发数' }]}
                initialValue={100}
              >
                <InputNumber min={1} max={1000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="requests"
                label="请求数"
                rules={[{ required: true, message: '请输入请求数' }]}
                initialValue={1000}
              >
                <InputNumber min={1} max={10000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} icon={<PlayCircleOutlined />}>
                  开始测试
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="库存 API 套件测试" style={{ marginBottom: '16px' }}>
            <Form onFinish={handleInventoryTest} layout="vertical">
              <Form.Item
                name="concurrency"
                label="并发数"
                rules={[{ required: true, message: '请输入并发数' }]}
                initialValue={50}
              >
                <InputNumber min={1} max={500} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="requests"
                label="请求数"
                rules={[{ required: true, message: '请输入请求数' }]}
                initialValue={500}
              >
                <InputNumber min={1} max={5000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="仓库 ID">
                <Select defaultValue="WH01" style={{ width: '100%' }}>
                  <Option value="WH01">WH01（北京仓）</Option>
                  <Option value="WH02">WH02（上海仓）</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} icon={<PlayCircleOutlined />}>
                  开始测试
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Card title="测试结果记录">
        <Table columns={columns} dataSource={testRecords} pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
};

export default ConcurrencyTest;
