export const swapArr = (arr = [], index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

// 前移一位
export const arrayIndexForward = (arr = [], index) => {
  if (index !== 0) {
    arr[index] = arr.splice(index - 1, 1, arr[index])[0]
  } else {
    arr.push(arr.shift())
  }
  return arr
}

// 后移一位
export const arrayIndexBackward = (arr = [], index) => {
  if (index !== arr.length - 1) {
    arr[index] = arr.splice(index + 1, 1, arr[index])[0]
  } else {
    arr.unshift(arr.pop())
  }
  return arr
}
