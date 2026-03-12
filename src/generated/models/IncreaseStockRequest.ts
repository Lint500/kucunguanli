/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 入库/补货请求
 */
export type IncreaseStockRequest = {
    /**
     * 仓库 ID
     */
    warehouse_id: string;
    /**
     * 商品 ID
     */
    product_id: number;
    /**
     * 入库数量
     */
    quantity: number;
    /**
     * 入库单号（可选）
     */
    order_id?: (string | null);
    /**
     * 操作人
     */
    operator?: (string | null);
    /**
     * 备注
     */
    remark?: (string | null);
};

