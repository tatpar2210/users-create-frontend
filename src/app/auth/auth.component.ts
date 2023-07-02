import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router, private toastService: ToastrService) { }

  logOut(){
    this.authService.removeAuthToken()
  } 
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log(localStorage.getItem("authToken"))
    console.log("hi")
    if(localStorage.getItem("authToken")) {
      return true
    }else {
      this.router.navigateByUrl("/login")
      return false
    }
  }

  canActivateForgotPassword(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem("email") && localStorage.getItem("forgot-password-otp")) {
      return true
    }else {
      this.router.navigateByUrl("/login")
      return false
    }
  }
}
