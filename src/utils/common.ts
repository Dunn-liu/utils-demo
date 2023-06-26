/**
 * 控制异步任务并发函数
 * @param tasks 任务数组
 * @param parallelCount 并发数
 * @returns 成功的数据
 */
export function parallelTask<T>(tasks: Function[], parallelCount = 2) {
  return new Promise<T[]>((resolve) => {
    if (tasks.length === 0) {
      resolve([]);
      return;
    }
    let nextIndex = 0;
    let finishCount = 0;
    const result: any[] = [];
    function _run() {
      const task = tasks[nextIndex];
      nextIndex++;
      task().then((res) => {
        finishCount++;
        result.push(res);
        if (nextIndex < tasks.length) {
          _run();
        } else if (finishCount === tasks.length) {
          resolve(result);
        }
      });
    }
    for (let i = 0; i < parallelCount && i < tasks.length; i++) {
      _run();
    }
  });
}

/**
 *js大数相加
 * @param {string} num1
 * @param {string} num2
 * @return {*}  {string}
 */
function addLargeNumbers(num1: string, num2: string): string {
  let result = "";
  let carry = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;

  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
    const digit2 = j >= 0 ? parseInt(num2[j]) : 0;
    const sum = digit1 + digit2 + carry;

    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);

    i--;
    j--;
  }

  return result;
}

// 使用BigInt类型实现多数加减乘除
// 加法
function addNumbers(numbers) {
  return numbers.reduce((sum, num) => sum + BigInt(num), BigInt(0)).toString();
}

// 减法
function subtractNumbers(numbers) {
  return numbers.reduce((difference, num) => difference - BigInt(num), BigInt(0)).toString();
}

// 乘法
function multiplyNumbers(numbers) {
  return numbers.reduce((product, num) => product * BigInt(num), BigInt(1)).toString();
}

// 除法
function divideNumbers(numbers) {
  return numbers.reduce((quotient, num) => quotient / BigInt(num), BigInt(1)).toString();
}

// 使用字符串计算加减乘除来避免精度丢失
// 加法
function addNumbersString(numbers) {
  let sum = '0';
  for (let i = 0; i < numbers.length; i++) {
    sum = addStrings(sum, numbers[i]);
  }
  return sum;
}

// 减法
function subtractNumbersString(numbers) {
  let difference = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    difference = subtractStrings(difference, numbers[i]);
  }
  return difference;
}

// 乘法
function multiplyNumbersString(numbers) {
  let product = '1';
  for (let i = 0; i < numbers.length; i++) {
    product = multiplyStrings(product, numbers[i]);
  }
  return product;
}

// 除法
function divideNumbersString(numbers) {
  let quotient = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    quotient = divideStrings(quotient, numbers[i]);
  }
  return quotient;
}

// 字符串加法
function addStrings(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let sum = '';
  
  while (i >= 0 || j >= 0 || carry > 0) {
    const digitA = i >= 0 ? Number(a[i]) : 0;
    const digitB = j >= 0 ? Number(b[j]) : 0;
    const digitSum = digitA + digitB + carry;
    sum = (digitSum % 10) + sum;
    carry = Math.floor(digitSum / 10);
    i--;
    j--;
  }
  
  return sum;
}

// 字符串减法
function subtractStrings(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let borrow = 0;
  let difference = '';
  
  while (i >= 0 || j >= 0) {
    const digitA = i >= 0 ? Number(a[i]) : 0;
    const digitB = j >= 0 ? Number(b[j]) : 0;
    let digitDiff = digitA - digitB - borrow;
    
    if (digitDiff < 0) {
      digitDiff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    
    difference = digitDiff + difference;
    i--;
    j--;
  }
  
  return difference;
}

// 字符串乘法
function multiplyStrings(a, b) {
  let product = '0';
  
  for (let i = b.length - 1; i >= 0; i--) {
    let carry = 0;
    let tempProduct = '';
    
    for (let j = a.length - 1; j >= 0; j--) {
      const digitA = Number(a[j]);
      const digitB = Number(b[i]);
      const digitProduct = digitA * digitB + carry;
      tempProduct = (digitProduct % 10) + tempProduct;
      carry = Math.floor(digitProduct / 10);
    }
    
    if (carry > 0) {
      tempProduct = carry + tempProduct;
    }
    
    tempProduct += '0'.repeat(b.length - 1 - i);
    product = addStrings(product, tempProduct);
  }
  
  return product;
}

// 字符串除法
function divideStrings(a, b) {
  let quotient = '';
  let dividend = '';
  
  for (let i = 0; i < a.length; i++) {
    dividend += a[i];
    let digitQuotient = 0;
    
    while (compareStrings(dividend, b) >= 0) {
      dividend = subtractStrings(dividend, b);
      digitQuotient++;
    }
    
    quotient += digitQuotient;
  }
  
  return quotient;
}

// 比较两个字符串数字的大小
function compareStrings(a, b) {
  if (a.length !== b.length) {
    return a.length - b.length;
  }
  
  for (let i = 0; i < a.length; i++) {
    const digitA = Number(a[i]);
    const digitB = Number(b[i]);
    
    if (digitA !== digitB) {
      return digitA - digitB;
    }
  }
  
  return 0;
}
