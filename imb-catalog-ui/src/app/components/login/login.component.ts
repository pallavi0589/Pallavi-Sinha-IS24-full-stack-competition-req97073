import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppConstants } from 'src/app/app.constants';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private userService: UserService,
    private router: Router) {
    this.loginForm = this.fb.group({
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }
// The submitForm() method is called when the user clicks on the login button. If the form is valid, it checks the username entered by the user and sets the user information using the UserService and navigates to the home page using the Router.
  submitForm() {
    if(this.loginForm.valid) {
      if((this.loginForm.value.username).toLowerCase() === 'lisa') {
        this.userService.setUser({
          'username': 'lisa',
          'role': 'director'
        });
        this.goToHomePage();
      } else if((this.loginForm.value.username).toLowerCase() === 'alan') {
        this.userService.setUser({
          'username': 'alan',
          'role': 'devopsResource'
        });
        this.goToHomePage();
      } else {
        this.toastr.error('This user doesnot exist');
      }
    } else {
      this.toastr.clear();
      this.toastr.error('Please enter username and password');
    }
  }
//The goToHomePage() method clears any toastr messages and navigates to the product list route.
  goToHomePage() {
    this.toastr.clear();
    this.router.navigate([AppConstants.PRODUCT_LIST_ROUTE]);
  }
}
