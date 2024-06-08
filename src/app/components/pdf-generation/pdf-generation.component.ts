import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { User } from '../table/table.component';
import { ApiService } from '../../services/api.service';
import { PdfDownloadComponent } from '../pdf-download/pdf-download.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pdf-generation',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    PdfDownloadComponent
  ],
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.css']
})
export class PdfGenerationComponent {

  userData: string[][] = [];
  pdfObj: any;
  apiServ = inject(ApiService);
  destroyRef = inject(DestroyRef);

  
  generatePDF() {
    this.apiServ.webServiceCall('user', {}, 'User Mgt', 'GET', 'GET')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: any) => {
        let data: User[] = response.userData;
        let header = Object.keys(data[0]).map(key => key.toUpperCase());
        header.pop();
        header.shift();
        this.userData.push(header);
        data.forEach(user => {
          const row: string [] = [];
          row.push(user.name);
          row.push(user.email);
          row.push(user.phoneNumber);
          row.push(user.address);
          this.userData.push(row);
        });
        this.pdfObj = {
          content: [
            {
              layout: 'lightHorizontalLines', // optional
              table: {
                headerRows: 1,
                widths: ['*', '*', '*', '*'],
                body: this.userData
              }
            }
          ]
        }
        console.log(this.pdfObj);
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
  viewPDF() {
    
  }
}
