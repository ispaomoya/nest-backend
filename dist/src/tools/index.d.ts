export declare const hashPassword: (password: string, saltRounds?: number, pepper?: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string, pepper?: string) => Promise<boolean>;
export declare const toList200: (total: number, pageNum: number, pageSize: number, data: any) => Promise<{
    code: number;
    total: number;
    pageNum: number;
    pageSize: number;
    data: any;
}>;
export declare const toGet200: (data: any) => Promise<{
    code: number;
    data: any;
}>;
export declare const toPost200: () => Promise<{
    code: number;
    message: string;
}>;
export declare const to400: (message?: string) => Promise<never>;
export declare const to404: (message?: string) => Promise<never>;
export declare const to403: () => Promise<never>;
