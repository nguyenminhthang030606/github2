const readlineSync = require("readline-sync");

let memberType = "";
let borrowedLog = "";
let choice;

do {
  console.log("=".repeat(50));
  console.log("MENU HẬU CẦN PHÒNG GYM");
  console.log("1. Tiếp nhận và xác thực thẻ hội viên");
  console.log("2. Ghi nhận chuỗi vật tư mượn thêm");
  console.log("3. In phiếu bàn giao tủ đồ");
  console.log("4. Đóng ca làm việc và thoát");
  console.log("=".repeat(50));

  choice = readlineSync.question("Chọn chức năng (1-4): ");

  switch (choice) {
    case "1":
      const cardCode = readlineSync.question("Quét mã thẻ hội viên: ").trim().toUpperCase();
      if (cardCode.startsWith("GYM-VIP")) {
        memberType = "VIP";
        console.log("Hội viên VIP xác thực thành công.");
      } else if (cardCode.startsWith("GYM-STD")) {
        memberType = "STANDARD";
        console.log("Hội viên Standard xác thực thành công.");
      } else {
        console.log("Mã thẻ không hợp lệ.");
        memberType = "";
      }
      break;

    case "2":
      if (!memberType) {
        console.log("Chưa xác thực thẻ hội viên. Vui lòng chọn chức năng 1 trước.");
        break;
      }
      borrowedLog = readlineSync.question("Nhập chuỗi vật tư mượn thêm (VD: TOWEL:2|LOCK:1): ").trim().toUpperCase();
      console.log("Đã ghi nhận vật tư:", borrowedLog);
      break;

    case "3":
      if (!memberType) {
        console.log("Chưa xác thực thẻ hội viên. Vui lòng chọn chức năng 1 trước.");
        break;
      }

      let totalFee = 0;
      let deposit = 0;
      let details = [];

      if (memberType === "VIP") {
        details.push({ item: "Khăn tắm lớn (miễn phí)", qty: 1, fee: 0 });
        console.log("Cấp phát tủ đồ khu ZONE-A.");
      } else {
        console.log("Cấp phát tủ đồ khu ZONE-B.");
      }

      if (borrowedLog) {
        let start = 0;
        while (start < borrowedLog.length) {
          let sepIndex = borrowedLog.indexOf("|", start);
          let segment = sepIndex === -1 ? borrowedLog.slice(start) : borrowedLog.slice(start, sepIndex);

          if (segment.includes(":")) {
            let colonIndex = segment.indexOf(":");
            let code = segment.slice(0, colonIndex);
            let qty = parseInt(segment.slice(colonIndex + 1));

            let fee = 0;
            let name = "";

            if (code === "TOWEL") {
              name = "Khăn tắm";
              fee = 20000 * qty;
            } else if (code === "LOCK") {
              name = "Khóa tủ phụ";
              fee = 15000 * qty;
            }

            totalFee += fee;
            if (qty > 0) deposit = 50000;
            details.push({ item: name, qty, fee });
          }

          if (sepIndex === -1) break;
          start = sepIndex + 1;
        }
      }

      console.log("-".repeat(50));
      console.log("PHIẾU BÀN GIAO VẬT TƯ");
      console.log("-".repeat(50));
      console.log("Tên vật tư".padEnd(20) + "SL".padStart(5) + "Phí".padStart(15));
      console.log("-".repeat(50));

      details.forEach(d => {
        console.log(d.item.padEnd(20) + d.qty.toString().padStart(5) + d.fee.toString().padStart(15));
      });

      console.log("-".repeat(50));
      console.log("Tổng phụ phí".padEnd(25) + totalFee.toString().padStart(15));
      console.log("Đặt cọc".padEnd(25) + deposit.toString().padStart(15));
      console.log("-".repeat(50));
      break;

    case "4":
      console.log("Đóng ca làm việc. Thoát chương trình.");
      break;

    default:
      console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
  }
} while (choice !== "4");
