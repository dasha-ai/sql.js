/// <reference types="emscripten" />

export type ValueType = number | string | Uint8Array | null;
export type ParamsObject = Record<string, ValueType>;
export type ParamsCallback = (obj: ParamsObject) => void;
export type Config = Partial<EmscriptenModule>;

export interface QueryResults {
  columns: string[];
  values: ValueType[][];
}

export interface Database {
  run(sql: string): Database;
  run(sql: string, params: ParamsObject): Database;
  run(sql: string, params: ValueType[]): Database;

  exec(sql: string): QueryResults[];

  each(sql: string, callback: ParamsCallback, done: () => void): void;
  each(
    sql: string,
    params: ParamsObject,
    callback: ParamsCallback,
    done: () => void
  ): void;
  each(
    sql: string,
    params: ValueType[],
    callback: ParamsCallback,
    done: () => void
  ): void;

  prepare(sql: string): Statement;
  prepare(sql: string, params: ParamsObject): Statement;
  prepare(sql: string, params: ValueType[]): Statement;

  export(): Uint8Array;

  close(): void;

  getRowsModified(): number;

  create_function(name: string, func: Function): void;
}

export interface DatabaseConstructor {
  new (): Database;
  new (data?: Uint8Array | null): Database;
  new (data?: number[] | null): Database;
}

export interface Statement {
  bind(): boolean;
  bind(values: ParamsObject): boolean;
  bind(values: ValueType[]): boolean;

  step(): boolean;

  get(): ValueType[];
  get(params: ParamsObject): ValueType[];
  get(params: ValueType[]): ValueType[];

  getColumnNames(): string[];

  getAsObject(): ParamsObject;
  getAsObject(params: ParamsObject): ParamsObject;
  getAsObject(params: ValueType[]): ParamsObject;

  run(): void;
  run(values: ParamsObject): void;
  run(values: ValueType[]): void;

  reset(): void;

  freemem(): void;

  free(): boolean;
}

export interface StatementConstructor {
  new (): Statement;
}

export interface SqlJs {
  Database: DatabaseConstructor;
  Statement: StatementConstructor;
}

export default function initSqlJs(config?: Config): Promise<SqlJs>;
