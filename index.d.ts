export interface ApiboxPromise<T = any> extends Promise<ApiboxPromise<T>> {
}

export interface queryData {
  (key: string, operator: string, val: any): object
}

export class Query {
  new(params: string): void;
  get: (objectId: string) => ApiboxPromise;
  set: (filedName: string, filedValue: string) => ApiboxPromise;
  destroy: (objectId: string) => ApiboxPromise;
  save: (parmas?: object) => ApiboxPromise;
  find: () => ApiboxPromise;
  current: () => ApiboxPromise;
  add: (key: string, val: string[]) => void;
  addUnique: () => (key: string, val: string[]) => void;
  remove: (key: string, val: string[]) => void;
  equalTo: (key: string, operator: string, val: any) => object
  or: (...args: object[]) => void;
  and: (...args: object[]) => void;
  select: (...args: string[]) => void;
  containedIn: (key: string, val: string[]) => queryData;
  notContainedIn: (key: string, val: string[]) => queryData;
  exists: (key: string) => queryData;
  doesNotExist: (key: string) => queryData;
  limit: (params: number) => void;
  skip: (params: number) => void;
  order: (...args: string[]) => void;
  include: (...args: string[]) => void;
  count: (limit?: number) => ApiboxPromise;
  statTo: (key: string, val: any) => object;
  saveAll: (items: any[]) => ApiboxPromise;
  updateStorage: (objectId: string) => ApiboxPromise;
  field: (key: string, objectId: string) => object;
  withinKilometers: (field: string, coordinates: string, km?: number) => object
  withinGeoBox: (field: string, coordinates: string, s?: number) => object
  relation: (tableName: string) => ApiboxPromise
}

export class User extends Query {
  new(): void;
  login: (username: string, password: string) => ApiboxPromise;
  register: (params: object) => ApiboxPromise;
  signOrLoginByMobilePhone: (phone: number, smsCode: number) => ApiboxPromise;
  logout: () => void;
  users: () => ApiboxPromise;
  decryption: (params: object) => ApiboxPromise
  requestOpenId: (code: any, params?: string) => ApiboxPromise
  requestEmailVerify: (email: string) => ApiboxPromise
  linkWith: (params: any) => ApiboxPromise
  loginWithWeapp: (code: any, params?: string, str: string) => ApiboxPromise
  upInfo: (params: object) => ApiboxPromise
  openId: () => void;
  auth: (params?: string) => ApiboxPromise
}

export interface operation {
  (parmas: string, op: string): object
}

export class Relation {
  new(tableName: string): void;
  add: (parmas: string) => operation
}

export class Pointer {
  new(tableName: string): void;
  set: (objectId: string) => object
}

export interface functions {
  (funName: string, parmas?: object): ApiboxPromise
}

export class Pay {
  new(price: string, productName: string, body: any): ApiboxPromise
}

export class Socket {
  new(id: string): void;
  updateTable: (tableName: string) => void
  unsubUpdateTable: (tableName: string) => void
  updateRow: (tableName: string, objectId: string) => boid
  unsubUpdateRow: (tableName: string, objectId: string) => boid
  deleteTable: (tableName: string) => void
  unsubDeleteTable: (tableName: string) => void
  deleteRow: (tableName: string, objectId: string) => boid
  unsubDeleteRow: (tableName: string, objectId: string) => boid
  onUpdateTable: (tableName: string, data: any) => any
  onUpdateRow: (tableName: string, objectId: string, data: any) => any
  onUpdateTable: (tableName: string, data: any) => any
  onUpdateTable: (tableName: string, objectId: string, data: any) => any
}

export class File {
  new(name: string, params: any): void;
  save: () => ApiboxPromise;
  destroy: (params: string) => ApiboxPromise;
}


export interface Apibox {
  initialize: (secretKey: string, securityCode: string, masterKey?: string) => void;
  User: User;
  Query: (params: string) => Query;
  push: (params: object) => ApiboxPromise;
  Pointer: (parmas: string) => Pointer;
  Relation: (parmas: string) => Relation;
  requestPasswordReset: (email: object) => ApiboxPromise;
  resetPasswordBySmsCode: (smsCode: string, params: object) => ApiboxPromise;
  updateUserPassword: (objectId: string, params: object) => ApiboxPromise;
  timestamp: () => ApiboxPromise;
  generateCode: (params: object) => ApiboxPromise;
  getAccessToken: () => ApiboxPromise;
  sendWeAppMessage: (parmas: object) => ApiboxPromise;
  refund: (parmas: object) => ApiboxPromise;
  notifyMsg: (parmas: object) => ApiboxPromise;
  requestPasswordReset: (parmas: object) => ApiboxPromise;
  checkMsg: (parmas: string) => ApiboxPromise;
  functions: functions;
  run: functions;
  pay: Pay;
  Socket: (id: string) => Socket;
  geoPoint: (parmas: object) => object;
  requestSmsCode: (parmas: object, options?: any) => ApiboxPromise;
  verifySmsCode: (smscode: string, parmas: object, options?: any) => ApiboxPromise;
  File: (name: string, object: any) => File
}

declare const Apibox: Apibox;

export default Apibox
