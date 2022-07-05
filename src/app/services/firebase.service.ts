import { Injectable } from '@angular/core';

import { auth, realTimeDb, storage } from '../../firebase';
import {
  FirebaseGetDataRealtimeQueryParams,
  FirebaseGetSingleDataWithQueryParams,
  FirebaseInsertParams,
  FirebaseUploadParams,
} from '../models/ServiceParams';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor() {}

  async insert({ key, id, payload }: FirebaseInsertParams) {
    return await realTimeDb.ref(`${key}/${id}`).set(payload);
  }

  async createAccount(email: string, password: string) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async login(email: string, password: string) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async getSingleDataWithQuery({
    key,
    query,
    criteria,
  }: FirebaseGetSingleDataWithQueryParams) {
    if (!criteria) return;
    const snapshot = await realTimeDb
      .ref()
      .child(key)
      .orderByChild(query)
      .equalTo(criteria)
      .get();
    const val = snapshot.val();
    if (val) {
      const keys = Object.keys(val);
      return val[keys[0]];
    }
    return null;
  }

  async getData(key: string) {
    const snapshot = await realTimeDb.ref().child(key).get();
    const val = snapshot.val();
    if (val) {
      const keys = Object.keys(val);
      return keys.map((key) => val[key]);
    }
    return null;
  }

  upload({ key, id, payload, entity, callback }: FirebaseUploadParams) {
    const uploadTask = storage
      .ref(`${key}/${id}`)
      .putString(payload, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {},
      () => {
        storage
          .ref(key)
          .child(id)
          .getDownloadURL()
          .then((url) => {
            callback(entity, url);
          });
      }
    );
  }

  getRef(child: string) {
    return realTimeDb.ref().child(child);
  }

  getDataRealtime(firebaseRef: any, callback: (firebaseVal: any) => {}) {
    firebaseRef.on('value', function (snapshot: any) {
      callback(snapshot.val());
    });
  }

  getDataRealtimeQuery({
    firebaseRef,
    query,
    criteria,
    callback,
  }: FirebaseGetDataRealtimeQueryParams) {
    firebaseRef.current
      .orderByChild(query)
      .equalTo(criteria)
      .on('value', function (snapshot: any) {
        callback(snapshot.val());
      });
  }
}
