export interface Lesson {
  id: string
  title: string
  description: string
  duration: number // minutes
  content: {
    explanation: string
    examples: Array<{
      problem: string
      solution: string
      steps: string[]
    }>
    keyPoints: string[]
  }
  practice: {
    type: "solve" | "multiple-choice" | "fill-blank"
    problems: Array<{
      question: string
      answer: string
      options?: string[]
      hint1?: string
      hint2?: string
      hint3?: string
    }>
  }
}

export interface Topic {
  id: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
}

export const curriculum: Topic[] = [
  {
    id: "basic-equations",
    title: "Basic Equations",
    description: "Learn to solve simple one-step and two-step equations",
    icon: "=",
    lessons: [
      {
        id: "one-step-addition",
        title: "One-Step Equations (Addition/Subtraction)",
        description: "Solve equations by adding or subtracting",
        duration: 3,
        content: {
          explanation:
            "To solve an equation like x + 5 = 12, we need to isolate x by doing the opposite operation. Since 5 is being added, we subtract 5 from both sides.",
          examples: [
            {
              problem: "x + 7 = 15",
              solution: "x = 8",
              steps: ["Start with: x + 7 = 15", "Subtract 7 from both sides: x + 7 - 7 = 15 - 7", "Simplify: x = 8"],
            },
            {
              problem: "y - 3 = 10",
              solution: "y = 13",
              steps: ["Start with: y - 3 = 10", "Add 3 to both sides: y - 3 + 3 = 10 + 3", "Simplify: y = 13"],
            },
          ],
          keyPoints: [
            "Always do the opposite operation to isolate the variable",
            "What you do to one side, you must do to the other",
            "Check your answer by substituting it back into the original equation",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "x + 9 = 20",
              answer: "11",
              hint1: "What operation is being done to x?",
              hint2: "If 9 is being added, what's the opposite operation?",
              hint3: "Subtract 9 from both sides: 20 - 9 = ?",
            },
            {
              question: "m - 5 = 12",
              answer: "17",
              hint1: "What operation is being done to m?",
              hint2: "If 5 is being subtracted, what's the opposite operation?",
              hint3: "Add 5 to both sides: 12 + 5 = ?",
            },
            {
              question: "15 + n = 30",
              answer: "15",
              hint1: "Rewrite as n + 15 = 30 if it helps",
              hint2: "Subtract 15 from both sides",
              hint3: "30 - 15 = ?",
            },
          ],
        },
      },
      {
        id: "one-step-multiplication",
        title: "One-Step Equations (Multiplication/Division)",
        description: "Solve equations by multiplying or dividing",
        duration: 3,
        content: {
          explanation:
            "To solve an equation like 3x = 15, we need to isolate x by doing the opposite operation. Since x is being multiplied by 3, we divide both sides by 3.",
          examples: [
            {
              problem: "4x = 28",
              solution: "x = 7",
              steps: ["Start with: 4x = 28", "Divide both sides by 4: 4x ÷ 4 = 28 ÷ 4", "Simplify: x = 7"],
            },
            {
              problem: "y/5 = 3",
              solution: "y = 15",
              steps: ["Start with: y/5 = 3", "Multiply both sides by 5: (y/5) × 5 = 3 × 5", "Simplify: y = 15"],
            },
          ],
          keyPoints: [
            "Multiplication and division are opposite operations",
            "When dividing, make sure to divide the entire side of the equation",
            "Fractions can be cleared by multiplying by the denominator",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "6x = 42",
              answer: "7",
              hint1: "What operation is being done to x?",
              hint2: "If x is being multiplied by 6, divide both sides by 6",
              hint3: "42 ÷ 6 = ?",
            },
            {
              question: "n/4 = 8",
              answer: "32",
              hint1: "n is being divided by 4",
              hint2: "Multiply both sides by 4 to isolate n",
              hint3: "8 × 4 = ?",
            },
            {
              question: "9m = 81",
              answer: "9",
              hint1: "m is being multiplied by 9",
              hint2: "Divide both sides by 9",
              hint3: "81 ÷ 9 = ?",
            },
          ],
        },
      },
      {
        id: "two-step-equations",
        title: "Two-Step Equations",
        description: "Solve equations requiring two operations",
        duration: 4,
        content: {
          explanation:
            "Two-step equations require two operations to solve. Always undo addition/subtraction first, then multiplication/division. Think of it as unwrapping a present - you remove the outer layer first!",
          examples: [
            {
              problem: "2x + 5 = 13",
              solution: "x = 4",
              steps: ["Start with: 2x + 5 = 13", "Subtract 5 from both sides: 2x = 8", "Divide both sides by 2: x = 4"],
            },
            {
              problem: "3y - 7 = 14",
              solution: "y = 7",
              steps: ["Start with: 3y - 7 = 14", "Add 7 to both sides: 3y = 21", "Divide both sides by 3: y = 7"],
            },
          ],
          keyPoints: [
            "Use reverse order of operations (PEMDAS backwards)",
            "Undo addition/subtraction before multiplication/division",
            "Work step by step and check your answer",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "3x + 4 = 19",
              answer: "5",
              hint1: "First, undo the addition by subtracting 4 from both sides",
              hint2: "You should have 3x = 15",
              hint3: "Now divide both sides by 3",
            },
            {
              question: "5m - 8 = 17",
              answer: "5",
              hint1: "First, undo the subtraction by adding 8 to both sides",
              hint2: "You should have 5m = 25",
              hint3: "Now divide both sides by 5",
            },
            {
              question: "2n + 10 = 30",
              answer: "10",
              hint1: "Subtract 10 from both sides first",
              hint2: "You should have 2n = 20",
              hint3: "Divide both sides by 2",
            },
          ],
        },
      },
    ],
  },
  {
    id: "linear-equations",
    title: "Linear Equations",
    description: "Master equations with variables on both sides",
    icon: "↔",
    lessons: [
      {
        id: "variables-both-sides",
        title: "Variables on Both Sides",
        description: "Solve equations with variables on both sides",
        duration: 5,
        content: {
          explanation:
            "When variables appear on both sides of an equation, we need to collect all variable terms on one side and all constant terms on the other. Choose the side that will keep your variable positive!",
          examples: [
            {
              problem: "5x + 3 = 2x + 12",
              solution: "x = 3",
              steps: [
                "Start with: 5x + 3 = 2x + 12",
                "Subtract 2x from both sides: 3x + 3 = 12",
                "Subtract 3 from both sides: 3x = 9",
                "Divide both sides by 3: x = 3",
              ],
            },
          ],
          keyPoints: [
            "Collect all variable terms on one side",
            "Collect all constant terms on the other side",
            "Choose the side that keeps your coefficient positive",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "4x + 7 = 2x + 15",
              answer: "4",
              hint1: "Subtract 2x from both sides to collect variables on the left",
              hint2: "You should have 2x + 7 = 15",
              hint3: "Now solve like a two-step equation",
            },
            {
              question: "6m - 5 = 3m + 10",
              answer: "5",
              hint1: "Subtract 3m from both sides",
              hint2: "You should have 3m - 5 = 10",
              hint3: "Add 5 to both sides, then divide by 3",
            },
          ],
        },
      },
    ],
  },
  {
    id: "inequalities",
    title: "Inequalities",
    description: "Solve and graph inequalities",
    icon: "<",
    lessons: [
      {
        id: "basic-inequalities",
        title: "Solving Basic Inequalities",
        description: "Learn to solve inequalities with one variable",
        duration: 4,
        content: {
          explanation:
            "Inequalities are solved just like equations, with one important rule: when you multiply or divide by a negative number, flip the inequality sign!",
          examples: [
            {
              problem: "x + 5 < 12",
              solution: "x < 7",
              steps: ["Start with: x + 5 < 12", "Subtract 5 from both sides: x < 7"],
            },
            {
              problem: "-2x > 8",
              solution: "x < -4",
              steps: [
                "Start with: -2x > 8",
                "Divide both sides by -2: x < -4",
                "Note: The inequality flipped because we divided by a negative!",
              ],
            },
          ],
          keyPoints: [
            "Solve inequalities like equations",
            "Flip the sign when multiplying/dividing by a negative",
            "Solutions are ranges, not single values",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "x + 3 > 10",
              answer: "x > 7",
              hint1: "Subtract 3 from both sides",
              hint2: "The inequality sign stays the same",
              hint3: "x > 7",
            },
            {
              question: "2x ≤ 14",
              answer: "x ≤ 7",
              hint1: "Divide both sides by 2",
              hint2: "The inequality sign stays the same (we're dividing by positive 2)",
              hint3: "x ≤ 7",
            },
          ],
        },
      },
    ],
  },
  {
    id: "systems",
    title: "Systems of Equations",
    description: "Solve two equations with two variables",
    icon: "{ }",
    lessons: [
      {
        id: "substitution-method",
        title: "Substitution Method",
        description: "Solve systems by substituting one equation into another",
        duration: 6,
        content: {
          explanation:
            "The substitution method involves solving one equation for a variable, then substituting that expression into the other equation. This reduces the system to one equation with one variable.",
          examples: [
            {
              problem: "y = 2x + 1 and x + y = 7",
              solution: "x = 2, y = 5",
              steps: [
                "We already have y = 2x + 1",
                "Substitute into second equation: x + (2x + 1) = 7",
                "Simplify: 3x + 1 = 7",
                "Solve: 3x = 6, so x = 2",
                "Substitute back: y = 2(2) + 1 = 5",
              ],
            },
          ],
          keyPoints: [
            "Solve one equation for a variable",
            "Substitute that expression into the other equation",
            "Solve for one variable, then find the other",
            "Always check your solution in both original equations",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "y = x + 3 and 2x + y = 12. Find x.",
              answer: "3",
              hint1: "Substitute y = x + 3 into the second equation",
              hint2: "You get 2x + (x + 3) = 12",
              hint3: "Simplify to 3x + 3 = 12, then solve",
            },
          ],
        },
      },
    ],
  },
  {
    id: "quadratics",
    title: "Quadratic Equations",
    description: "Solve equations with x²",
    icon: "x²",
    lessons: [
      {
        id: "factoring-basics",
        title: "Factoring Basics",
        description: "Factor simple quadratic expressions",
        duration: 5,
        content: {
          explanation:
            "Factoring is the reverse of expanding. We look for two numbers that multiply to give the constant term and add to give the coefficient of x.",
          examples: [
            {
              problem: "Factor: x² + 5x + 6",
              solution: "(x + 2)(x + 3)",
              steps: [
                "Find two numbers that multiply to 6 and add to 5",
                "Those numbers are 2 and 3",
                "Write as: (x + 2)(x + 3)",
                "Check: (x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6 ✓",
              ],
            },
          ],
          keyPoints: [
            "Look for two numbers that multiply to c and add to b in x² + bx + c",
            "Always check your factoring by expanding",
            "Some quadratics cannot be factored with integers",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Factor: x² + 7x + 12. What are the two constant terms?",
              answer: "3 and 4",
              hint1: "Find two numbers that multiply to 12 and add to 7",
              hint2: "Try pairs: 1×12, 2×6, 3×4",
              hint3: "3 and 4 work! (3 + 4 = 7, 3 × 4 = 12)",
            },
          ],
        },
      },
    ],
  },
  {
    id: "polynomials",
    title: "Polynomials",
    description: "Operations with polynomials and polynomial equations",
    icon: "∑",
    lessons: [
      {
        id: "adding-polynomials",
        title: "Adding and Subtracting Polynomials",
        description: "Combine like terms in polynomial expressions",
        duration: 4,
        content: {
          explanation:
            "To add or subtract polynomials, combine like terms. Like terms have the same variable raised to the same power. Think of it like organizing similar items together!",
          examples: [
            {
              problem: "(3x² + 2x + 5) + (x² - 4x + 3)",
              solution: "4x² - 2x + 8",
              steps: ["Group like terms: (3x² + x²) + (2x - 4x) + (5 + 3)", "Combine: 4x² - 2x + 8"],
            },
            {
              problem: "(5x² + 3x - 2) - (2x² + x + 4)",
              solution: "3x² + 2x - 6",
              steps: [
                "Distribute the negative: 5x² + 3x - 2 - 2x² - x - 4",
                "Group like terms: (5x² - 2x²) + (3x - x) + (-2 - 4)",
                "Combine: 3x² + 2x - 6",
              ],
            },
          ],
          keyPoints: [
            "Only combine terms with the same variable and exponent",
            "When subtracting, distribute the negative sign to all terms",
            "Keep track of positive and negative signs carefully",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "(2x² + 5x + 1) + (3x² + 2x + 4). What is the coefficient of x²?",
              answer: "5",
              hint1: "Add the x² terms: 2x² + 3x²",
              hint2: "2 + 3 = ?",
              hint3: "The answer is 5",
            },
          ],
        },
      },
      {
        id: "multiplying-polynomials",
        title: "Multiplying Polynomials",
        description: "Use distributive property and FOIL method",
        duration: 5,
        content: {
          explanation:
            "To multiply polynomials, use the distributive property. For binomials, you can use FOIL (First, Outer, Inner, Last). Every term in the first polynomial multiplies every term in the second!",
          examples: [
            {
              problem: "(x + 3)(x + 5)",
              solution: "x² + 8x + 15",
              steps: [
                "First: x × x = x²",
                "Outer: x × 5 = 5x",
                "Inner: 3 × x = 3x",
                "Last: 3 × 5 = 15",
                "Combine: x² + 5x + 3x + 15 = x² + 8x + 15",
              ],
            },
          ],
          keyPoints: [
            "Use FOIL for binomials: First, Outer, Inner, Last",
            "Every term multiplies every other term",
            "Combine like terms at the end",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "(x + 2)(x + 4). What is the constant term?",
              answer: "8",
              hint1: "The constant term comes from multiplying the last terms",
              hint2: "2 × 4 = ?",
              hint3: "The answer is 8",
            },
          ],
        },
      },
    ],
  },
  {
    id: "exponents",
    title: "Exponents & Radicals",
    description: "Master exponent rules and radical expressions",
    icon: "^",
    lessons: [
      {
        id: "exponent-rules",
        title: "Laws of Exponents",
        description: "Learn the fundamental rules for working with exponents",
        duration: 5,
        content: {
          explanation:
            "Exponents follow specific rules that make calculations easier. The key rules are: x^a × x^b = x^(a+b), x^a ÷ x^b = x^(a-b), and (x^a)^b = x^(ab).",
          examples: [
            {
              problem: "Simplify: x³ × x⁵",
              solution: "x⁸",
              steps: ["Use the product rule: x^a × x^b = x^(a+b)", "Add exponents: 3 + 5 = 8", "Answer: x⁸"],
            },
            {
              problem: "Simplify: (x²)⁴",
              solution: "x⁸",
              steps: ["Use the power rule: (x^a)^b = x^(ab)", "Multiply exponents: 2 × 4 = 8", "Answer: x⁸"],
            },
          ],
          keyPoints: [
            "Product rule: Add exponents when multiplying same bases",
            "Quotient rule: Subtract exponents when dividing same bases",
            "Power rule: Multiply exponents when raising a power to a power",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Simplify: x⁴ × x³. What is the exponent?",
              answer: "7",
              hint1: "Use the product rule: add the exponents",
              hint2: "4 + 3 = ?",
              hint3: "The answer is 7",
            },
          ],
        },
      },
      {
        id: "simplifying-radicals",
        title: "Simplifying Radicals",
        description: "Simplify square roots and radical expressions",
        duration: 5,
        content: {
          explanation:
            "To simplify radicals, look for perfect square factors. √(a×b) = √a × √b. Find the largest perfect square that divides your number!",
          examples: [
            {
              problem: "Simplify: √50",
              solution: "5√2",
              steps: [
                "Find perfect square factors: 50 = 25 × 2",
                "Split the radical: √50 = √(25 × 2) = √25 × √2",
                "Simplify: 5√2",
              ],
            },
          ],
          keyPoints: [
            "Look for perfect square factors (4, 9, 16, 25, 36, 49, 64, 81, 100...)",
            "√(a×b) = √a × √b",
            "Simplify by taking out perfect squares",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Simplify: √32. What number comes outside the radical?",
              answer: "4",
              hint1: "Find the largest perfect square that divides 32",
              hint2: "32 = 16 × 2, and √16 = 4",
              hint3: "The answer is 4 (giving 4√2)",
            },
          ],
        },
      },
    ],
  },
  {
    id: "rational-expressions",
    title: "Rational Expressions",
    description: "Work with algebraic fractions",
    icon: "÷",
    lessons: [
      {
        id: "simplifying-rationals",
        title: "Simplifying Rational Expressions",
        description: "Reduce algebraic fractions to lowest terms",
        duration: 5,
        content: {
          explanation:
            "Rational expressions are fractions with polynomials. To simplify, factor both numerator and denominator, then cancel common factors. Just like simplifying numeric fractions!",
          examples: [
            {
              problem: "Simplify: (x² - 4)/(x - 2)",
              solution: "x + 2",
              steps: [
                "Factor numerator: x² - 4 = (x + 2)(x - 2)",
                "Write as: (x + 2)(x - 2)/(x - 2)",
                "Cancel common factor (x - 2): x + 2",
                "Note: x ≠ 2 (would make denominator zero)",
              ],
            },
          ],
          keyPoints: [
            "Factor completely before canceling",
            "Only cancel factors, not terms",
            "Note restrictions (values that make denominator zero)",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Simplify: (2x + 6)/(x + 3). What is the simplified form?",
              answer: "2",
              hint1: "Factor the numerator: 2x + 6 = 2(x + 3)",
              hint2: "You have 2(x + 3)/(x + 3)",
              hint3: "Cancel (x + 3) to get 2",
            },
          ],
        },
      },
    ],
  },
  {
    id: "functions",
    title: "Functions",
    description: "Understand and work with functions",
    icon: "f(x)",
    lessons: [
      {
        id: "function-notation",
        title: "Function Notation",
        description: "Learn to read and evaluate functions",
        duration: 4,
        content: {
          explanation:
            "Function notation f(x) means 'f of x' or 'the output when x is the input'. To evaluate f(3), substitute 3 for every x in the function rule.",
          examples: [
            {
              problem: "If f(x) = 2x + 5, find f(3)",
              solution: "f(3) = 11",
              steps: ["Start with: f(x) = 2x + 5", "Substitute x = 3: f(3) = 2(3) + 5", "Calculate: f(3) = 6 + 5 = 11"],
            },
          ],
          keyPoints: [
            "f(x) is read as 'f of x'",
            "To evaluate, substitute the input value for x",
            "The output is the result of the calculation",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "If f(x) = 3x - 4, find f(5)",
              answer: "11",
              hint1: "Substitute 5 for x in the function",
              hint2: "f(5) = 3(5) - 4",
              hint3: "15 - 4 = 11",
            },
          ],
        },
      },
      {
        id: "linear-functions",
        title: "Linear Functions",
        description: "Understand slope and y-intercept",
        duration: 5,
        content: {
          explanation:
            "Linear functions have the form f(x) = mx + b, where m is the slope (rate of change) and b is the y-intercept (starting value). The graph is always a straight line!",
          examples: [
            {
              problem: "Find the slope of f(x) = 3x + 2",
              solution: "m = 3",
              steps: ["Identify the form: f(x) = mx + b", "The coefficient of x is the slope", "Slope m = 3"],
            },
          ],
          keyPoints: [
            "Form: f(x) = mx + b",
            "m = slope (rise over run)",
            "b = y-intercept (where line crosses y-axis)",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "What is the y-intercept of f(x) = 2x + 7?",
              answer: "7",
              hint1: "The y-intercept is the constant term",
              hint2: "In f(x) = mx + b, b is the y-intercept",
              hint3: "The answer is 7",
            },
          ],
        },
      },
      {
        id: "quadratic-functions",
        title: "Quadratic Functions",
        description: "Explore parabolas and vertex form",
        duration: 6,
        content: {
          explanation:
            "Quadratic functions have the form f(x) = ax² + bx + c. Their graphs are parabolas that open up (a > 0) or down (a < 0). The vertex is the highest or lowest point!",
          examples: [
            {
              problem: "Does f(x) = -2x² + 3x + 1 open up or down?",
              solution: "Down",
              steps: ["Look at the coefficient of x²: a = -2", "Since a < 0, the parabola opens down"],
            },
          ],
          keyPoints: [
            "Form: f(x) = ax² + bx + c",
            "If a > 0, parabola opens up; if a < 0, opens down",
            "The vertex is the turning point of the parabola",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Does f(x) = 3x² - 5x + 2 open up or down?",
              answer: "up",
              hint1: "Look at the coefficient of x²",
              hint2: "a = 3, which is positive",
              hint3: "Positive means it opens up",
            },
          ],
        },
      },
    ],
  },
  {
    id: "advanced-quadratics",
    title: "Advanced Quadratics",
    description: "Master all methods for solving quadratics",
    icon: "√",
    lessons: [
      {
        id: "quadratic-formula",
        title: "The Quadratic Formula",
        description: "Solve any quadratic equation",
        duration: 6,
        content: {
          explanation:
            "The quadratic formula solves any quadratic equation ax² + bx + c = 0. The formula is x = (-b ± √(b² - 4ac))/(2a). It always works, even when factoring doesn't!",
          examples: [
            {
              problem: "Solve: x² + 5x + 6 = 0",
              solution: "x = -2 or x = -3",
              steps: [
                "Identify: a = 1, b = 5, c = 6",
                "Substitute into formula: x = (-5 ± √(25 - 24))/2",
                "Simplify: x = (-5 ± 1)/2",
                "Solutions: x = -2 or x = -3",
              ],
            },
          ],
          keyPoints: [
            "Formula: x = (-b ± √(b² - 4ac))/(2a)",
            "Works for any quadratic equation",
            "The ± gives two solutions",
            "b² - 4ac is called the discriminant",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "For x² + 6x + 8 = 0, what is b² - 4ac?",
              answer: "4",
              hint1: "Identify a = 1, b = 6, c = 8",
              hint2: "Calculate: 6² - 4(1)(8)",
              hint3: "36 - 32 = 4",
            },
          ],
        },
      },
      {
        id: "completing-square",
        title: "Completing the Square",
        description: "Transform quadratics to vertex form",
        duration: 6,
        content: {
          explanation:
            "Completing the square transforms ax² + bx + c into a(x - h)² + k form. This reveals the vertex (h, k) and makes solving easier. Take half of b, square it, and add/subtract!",
          examples: [
            {
              problem: "Complete the square: x² + 6x + 5",
              solution: "(x + 3)² - 4",
              steps: [
                "Take half of 6: 6/2 = 3",
                "Square it: 3² = 9",
                "Rewrite: x² + 6x + 9 - 9 + 5",
                "Factor: (x + 3)² - 4",
              ],
            },
          ],
          keyPoints: [
            "Take half of b, square it",
            "Add and subtract this value",
            "Factor the perfect square trinomial",
            "Reveals the vertex of the parabola",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "To complete the square for x² + 8x, what number do you add?",
              answer: "16",
              hint1: "Take half of the coefficient of x",
              hint2: "Half of 8 is 4",
              hint3: "Square it: 4² = 16",
            },
          ],
        },
      },
    ],
  },
  {
    id: "exponential",
    title: "Exponential Functions",
    description: "Growth, decay, and exponential equations",
    icon: "eˣ",
    lessons: [
      {
        id: "exponential-growth",
        title: "Exponential Growth & Decay",
        description: "Model real-world exponential situations",
        duration: 5,
        content: {
          explanation:
            "Exponential functions have the form f(x) = a(b)ˣ. If b > 1, it's growth. If 0 < b < 1, it's decay. These model populations, investments, radioactive decay, and more!",
          examples: [
            {
              problem: "Is f(x) = 3(2)ˣ growth or decay?",
              solution: "Growth",
              steps: [
                "Identify the base: b = 2",
                "Since 2 > 1, this is exponential growth",
                "The function doubles with each increase in x",
              ],
            },
          ],
          keyPoints: [
            "Form: f(x) = a(b)ˣ",
            "b > 1: exponential growth",
            "0 < b < 1: exponential decay",
            "a is the initial value",
          ],
        },
        practice: {
          type: "solve",
          problems: [
            {
              question: "Is f(x) = 5(0.5)ˣ growth or decay?",
              answer: "decay",
              hint1: "Look at the base: 0.5",
              hint2: "Is 0.5 greater than or less than 1?",
              hint3: "Since 0.5 < 1, it's decay",
            },
          ],
        },
      },
    ],
  },
]
