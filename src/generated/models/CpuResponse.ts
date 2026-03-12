/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * CPU 使用率响应
 */
export type CpuResponse = {
    success?: boolean;
    timestamp?: string;
    cpu_percent?: number;
    cpu_count?: number;
    cpu_freq?: (Record<string, any> | null);
    per_cpu?: null;
};

