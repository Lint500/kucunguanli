/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 单个性能测试请求
 */
export type SinglePerfTestRequest = {
    /**
     * API 名称
     */
    api_name: string;
    /**
     * HTTP 方法
     */
    method?: string;
    /**
     * API 路径
     */
    path: string;
    /**
     * 请求体数据
     */
    data?: (Record<string, any> | null);
    /**
     * 并发数
     */
    concurrency?: number;
    /**
     * 总请求数
     */
    total_requests?: number;
    /**
     * 超时时间 (秒)
     */
    timeout?: number;
};

