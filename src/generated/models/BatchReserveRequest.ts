/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BatchReserveItem } from './BatchReserveItem';
/**
 * 批量预占请求
 */
export type BatchReserveRequest = {
    /**
     * 订单 ID
     */
    order_id: string;
    /**
     * 预占商品列表
     */
    items: Array<BatchReserveItem>;
};

