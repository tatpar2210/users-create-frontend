import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { ProfileService } from './profile/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor( private dashboardService: DashboardService, private profileService: ProfileService){}
  userData: any = {}
  btnContaninerShow: boolean = false
  
  ngOnInit(): void {
    this.profileService.fetchProfile().then((result)=> {
      this.userData = result
    })
  }
}
