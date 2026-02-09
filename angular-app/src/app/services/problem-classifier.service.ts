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
    // Example: 26 - 13 = 13 crosses through 20 (26 -> 20 -> 13)
    // Counter-example: 29 - 6 = 23 doesn't cross a tens boundary (stays in 20s)
    // Counter-example: 9 - 3 = 6 doesn't cross a tens boundary (stays in 0s)
    
    const initialTens = Math.floor(initialValue / 10);
    const resultTens = Math.floor(result / 10);
    
    // Check if we crossed a tens boundary by checking if the tens digit decreased
    if (initialTens > resultTens) {
      return ProblemType.AFTREKKEN_BRUG_TIENTAL;
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
