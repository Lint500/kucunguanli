/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 批量库存查询响应
 */
export type BatchStockResponse = {
    /**
     * 请求是否成功
     */
    success: boolean;
    /**
     * 响应消息
     */
    message?: (string | null);
    /**
     * 商品ID到库存数量的映射
     */
    data: Record<string, number>;
};

