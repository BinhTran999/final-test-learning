const dict = {a: 12, b: 44, c:101, d: 0, e: 1111}

let arr = [12,22,24,33,32,44,46,66,666,76,553,332,11]
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
    arr = arr.map (el => Math.round(Math.sqrt(el)))
    console.log(arr)
    newElement = arr.reduce((total, i) => total + i, 1)
    console.log(newElement)

    const elementArr = arr.reduce((n, i) => {
        if (i - 7 < 0) {
            n.push(i)
        }
        return n
        },
        [])
    console.log(elementArr)

    const people = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 35, city: 'Los Angeles' },
        { name: 'Charlie', age: 40, city: 'Chicago' },
    ];

    const peopleByCity = people.reduce((cityMap, person) => {
        if (!cityMap[person.city]) {
            cityMap[person.city] = [];
        }
        cityMap[person.city].push(person);
        return cityMap;
    }, {});

    console.log(peopleByCity);

    console.log("           array: reduce -- olderCode")

    const peopleCity = {}
    for (let key in peopleByCity) {
        if (!peopleCity[key]) {
            peopleCity[key] = []
        }
        peopleCity[key].push(peopleByCity[key])
    }
    console.log(peopleCity["New York "])

    // splice
    // gán một mảng cho một biến mới, thì hai biến này sẽ tham chiếu đến cùng một mảng trong bộ nhớ
    let arrCopy = [...arr]
    console.log("           array: splice")
    let arr7 = arrCopy.splice(2,3)
    console.log(arr)
    console.log(arrCopy)

    //oldCode
    console.log("           array: splice -- olderCode")
    let start = 2;
    let i = 3
    let j = 0;
    let k = 0;
    arrCopy = [...arr]
    console.log(arr)
    for (let a in arrCopy) {
        if (a >= start && k < i) {
            k++;
        } else {
            arrCopy[j] = arrCopy[a]
            j++;
        }
    }
    console.log(arrCopy)

    // slice: Method này sẽ trả về mảng con từ vị trí start đến vị trí end - 1 của mảng
    console.log("           array: slice")
    arrCopy = arr.slice(1,5)
    console.log(arrCopy)

    //oldCode
    console.log("           array: slice -- olderCode")
    arrCopy = []
    let p = 1;
    let q = 5;
    for (let t = p; t < q; t++) {
        arrCopy.push(arr[t])
    }
    console.log(arrCopy)

    //filter: Method này nhận vào tham số là một testMethod và sẽ trả về mảng chứa các giá trị thỏa mãn testMethod.
    console.log("           array: filter")
    arrCopy = arr.filter (el => el % 3 === 0)
    console.log(arrCopy)

    //oldCode
    console.log("           array: filter -- olderCode")
    arrCopy = []
    for (let t in arr) {
        if (arr[t] % 3 === 0) {
            arrCopy.push(arr[t])
        }
    }
    console.log(arrCopy)

    //include: Method này nhận vào 1 tham số là el và sẽ trả về true nếu mảng có chứa phần tử el, ngược lại sẽ trả về false
    console.log(arr.includes(5))
    console.log(arr.includes('5'))
    console.log(arr.includes([5,5,6,6]))
    console.log(arr.findIndex(value => value % 4 === 0)) //  7
    console.log(arr.findIndex(value => value % 44 === 0)) // -1

    const arr3 = [[3,1],[1, 2], [3, 4]];
    console.log(arr3.findIndex(subArr => subArr[0] === 1 && subArr[1] === 2));

    const arr4 = [{ a: 1 }, { b: 2 }];
    console.log(arr4.findIndex(obj => obj.a === 1));
    console.log(arr4.findIndex(obj => obj.b === 1));


}
arrFunction()