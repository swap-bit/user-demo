import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule

@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [
    CommonModule,
    // PdfViewerModule
  ],
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent {

  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

}
