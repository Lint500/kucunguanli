import React, { useState } from 'react';
import { Card, Form, Input, InputNumber, Button, Table, Space, Modal, message, Select } from 'antd';
import { PlusOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Service } from '../generated/services/Service';

const { Option } = Select;

interface StockItem {
  key: string;
  product_id: number;
  warehouse_id: string;
  available_stock: number;
  reserved_stock: number;
  frozen_stock: number;
  total_stock: number;
}

const InventoryManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState<StockItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<string>('increase');
  const [form] = Form.useForm();

  const handleQueryStock = async (productId: number, warehouseId = 'WH01') => {
    setLoading(true);
    try {
      const response = await Service.getStockApiV1InventoryStockProductIdGet(productId, warehouseId);

      const newItem: StockItem = {
        key: (response.product_id || 0) + '-' + (response.warehouse_id || ''),
        product_id: response.product_id || 0,
        warehouse_id: response.warehouse_id || '',
        available_stock: response.available_stock || 0,
        reserved_stock: response.reserved_stock || 0,
        frozen_stock: response.frozen_stock || 0,
        total_stock: response.total_stock || 0,
      };

      const existingIndex = stockData.findIndex(item => item.product_id === (response.product_id || 0));
      if (existingIndex >= 0) {
        const newData = [...stockData];
        newData[existingIndex] = newItem;
        setStockData(newData);
      } else {
        setStockData([newItem, ...stockData]);
      }

      message.success('查询成功！');
    } catch (error: any) {
      message.error('查询失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleBatchQuery = async (productIds: number[]) => {
    setLoading(true);
    try {
      const response = await Service.batchGetStocksApiV1InventoryStockBatchPost({
        product_ids: productIds,
      });

      const newItems: StockItem[] = Object.entries(response.data || {}).map(([productId, stock]) => ({
        key: productId + '-WH01',
        product_id: parseInt(productId),
        warehouse_id: 'WH01',
        available_stock: stock as number,
        reserved_stock: 0,
        frozen_stock: 0,
        total_stock: stock as number,
      }));

      setStockData([...newItems, ...stockData.filter(item => !productIds.includes(item.product_id))]);
      message.success('批量查询成功！');
    } catch (error: any) {
      message.error('批量查询失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseStock = async (values: any) => {
    setLoading(true);
    try {
      await Service.increaseStockApiV1InventoryIncreasePost({
        warehouse_id: values.warehouse_id,
        product_id: values.product_id,
        quantity: values.quantity,
        operator: 'admin',
        remark: values.remark,
      });

      message.success('入库成功！');
      setIsModalVisible(false);
      form.resetFields();
      handleQueryStock(values.product_id, values.warehouse_id);
    } catch (error: any) {
      message.error('入库失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustStock = async (values: any) => {
    setLoading(true);
    try {
      await Service.adjustStockApiV1InventoryAdjustPost({
        warehouse_id: values.warehouse_id,
        product_id: values.product_id,
        adjust_type: values.adjust_type,
        quantity: values.quantity,
        reason: values.reason || '库存调整',
        operator: 'admin',
      });

      message.success('调整成功！');
      setIsModalVisible(false);
      form.resetFields();
      handleQueryStock(values.product_id, values.warehouse_id);
    } catch (error: any) {
      message.error('调整失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleFreezeStock = async (values: any) => {
    setLoading(true);
    try {
      await Service.freezeStockApiV1InventoryFreezePost({
        warehouse_id: values.warehouse_id,
        product_id: values.product_id,
        quantity: values.quantity,
        operator: 'admin',
        reason: values.reason || '质量检验',
      });

      message.success('冻结成功！');
      setIsModalVisible(false);
      form.resetFields();
      handleQueryStock(values.product_id, values.warehouse_id);
    } catch (error: any) {
      message.error('冻结失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const handleUnfreezeStock = async (values: any) => {
    setLoading(true);
    try {
      await Service.unfreezeStockApiV1InventoryUnfreezePost({
        warehouse_id: values.warehouse_id,
        product_id: values.product_id,
        quantity: values.quantity,
        operator: 'admin',
        reason: values.reason || '检验通过',
      });

      message.success('解冻成功！');
      setIsModalVisible(false);
      form.resetFields();
      handleQueryStock(values.product_id, values.warehouse_id);
    } catch (error: any) {
      message.error('解冻失败：' + (error.message || '未知错误'));
    } finally {
      setLoading(false);
    }
  };

  const showModal = (type: string) => {
    setModalType(type);
    setIsModalVisible(true);
    form.resetFields();
  };

  const columns = [
    { title: '商品 ID', dataIndex: 'product_id', key: 'product_id' },
    { title: '仓库 ID', dataIndex: 'warehouse_id', key: 'warehouse_id' },
    { title: '可用库存', dataIndex: 'available_stock', key: 'available_stock' },
    { title: '预占库存', dataIndex: 'reserved_stock', key: 'reserved_stock' },
    { title: '冻结库存', dataIndex: 'frozen_stock', key: 'frozen_stock' },
    { title: '总库存', dataIndex: 'total_stock', key: 'total_stock' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: StockItem) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            onClick={() => handleQueryStock(record.product_id, record.warehouse_id)}
          >
            刷新
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>库存管理</h1>

      <Card style={{ marginBottom: '16px' }}>
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal('increase')}>
            增加库存
          </Button>
          <Button icon={<EditOutlined />} onClick={() => showModal('adjust')}>
            调整库存
          </Button>
          <Button onClick={() => showModal('freeze')}>
            冻结库存
          </Button>
          <Button onClick={() => showModal('unfreeze')}>
            解冻库存
          </Button>
        </Space>
      </Card>

      <Card title="查询库存" style={{ marginBottom: '16px' }}>
        <Space wrap>
          <Input
            placeholder="输入商品 ID"
            style={{ width: 200 }}
            onPressEnter={(e) => handleQueryStock(parseInt(e.currentTarget.value))}
          />
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={() => {
              const input = document.querySelector('input[placeholder="输入商品 ID"]') as HTMLInputElement;
              if (input && input.value) {
                handleQueryStock(parseInt(input.value));
              }
            }}
          >
            查询单个
          </Button>
          <Button onClick={() => handleBatchQuery([1, 2, 3, 4, 5])}>
            批量查询 (1-5 号商品)
          </Button>
        </Space>
      </Card>

      <Card title="库存列表">
        <Table
          columns={columns}
          dataSource={stockData}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={
          {
            'increase': '增加库存（入库）',
            'adjust': '调整库存',
            'freeze': '冻结库存',
            'unfreeze': '解冻库存',
          }[modalType]
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={
          {
            'increase': handleIncreaseStock,
            'adjust': handleAdjustStock,
            'freeze': handleFreezeStock,
            'unfreeze': handleUnfreezeStock,
          }[modalType]
        }>
          <Form.Item
            name="warehouse_id"
            label="仓库 ID"
            rules={[{ required: true }]}
            initialValue="WH01"
          >
            <Select>
              <Option value="WH01">WH01（北京仓）</Option>
              <Option value="WH02">WH02（上海仓）</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="product_id"
            label="商品 ID"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入商品 ID" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} placeholder="请输入数量" />
          </Form.Item>

          {modalType === 'adjust' && (
            <Form.Item
              name="adjust_type"
              label="调整类型"
              rules={[{ required: true }]}
              initialValue="increase"
            >
              <Select>
                <Option value="increase">增加库存</Option>
                <Option value="decrease">减少库存</Option>
                <Option value="set">设置为指定值</Option>
              </Select>
            </Form.Item>
          )}

          {(modalType === 'freeze' || modalType === 'unfreeze') && (
            <Form.Item name="reason" label="原因">
              <Input.TextArea rows={2} placeholder="请输入冻结/解冻原因" />
            </Form.Item>
          )}

          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={2} placeholder="请输入备注信息" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                确认
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InventoryManagement;
