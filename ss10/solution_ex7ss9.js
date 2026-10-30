const rooms = [
  { roomId: "P101", roomType: "Standard", pricePerNight: 1000000, status: "VACANT" },
  { roomId: "P102", roomType: "Deluxe", pricePerNight: 2000000, status: "OCCUPIED" },
  { roomId: "P103", roomType: "Superior", pricePerNight: 1500000, status: "MAINTENANCE" }
];

console.log("--- DANH SÁCH PHÒNG BAN ĐẦU ---");
console.table(rooms);

const newRoom = { 
  roomId: "P104", 
  roomType: "VIP Suite", 
  pricePerNight: 3500000, 
  status: "VACANT" 
};
rooms.push(newRoom);

console.log("\n--- SAU KHI THÊM PHÒNG P104 ---");
console.table(rooms);

for (let i = 0; i < rooms.length; i++) {
  if (rooms[i].roomId === "P101") {
    rooms[i].status = "OCCUPIED";
    break;
  }
}

console.log("\n--- SAU KHI CẬP NHẬT PHÒNG P101 (CHECK-IN) ---");
console.table(rooms);

for (let i = 0; i < rooms.length; i++) {
  if (rooms[i].roomId === "P103") {
    rooms.splice(i, 1);
    break;
  }
}

console.log("\n--- SAU KHI XÓA PHÒNG P103 (NGỪNG KINH DOANH) ---");
console.table(rooms);