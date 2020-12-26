/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:23:57
 * @modify date 2020-12-27 01:23:57
 * @desc [description]
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from './api.service';
import { JobComponent } from './job/job.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.gaurd';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: JobComponent,
    canActivate: [AuthGuard],
    data: { roles: [ApiService.Roles.Admin] },
  },
  {
    path: 'user',
    component: JobComponent,
    canActivate: [AuthGuard],
    data: { roles: [ApiService.Roles.User] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
