import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cometChat: any = null;
  user: User | null = null;

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.getCometChat();
    this.getUser();
  }

  getCometChat() {
    this.dataService.cometChat.subscribe(
      (cometChat: any) => (this.cometChat = cometChat)
    );
  }

  getUser() {
    this.dataService.user.subscribe((user: any) => (this.user = user));
  }

  async logout() {
    const isLogout = window.confirm('Do you want to log out ?');
    if (isLogout) {
      await this.cometChat.logout();
      this.removeAuthedInfo();
      this.router.navigate(['/login']);
    }
  }

  async removeAuthedInfo() {
    this.dataService.changeUser(null);
    localStorage.removeItem('auth');
  }
}
