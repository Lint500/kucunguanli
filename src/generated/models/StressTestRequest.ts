/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 压力测试请求
 */
export type StressTestRequest = {
    /**
     * API 路径
     */
    path: string;
    /**
     * HTTP 方法
     */
    method?: string;
    /**
     * 请求体数据
     */
    data?: (Record<string, any> | null);
    /**
     * 起始并发数
     */
    start_concurrency?: number;
    /**
     * 最大并发数
     */
    max_concurrency?: number;
    /**
     * 递增步长
     */
    step?: number;
};

