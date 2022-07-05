import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private cometChatSource = new BehaviorSubject(null);
  private userSource = new BehaviorSubject<User | null>(null);

  cometChat = this.cometChatSource.asObservable();
  user = this.userSource.asObservable();

  constructor() {}

  changeCometChat(cometChat: any) {
    this.cometChatSource.next(cometChat);
  }

  changeUser(user: User | null) {
    this.userSource.next(user);
  }
}
