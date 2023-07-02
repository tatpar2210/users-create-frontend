import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../dashboard/profile/profile.component';
import { ProfileService } from '../dashboard/profile/profile.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {
  showMenu: boolean = false
  constructor(private router: Router, public dialog: MatDialog, private profileService: ProfileService) { }

  onMenuClick(){
    this.showMenu = this.showMenu ? false : true
  }
  
  profileImagePath: string | undefined

  async ngOnInit(): Promise<void> {
    console.log("hi topbar")
    await this.profileService.fetchProfile().then((result)=> {
      console.log(result)
      this.profileImagePath = result.profile_pic || "../../assets/images/profile.png"    
    })
  }

  logOut(){
    localStorage.removeItem("authToken")
    this.router.navigate(['/', 'login'])
  }

  changePassword(){
    this.router.navigate(['/', 'change-password'])
  }

  dashboard(){
    this.router.navigate(['/', 'dashboard'])
  }

  openProfile(){
    const ref = this.dialog.open(ProfileComponent, {
      width: '1000px',
      height: 'auto',
    });
  }
}
