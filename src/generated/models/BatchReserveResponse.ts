/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchReserveItemResponse } from './BatchReserveItemResponse';
/**
 * 批量预占响应
 */
export type BatchReserveResponse = {
    /**
     * 请求是否成功
     */
    success: boolean;
    /**
     * 响应消息
     */
    message?: (string | null);
    /**
     * 订单ID
     */
    order_id?: (string | null);
    /**
     * 总商品数
     */
    total_items?: (number | null);
    /**
     * 成功商品数
     */
    success_items?: (number | null);
    /**
     * 失败商品数
     */
    failed_items?: (number | null);
    /**
     * 详细结果
     */
    details?: (Array<BatchReserveItemResponse> | null);
};

