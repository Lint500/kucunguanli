/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 库存调整响应
 */
export type AdjustStockResponse = {
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
    product_id?: (number | null);
    /**
     * 调整前可用库存
     */
    before_available?: (number | null);
    /**
     * 调整后可用库存
     */
    after_available?: (number | null);
};

