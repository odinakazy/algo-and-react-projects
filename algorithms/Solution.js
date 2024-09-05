/* Algorithm Question: Two Sum
Question: Given an array of integers nums and an integer target, return
indices of the two numbers such that they add up to target. You may
assume that each input would have exactly one solution, and you may not
use the same element twice. Provide an efficient solution.
sampleFunction(array, target)
Scenario:
You are given an array of integers called ‘arr’ and a single integer
called ‘target’. Your task is to find two distinct numbers in the array
whose sum equals the target number. Once you find these two numbers,
return their indices (positions) in the array.
Example to Illustrate
Let's say you have the following array and target:
•       arr = [2, 7, 11, 15]
•       target = 9
You need to find two numbers in nums that add up to 9. In this case, 2
and 7 are the two numbers. Their sum is 2 + 7 = 9, which matches the
target. The indices of these numbers in the array are 0 and 1, so you
would return [0, 1].*/

/* Solution */
function sampleFunction(arr, target) {
  // Create a hash map to store the values and their indices
  const seen = {};

  // Iterate through the array
  for (let i = 0; i < arr.length; i++) {
    // Calculate the complement of the current element
    const complement = target - arr[i];

    // Check if the complement exists in the hash map
    if (seen.hasOwnProperty(complement)) {
      // If it exists, return the indices of the complement and the current element
      return [seen[complement], i];
    }

    // Store the current element and its index in the hash map
    seen[arr[i]] = i;
  }

  // If no solution is found (though the problem guarantees one solution)
  return [];
}

// Example usage:
const arr = [2, 7, 11, 15];
const target = 9;
console.log(sampleFunction(arr, target)); // Output: [0, 1]
