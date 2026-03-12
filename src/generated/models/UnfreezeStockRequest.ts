/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 解冻库存请求
 */
export type UnfreezeStockRequest = {
    /**
     * 仓库 ID
     */
    warehouse_id: string;
    /**
     * 商品 ID
     */
    product_id: number;
    /**
     * 解冻数量
     */
    quantity: number;
    /**
     * 解冻原因
     */
    reason?: (string | null);
    /**
     * 操作人
     */
    operator?: (string | null);
};

