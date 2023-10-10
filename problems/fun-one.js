/**
 Challenge Description:

You are tasked with implementing a function that tracks user actions and returns an array of user IDs who pressed a specific sequence of keys. 
Given an array of user actions and a sequence of keys, write a function findUsersWithSequence(actions, sequence) that returns an array of user 
IDs (plural) who pressed the specified sequence of keys.

The user actions are represented as an array of objects, where each object contains two properties:

userId: An integer representing the user's ID.
keyPress: A string representing the key pressed by the user.
Your task is to find users who pressed the keys in the specified sequence, in the same order as the sequence.
*/

/**
 * actions: {user:number,keyPress:string}[]
 * sequence: string[]
 * @returns Action[userId][]
 * O(n^2)
 * S(n^2)
 */
function findUsersWithSequence(actions, sequence) {
  const userIdToKeypressMap = new Map()

  // O(nk)
  for (const action of actions) {
    let str = '';

    if (userIdToKeypressMap.has(action.userId)) {
      str = userIdToKeypressMap.get(action.userId)
    }

    userIdToKeypressMap.set(action.userId, str + action.keyPress);
  }

  // invert my keys and values
  const result = [] // number[]
  const target =  sequence.join('');

  // O(n^2)
  for (const [ID,value] of userIdToKeypressMap.entries()) {
    if (typeof value === 'string' && value.includes(target)) {
      result.push(ID);
    }
  }

  return result
}


// O(n) O(n^2) O(nk)
// S(n^2)
function findUsersWithSequenceV2(actions, sequence) {
  const m = new Map(); // number, Set<number>
  const am = new Map(); // number, { iOf, hasStarted }
  const l = actions.length;

  for (const action of actions) {
    am.set(action.userId, { iAt: 0, hasStarted: false });
  }

  for (let i = 0; i < l; i++) {
    const tmp = m.get(actions[i].keyPress) || new Set();
    tmp.add(actions[i].userId)
    m.set(actions[i].keyPress, tmp);
  }

  // console.log(m)
  // console.log(am)

  for (const action of actions) {
    const ps = am.get(action.userId)

    if (!ps) {
      continue
    }

    const charAt = sequence[ps.iAt]

    if (charAt === action.keyPress) {
      ps.hasStarted = true;
      ps.iAt++;
    } else {
      if (!ps.hasStarted) {
        continue;
      }
    }
  }

  console.log(m)
  console.log(am)

  const r = []
  for (const [k,v] of am.entries()) {
    console.log(k, v)
    if (v.iAt === sequence.length && v.hasStarted) {
      r.push(k)
    }
  }

  return r
}

const actions = [
  { userId: 1, keyPress: 'A' },
  { userId: 2, keyPress: 'B' },
  { userId: 3, keyPress: 'A' },
  { userId: 2, keyPress: 'C' },
  { userId: 2, keyPress: 'D' },
  { userId: 1, keyPress: 'B' },
];

const sequence1 = ["B", "C", "D"];
const sequence2 = ["A", "B", "C"];
const sequence3 = ["A", "B"];
const sequence4 = ["B"]
const result1 = findUsersWithSequenceV2(actions, sequence1); 
const result2 = findUsersWithSequenceV2(actions, sequence2);
const result3 = findUsersWithSequenceV2(actions, sequence3);
const result4 = findUsersWithSequenceV2(actions, sequence4);
// const result5 = findUsersWithSequenceV2(actions, ["C","D"]);
console.log(result1, result2, result3, result4);//, result5)

// console.log(result1); // Should output [2] since user 2 pressed the sequence 'B', 'C', 'D'.
// console.log(result2); // Should output [] since no user pressed the sequence 'A', 'B', 'C'.
// console.log(result3); // Should output [1] since user 1 pressed the sequence 'A', 'B'
// console.log(result4); // Should output [2, 1] since user 2 & 1 pressed the sequence 'B'.
// console.log(result5); // [2]