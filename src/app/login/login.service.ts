import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
// import { ApiRequestService } from 'src/app/util/api-request/api-request.service';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(
    // private apiRequestService: ApiRequestService, 
    private authService: AuthService, 
    private http: HttpClient,
    private router: Router) {}
  
  _url = environment.baseURL + "/user"
  httpOptions: object = localStorage.getItem("authToken") ? {headers: {'x-access-token': localStorage.getItem("authToken")}} : {}
  
  async login(post_data: any, redirect: boolean) {
    this.http
    .post(`${this._url}/login`, post_data, this.httpOptions).pipe(map(responseData => {
      // Converty object to json
      const json_stringified = JSON.stringify(responseData)
      const json_parsed = JSON.parse(json_stringified)
      console.log(json_parsed.data)
      return json_parsed.data
      
    })).subscribe((res) => {
      localStorage.setItem("authToken", res)
      // localStorage.setItem("email", email)
    })
  }
}
