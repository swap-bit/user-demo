import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { PdfGenerationComponent } from '../pdf-generation/pdf-generation.component';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf-download',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    PdfGenerationComponent
  ],
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.css']
})
export class PdfDownloadComponent {

  @Input() downloadData: any;
  
  downloadPDF() {
    setTimeout(() => {
      pdfMake.createPdf(this.downloadData).download();
    }, 1000);
  }

}
