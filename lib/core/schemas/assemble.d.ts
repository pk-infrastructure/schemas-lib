import { TObject, TProperties } from '@sinclair/typebox';
export type AssembledRequestSchema<REQ extends TProperties, RES extends TProperties> = {
    requestSchema: TObject<REQ>;
    responseSchema: TObject<RES>;
    documentation: string;
    role: string;
};
export declare const assembleRequestSchema: <REQ extends TProperties, RES extends TProperties>({ requestSchema, responseSchema, documentation, role, }: {
    requestSchema: REQ;
    responseSchema: RES;
    documentation: string;
    role: string;
}) => AssembledRequestSchema<REQ, RES>;
export type AssembledBroadcastSchema<T extends TProperties> = {
    dataSchema: TObject<T>;
    documentation: string;
};
export declare const assembleBroadcastSchema: <T extends TProperties>({ dataSchema, documentation, }: {
    dataSchema: T;
    documentation: string;
}) => AssembledBroadcastSchema<T>;
