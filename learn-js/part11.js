// Shallow Copy

const data = [2,3,2,1]
const newData = data
newData[2] = 22
console.log(newData)
console.log(data)

let employee = {
    eid: "E102",
    ename: "Jack",
    eaddress: "New York",
    salary: 50000
}

console.log("Employee=> ", employee);
let newEmployee = employee;    // Shallow copy
console.log("New Employee=> ", newEmployee);

newEmployee.ename = "Beck";
console.log("Employee=> ", employee);
console.log("New Employee=> ", newEmployee);

// Deep Copy
const data2 = [2,3,2,1]
const newData2 = [...data2]
newData2[2] = 22
console.log(newData2)
console.log(data2)

let employee2 = {
    eid: "E102",
    ename: "Jack",
    eaddress: "New York",
    salary: 50000
}

console.log("Employee=> ", employee2);
let newEmployee2 = JSON.parse(JSON.stringify(employee));
console.log("New Employee=> ", newEmployee2);

newEmployee2.ename = "Beck";
console.log("Employee=> ", employee2);
console.log("New Employee=> ", newEmployee2);