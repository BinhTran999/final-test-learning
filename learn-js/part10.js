// Promise: cung cấp một cách để quản lý và xử lý kết quả của các tác vụ bất đồng bộ, như gọi API, đọc/ghi tệp, hoặc thực hiện các tính toán tốn thời gian.
//Các tác vụ bất đồng bộ có thể là gửi AJAX request, gọi hàm bên trong setTimeout, setInterval, hay thao tác với WebSocket
const myPromise = new Promise((resolve, reject) => {
    // Thực hiện tác vụ bất đồng bộ
    setTimeout(() => {
        let i = Math.random();
        if (i < 0.5) {
            console.log(i)
            resolve('Thành công!'); //Tác vụ bất đồng bộ đã hoàn thành thành công
        } else {
            reject("Miss");// Tác vụ bất đồng bộ đã thất bại,
        }
    }, 2000);
    console.log(222222) // Tinh bat dong bo
});

myPromise
    .then(result => {
        console.log(result); // Thành công!
    })
    .catch(error => {
        console.error(error); // Lỗi!
    });

// async, await:
// async: Từ khóa async được sử dụng để khai báo một hàm bất đồng bộ. Khi một hàm được khai báo là async, nó sẽ luôn trả về một Promise
// await: Từ khóa await chỉ có thể được sử dụng bên trong các hàm async. Nó dùng để "đợi" cho đến khi một Promise được giải quyết (resolved) hoặc bị từ chối (rejected). Khi sử dụng await, chương trình sẽ tạm dừng thực thi cho đến khi Promise được giải quyết.
async function calculateFactorial(n) {
    try {
        const result = await factorial(n);
        console.log(`Giai thừa của ${n} là: ${result}`);
        await sleep(4000);
        console.log(444444)

    } catch (error) {
        console.error(error);
    }
    console.log(333333)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        const prevFactorial = await factorial(n - 1);
        return n * prevFactorial;
    }
}

// Sử dụng hàm calculateFactorial
calculateFactorial(50);

console.log()
//callback
function myDisplayer(something) {
    console.log(something)
}

function myCalculator(num1, num2, myCallback) {
    let sum = num1 + num2;
    myCallback(sum);
}

myCalculator(5, 5, myDisplayer);

// Nhược điểm của callback:
//
//     "Callback hell": Khi code sử dụng nhiều lớp callback lồng nhau, nó sẽ trở nên khó đọc và khó bảo trì, được gọi là "callback hell" hoặc "pyramid of doom".
//     Thiếu xử lý lỗi: Callback thường không cung cấp một cách tốt để xử lý lỗi, đòi hỏi lập trình viên phải tự xử lý.
//     Khó kiểm soát luồng: Khi sử dụng nhiều callback, việc kiểm soát luồng chương trình trở nên khó khăn.
