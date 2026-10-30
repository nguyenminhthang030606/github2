
let chargingQueue = ['30A-111', '29B-222', '51C-333'];
console.log("===== QUẢN TRỊ HÀNG ĐỢI TRẠM SẠC =====");
console.log("\n1. HÀNG ĐỢI BAN ĐẦU:");
console.log(chargingQueue);
console.log("\n2. THÊM XE MỚI BẰNG push()");
console.log("Trước khi thêm:", chargingQueue);
chargingQueue.push('43D-444');
console.log("Sau khi thêm:", chargingQueue);
console.log("\n3. CHÈN XE ƯU TIÊN BẰNG splice()");
console.log("Trước khi chèn:", chargingQueue);
chargingQueue.splice(1, 0, '14A-999');
console.log("Sau khi chèn:", chargingQueue);
console.log("\n4. TÌM KIẾM XE BẰNG indexOf()");
let priorityIndex = chargingQueue.indexOf('14A-999');
console.log("Vị trí của xe 14A-999:", priorityIndex);
console.log("\n5. KIỂM TRA XE BẰNG includes()");
let hasCar = chargingQueue.includes('43D-444');
console.log("Xe 43D-444 có trong hàng đợi:", hasCar);
console.log("\n6. XE ĐẦU TIÊN VÀO CỔNG SẠC");
console.log("Hàng đợi trước khi lấy xe:", chargingQueue);
let chargingCar = chargingQueue.shift();
console.log("Xe vào cổng sạc:", chargingCar);
console.log("Hàng đợi sau khi lấy xe:", chargingQueue);
console.log("\n7. TÍNH DOANH THU CA TRỰC");
let energyUsed = [30, 45, 25];
let pricePerKwh = 4500;
let totalRevenue = 0;
for (let i = 0; i < energyUsed.length; i++) {
    totalRevenue = totalRevenue + energyUsed[i] * pricePerKwh;
}
console.log("Mảng điện năng tiêu thụ:", energyUsed);
console.log("Đơn giá:", pricePerKwh, "VNĐ/kWh");
console.log("Tổng doanh thu:", totalRevenue, "VNĐ");
console.log("\n===== BÁO CÁO CUỐI CA =====");
console.log("Xe đã vào cổng sạc:", chargingCar);
console.log("Hàng đợi còn lại:", chargingQueue);
console.log("Tổng điện năng tiêu thụ:",
    energyUsed[0] + energyUsed[1] + energyUsed[2],
    "kWh"
);
console.log("Tổng doanh thu:", totalRevenue, "VNĐ");