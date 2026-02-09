import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemType } from '../../enums/problem-type.enum';

@Component({
  selector: 'app-tip-bar',
  imports: [CommonModule],
  templateUrl: './tip-bar.html',
  styleUrl: './tip-bar.css',
})
export class TipBar implements OnChanges {
  @Input() problemType: ProblemType = ProblemType.ONBEKEND;
  @Input() initialValue: number = 0;
  @Input() removedValue: number = 0;
  
  isExpanded = false;
  shouldShow = false;
  
  // Expose Math to template
  Math = Math;
  
  // Bridge method calculation values
  result: number = 0;
  stepsToReachTen: number = 0;
  remainingStepsFromTen: number = 0;
  firstTensValue: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['problemType'] || changes['initialValue'] || changes['removedValue']) {
      this.updateTipContent();
    }
  }
  
  private updateTipContent(): void {
    // Check if initialValue is a tens value (like 10, 20, 30, etc.)
    const isInitialValueATensValue = this.initialValue % 10 === 0;
    
    // Show tip for bridge problems, but exclude tens values ONLY when subtracting less than 10
    // Example: 20 - 8 should not show tip (tens value with subtraction < 10)
    // Example: 30 - 12 should show tip (tens value with subtraction >= 10)
    // Example: 18 - 9 should show tip (not a tens value)
    const shouldShowForTensValue = !isInitialValueATensValue || this.removedValue >= 10;
    
    this.shouldShow = this.problemType === ProblemType.AFTREKKEN_BRUG_TIENTAL && 
                      this.initialValue > 10 && 
                      this.removedValue > 0 &&
                      shouldShowForTensValue;
    
    if (this.shouldShow) {
      this.result = this.initialValue - this.removedValue;
      this.stepsToReachTen = this.initialValue - Math.floor(this.initialValue / 10) * 10;
      this.firstTensValue = Math.floor(this.initialValue / 10) * 10;
      this.remainingStepsFromTen = this.firstTensValue - this.result;
    }
  }
  
  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }
}
