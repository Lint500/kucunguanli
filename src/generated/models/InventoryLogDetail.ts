/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 库存变更日志详情
 */
export type InventoryLogDetail = {
    id: number;
    /**
     * 仓库ID
     */
    warehouse_id?: (string | null);
    product_id: number;
    order_id: (string | null);
    change_type: string;
    quantity: number;
    before_available: number;
    after_available: number;
    /**
     * 变更前预占库存
     */
    before_reserved?: number;
    /**
     * 变更后预占库存
     */
    after_reserved?: number;
    /**
     * 变更前冻结库存
     */
    before_frozen?: number;
    /**
     * 变更后冻结库存
     */
    after_frozen?: number;
    /**
     * 备注
     */
    remark?: (string | null);
    created_at: string;
    operator: (string | null);
    source: (string | null);
};

