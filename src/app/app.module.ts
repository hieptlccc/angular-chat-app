import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { CometChatUI } from 'src/cometchat-pro-angular-ui-kit/CometChatWorkspace/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CometChatUI],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
