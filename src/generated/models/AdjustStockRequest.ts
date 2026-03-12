/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 库存调整请求
 */
export type AdjustStockRequest = {
    /**
     * 仓库 ID
     */
    warehouse_id: string;
    /**
     * 商品 ID
     */
    product_id: number;
    /**
     * 调整类型：increase(增加) / decrease(减少) / set(设置为)
     */
    adjust_type: string;
    /**
     * 调整数量
     */
    quantity: number;
    /**
     * 调整原因
     */
    reason: string;
    /**
     * 操作人
     */
    operator?: (string | null);
};

