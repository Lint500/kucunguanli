/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 入库响应
 */
export type IncreaseStockResponse = {
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
     * 入库前库存
     */
    before_stock?: (number | null);
    /**
     * 入库后库存
     */
    after_stock?: (number | null);
};

