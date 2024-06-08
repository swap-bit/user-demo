import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, User } from '../table/table.component';
import { FormComponent } from '../form/form.component';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-integration',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TableComponent,
    FormComponent
  ],
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent implements OnInit{

  @Input() id!: string;

  tableData: User[] = [];
  apiServ = inject(ApiService);

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.apiServ.webServiceCall('user', {}, 'User Mgt', 'GET', 'GET').subscribe({
      next: (response: any) => {

        this.tableData = response.userData;
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
  
  handleFormSubmit(userAddEditFlag: boolean) {
    if(userAddEditFlag) {
      this.getUsersList();
    }
  }
}
