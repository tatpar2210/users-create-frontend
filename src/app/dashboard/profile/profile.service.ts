import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    // private apiRequestService: ApiRequestService, 
    private authService: AuthService, 
    private http: HttpClient,
    private router: Router) {}
  
    _url = environment.baseURL + "/user"
    httpOptions: object = localStorage.getItem("authToken") ? {headers: {'x-access-token': localStorage.getItem("authToken")}} : {}
  
    async fetchProfile() {
      let respData: any = null
      let apiCall = new Promise((resolve, reject) => {
        this.http
        .get(`${this._url}/profile-get`, this.httpOptions).pipe(map(responseData => {
          // Converty object to json
          const json_stringified = JSON.stringify(responseData)
          const json_parsed = JSON.parse(json_stringified)
          return json_parsed.data
        })).subscribe((result) => {
          resolve(result)
        })
      })

      await apiCall.then((result) => {
        respData = result
      })

      return respData
    }

    async uploadProfileImage(formData: any) {
      let respData: any = null
      let apiCall = new Promise((resolve, reject) => {
        this.http
        .post(`${this._url}/profile-image-upload`,formData, this.httpOptions).pipe(map(responseData => {
          // Converty object to json
          const json_stringified = JSON.stringify(responseData)
          const json_parsed = JSON.parse(json_stringified)
          return json_parsed.data
        })).subscribe((result) => {
          resolve(result)
        })
      })

      await apiCall.then((result) => {
        respData = result
      })

      return respData
    }
  
    async deleteProfileImage() {
      let respData: any = null
      let apiCall = new Promise((resolve, reject) => {
        this.http
        .get(`${this._url}/profile-image-delete`, this.httpOptions).pipe(map(responseData => {
          // Converty object to json
          const json_stringified = JSON.stringify(responseData)
          const json_parsed = JSON.parse(json_stringified)
          return json_parsed.data
        })).subscribe((result) => {
          resolve(result)
        })
      })

      await apiCall.then((result) => {
        respData = result
      })

      return respData
    }

    async changePassword(formData: any) {
      let respData: any = null
      let apiCall = new Promise((resolve, reject) => {
        this.http
        .post(`${this._url}/change-password`,formData, this.httpOptions).pipe(map(responseData => {
          // Converty object to json
          const json_stringified = JSON.stringify(responseData)
          const json_parsed = JSON.parse(json_stringified)
          return json_parsed.data
        })).subscribe((result) => {
          console.log(result)
          resolve(result)
          this.authService.removeAuthToken()
        })
      })

      await apiCall.then((result) => {
        respData = result
      })

      return respData
    }

    async updateProfile(formData: any) {
      let respData: any = null
      let apiCall = new Promise((resolve, reject) => {
        this.http
        .post(`${this._url}/profile-update`,formData, this.httpOptions).pipe(map(responseData => {
          // Converty object to json
          const json_stringified = JSON.stringify(responseData)
          const json_parsed = JSON.parse(json_stringified)
          return json_parsed.data
        })).subscribe((result) => {
          console.log(result)
          resolve(result)
        })
      })

      await apiCall.then((result) => {
        respData = result
      })

      return respData
    }



}
