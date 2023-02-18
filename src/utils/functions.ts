export function mean(arr: number[]) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
}

export function median(arr: number[]) {
  const { length } = arr;

  arr.sort((a, b) => a - b);

  if (length % 2 === 0) {
    return (arr[length / 2 - 1] + arr[length / 2]) / 2;
  }

  return arr[(length - 1) / 2];
}

export function mode(arr: number[]) {
  const mode: any = {};
  let max = 0,
    count = 0;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];

    if (mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }

    if (count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }

  return max;
}

export function calculate(
  nums: string,
  operationName: string,
  operation: Function
) {
  if (nums === undefined || nums === "") {
    throw { status: 400, message: `nums are required.` };
  }

  const numsArray = nums.split(","); // save the original values so you can pass them to the message
  const numbersArray = numsArray.map((num) => Number(num)); // NaN value -> can't get original value

  const nanCheck = numbersArray
    .map(function (el, i) {
      if (Number.isNaN(el)) return i;
      return 0;
    })
    .filter(function (el) {
      return el;
    });

  if (nanCheck.length) {
    // or throw Error Here & pass query params to errorHandler ?

    const indexes = nanCheck.map((num) => numsArray[num]);

    const content =
      indexes.length > 1
        ? `${indexes} are not numbers.`
        : `${indexes} is not a number.`;

    throw { status: 400, message: `${content}` };
  }

  return `The ${operationName} of ${nums} is ${operation(numbersArray)}.`;
}
