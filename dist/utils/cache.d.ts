export declare const cacheSet: (key: string, value: any, expiry?: number) => Promise<void>;
export declare const cacheGet: (key: string) => Promise<any>;
export declare const cacheDelete: (key: string) => Promise<void>;
