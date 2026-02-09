# Reken Visualisaties - Angular Application

## Overview

This is an Angular-based rewrite of the subtraction visualization tool, designed with a component-based architecture to enable reuse in larger applications such as tests, examinations, or timed exercises.

## Architecture

### Component Structure

```
src/app/
├── components/
│   ├── subtraction/          # Main subtraction exercise component
│   │   ├── subtraction.ts
│   │   ├── subtraction.html
│   │   └── subtraction.css
│   └── tip-bar/              # Reusable tip display component
│       ├── tip-bar.ts
│       ├── tip-bar.html
│       └── tip-bar.css
├── enums/
│   └── problem-type.enum.ts  # Problem classification types
├── services/
│   └── problem-classifier.service.ts  # Problem type detection
└── models/                   # Future: data models
```

### Key Features

#### 1. Problem Type Classification (Enum)

The `ProblemType` enum defines different types of math problems:

- **AFTREKKEN_BRUG_TIENTAL**: Subtraction crossing tens boundary (e.g., 16 - 8, 21 - 5)
- **AFTREKKEN_SIMPEL**: Simple subtraction (not crossing tens)
- **OPTELLEN**: Addition (future use)
- **VERMENIGVULDIGEN**: Multiplication (future use)
- **DELEN**: Division (future use)
- **ONBEKEND**: Unknown/unclassified

#### 2. Problem Classifier Service

The `ProblemClassifierService` automatically detects problem types:

```typescript
classifySubtraction(initialValue: number, subtractValue: number): ProblemType
```

**Detection Logic for AFTREKKEN_BRUG_TIENTAL:**
- Initial value > 10
- Subtraction crosses a tens boundary
- Ones digit of initial < ones digit of subtract
- Result crosses exactly one tens boundary

**Examples:**
- ✅ 16 - 8 = 8 (crosses from 16 through 10 to 8) → AFTREKKEN_BRUG_TIENTAL
- ✅ 21 - 5 = 16 (crosses from 21 through 20 to 16) → AFTREKKEN_BRUG_TIENTAL
- ❌ 29 - 6 = 23 (stays in 20s, no borrowing needed) → AFTREKKEN_SIMPEL
- ❌ 15 - 3 = 12 (stays in teens) → AFTREKKEN_SIMPEL

#### 3. Subtraction Component

**Input Properties:**
- `initialValue?: number` - If provided, makes the input field read-only

**Features:**
- Editable mode: User can change the number of symbols
- Read-only mode: Fixed number for tests/exams
- Interactive symbol movement between columns
- Automatic problem classification
- Answer validation with feedback

**Usage Examples:**

```html
<!-- Editable mode (standalone practice) -->
<app-subtraction></app-subtraction>

<!-- Read-only mode (for tests/exams) -->
<app-subtraction [initialValue]="16"></app-subtraction>
```

#### 4. Tip Bar Component

A separate, reusable component that displays educational hints based on problem type.

**Input Properties:**
- `problemType: ProblemType` - Type of problem
- `initialValue: number` - Starting number
- `removedValue: number` - Number subtracted

**Features:**
- Only shows for AFTREKKEN_BRUG_TIENTAL problems
- Collapsible design (click to expand/collapse)
- Shows step-by-step bridge method explanation
- Automatically calculates intermediate steps

## Development

### Prerequisites

- Node.js 18+ 
- npm 9+
- Angular CLI 19+

### Installation

```bash
cd angular-app
npm install
```

### Running Development Server

```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`

### Building for Production

```bash
npm run build
# or
ng build
```

Build artifacts will be stored in `dist/angular-app/`

## Integration into Larger Applications

### Standalone Usage

```typescript
import { Subtraction } from './components/subtraction/subtraction';

@Component({
  selector: 'app-practice',
  imports: [Subtraction],
  template: '<app-subtraction></app-subtraction>'
})
export class PracticeComponent {}
```

### Test/Exam Usage

```typescript
import { Subtraction } from './components/subtraction/subtraction';

@Component({
  selector: 'app-exam',
  imports: [Subtraction],
  template: `
    <div *ngFor="let question of questions">
      <app-subtraction [initialValue]="question.value"></app-subtraction>
    </div>
  `
})
export class ExamComponent {
  questions = [
    { value: 16 },
    { value: 21 },
    { value: 13 }
  ];
}
```

### Timed Exercise Usage

```typescript
@Component({
  selector: 'app-timed-exercise',
  imports: [Subtraction],
  template: `
    <div class="timer">{{ timeRemaining }}s</div>
    <app-subtraction 
      [initialValue]="currentProblem"
      (answerSubmitted)="onAnswerSubmitted($event)"
    ></app-subtraction>
  `
})
export class TimedExerciseComponent {
  timeRemaining = 60;
  currentProblem = this.generateRandomProblem();
  
  onAnswerSubmitted(correct: boolean) {
    if (correct) {
      this.currentProblem = this.generateRandomProblem();
    }
  }
}
```

## Problem Type Detection Examples

The classifier automatically detects problem types based on mathematical properties:

| Initial | Subtract | Result | Type | Reason |
|---------|----------|--------|------|--------|
| 16 | 8 | 8 | BRUG_TIENTAL | Crosses 10 (6 < 8, borrows from tens) |
| 21 | 5 | 16 | BRUG_TIENTAL | Crosses 20 (1 < 5, borrows from tens) |
| 29 | 6 | 23 | SIMPEL | Stays in 20s (9 > 6, no borrow) |
| 15 | 3 | 12 | SIMPEL | Stays in teens |
| 9 | 4 | 5 | SIMPEL | Single digit range |

## Benefits of This Architecture

1. **Reusability**: Components can be used in multiple contexts
2. **Testability**: Services and components can be unit tested
3. **Maintainability**: Clear separation of concerns
4. **Extensibility**: Easy to add new problem types
5. **Type Safety**: TypeScript provides compile-time checking
6. **Modularity**: Each component is self-contained

## Future Enhancements

- Add more problem types (addition, multiplication, division)
- Create exam/test container components
- Add timed exercise mode
- Implement progress tracking
- Add difficulty levels
- Create analytics dashboard

## Migration Notes

The Angular version maintains all functionality from the original vanilla JavaScript version:
- ✅ 3-column layout (Original, Removed, Remaining)
- ✅ Symbol interaction (click to move)
- ✅ Input controls (editable/read-only)
- ✅ Answer validation
- ✅ Tip bar with bridge method
- ✅ Problem type detection
- ✅ All styling preserved

## License

Same as parent project
