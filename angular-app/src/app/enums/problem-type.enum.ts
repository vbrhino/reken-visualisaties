/**
 * Enum representing different types of math problems
 */
export enum ProblemType {
  /**
   * Simple subtraction that doesn't cross a tens boundary
   * Example: 15 - 3 = 12, 9 - 4 = 5
   */
  AFTREKKEN_SIMPEL = 'AFTREKKEN_SIMPEL',
  
  /**
   * Subtraction that crosses a tens boundary (bridge method needed)
   * Example: 16 - 8 = 8, 21 - 5 = 16
   * NOT: 29 - 6 (result crosses down through 20, not 10)
   */
  AFTREKKEN_BRUG_TIENTAL = 'AFTREKKEN_BRUG_TIENTAL',
  
  /**
   * Addition (future use)
   */
  OPTELLEN = 'OPTELLEN',
  
  /**
   * Multiplication (future use)
   */
  VERMENIGVULDIGEN = 'VERMENIGVULDIGEN',
  
  /**
   * Division (future use)
   */
  DELEN = 'DELEN',
  
  /**
   * Unknown or unclassified problem type
   */
  ONBEKEND = 'ONBEKEND'
}
