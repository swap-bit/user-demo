import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntegrationComponent } from './components/integration/integration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IntegrationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-angular';
}
