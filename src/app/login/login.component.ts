// src/app/login/login.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../user/model/user.model';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showRegisterForm = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/user']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const sub = this.authService.login(this.f['username'].value, this.f['senha'].value)
      .subscribe({
        next: () => {
          this.router.navigate(['/user']);
        },
        error: (error) => {
          this.error = error.error.error.error;
          this.loading = false;
        }
      });
    this.subscriptions.push(sub);
  }

  openRegisterForm() {
    this.showRegisterForm = true;
  }

  closeRegisterForm() {
    this.showRegisterForm = false;
  }


}
