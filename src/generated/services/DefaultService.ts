/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * 健康检查
     * 检查服务是否正常运行
     * @returns any 服务健康
     * @throws ApiError
     */
    public static healthCheckHealthGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * API 根路径
     * API 服务的根路径信息
     * @returns any 成功返回
     * @throws ApiError
     */
    public static readRootGet(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }
}
