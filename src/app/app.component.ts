import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initAuthUser();
    this.initCometChat();
  }

  private initAuthUser(): void {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      this.dataService.changeUser(JSON.parse(authenticatedUser));
    }
  }

  private async initCometChat(): Promise<void> {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${environment.cometChatAppId}`;
    const region = `${environment.cometChatRegion}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        this.dataService.changeCometChat(CometChat);
      },
      (error) => {}
    );
  }
}
