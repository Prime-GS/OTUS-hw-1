function deepEqual(first, second, path = "$") {
  if (first === second) {
    return true;
  }

  if (typeof first !== typeof second) {
    throw new Error(`Error: ${path}, Type mismatch`);
  }

  if (!first || !second) {
    throw new Error(`Error: ${path}, The elements are missing`);
  }

  if (Array.isArray(first) !== Array.isArray(second)) {
    throw new Error(`Error: ${path}, Type mismatch`);
  }

  if (Array.isArray(first)) {
    if (first.length !== second.length) {
      throw new Error(`Error: ${path}, Length mismatch`);
    }
    for (let i = 0; i < first.length; i++) {
      deepEqual(first[i], second[i], `${path}[${i}]`);
    }
  } else {
    const actualKeys = Object.keys(first);
    const expectedKeys = Object.keys(second);

    if (actualKeys.length !== expectedKeys.length) {
      throw new Error(`Error: ${path}, Mismatch in the number of keys`);
    }

    for (const key of actualKeys) {
      if (!second.hasOwnProperty(key)) {
        throw new Error(`Error: ${path}.${key}, Mismatch of key`);
      }
      deepEqual(first[key], second[key], `${path}.${key}`);
    }
  }

  return true;
}

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: "1",
  },
};

const arr1 = [(a = { b: 1 }), (b = 2)];
const arr2 = [(a = { b: 2 }), (b = 2)];
const arr3 = [(a = { b: 1 }), (b = 3)];
const arr4 = [(a = { c: 1 }), b];

// deepEqual(obj1, obj1);
// deepEqual(obj1, obj2);
// deepEqual(obj1, obj3);

// console.log("1", deepEqual(arr1, arr1));
// console.log("2", deepEqual(arr1, arr2));
console.log("3", deepEqual(arr1, arr4));
