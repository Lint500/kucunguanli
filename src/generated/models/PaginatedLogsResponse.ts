/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryLogDetail } from './InventoryLogDetail';
/**
 * 分页库存流水响应
 */
export type PaginatedLogsResponse = {
    success?: boolean;
    /**
     * 日志列表
     */
    data: Array<InventoryLogDetail>;
    /**
     * 总记录数
     */
    total: number;
    /**
     * 当前页码
     */
    page: number;
    /**
     * 每页数量
     */
    page_size: number;
    /**
     * 总页数
     */
    total_pages: number;
};

