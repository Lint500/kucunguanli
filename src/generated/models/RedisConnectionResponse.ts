/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Redis 连接响应
 */
export type RedisConnectionResponse = {
    success?: boolean;
    timestamp?: string;
    connected_clients?: number;
    used_memory?: number;
    used_memory_human?: string;
    total_connections_received?: number;
    total_commands_processed?: number;
    uptime_seconds?: number;
    version?: string;
};

