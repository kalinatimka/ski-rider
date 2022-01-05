import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public form: FormGroup = null;
  public imgUrl;
  public selectedFile: File = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      mail: [null, Validators.required],
      password: [null, Validators.required],
      name: [null, Validators.required],
      contact: [null, Validators.required],
    });
  }

  public onSelectImageChange(event) {
    if (event.target.files) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.imgUrl = event.target.result;
      }
    }
  }

  public uploadData(): void {
    if (this.form.invalid) {
      return;
    }

    const values = this.form.value;

    const fd = new FormData();
    fd.append('mail', values.mail);
    fd.append('login', values.name);
    fd.append('password', values.password);
    fd.append('phone', values.contact);
    fd.append('avatar', this.selectedFile, this.selectedFile.name);


    this.http.post(PATH_CONFIG.CREATE_USER_URL, fd, {
      reportProgress: true,
      observe: 'events',
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log(`Upload Progress: ${Math.round(event.loaded / event.total * 100)}%`);
      } else if (event.type === HttpEventType.Response) {
        this.router.navigate(['/login']);
      }
    })
  }
}
