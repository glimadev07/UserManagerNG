import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
import { ConfirmDeleteComponent } from '../components/confirm-delete/confirm-delete.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { provideHttpClient, withFetch, HttpClientModule } from '@angular/common/http';
import { PaginatorModule } from 'primeng/paginator';
import { SplitButtonModule } from 'primeng/splitbutton';
import { NotificationComponent } from '../components/notification/notification.component'; // Adicione esta linha

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponent,
    ConfirmDeleteComponent,
    LoginComponent,
    UserComponent,
    NotificationComponent // Adicione esta linha
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    HttpClientModule,
    CheckboxModule,
    FormsModule,
    PaginatorModule,
    SplitButtonModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
