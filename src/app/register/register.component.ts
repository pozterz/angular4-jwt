import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { AuthenticationService } from '../_services/index'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {}
  errors = ''
  loading = false

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout()
  }

  register() {
    this.authenticationService.register(this.model.email, this.model.password, this.model.password_confirmation,this.model.name)
      .subscribe(result => {
        if(result == true) {
          this.router.navigate(['/'])
        } else {
          console.log(result)
        }
      })
  }

}
