/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdjustStockRequest } from '../models/AdjustStockRequest';
import type { AdjustStockResponse } from '../models/AdjustStockResponse';
import type { BatchReleaseRequest } from '../models/BatchReleaseRequest';
import type { BatchReserveRequest } from '../models/BatchReserveRequest';
import type { BatchReserveResponse } from '../models/BatchReserveResponse';
import type { BatchStockQueryRequest } from '../models/BatchStockQueryRequest';
import type { BatchStockResponse } from '../models/BatchStockResponse';
import type { CpuResponse } from '../models/CpuResponse';
import type { CustomTestRequest } from '../models/CustomTestRequest';
import type { DatabasePoolResponse } from '../models/DatabasePoolResponse';
import type { DiskResponse } from '../models/DiskResponse';
import type { FreezeStockRequest } from '../models/FreezeStockRequest';
import type { FreezeStockResponse } from '../models/FreezeStockResponse';
import type { IncreaseStockRequest } from '../models/IncreaseStockRequest';
import type { IncreaseStockResponse } from '../models/IncreaseStockResponse';
import type { InventoryPerfResponse } from '../models/InventoryPerfResponse';
import type { InventoryPerfTestRequest } from '../models/InventoryPerfTestRequest';
import type { MemoryResponse } from '../models/MemoryResponse';
import type { NetworkResponse } from '../models/NetworkResponse';
import type { OperationResponse } from '../models/OperationResponse';
import type { PaginatedLogsResponse } from '../models/PaginatedLogsResponse';
import type { PerfTestResponse } from '../models/PerfTestResponse';
import type { RedisConnectionResponse } from '../models/RedisConnectionResponse';
import type { SinglePerfTestRequest } from '../models/SinglePerfTestRequest';
import type { StockResponse } from '../models/StockResponse';
import type { StressTestRequest } from '../models/StressTestRequest';
import type { StressTestResponse } from '../models/StressTestResponse';
import type { SystemMetricsResponse } from '../models/SystemMetricsResponse';
import type { UnfreezeStockRequest } from '../models/UnfreezeStockRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class Service {
    /**
     * 查询商品库存
     * 查询指定商品的库存信息。
     *
     * **缓存策略：**
     * - 首先查询 Redis 缓存
     * - 缓存未命中则查询数据库
     * - 查询结果缓存 5 分钟
     *
     * **多仓支持：**
     * - 需要提供 warehouse_id 参数
     * - 返回完整库存信息（可用、预占、冻结、在途、安全库存）
     * @param productId 商品 ID
     * @param warehouseId 仓库 ID
     * @returns StockResponse 查询成功
     * @throws ApiError
     */
    public static getStockApiV1InventoryStockProductIdGet(
        productId: number,
        warehouseId: string = 'WH01',
    ): CancelablePromise<StockResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/inventory/stock/{product_id}',
            path: {
                'product_id': productId,
            },
            query: {
                'warehouse_id': warehouseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 批量查询商品库存
     * 批量查询多个商品的库存数量。
     *
     * **优势：**
     * - 单次请求查询多个商品
     * - Redis 管道优化批量操作
     * - 减少网络往返次数
     *
     * **限制：**
     * - 单次最多查询 100 个商品
     * - 建议按业务场景合理分批
     *
     * **多仓支持：**
     * - 需要提供 warehouse_id 参数
     * @param requestBody
     * @param warehouseId 仓库 ID
     * @returns BatchStockResponse 批量查询成功
     * @throws ApiError
     */
    public static batchGetStocksApiV1InventoryStockBatchPost(
        requestBody: BatchStockQueryRequest,
        warehouseId: string = 'WH01',
    ): CancelablePromise<BatchStockResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/stock/batch',
            query: {
                'warehouse_id': warehouseId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 预占库存
     * 预占指定商品的库存数量，防止超卖。
     *
     * **特点：**
     * - 使用数据库行级锁确保原子性
     * - 支持分布式锁防止并发冲突
     * - 15 分钟后自动过期
     * - 幂等性保证
     *
     * **使用场景：**
     * - 用户下单时预占库存
     * - 购物车结算时锁定商品
     *
     * **多仓支持：**
     * - 需要提供 warehouse_id 参数
     * @param warehouseId 仓库 ID
     * @param productId 商品 ID
     * @param quantity 预占数量
     * @param orderId 订单 ID
     * @returns OperationResponse 预占成功
     * @throws ApiError
     */
    public static reserveStockApiV1InventoryReservePost(
        warehouseId: string,
        productId: number,
        quantity: number,
        orderId: string,
    ): CancelablePromise<OperationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/reserve',
            query: {
                'warehouse_id': warehouseId,
                'product_id': productId,
                'quantity': quantity,
                'order_id': orderId,
            },
            errors: {
                400: `库存不足或重复预占`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 确认库存扣减
     * 确认预占的库存，实际扣减商品库存。
     *
     * **使用场景：**
     * - 用户支付成功后确认订单
     * - 系统自动确认超时订单
     *
     * **注意：**
     * - 只能确认状态为 RESERVED 的预占记录
     * - 确认后预占状态变为 CONFIRMED
     * @param orderId 订单 ID
     * @returns OperationResponse 确认成功
     * @throws ApiError
     */
    public static confirmStockApiV1InventoryConfirmOrderIdPost(
        orderId: string,
    ): CancelablePromise<OperationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/confirm/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                404: `未找到有效的预占记录`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 释放预占库存
     * 释放预占的库存，归还给可用库存。
     *
     * **使用场景：**
     * - 用户取消订单
     * - 订单超时未支付
     * - 系统自动释放过期预占
     *
     * **效果：**
     * - 增加可用库存
     * - 减少预占库存
     * - 更新预占状态为 RELEASED
     * @param orderId 订单 ID
     * @returns OperationResponse 释放成功
     * @throws ApiError
     */
    public static releaseStockApiV1InventoryReleaseOrderIdPost(
        orderId: string,
    ): CancelablePromise<OperationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/release/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                404: `未找到有效的预占记录`,
                422: `Validation Error`,
            },
        });
    }
    /**
     * 入库/补货
     * 增加商品库存，用于入库、补货等场景。
     *
     * **使用场景：**
     * - 采购入库
     * - 退货入库
     * - 调拨入库
     * - 盘点盈亏调整
     *
     * **注意：**
     * - 如果库存记录不存在，会自动创建
     * - 会记录库存变更日志
     * @param requestBody
     * @returns IncreaseStockResponse 入库成功
     * @throws ApiError
     */
    public static increaseStockApiV1InventoryIncreasePost(
        requestBody: IncreaseStockRequest,
    ): CancelablePromise<IncreaseStockResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/increase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 库存调整
     * 手动调整商品库存，支持增加、减少、设置为指定值。
     *
     * **调整类型：**
     * - increase: 增加库存
     * - decrease: 减少库存
     * - set: 设置为指定值
     *
     * **使用场景：**
     * - 盘点修正
     * - 库存纠错
     * - 人工干预
     * @param requestBody
     * @returns AdjustStockResponse 调整成功
     * @throws ApiError
     */
    public static adjustStockApiV1InventoryAdjustPost(
        requestBody: AdjustStockRequest,
    ): CancelablePromise<AdjustStockResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/adjust',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 冻结库存
     * 冻结指定库存，冻结后不可用于预占和销售。
     *
     * **使用场景：**
     * - 待检品
     * - 待定分配
     * - 临时锁定
     *
     * **注意：**
     * - 只能冻结可用库存
     * - 冻结后库存从可用转为冻结状态
     * @param requestBody
     * @returns FreezeStockResponse 冻结成功
     * @throws ApiError
     */
    public static freezeStockApiV1InventoryFreezePost(
        requestBody: FreezeStockRequest,
    ): CancelablePromise<FreezeStockResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/freeze',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 解冻库存
     * 解冻指定库存，解冻后库存回到可用状态。
     *
     * **使用场景：**
     * - 检验通过
     * - 分配取消
     * - 临时锁定释放
     * @param requestBody
     * @returns FreezeStockResponse 解冻成功
     * @throws ApiError
     */
    public static unfreezeStockApiV1InventoryUnfreezePost(
        requestBody: UnfreezeStockRequest,
    ): CancelablePromise<FreezeStockResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/unfreeze',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 批量预占库存
     * 批量预占多个商品库存，保证事务一致性。
     *
     * **特点：**
     * - 全部成功或全部回滚
     * - 支持多仓库
     * - 使用分布式锁防止并发
     *
     * **限制：**
     * - 单次最多 100 个商品
     * - 预占有效期 15 分钟
     * @param requestBody
     * @returns BatchReserveResponse 批量预占成功
     * @throws ApiError
     */
    public static batchReserveStockApiV1InventoryReserveBatchPost(
        requestBody: BatchReserveRequest,
    ): CancelablePromise<BatchReserveResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/reserve-batch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 批量释放预占
     * 批量释放同一订单的所有预占库存。
     *
     * **使用场景：**
     * - 整单取消
     * - 整单退货
     *
     * **特点：**
     * - 一次性释放订单所有商品
     * - 批量操作性能优化
     * @param requestBody
     * @returns any 批量释放成功
     * @throws ApiError
     */
    public static batchReleaseStockApiV1InventoryReleaseBatchPost(
        requestBody: BatchReleaseRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/release-batch',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 查询库存流水
     * 查询库存变更流水日志，支持分页和多种筛选条件。
     *
     * **筛选条件：**
     * - warehouse_id: 仓库 ID
     * - product_id: 商品 ID
     * - order_id: 订单 ID
     * - change_type: 变更类型
     * - start_date/end_date: 时间范围
     *
     * **返回字段：**
     * - 变更前后库存（可用、预占、冻结）
     * - 操作人、来源、备注
     * @param warehouseId 仓库 ID
     * @param productId 商品 ID
     * @param orderId 订单 ID
     * @param changeType 变更类型
     * @param startDate 开始时间 (ISO 格式)
     * @param endDate 结束时间 (ISO 格式)
     * @param page 页码
     * @param pageSize 每页数量
     * @returns PaginatedLogsResponse 查询成功
     * @throws ApiError
     */
    public static getInventoryLogsApiV1InventoryLogsGet(
        warehouseId?: (string | null),
        productId?: (number | null),
        orderId?: (string | null),
        changeType?: (string | null),
        startDate?: (string | null),
        endDate?: (string | null),
        page: number = 1,
        pageSize: number = 50,
    ): CancelablePromise<PaginatedLogsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/inventory/logs',
            query: {
                'warehouse_id': warehouseId,
                'product_id': productId,
                'order_id': orderId,
                'change_type': changeType,
                'start_date': startDate,
                'end_date': endDate,
                'page': page,
                'page_size': pageSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Manual Cleanup
     * 手动触发清理任务（方式二：API 直接调用 Service）
     * @param batchSize
     * @returns any Successful Response
     * @throws ApiError
     */
    public static manualCleanupApiV1InventoryCleanupManualPost(
        batchSize: number = 500,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/cleanup/manual',
            query: {
                'batch_size': batchSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Celery Cleanup
     * 触发 Celery 异步清理任务（方式三：Celery 调用）
     * @param batchSize
     * @returns any Successful Response
     * @throws ApiError
     */
    public static celeryCleanupApiV1InventoryCleanupCeleryPost(
        batchSize: number = 500,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/inventory/cleanup/celery',
            query: {
                'batch_size': batchSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Cleanup Status
     * 查询 Celery 任务执行状态
     * @param taskId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getCleanupStatusApiV1InventoryCleanupStatusTaskIdGet(
        taskId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/inventory/cleanup/status/{task_id}',
            path: {
                'task_id': taskId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 健康检查性能测试
     * 测试健康检查接口的性能
     *
     * - **concurrency**: 并发请求数
     * - **requests**: 总请求数
     *
     * 返回 QPS、延迟、成功率等性能指标
     * @param concurrency 并发数
     * @param requests 请求数
     * @returns PerfTestResponse Successful Response
     * @throws ApiError
     */
    public static testHealthApiV1PerfHealthGet(
        concurrency: number = 100,
        requests: number = 1000,
    ): CancelablePromise<PerfTestResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/perf/health',
            query: {
                'concurrency': concurrency,
                'requests': requests,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 单个 API 性能测试
     * 测试单个 API 的性能
     *
     * 可以指定任意 API 路径、方法和数据进行测试
     * @param requestBody
     * @returns PerfTestResponse Successful Response
     * @throws ApiError
     */
    public static testSingleApiApiV1PerfSinglePost(
        requestBody: SinglePerfTestRequest,
    ): CancelablePromise<PerfTestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/perf/single',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 库存 API 性能测试套件
     * 测试所有库存相关 API 的性能
     *
     * 包括：查询、预占、确认、释放、增加等操作
     * @param requestBody
     * @returns InventoryPerfResponse Successful Response
     * @throws ApiError
     */
    public static testInventoryApisApiV1PerfInventoryPost(
        requestBody: InventoryPerfTestRequest,
    ): CancelablePromise<InventoryPerfResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/perf/inventory',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 阶梯式压力测试
     * 阶梯式压力测试
     *
     * 从低并发到高并发逐步增加，观察系统性能变化
     * @param requestBody
     * @returns StressTestResponse Successful Response
     * @throws ApiError
     */
    public static testStressApiV1PerfStressPost(
        requestBody: StressTestRequest,
    ): CancelablePromise<StressTestResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/perf/stress',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 自定义组合测试
     * 自定义多个 API 的组合测试
     *
     * 可以同时测试多个不同的 API
     * @param requestBody
     * @returns InventoryPerfResponse Successful Response
     * @throws ApiError
     */
    public static testCustomApiV1PerfCustomPost(
        requestBody: CustomTestRequest,
    ): CancelablePromise<InventoryPerfResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/perf/custom',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取测试结果
     * 获取历史测试结果
     * @param filename
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getTestResultApiV1PerfResultsFilenameGet(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/perf/results/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 删除测试结果
     * 删除指定的测试结果
     * @param filename
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteTestResultApiV1PerfResultsFilenameDelete(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/perf/results/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * 获取所有测试结果列表
     * 获取所有测试结果文件列表
     * @returns any Successful Response
     * @throws ApiError
     */
    public static listTestResultsApiV1PerfResultsGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/perf/results',
        });
    }
    /**
     * 获取性能指标说明
     * 获取性能指标详细说明
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getMetricsDescriptionApiV1PerfMetricsSummaryGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/perf/metrics/summary',
        });
    }
    /**
     * 获取 CPU 使用率
     * 获取 CPU 使用率信息
     *
     * 返回 CPU 总体使用率、核心数、频率等信息
     * @returns CpuResponse Successful Response
     * @throws ApiError
     */
    public static getCpuUsageApiV1SystemCpuGet(): CancelablePromise<CpuResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/cpu',
        });
    }
    /**
     * 获取内存使用率
     * 获取内存使用率信息
     *
     * 返回内存总量、可用内存、已使用内存和使用率
     * @returns MemoryResponse Successful Response
     * @throws ApiError
     */
    public static getMemoryUsageApiV1SystemMemoryGet(): CancelablePromise<MemoryResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/memory',
        });
    }
    /**
     * 获取磁盘使用率
     * 获取磁盘使用率信息
     *
     * 返回磁盘总量、已使用空间、可用空间和使用率
     * @returns DiskResponse Successful Response
     * @throws ApiError
     */
    public static getDiskUsageApiV1SystemDiskGet(): CancelablePromise<DiskResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/disk',
        });
    }
    /**
     * 获取网络流量
     * 获取网络流量信息
     *
     * 返回发送/接收的字节数、数据包数、错误数等
     * @returns NetworkResponse Successful Response
     * @throws ApiError
     */
    public static getNetworkTrafficApiV1SystemNetworkGet(): CancelablePromise<NetworkResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/network',
        });
    }
    /**
     * 获取数据库连接池状态
     * 获取数据库连接池状态
     *
     * 返回连接池大小、已借出连接数、溢出连接数等信息
     * @returns DatabasePoolResponse Successful Response
     * @throws ApiError
     */
    public static getDbPoolStatusApiV1SystemDbPoolGet(): CancelablePromise<DatabasePoolResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/db-pool',
        });
    }
    /**
     * 获取 Redis 连接信息
     * 获取 Redis 连接信息
     *
     * 返回 Redis 客户端连接数、内存使用、运行时间等信息
     * @returns RedisConnectionResponse Successful Response
     * @throws ApiError
     */
    public static getRedisInfoApiV1SystemRedisGet(): CancelablePromise<RedisConnectionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/redis',
        });
    }
    /**
     * 获取所有系统指标
     * 获取所有系统监控指标
     *
     * 一次性返回 CPU、内存、磁盘、网络、数据库连接池、Redis 连接等信息
     * @returns SystemMetricsResponse Successful Response
     * @throws ApiError
     */
    public static getAllMetricsApiV1SystemMetricsGet(): CancelablePromise<SystemMetricsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/system/metrics',
        });
    }
}
