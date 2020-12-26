/**
 * @author Padmanaban
 * @email nabanharish@gmail.com
 * @create date 2020-12-27 01:23:46
 * @modify date 2020-12-27 01:23:46
 * @desc [description]
 */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { AppController } from '../app.controller';
import { Job } from '../models/job';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent extends AppController implements OnInit {
  modalRef: BsModalRef;
  jobForm: FormGroup;

  jobs: Array<Job> = [];

  button: string = 'Add';
  job: Job;
  constructor(
    private modalService: BsModalService,
    formBuilder: FormBuilder,
    private apiService: ApiService,
    public toastr: ToastrService
  ) {
    super();
    this.jobForm = formBuilder.group({
      title: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ],
      description: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ],
      image: [
        null,
        Validators.compose([Validators.required, Validators.nullValidator]),
      ],
    });
  }

  user: any;
  roles: any = ApiService.Roles;

  ngOnInit(): void {
    this.user = this.apiService.getCurrentUser;
    this.getJobs();
  }

  openCreateJobModal(template: TemplateRef<any>) {
    this.button = 'Add';
    this.modalRef = this.modalService.show(template);
  }

  createJob() {
    if (this.jobForm.valid) {
      const formData = new FormData();
      formData.append('image', this.jobForm.get('image').value);
      formData.append('title', this.jobForm.get('title').value);
      formData.append('description', this.jobForm.get('description').value);

      if (this.button == 'Add') {
        this.apiService.post('/api/job', formData).subscribe(
          (value) => {
            if (value.status) {
              this.onSuccess(value.message);
              this.modalRef.hide();
              this.page_number = 1;
              this.getJobs();
            } else {
              this.onFailed(value.message);
            }
          },
          (err) => {
            console.error(err);
          }
        );
      } else if (this.button == 'Update') {
        this.apiService.put(`/api/job/${this.job._id}`, formData).subscribe(
          (value) => {
            if (value.status) {
              this.onSuccess(value.message);
              this.modalRef.hide();
              this.page_number = 1;
              this.getJobs();
            } else {
              this.onFailed(value.message);
            }
          },
          (err) => {
            console.error(err);
          }
        );
      }
    } else {
    }
  }

  page_number: number = 1;
  limit: number = 25;

  getJobs() {
    if (this.limit < 0) {
      this.onFailed('Enter a valid limit');
      return
    }
    this.jobs = [];
    this.apiService
      .post('/api/job/filter', {
        page_number: this.page_number,
        limit: this.limit,
      })
      .subscribe(
        (value) => {
          if (value.status) {
            this.jobs = value.data;
          } else {
            this.jobs = [];
            this.page_number = 0;
          }
        },
        (err) => {
          console.error(err);
        }
      );
  }

  next() {
    this.page_number = this.page_number + 1;
    this.getJobs();
  }

  previous() {
    if (this.page_number) {
      this.page_number = this.page_number - 1;
      this.getJobs();
    }
  }

  @ViewChild('template') tmp: TemplateRef<any>;
  onEditJob(job: Job) {
    this.button = 'Update';
    this.job = job;
    this.jobForm.setValue({
      title: job.title,
      description: job.description,
      image: job.image,
    });

    this.modalRef = this.modalService.show(this.tmp);
  }

  onDeleteJob(job: Job) {
    this.apiService.delete(`/api/job/${job._id}`).subscribe(
      (value) => {
        if (value.status) {
          this.jobs = [];
          this.onSuccess(value.message);
          this.getJobs();
        } else {
          this.onFailed(value.message);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.jobForm.get('image').setValue(file);
    }
  }
}
