// Closure

// JavaScript closure là tập hợp bao gồm một hàm và môi trường nơi hàm đó được khai báo, gọi là lexical environment.
//
// Trong đó, lexical environment được hiểu là tất cả những biến cục bộ trong hàm và trạng thái của các biến ở phạm vi ngoài hàm.

//Global
let YEAR = 2023

console.log()
function sayHello(greetName) { // Function scope
    // biến local trong hàm sayHello
    // biến outer function trong hàm gretting
    let number = 23

    function gretting () {
        // biến local trong hàm gretting
        let mess = YEAR + ": " + number + " is: " + greetName // Lexical scope: number
        console.log(mess)
    }
    gretting()
}

// Đặc điểm

// 1.
function addNumber(n) {
    let local = n;
    console.log(3)
    return function (number) {
        console.log(4)
        console.log(local + number)
    }
}

let addNumber2 = addNumber(2) //nó trả về một hàm mới, được gán cho biến addNumber2
console.log("A")
addNumber2(10) //hàm con trong addNumber2 được thực thi. Trong hàm này, nó có quyền truy cập vào biến local với giá trị 2, được khai báo từ hàm bên ngoài
// => cơ chế closures trong JavaScript, cho phép hàm con giữ được tham chiếu đến các biến bên ngoài phạm vi của nó.

sayHello( "Micheal") // Global scope

//2.
function ObjId() {
    let id = 1;

    return {
        getId: function () {
            return id;
        },
        setId: function (_id) {
            id = _id;
        },
    };
}

let myObject = ObjId();
console.log(myObject.getId()); // 1

myObject.setId(10);
console.log(myObject.getId()); // 10
// => hàm closures phải lưu biến cục bộ theo kiểu tham chiếu.

// Code block
let MONTH = 6
// Error: let MONTH = 9: // Uncaught SyntaxError: Identifier 'MONTH' has already been declared
MONTH = 6 // Correct

{
    let name = "Mai"
    console.log(name)
}
{
    let name = "Ford"
    console.log(name)
}

// Error : console.log(name):  Error: name is not defined
