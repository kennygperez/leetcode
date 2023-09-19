/**
 * @see https://leetcode.com/problems/merge-two-sorted-lists/
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  let newHead: ListNode;
  let ptr: ListNode;

  // base cases
  if (!list1 || !list2) {
    return !list1 ? list2 : list1;
  }

  if (list1.val < list2.val) {
    newHead = new ListNode(list1.val, null);
    list1 = list1.next;
  } else {
    newHead = new ListNode(list2.val, null);
    list2 = list2.next;
  }

  for (ptr = newHead; list1 && list2; ptr = ptr.next) {
    console.log(list1, list2);

    if (list1.val < list2.val) {
      ptr.next = list1;
      list1 = list1.next;
    } else {
      ptr.next = list2;
      list2 = list2.next;
    }
  }

  if (list1) {
    ptr.next = list1;
  } else {
    ptr.next = list2;
  }

  return newHead;
}

// fix flow
function mergeTwoListsV2(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  //
  // base cases
  //
  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  //
  // over head for head
  //

  const head = new ListNode();

  if (list1.val < list2.val) {
    head.val = list1.val;
    list1 = list1.next;
  } else {
    head.val = list2.val;
    list2 = list2.next;
  }

  //
  // main flow
  //

  for (let ptr = head; list1 || list2; ptr = ptr.next) {
    if (!list1 && !list2) {
      break;
    } else if (!list1 && list2) {
      ptr.next = list2;
      list2 = list2.next;
    } else if (!list2 && list1) {
      ptr.next = list1;
      list1 = list1.next;
    } else if (list1.val < list2.val) {
      ptr.next = list1;
      list1 = list1.next;
    } else {
      ptr.next = list2;
      list2 = list2.next;
    }
  }

  return head;
}

// remove new data malloc and found law
function mergeTwoListsV3(
  list1: ListNode | null,
  list2: ListNode | null,
): ListNode | null {
  //
  // base cases
  //
  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  //
  // over head for head
  //

  let head: ListNode;
  let ptr: ListNode;

  if (list1.val < list2.val) {
    head = list1;
    list1 = list1.next;
  } else {
    head = list2;
    list2 = list2.next;
  }

  //
  // main flow
  //

  for (ptr = head; list1 && list2; ptr = ptr.next) {
    if (list1.val < list2.val) {
      ptr.next = list1;
      list1 = list1.next;
    } else {
      ptr.next = list2;
      list2 = list2.next;
    }
  }

	// add whatever is left without looping
  if (!list1) {
    ptr.next = list2;
  } else {
    ptr.next = list1;
  }

  return head;
}
