import { TObject, TProperties, Type } from '@sinclair/typebox';

export type AssembledRequestSchema<REQ extends TProperties, RES extends TProperties> = {
  requestSchema: TObject<REQ>;
  responseSchema: TObject<RES>;
  documentation: string;
  role: string;
};

export const assembleRequestSchema = <REQ extends TProperties, RES extends TProperties>(
  {
    requestSchema, responseSchema, documentation, role,
  }: {
    requestSchema: REQ,
    responseSchema: RES,
    documentation: string;
    role: string;
  }): AssembledRequestSchema<REQ, RES> => ({
  requestSchema: Type.Object(requestSchema),
  responseSchema: Type.Object(responseSchema),
  documentation: documentation.trim(),
  role,
});

export type AssembledBroadcastSchema<T extends TProperties> = {
  dataSchema: TObject<T>;
  documentation: string;
};

export const assembleBroadcastSchema = <T extends TProperties>(
  {
    dataSchema, documentation,
  }: {
    dataSchema: T,
    documentation: string;
  }): AssembledBroadcastSchema<T> => ({
  dataSchema: Type.Object(dataSchema),
  documentation: documentation.trim(),
});
