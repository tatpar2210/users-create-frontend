import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    // private apiRequestService: ApiRequestService, 
    private authService: AuthService, 
    private http: HttpClient,
    private router: Router) {}
  
    _url = environment.baseURL + "/user"
    httpOptions: object = localStorage.getItem("authToken") ? {headers: {'x-access-token': localStorage.getItem("authToken")}} : {}
  
    async fetchProfile() {
      this.http
      .get(`${this._url}/profile-get`, this.httpOptions).pipe(map(responseData => {
        // Converty object to json
        const json_stringified = JSON.stringify(responseData)
        const json_parsed = JSON.parse(json_stringified)
        return json_parsed.data
        
      })).subscribe((res) => {
        localStorage.setItem("email", res.email)
      })
    }
}
