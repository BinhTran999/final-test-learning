const dict = {a: 12, b: 44, c:101, d: 0, e: 1111}

const arr = [12,22,24,33,32,44,46,66,666,76,553,332,11]
let arr2 = [12, -23,11,21,-9,0]

// https://codelearn.io/sharing/10-array-method-trong-javascript

function arrFunction() {
    console.log(arr)
    for (let element in arr){
        console.log(element + ": " + arr[element])
    }

    // every => Type: boolean, mục đích: Xem tất cả các phần tử có thoả mãn điều kiện X hay không
    console.log("           array: every")
    let everyArr = arr.every(el => el > 0)
    let everyArr2 = arr.every(el => el % 2 === 0)
    console.log(everyArr)
    console.log(everyArr2)
    // Older code
    console.log("           array: every -- olderCode")
    let isAdd = true;
    for (let element in arr) {
        if (arr[element] % 2 !== 0) {
            isAdd = false;
            break;
        }
    }
    console.log(isAdd)

    //some => Type: boolean, mục đích: Method này sẽ trả về true nếu như có ít nhất 1 phần tử trong
    // mảng thỏa mãn testMethod, nếu không sẽ trả về false.
    console.log("           array: some")
    everyArr = arr2.some(el => el < 0)
    everyArr2 = arr2.some(el => el % 2 === 0)
    console.log(everyArr)
    console.log(everyArr2)

    // Older code
    console.log("           array: some -- olderCode")
    isAdd = false;
    for (let element in arr) {
        if (arr[element] % 2 === 0) {
            isAdd = true;
            break;
        }
    }
    console.log(isAdd)

    //Map => Type: array, mục đích: Method này sẽ trả về một mảng mới, với giá trị được trả về từ testMethod
    // của từng phần tử.
    console.log("           array: map")
    let newArr = arr.map(el => el + 13)
    let newArr2 = arr.map(el => el*el)
    console.log(arr)
    console.log(newArr)
    console.log(newArr2)

    //Older code
    console.log("           array: map -- olderCode")
    newArr = []
    for (element in arr) {
        newArr.push(arr[element] + 13)
    }
    console.log(newArr)

    //Find => Type: type of element in arr, mục đích: trả về phần tử đầu tiên thỏa mãn testMethod, nếu không có phần
    // tử nào thì sẽ trả về undefined
    console.log("           array: find")
    console.log(arr)
    let newElement = arr.find(el => el % 11 === 0)
    let newElement2 = arr.find(el => el < 0)
    console.log(newElement)
    console.log(newElement2)

    //Older code
    console.log("           array: find -- olderCode")
    let newElement3;
    for (element in arr) {
        if (arr[element] % 11 === 0){
            newElement3 = arr[element]
            break;
        }
    }
    console.log(newElement3)

    //reduce
    console.log("           array: reduce")





}
arrFunction()