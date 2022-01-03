import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  variant: string = 'LOGIN';
  isOpen: boolean = false;

  userForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  ngOnInit() {}

  onSubmit(): void {
    console.warn('Your order has been submitted', this.userForm.value);
    this.userForm.reset();
    this.isOpen = false;
  }

  toggleLoginRegister(): void {
    this.variant = this.variant === 'REGISTER' ? 'LOGIN' : 'REGISTER';
  }

  showLoginOverlay(): void {
    this.isOpen = true;
    this.variant = 'LOGIN'
  }

  showRegisterOverlay(): void {
    this.isOpen = true;
    this.variant = 'REGISTER'
  }

  closeOverlay(): void {
    this.isOpen = false;
  }

}
