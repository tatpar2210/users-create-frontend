import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AppRoutingModule } from '../app-routing.module';

@Injectable({
  providedIn: "any"
})
export class AuthService {

  constructor(private router: Router) { }


  storeAuthToken(token: any, email: any){
    localStorage.setItem("authToken", token)
    localStorage.setItem("email", email)
  }

  removeAuthToken(){
    localStorage.removeItem("authToken")
    localStorage.removeItem("email")
    this.router.navigate(['/', 'login'])
  }

  getAuthToken(){
    return localStorage.getItem("authToken")
  }

  checkAuthToken(){
    return localStorage.getItem("authToken") ? true : false
  }

  getUserName(){
    return localStorage.getItem("username")
  }
}
