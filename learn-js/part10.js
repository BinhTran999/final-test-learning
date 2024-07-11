// Promise: cung cấp một cách để quản lý và xử lý kết quả của các tác vụ bất đồng bộ, như gọi API, đọc/ghi tệp, hoặc thực hiện các tính toán tốn thời gian.

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

//
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();