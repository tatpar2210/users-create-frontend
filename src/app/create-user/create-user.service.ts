import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ApiRequestService } from 'src/app/util/api-request/api-request.service';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  constructor(private http: HttpClient, private router: Router, 
    private authService: AuthService, private apiRequestService: ApiRequestService
    ) {}
  httpOptions: object = localStorage.getItem("authToken") ? {headers: {'x-access-token': localStorage.getItem("authToken")}} : {}
  _url = environment.baseURL + "/user"

  async register(post_data: any) {
    this.http
    .post(`${this._url}/register`, post_data, this.httpOptions).subscribe((response) => {
      console.log(response)
      this.authService.removeAuthToken()
      this.router.navigate(['/', 'login'])
    })
  }
}
