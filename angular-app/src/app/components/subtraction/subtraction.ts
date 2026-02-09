import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipBar } from '../tip-bar/tip-bar';
import { ProblemType } from '../../enums/problem-type.enum';
import { ProblemClassifierService } from '../../services/problem-classifier.service';

interface Symbol {
  id: number;
}

@Component({
  selector: 'app-subtraction',
  imports: [CommonModule, FormsModule, TipBar],
  templateUrl: './subtraction.html',
  styleUrl: './subtraction.css',
})
export class Subtraction implements OnInit, OnChanges {
  // Input: if provided, the input field is read-only
  @Input() initialValue?: number;
  
  // Constants
  readonly MAX_SYMBOLS = 50;
  
  // State
  currentValue: number = 10;
  symbols: Symbol[] = [];
  removedSymbols: Symbol[] = [];
  userAnswer: string = '';
  feedback: string = '';
  feedbackClass: string = '';
  
  // Problem classification
  problemType: ProblemType = ProblemType.ONBEKEND;
  
  // Computed values
  get remainingCount(): number {
    return this.symbols.length;
  }
  
  get removedCount(): number {
    return this.removedSymbols.length;
  }
  
  get correctAnswer(): number {
    return this.currentValue - this.removedCount;
  }
  
  get isInputReadOnly(): boolean {
    return this.initialValue !== undefined;
  }
  
  constructor(private problemClassifier: ProblemClassifierService) {}
  
  ngOnInit(): void {
    if (this.initialValue !== undefined) {
      this.currentValue = this.initialValue;
    }
    this.generateSymbols();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue'] && !changes['initialValue'].firstChange) {
      this.currentValue = this.initialValue || 10;
      this.generateSymbols();
    }
  }
  
  onInputChange(): void {
    const value = Math.min(Math.max(this.currentValue, 0), this.MAX_SYMBOLS);
    if (value !== this.currentValue) {
      this.currentValue = value;
    }
    this.generateSymbols();
  }
  
  increment(): void {
    if (this.currentValue < this.MAX_SYMBOLS) {
      this.currentValue++;
      this.generateSymbols();
    }
  }
  
  decrement(): void {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.generateSymbols();
    }
  }
  
  private generateSymbols(): void {
    this.symbols = Array.from({ length: this.currentValue }, (_, i) => ({ id: i }));
    this.removedSymbols = [];
    this.feedback = '';
    this.feedbackClass = '';
    this.userAnswer = '';
    this.updateProblemType();
  }
  
  moveToRemoved(symbol: Symbol): void {
    const index = this.symbols.indexOf(symbol);
    if (index > -1) {
      this.symbols.splice(index, 1);
      this.removedSymbols.push(symbol);
      this.updateProblemType();
      this.clearFeedback();
    }
  }
  
  moveToRemaining(symbol: Symbol): void {
    const index = this.removedSymbols.indexOf(symbol);
    if (index > -1) {
      this.removedSymbols.splice(index, 1);
      this.symbols.push(symbol);
      this.updateProblemType();
      this.clearFeedback();
    }
  }
  
  private updateProblemType(): void {
    this.problemType = this.problemClassifier.classifySubtraction(
      this.currentValue, 
      this.removedCount
    );
  }
  
  private clearFeedback(): void {
    this.feedback = '';
    this.feedbackClass = '';
  }
  
  checkAnswer(): void {
    const answer = parseInt(this.userAnswer);
    
    if (isNaN(answer)) {
      this.feedback = '⚠️ Vul eerst een antwoord in!';
      this.feedbackClass = 'warning';
      return;
    }
    
    if (answer === this.correctAnswer) {
      this.feedback = '🎉 Geweldig! Dat is het juiste antwoord!';
      this.feedbackClass = 'success';
    } else {
      this.feedback = `❌ Helaas, probeer het nog eens. Het juiste antwoord is ${this.correctAnswer}.`;
      this.feedbackClass = 'error';
    }
  }
}

