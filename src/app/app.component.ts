/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:23:59
 * @modify date 2020-12-27 01:23:59
 * @desc [description]
 */
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'job-protal-ui';

  user: any;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private ngZone: NgZone
  ) {
    setTheme('bs4');

    this.user = apiService.userStream.subscribe((value) => {
      this.user = value;
    });


  

    /* if (!this.user && !environment.production) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: 'Naban',
        })
      );
    } */

    apiService.setCurrentUser(JSON.parse(localStorage.getItem('user')));
  }

  logout(): void {
    if (this.user) {
      localStorage.removeItem('user');
      this.apiService.setCurrentUser(null);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    }
  }
}
