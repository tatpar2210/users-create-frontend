import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  
  constructor(private toastService: ToastrService, private http: HttpClient) { }

  httpOptions: object = localStorage.getItem("authToken") ? {headers: {'x-access-token': localStorage.getItem("authToken")}} : {}


  async sendGETRequest(_url: string, showToastr: boolean) {
    // document.getElementById("dashboard-spinner").style.display = "flex"
    let result = await this.http
    .get(_url, this.httpOptions)
    .pipe(
      map(responseData => {
        // if(showToastr) this.toastService.success(responseData['msg'] || '', "Success")
        const json_stringified = JSON.stringify(responseData);
        const json_parsed = JSON.parse(json_stringified);
        return json_parsed.data
      }, (err: { error: { msg: string | undefined; }; }) => {
        this.toastService.error(err.error.msg, "Error")
      })
    ).toPromise()

    // document.getElementById("dashboard-spinner").style.display = "none"
    return result
  }

  async sendPOSTRequest(_url: string, post_data: any, showToastr: boolean) {
    // document.getElementById("dashboard-spinner").style.display = "flex"
    let result = await this.http
    .post(_url, post_data, this.httpOptions).subscribe((response) => {
      console.log(response)
    })
    
    
    
    // pipe(
    //   tap(responseData => {
    //     // if(showToastr) this.toastService.success(responseData['msg'] || '', "Success")
    //     const json_stringified = JSON.stringify(responseData);
    //     const json_parsed = JSON.parse(json_stringified);
    //     return json_parsed.data
    //   }, err => {
    //     this.toastService.error(err.error.msg, "Error")
    //   })
    //   ).toPromise()

      // document.getElementById("dashboard-spinner").style.display = "none"      
    return result
  }
}
