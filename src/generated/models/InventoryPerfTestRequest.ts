/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 库存性能测试请求
 */
export type InventoryPerfTestRequest = {
    /**
     * 商品 ID
     */
    product_id?: number;
    /**
     * 仓库 ID
     */
    warehouse_id?: string;
    /**
     * 并发数
     */
    concurrency?: number;
    /**
     * 总请求数
     */
    total_requests?: number;
};

