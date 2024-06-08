import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../table/table.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges{

  @Output() userAddEditFlag = new EventEmitter<boolean>();
  @Input() userId: string = '';
  isEdit: boolean = false;
  apiServ = inject(ApiService);
  userForm!: FormGroup;
  destroyRef = inject(DestroyRef);

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['userId'].currentValue) {
      this.isEdit = true;
      const userId = changes['userId'].currentValue;
      this.getUserDetails(userId);
    }
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      if(this.isEdit) {
        this.updateUser(this.userId, this.userForm.value);
      } else {
        this.saveUser(this.userForm.value);
      }
    }
  }

  getUserDetails(id: string) {
    this.apiServ.webServiceCall(`user/${id}`, {}, "USER SAVE",'GET', 'GET')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: any) => {
        const userData: User = response.existingUser;
        this.userForm.patchValue({
          'name': userData.name,
          'email': userData.email,
          'phoneNumber': userData.phoneNumber,
          'address': userData.address
        })
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }

  saveUser(userObj: User) {
    this.apiServ.webServiceCall('user', userObj, "USER SAVE",'POST', 'POST')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: any) => {
        this.userAddEditFlag.emit(true);
        this.userForm.reset();
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }

  updateUser(userId: string, userObj: User) {
    this.apiServ.webServiceCall(`user/${userId}`, userObj, "USER UPDATE",'PUT', 'PUT')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: any) => {
        this.userAddEditFlag.emit(true);
        this.isEdit = false;
        this.userForm.reset();
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
  getErrorMessage(control: string): string {
    const formControl = this.userForm.get(control);
    if (formControl?.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl?.hasError('email')) {
      return 'Not a valid email';
    }
    if (formControl?.hasError('pattern')) {
      return 'Not a valid phone number';
    }
    return '';
  }
  
}
