import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import validator from 'validator';
import { v4 as uuidv4 } from 'uuid';

import { CometchatService } from 'src/app/services/cometchat.service';
import { DataService } from 'src/app/services/data.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UiService } from 'src/app/services/ui.service';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  avatar: any;
  private cometChat: any;

  @ViewChild('aboutRef') aboutRef: ElementRef | undefined;
  @ViewChild('confirmPasswordRef') confirmPasswordRef: ElementRef | undefined;
  @ViewChild('emailRef') emailRef: ElementRef | undefined;
  @ViewChild('filepickerRef') filepickerRef: ElementRef | undefined;
  @ViewChild('fullnameRef') fullnameRef: ElementRef | undefined;
  @ViewChild('passwordRef') passwordRef: ElementRef | undefined;

  @Output() toggleSignUpModal = new EventEmitter<boolean>();

  constructor(
    private cometChatService: CometchatService,
    private dataService: DataService,
    private firebaseService: FirebaseService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getCometChat();
  }

  private getCometChat(): void {
    this.dataService.cometChat.subscribe(
      (cometChat: any) => (this.cometChat = cometChat)
    );
  }

  chooseAvatar(): void {
    this.filepickerRef?.nativeElement.click();
  }

  uploadAvatar(e: any): void {
    const reader = new FileReader();
    if (e?.target?.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      this.avatar = readerEvent?.target?.result;
    };
  }

  async signup(): Promise<void> {
    try {
      const { about, fullname, email, password, confirmPassword } =
        this.getInputs();
      if (
        this.isSignupValid({
          about,
          fullname,
          email,
          password,
          confirmPassword,
        })
      ) {
        const id = uuidv4();
        const createdAccount = { id, fullname, email, about };

        this.uiService.showLoading();

        await this.firebaseService.createAccount(email, password);
        await this.firebaseService.upload({
          key: 'users',
          id,
          payload: this.avatar,
          entity: createdAccount,
          callback: this.onAvatarUploaded(this),
        });

        this.uiService.hideLoading();
        this.uiService.alert(
          `${email} was created successfully! Please sign in with your created account`
        );

        this.closeSignUpModal();
      }
    } catch (error) {
      console.log(error);
      this.uiService.hideLoading();
    }
  }

  getInputs(): {
    about: string;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
  } {
    const about = this.aboutRef?.nativeElement.value;
    const fullname = this.fullnameRef?.nativeElement.value;
    const email = this.emailRef?.nativeElement.value;
    const password = this.passwordRef?.nativeElement.value;
    const confirmPassword = this.confirmPasswordRef?.nativeElement.value;
    return { about, fullname, email, password, confirmPassword };
  }

  isSignupValid = ({
    about,
    fullname,
    email,
    password,
    confirmPassword,
  }: {
    about: string;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (!this.avatar) {
      this.uiService.alert('Please upload your avatar');
      return false;
    }
    if (validator.isEmpty(fullname)) {
      this.uiService.alert('Please input your fullname');
      return false;
    }
    if (!validator.isEmail(email)) {
      this.uiService.alert('Please input your email');
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      this.uiService.alert(
        'Please input your password. You password must have at least 6 characters'
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      this.uiService.alert('Please input your confirm password');
      return false;
    }
    if (password !== confirmPassword) {
      this.uiService.alert('Confirm password and password must be the same');
      return false;
    }
    if (validator.isEmpty(about)) {
      this.uiService.alert('Please input your description');
      return false;
    }
    return true;
  };

  onAvatarUploaded(
    instance: SignupComponent
  ): (entity: User, url: string) => void {
    return async (entity: User, url: string) => {
      entity.image = url;
      await instance.firebaseService.insert({
        key: 'users',
        id: entity.id,
        payload: entity,
      });
      await instance.cometChatService.createAccount({
        cometChat: instance.cometChat,
        id: entity.id,
        fullname: entity.fullname,
        avatar: url,
      });
    };
  }

  closeSignUpModal(): void {
    this.toggleSignUpModal.emit(false);
  }
}
