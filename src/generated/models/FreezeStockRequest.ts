/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 冻结库存请求
 */
export type FreezeStockRequest = {
    /**
     * 仓库 ID
     */
    warehouse_id: string;
    /**
     * 商品 ID
     */
    product_id: number;
    /**
     * 冻结数量
     */
    quantity: number;
    /**
     * 冻结原因
     */
    reason?: (string | null);
    /**
     * 操作人
     */
    operator?: (string | null);
};

