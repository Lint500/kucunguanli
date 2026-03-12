/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 单个商品库存响应
 */
export type StockResponse = {
    /**
     * 请求是否成功
     */
    success: boolean;
    /**
     * 响应消息
     */
    message?: (string | null);
    /**
     * 仓库ID
     */
    warehouse_id?: (string | null);
    /**
     * 商品ID
     */
    product_id: number;
    /**
     * 可用库存
     */
    available_stock: number;
    /**
     * 预占库存
     */
    reserved_stock?: number;
    /**
     * 冻结库存
     */
    frozen_stock?: number;
    /**
     * 在途库存
     */
    in_transit_stock?: number;
    /**
     * 安全库存
     */
    safety_stock?: number;
    /**
     * 总库存（可用+预占+冻结+在途）
     */
    total_stock?: number;
};

