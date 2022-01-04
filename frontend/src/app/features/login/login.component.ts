import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = null;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public login(): void {
    const val = this.form.value;

    if (val.login && val.password) {
      // this.authService.login(val.email, val.password).subscribe(() => {
      //   console.log("User is logged in");
      //   this.router.navigateByUrl('/');
      // });
    }
  }
}
