// ** METHODS FOR ARRAY STATE **

export function addItemToStateArray(stateArray, setStateArray, item) {
  if (
    !handleArrayShouldNotContainTargetItemValidation(
      stateArray,
      item,
      getFunctionName()
    )
  ) {
    return;
  }

  const updatedArray = [...stateArray];
  updatedArray.push(item);

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);
}

export function deleteItemFromStateArray(
  stateArray,
  setStateArray,
  item,
  single = true
) {
  if (
    !handleArrayShouldContainTargetItemValidation(
      stateArray,
      item,
      getFunctionName()
    )
  ) {
    console.log("array didn't contain item!");
    return;
  } else {
    console.log("array did contain item!");
  }

  let updatedArray;

  // Makes sure that the user of the funciton can specify removing a single iteration, or all iterations
  if (single) {
    console.log("HANDLING SINGLE!");
    let found = false;
    updatedArray = stateArray.filter((value) => {
      if (value === item) {
        if (found) {
          return true;
        }

        found = true;
        return false;
      }
      return true;
    });
  } else {
    console.log("HANDLING ALL!");
    updatedArray = stateArray.filter((value) => value !== item); // Ensures this list doesn't include the item to be deleted.
  }

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);

  console.log("UPDATED ARRAY");
  console.log(stateArray);
}

export function deleteItemFromStateArrayByMongoId(
  stateArray,
  setStateArray,
  id
) {
  if (
    !handleStateObjectShouldContainTargetPropertyValidation(
      stateArray,
      "_id",
      getFunctionName()
    )
  ) {
    return;
  }

  if (!isNaN(id)) {
    // ID is a number. Let's convert
    id = id.toString();
  }

  const updatedArray = stateArray.filter((value) => value._id !== id); // Ensures this list doesn't include the item to be deleted.

  setStateArray(updatedArray);

  console.log(`Successfully executed ${getFunctionName()}`);
}

// ** METHODS FOR OBJECT STATE **

export function setStateObjectProperty(
  stateObject,
  setStateObject,
  key,
  value
) {
  if (!handleStateObjectValidation(stateObject, getFunctionName())) {
    return;
  }

  /* 
  Using shallow copy for simplicity. Don't want to use a library
  Perhaps will change this in the future if necessary.
  */

  const stateObjectCopy = { ...stateObject };
  stateObjectCopy[key] = value;

  setStateObject(stateObjectCopy);

  console.log(`Successfully executed ${getFunctionName()}`);
}

export function incrementDecrementStateObjectProperty(
  stateObject,
  setStateObject,
  key,
  amount = 1
) {
  console.log("CALLED INCREMENTDECREMENTSTATEOBJECTPROPERTY");
  if (
    !handleStateObjectShouldContainTargetPropertyWithNumberValueValidation(
      stateObject,
      key,
      getFunctionName()
    )
  ) {
    return;
  }

  /* 
  Using shallow copy for simplicity. Don't want to use a library
  Perhaps will change this in the future if necessary.
  */

  const previousNumberValue = stateObject[key];

  const previousIsString = typeof previousNumberValue !== "number";
  const amountIsString = typeof amount !== "number";

  const newValue =
    (previousIsString ? parseInt(previousNumberValue) : previousNumberValue) +
    (amountIsString ? parseInt(amount) : amount);

  const stateObjectClone = { ...stateObject };

  stateObjectClone[key] = previousIsString ? newValue.toString() : newValue;

  setStateObject(stateObjectClone);

  console.log(`Successfully executed ${getFunctionName()}`);
}

// ** ARRAY VALIDATION METHODS **

// Returns true is validation was successful, false otherwise.
export function handleArrayValidation(inputArray, functionName) {
  if (!Array.isArray(inputArray)) {
    // Given state variable is a not an array variable. Return here and log error.
    console.error(
      `Call to ${functionName} provides a non-array state variable! State Variable: ${inputArray}`
    );
    return false;
  }

  return true;
}

// Returns true is validation was successful, false otherwise.
export function handleArrayShouldContainTargetItemValidation(
  inputArray,
  item,
  functionName
) {
  if (!handleArrayValidation(inputArray, functionName)) {
    return false;
  }

  if (!inputArray.includes(item)) {
    // Target item is not in the array. Return here and log error.
    console.error(
      `Call to ${functionName} provides an array without target item! Target item: ${item}`
    );
    return false;
  }

  return true;
}

// Returns true is validation was successful, false otherwise.
export function handleArrayShouldNotContainTargetItemValidation(
  inputArray,
  item,
  functionName
) {
  if (!handleArrayValidation(inputArray, functionName)) {
    return false;
  }

  if (inputArray.includes(item)) {
    // Target item is in the array. Return here and log error.
    console.error(
      `Call to ${functionName} provides an array with target item already! Target item: ${item}`
    );
    return false;
  }

  return true;
}

// ** OBJECT VALIDATION METHODS **

export function handleStateObjectValidation(inputObject, functionName) {
  if (typeof inputObject !== "object" || inputObject === null) {
    // Given state variable is a not an object variable. Return here and log error.
    console.error(
      `Call to ${functionName} provides a non-object state variable! State Variable: ${inputObject}`
    );
    return false;
  }

  return true;
}

export function handleStateObjectShouldContainTargetPropertyValidation(
  inputObject,
  key,
  functionName
) {
  if (!handleStateObjectValidation(inputObject, functionName)) {
    return;
  }

  if (!inputObject.hasOwnProperty(key)) {
    console.error(
      `Call to ${functionName} provides an object without target property! Target property: ${key}`
    );
    return false;
  }

  return true;
}

export function handleStateObjectShouldContainTargetPropertyWithNumberValueValidation(
  inputObject,
  key,
  functionName
) {
  if (
    !handleStateObjectShouldContainTargetPropertyValidation(
      inputObject,
      key,
      functionName
    )
  ) {
    return false;
  }

  console.log(`key: ${key}`);

  const targetValue = inputObject[key];
  console.log(`targetValue: ${targetValue}`);

  if (isNaN(targetValue)) {
    console.error(
      `Call to ${functionName} provides an object with target property containing a non-number value! Target property value: ${targetValue}`
    );
    return false;
  }

  return true;
}

// ** VALIDATION HELPER METHODS **

function getFunctionName() {
  return "-production-build-";
  // if (process.env.NODE_ENV === "development") {
  //   return getFunctionName.caller.name;
  // }
}
