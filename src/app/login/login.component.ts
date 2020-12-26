/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:23:49
 * @modify date 2020-12-27 01:23:49
 * @desc [description]
 */
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

import { AppController } from '../app.controller';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AppController implements OnInit {
  loginForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService,
    public toastr: ToastrService
  ) {
    super();
    this.loginForm = formBuilder.group({
      username: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ],
      /*  role: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ], */
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.apiService
        .post('/api/user/login', this.loginForm.value)
        .subscribe((response: any) => {
          if (response.status) {
            this.onSuccess(response.message);
            localStorage.setItem('user', JSON.stringify(response.data));
            this.apiService.setCurrentUser(response.data);
            if (response.data.role == 'ADMIN') {
              this.ngZone.run(() => {
                this.router.navigate(['/admin']);
              });
            } else if (response.data.role == 'USER') {
              this.ngZone.run(() => {
                this.router.navigate(['/user']);
              });
            }
          } else {
            this.onFailed(response.message);
          }
        });
    } else {
      console.error('Form invalid');
    }
  }
}
