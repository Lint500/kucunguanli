/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 冻结/解冻响应
 */
export type FreezeStockResponse = {
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
     * 操作前冻结库存
     */
    before_frozen?: (number | null);
    /**
     * 操作后冻结库存
     */
    after_frozen?: (number | null);
};

