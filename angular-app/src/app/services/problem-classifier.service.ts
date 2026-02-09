import { Injectable } from '@angular/core';
import { ProblemType } from '../enums/problem-type.enum';

/**
 * Service to classify and detect problem types
 */
@Injectable({
  providedIn: 'root'
})
export class ProblemClassifierService {

  /**
   * Classifies a subtraction problem based on whether it crosses a tens boundary
   * 
   * @param initialValue The starting number
   * @param subtractValue The number being subtracted
   * @returns The appropriate ProblemType
   */
  classifySubtraction(initialValue: number, subtractValue: number): ProblemType {
    if (initialValue <= 0 || subtractValue <= 0) {
      return ProblemType.ONBEKEND;
    }

    const result = initialValue - subtractValue;
    
    // Check if result is negative
    if (result < 0) {
      return ProblemType.ONBEKEND;
    }

    // Determine if the subtraction crosses a tens boundary
    // We need to check if going from initialValue to result crosses through a multiple of 10
    // Example: 16 - 8 = 8 crosses through 10 (16 -> 10 -> 8)
    // Example: 21 - 5 = 16 crosses through 20 (21 -> 20 -> 16)
    // Counter-example: 29 - 6 = 23 doesn't cross a tens boundary (stays in 20s)
    
    const initialTens = Math.floor(initialValue / 10);
    const resultTens = Math.floor(result / 10);
    
    // Check if we crossed a tens boundary
    if (initialTens > resultTens) {
      // Additional check: we want ONLY problems that cross through the immediate tens boundary
      // For example, 16 - 8 crosses through 10 (initialTens=1, resultTens=0)
      // But 29 - 6 = 23 (initialTens=2, resultTens=2) doesn't cross
      
      // The key is: does the subtraction require us to "borrow" from the tens place
      // This happens when the ones digit of initialValue is less than the ones digit of subtractValue
      const initialOnes = initialValue % 10;
      const subtractOnes = subtractValue % 10;
      
      // If we need to borrow (ones digit of initial < ones digit of subtract)
      // AND we cross a tens boundary, then it's a bridge problem
      if (initialOnes < subtractOnes && initialTens === resultTens + 1) {
        return ProblemType.AFTREKKEN_BRUG_TIENTAL;
      }
    }
    
    // It's a simple subtraction
    return ProblemType.AFTREKKEN_SIMPEL;
  }

  /**
   * Gets a human-readable description of the problem type
   * 
   * @param problemType The problem type
   * @returns A description string
   */
  getDescription(problemType: ProblemType): string {
    switch (problemType) {
      case ProblemType.AFTREKKEN_SIMPEL:
        return 'Simpele aftrekking';
      case ProblemType.AFTREKKEN_BRUG_TIENTAL:
        return 'Aftrekken met brug over het tiental';
      case ProblemType.OPTELLEN:
        return 'Optelling';
      case ProblemType.VERMENIGVULDIGEN:
        return 'Vermenigvuldiging';
      case ProblemType.DELEN:
        return 'Deling';
      default:
        return 'Onbekend type';
    }
  }

  /**
   * Determines if tips should be shown for a given problem type
   * 
   * @param problemType The problem type
   * @returns true if tips should be shown
   */
  shouldShowTips(problemType: ProblemType): boolean {
    return problemType === ProblemType.AFTREKKEN_BRUG_TIENTAL;
  }
}
