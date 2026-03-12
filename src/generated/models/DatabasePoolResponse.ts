/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * 数据库连接池响应
 */
export type DatabasePoolResponse = {
    success?: boolean;
    timestamp?: string;
    pool_size?: number;
    checked_in?: number;
    checked_out?: number;
    overflow?: number;
    invalid?: number;
};

