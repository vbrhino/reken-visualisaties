import { Component, signal } from '@angular/core';
import { Subtraction } from './components/subtraction/subtraction';

@Component({
  selector: 'app-root',
  imports: [Subtraction],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Reken Visualisaties');
  
  // Example: can pass initialValue to make it read-only
  // initialValue = 15;
}
