import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import validator from 'validator';

import { CometchatService } from 'src/app/services/cometchat.service';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UiService } from 'src/app/services/ui.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('emailRef') emailRef: ElementRef | undefined;
  @ViewChild('passwordRef') passwordRef: ElementRef | undefined;

  private cometChat: any;

  isSignUpShown: boolean = false;

  constructor(
    private cometChatService: CometchatService,
    private dataService: DataService,
    private firebaseService: FirebaseService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthenticatedUser();
    this.getCometChat();
  }

  private checkAuthenticatedUser(): void {
    if (localStorage.getItem('auth')) {
      this.router.navigate(['/']);
    } else {
      this.dataService.changeUser(null);
    }
  }

  private getCometChat(): void {
    this.dataService.cometChat.subscribe(
      (cometChat: any) => (this.cometChat = cometChat)
    );
  }

  async login(): Promise<void> {
    try {
      this.uiService.showLoading();
      const { email, password } = this.getInputs();
      if (this.isUserCredentialsValid(email, password)) {
        await this.firebaseService.login(email, password);
        const user = await this.firebaseService.getSingleDataWithQuery({
          key: 'users',
          query: 'email',
          criteria: email,
        });
        await this.cometChatService.login(this.cometChat, user);
        this.saveAuthedInfo(user);
        this.uiService.hideLoading();
        this.router.navigate(['/']);
      } else {
        this.uiService.hideLoading();
        this.uiService.alert(`Your user's name or password is not correct`);
      }
    } catch (error) {
      this.uiService.hideLoading();
    }
  }

  getInputs(): { email: string; password: string } {
    const email = this.emailRef?.nativeElement.value;
    const password = this.passwordRef?.nativeElement.value;
    return { email, password };
  }

  isUserCredentialsValid(email: string, password: string): string | boolean {
    return validator.isEmail(email) && password;
  }

  saveAuthedInfo(user: User): void {
    this.dataService.changeUser(user);
    localStorage.setItem('auth', JSON.stringify(user));
  }

  toggleSignUpModal(isSignUpShown: boolean): void {
    this.isSignUpShown = isSignUpShown;
  }
}
