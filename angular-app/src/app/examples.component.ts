import { Component } from '@angular/core';
import { Subtraction } from './components/subtraction/subtraction';
import { CommonModule } from '@angular/common';

/**
 * Example component demonstrating different usage modes
 */
@Component({
  selector: 'app-examples',
  imports: [CommonModule, Subtraction],
  template: `
    <div class="examples-container">
      <h2>Usage Examples</h2>
      
      <!-- Example 1: Editable Mode (Practice) -->
      <section class="example">
        <h3>1. Practice Mode (Editable Input)</h3>
        <p>User can change the number of symbols</p>
        <app-subtraction></app-subtraction>
      </section>
      
      <!-- Example 2: Fixed Mode (Test/Exam) -->
      <section class="example">
        <h3>2. Test Mode (Fixed Input: 16)</h3>
        <p>Input is read-only, fixed at 16</p>
        <app-subtraction [initialValue]="16"></app-subtraction>
      </section>
      
      <!-- Example 3: Multiple Problems -->
      <section class="example">
        <h3>3. Multiple Problems (Exam)</h3>
        <p>Multiple fixed problems in sequence</p>
        <div *ngFor="let problem of examProblems; let i = index" class="problem-item">
          <h4>Problem {{ i + 1 }}</h4>
          <app-subtraction [initialValue]="problem"></app-subtraction>
        </div>
      </section>
      
      <!-- Example 4: Dynamic Problem -->
      <section class="example">
        <h3>4. Dynamic Problem (Timed Exercise)</h3>
        <p>Problem changes when correct answer is given</p>
        <button (click)="nextProblem()">Next Problem</button>
        <app-subtraction [initialValue]="currentProblem"></app-subtraction>
      </section>
    </div>
  `,
  styles: [`
    .examples-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .example {
      margin: 40px 0;
      padding: 20px;
      border: 2px solid #ddd;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
    }
    
    .example h3 {
      color: #667eea;
      margin-top: 0;
    }
    
    .problem-item {
      margin: 20px 0;
      padding: 15px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
    }
    
    button {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-bottom: 20px;
    }
    
    button:hover {
      background: #5568d3;
    }
  `]
})
export class ExamplesComponent {
  // Example 3: Exam with multiple problems
  examProblems = [16, 21, 13, 25, 18];
  
  // Example 4: Dynamic problem
  currentProblem = 16;
  
  nextProblem(): void {
    // Generate a random number between 11 and 30
    this.currentProblem = Math.floor(Math.random() * 20) + 11;
  }
}
