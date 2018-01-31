import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private form: FormGroup;
  processing = false;
  private messageClass: string;
  private message: string;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],

      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])]
    });
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['password'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['password'].enable();
  }

  private validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  private validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^([a-zA-Z0-9@*#]{8,35})$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  // Function to submit form
  onSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const user = {
      email: this.form.get('email').value, // E-mail input field
      password: this.form.get('password').value // Password input field
    }

    // Function from authentication service to register user
    this.authService.buttonPushed(user).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);
      }
    });

  }

  ngOnInit() {
  }
}
