export interface CreateAccountParams {
  avatar: string;
  cometChat: any;
  fullname: string;
  id: string;
}

export interface FirebaseInsertParams {
  id: string;
  key: string;
  payload: any;
}

export interface FirebaseGetSingleDataWithQueryParams {
  criteria: string;
  key: string;
  query: string;
}

export interface FirebaseUploadParams {
  callback: (entity: any, url: string) => void;
  entity: any;
  id: string;
  key: string;
  payload: any;
}

export interface FirebaseGetDataRealtimeQueryParams {
  callback: (firebaseVal: any) => void;
  criteria: string;
  firebaseRef: any;
  query: string;
}
