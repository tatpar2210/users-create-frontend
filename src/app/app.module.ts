import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ProfileModule } from './dashboard/profile/profile.module';
import { ChangePasswordScreenComponent } from './change-password-screen/change-password-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    DashboardComponent,
    TopbarComponent,
    AuthComponent, 
    ChangePasswordScreenComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component:LoginComponent},
      {path: 'create-user', component: CreateUserComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthComponent]},
      {path: 'change-password', component: ChangePasswordScreenComponent, canActivate: [AuthComponent]},
    ]),
    MatButtonModule, 
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    ProfileModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [AuthComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
