// Shallow Copy

// const data = [2,3,2,1]
// const newData = data
// newData[2] = 22
// console.log(newData)
// console.log(data)
//
// let employee = {
//     eid: "E102",
//     ename: "Jack",
//     eaddress: "New York",
//     salary: 50000
// }
//
// console.log("Employee=> ", employee);
// let newEmployee = employee;
// console.log("New Employee=> ", newEmployee);
//
// newEmployee.ename = "Beck";
// console.log("Employee=> ", employee);
// console.log("New Employee=> ", newEmployee);

// shallow
const data2 = {name: 'abc', age: 20, address: {qua: 'askodhasjd', phuong: 'xyz'}}
const newData2 = {...data2} // shallow
newData2.name = 'aaaaaaaaaaaaaaaaaa'
newData2.address.phuong = 'ggggggggggggggggggggg'
console.log(newData2)
console.log(data2)


// deep
// let employee2 = {
//     eid: "E102",
//     ename: "Jack",
//     eaddress: "New York",
//     salary: 50000
// }
//
// console.log("Employee=> ", employee2);
// let newEmployee2 = JSON.parse(JSON.stringify(employee));
// console.log("New Employee=> ", newEmployee2);
//
// newEmployee2.ename = "Beck";
// console.log("Employee=> ", employee2);
// console.log("New Employee=> ", newEmployee2);