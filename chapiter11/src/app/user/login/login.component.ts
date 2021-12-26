import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.createForm();
   }

  ngOnInit(): void { }

  createForm(): void {
    this.loginForm = this.fb.group( {
      name : [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  login() {
    this.userService.getAccount().subscribe(
      (data: Account) => {
        if((data.login === this.username.value)&&
          (data.password === this.password.value)) {
            console.log('Successfully logged in');
            this.router.navigate(['stock-list'], {
              queryParams: {page: 1}
            }
            );
            localStorage.setItem("auth", "success");
          } else {
            localStorage.setItem("auth","failure");
            console.error('Error logging in');
          }
      }
    );
  }

  get username() { return this.loginForm.get('name');}
  get password() { return this.loginForm.get('password');}

}
