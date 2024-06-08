import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfGenerationComponent } from '../pdf-generation/pdf-generation.component';
import { PdfDownloadComponent } from '../pdf-download/pdf-download.component';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export interface User {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    PdfGenerationComponent,
    PdfDownloadComponent,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{

  @Input() dataSource: User[] = [];
  @Output() editObj = new EventEmitter();
  apiServ = inject(ApiService);
  destroyRef = inject(DestroyRef);


  editUser(id: any) {
    this.apiServ.editUserId.set(id);
  }

  deleteUser(id: any) {
    this.apiServ.webServiceCall(`user/${id}`, {}, 'User Delete', 'DELETE', 'DELETE')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (response: any) => {
        this.getUsersList();
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }

  getUsersList() {
    this.apiServ.webServiceCall('user', {}, 'User Mgt', 'GET', 'GET')
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (response: any) => {
        this.dataSource = response.userData;
      },
      error: (err: Error) => {
        console.error(err);
      }
    })
  }
}
