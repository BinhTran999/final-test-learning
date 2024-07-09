// Scope chain: Khi JavaScript cần tìm một biến, nó sẽ bắt đầu tìm kiếm từ
// phạm vi hiện tại (local scope), sau đó tìm trong các phạm vi bên ngoài (outer scope)
// cho đến khi tìm thấy biến đó hoặc đến global scope.

function outerFunction() {
    var varOutside = "Nam"
    let outsideVar = "Am";
    var varInVar = "She";
    function innerFunction() {
        let insideVar = "I"
        console.log(varInVar)
        console.log(outsideVar)
        console.log(insideVar)
    }

    innerFunction()
}

outerFunction()

//console.log (varOutside)
//console.log (outsideVar)

// Different: let, var, const

//hosting
function hostingFunction () {
    console.log(x) //under
    var x;
    // console.log(x)
    x = 33
    console.log(x)

    // console.log(u); // ReferenceError: Cannot access 'u' before initialization
    // let u ;
    //
    // console.log(t); // ReferenceError: Cannot access 't' before initialization
    // const t = 22;
}

hostingFunction ()

// let
function refFunction() {
    var x = 5; // x is a function-scoped variable //Function-scope
    let a = 22 // Block-scope
    const c = 99; // Khai bao 1 lan khong the doi duoc
    console.log(a)
    //const c = 44



    if (true) {

        console.log("A")
        //c = 42 //Error
        let b = 24
        a = 27
        console.log(a)
        var y = 10; // y is also a function-scoped variable
        console.log(x); // Output: 5
        console.log(y); // Output: 10
        x = 25 //or var x = 25
        console.log("B")
    }
    console.log(a)
    // console.log(b)

    console.log(x); // Output: 25
    console.log(y); // Output: 10
}

refFunction();

