// Problem generator for creating unlimited practice problems

export type ProblemType =
  | "one-step-add-sub"
  | "one-step-mult-div"
  | "two-step"
  | "variables-both-sides"
  | "basic-inequality"
  | "factoring"

export interface GeneratedProblem {
  question: string
  answer: string
  steps: string[]
  hint1: string
  hint2: string
  hint3: string
  type: ProblemType
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b)
}

export function generateProblem(type: ProblemType, difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  switch (type) {
    case "one-step-add-sub":
      return generateOneStepAddSub(difficulty)
    case "one-step-mult-div":
      return generateOneStepMultDiv(difficulty)
    case "two-step":
      return generateTwoStep(difficulty)
    case "variables-both-sides":
      return generateVariablesBothSides(difficulty)
    case "basic-inequality":
      return generateBasicInequality(difficulty)
    case "factoring":
      return generateFactoring(difficulty)
    default:
      return generateOneStepAddSub(difficulty)
  }
}

function generateOneStepAddSub(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100
  const isAddition = Math.random() > 0.5

  if (isAddition) {
    const answer = randomInt(1, maxNum)
    const addend = randomInt(1, maxNum)
    const sum = answer + addend

    return {
      question: `x + ${addend} = ${sum}`,
      answer: answer.toString(),
      steps: [
        `Start with: x + ${addend} = ${sum}`,
        `Subtract ${addend} from both sides: x = ${sum} - ${addend}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: "What operation is being done to x?",
      hint2: `If ${addend} is being added, subtract ${addend} from both sides`,
      hint3: `${sum} - ${addend} = ${answer}`,
      type: "one-step-add-sub",
    }
  } else {
    const answer = randomInt(1, maxNum)
    const subtrahend = randomInt(1, maxNum)
    const minuend = answer + subtrahend

    return {
      question: `x - ${subtrahend} = ${minuend - answer}`,
      answer: answer.toString(),
      steps: [
        `Start with: x - ${subtrahend} = ${minuend - answer}`,
        `Add ${subtrahend} to both sides: x = ${minuend - answer} + ${subtrahend}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: "What operation is being done to x?",
      hint2: `If ${subtrahend} is being subtracted, add ${subtrahend} to both sides`,
      hint3: `${minuend - answer} + ${subtrahend} = ${answer}`,
      type: "one-step-add-sub",
    }
  }
}

function generateOneStepMultDiv(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20
  const isMultiplication = Math.random() > 0.5

  if (isMultiplication) {
    const coefficient = randomInt(2, maxNum)
    const answer = randomInt(1, maxNum)
    const product = coefficient * answer

    return {
      question: `${coefficient}x = ${product}`,
      answer: answer.toString(),
      steps: [
        `Start with: ${coefficient}x = ${product}`,
        `Divide both sides by ${coefficient}: x = ${product} ÷ ${coefficient}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: "What operation is being done to x?",
      hint2: `If x is being multiplied by ${coefficient}, divide both sides by ${coefficient}`,
      hint3: `${product} ÷ ${coefficient} = ${answer}`,
      type: "one-step-mult-div",
    }
  } else {
    const divisor = randomInt(2, maxNum)
    const answer = randomInt(1, maxNum) * divisor
    const quotient = answer / divisor

    return {
      question: `x/${divisor} = ${quotient}`,
      answer: answer.toString(),
      steps: [
        `Start with: x/${divisor} = ${quotient}`,
        `Multiply both sides by ${divisor}: x = ${quotient} × ${divisor}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: "What operation is being done to x?",
      hint2: `If x is being divided by ${divisor}, multiply both sides by ${divisor}`,
      hint3: `${quotient} × ${divisor} = ${answer}`,
      type: "one-step-mult-div",
    }
  }
}

function generateTwoStep(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50
  const coefficient = randomInt(2, 10)
  const constant = randomInt(1, maxNum)
  const answer = randomInt(1, maxNum)
  const isAddition = Math.random() > 0.5

  if (isAddition) {
    const result = coefficient * answer + constant

    return {
      question: `${coefficient}x + ${constant} = ${result}`,
      answer: answer.toString(),
      steps: [
        `Start with: ${coefficient}x + ${constant} = ${result}`,
        `Subtract ${constant} from both sides: ${coefficient}x = ${result - constant}`,
        `Divide both sides by ${coefficient}: x = ${(result - constant) / coefficient}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: `First, subtract ${constant} from both sides`,
      hint2: `You should have ${coefficient}x = ${result - constant}`,
      hint3: `Now divide both sides by ${coefficient}`,
      type: "two-step",
    }
  } else {
    const result = coefficient * answer - constant

    return {
      question: `${coefficient}x - ${constant} = ${result}`,
      answer: answer.toString(),
      steps: [
        `Start with: ${coefficient}x - ${constant} = ${result}`,
        `Add ${constant} to both sides: ${coefficient}x = ${result + constant}`,
        `Divide both sides by ${coefficient}: x = ${(result + constant) / coefficient}`,
        `Simplify: x = ${answer}`,
      ],
      hint1: `First, add ${constant} to both sides`,
      hint2: `You should have ${coefficient}x = ${result + constant}`,
      hint3: `Now divide both sides by ${coefficient}`,
      type: "two-step",
    }
  }
}

function generateVariablesBothSides(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 50
  const leftCoef = randomInt(3, 10)
  const rightCoef = randomInt(2, leftCoef - 1)
  const leftConst = randomInt(1, maxNum)
  const rightConst = randomInt(leftConst + 1, maxNum + 10)
  const answer = Math.floor((rightConst - leftConst) / (leftCoef - rightCoef))

  return {
    question: `${leftCoef}x + ${leftConst} = ${rightCoef}x + ${rightConst}`,
    answer: answer.toString(),
    steps: [
      `Start with: ${leftCoef}x + ${leftConst} = ${rightCoef}x + ${rightConst}`,
      `Subtract ${rightCoef}x from both sides: ${leftCoef - rightCoef}x + ${leftConst} = ${rightConst}`,
      `Subtract ${leftConst} from both sides: ${leftCoef - rightCoef}x = ${rightConst - leftConst}`,
      `Divide both sides by ${leftCoef - rightCoef}: x = ${answer}`,
    ],
    hint1: `Subtract ${rightCoef}x from both sides to collect variables on the left`,
    hint2: `You should have ${leftCoef - rightCoef}x + ${leftConst} = ${rightConst}`,
    hint3: `Now solve like a two-step equation`,
    type: "variables-both-sides",
  }
}

function generateBasicInequality(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 20 : difficulty === "medium" ? 50 : 100
  const signs = ["<", ">", "≤", "≥"]
  const sign = signs[randomInt(0, signs.length - 1)]
  const isAddition = Math.random() > 0.5

  if (isAddition) {
    const answer = randomInt(1, maxNum)
    const addend = randomInt(1, maxNum)
    const sum = answer + addend

    return {
      question: `x + ${addend} ${sign} ${sum}`,
      answer: `x ${sign} ${answer}`,
      steps: [
        `Start with: x + ${addend} ${sign} ${sum}`,
        `Subtract ${addend} from both sides: x ${sign} ${sum - addend}`,
        `Simplify: x ${sign} ${answer}`,
      ],
      hint1: "Solve inequalities just like equations",
      hint2: `Subtract ${addend} from both sides`,
      hint3: `The inequality sign stays the same when adding/subtracting`,
      type: "basic-inequality",
    }
  } else {
    const coefficient = randomInt(2, 10)
    const answer = randomInt(1, maxNum)
    const product = coefficient * answer

    return {
      question: `${coefficient}x ${sign} ${product}`,
      answer: `x ${sign} ${answer}`,
      steps: [
        `Start with: ${coefficient}x ${sign} ${product}`,
        `Divide both sides by ${coefficient}: x ${sign} ${product / coefficient}`,
        `Simplify: x ${sign} ${answer}`,
      ],
      hint1: "Divide both sides by the coefficient",
      hint2: `Divide both sides by ${coefficient}`,
      hint3: `The sign stays the same because we're dividing by a positive number`,
      type: "basic-inequality",
    }
  }
}

function generateFactoring(difficulty: "easy" | "medium" | "hard"): GeneratedProblem {
  const maxNum = difficulty === "easy" ? 6 : difficulty === "medium" ? 10 : 15
  const a = randomInt(1, maxNum)
  const b = randomInt(1, maxNum)
  const sum = a + b
  const product = a * b

  return {
    question: `Factor: x² + ${sum}x + ${product}`,
    answer: `(x + ${a})(x + ${b})`,
    steps: [
      `Find two numbers that multiply to ${product} and add to ${sum}`,
      `Those numbers are ${a} and ${b}`,
      `Check: ${a} × ${b} = ${product} and ${a} + ${b} = ${sum}`,
      `Write as: (x + ${a})(x + ${b})`,
    ],
    hint1: `Find two numbers that multiply to ${product} and add to ${sum}`,
    hint2: `Try factor pairs of ${product}`,
    hint3: `The numbers are ${a} and ${b}`,
    type: "factoring",
  }
}

export const problemTypes = [
  { id: "one-step-add-sub", name: "One-Step (Add/Sub)", description: "x + 5 = 12" },
  { id: "one-step-mult-div", name: "One-Step (Mult/Div)", description: "3x = 15" },
  { id: "two-step", name: "Two-Step Equations", description: "2x + 5 = 13" },
  { id: "variables-both-sides", name: "Variables on Both Sides", description: "5x + 3 = 2x + 12" },
  { id: "basic-inequality", name: "Basic Inequalities", description: "x + 5 < 12" },
  { id: "factoring", name: "Factoring", description: "x² + 5x + 6" },
]
