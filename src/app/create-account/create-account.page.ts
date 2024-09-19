import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  createAccountForm: FormGroup;
  selectedCountry: string ='';
  countries: string[] = ["Haiti","United States", "Canada", "Mexico", "France", "Germany", "Brazil", "India", "China", "Australia"];

  //, private authService: AuthService

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize the form with validators
    this.createAccountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, Validators.requiredTrue], // Ensure the user agrees to the terms
    });
  }

  // This function will be called when the form is submitted
  onCreateAccount() {
    if (this.createAccountForm.valid) {
      console.log("Selected Country:", this.selectedCountry);
      const { firstName, lastName, email, password } = this.createAccountForm.value;
      
      // // Call your AuthService to handle user registration (mocked for now)
      // this.authService.register({ firstName, lastName, email, password }).subscribe(
      //   response => {
      //     console.log('User created successfully:', response);
      //     // Redirect to success page or login after account creation
      //     this.router.navigate(['/tabs']);
      //   },
      //   error => {
      //     console.error('Error creating account:', error);
      //   }
      // );
    } else {
      console.log('Form is not valid');
    }
  }

  // This function will navigate the user to the login page
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
