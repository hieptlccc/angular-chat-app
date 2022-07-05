import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { CreateAccountParams } from '../models/ServiceParams';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CometchatService {
  constructor() {}

  async createAccount({
    cometChat,
    id,
    fullname,
    avatar,
  }: CreateAccountParams): Promise<void> {
    const authKey = `${environment.cometChatAuthKey}`;
    const user = new cometChat.User(id);
    user.setName(fullname);
    user.setAvatar(avatar);
    return await cometChat.createUser(user, authKey);
  }

  async login(cometChat: any, user: User): Promise<void> {
    if (!user) return;
    const authKey = `${environment.cometChatAuthKey}`;
    return await cometChat.login(user.id, authKey);
  }
}
