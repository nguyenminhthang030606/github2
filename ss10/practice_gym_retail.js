const readlineSync = require("readline-sync");

let orderCode = "";
let isVIP = false;

do {
  console.log("=".repeat(40));
  console.log("MENU QUẦY PHỤ KIỆN GYM");
  console.log("1. Nhập và chuẩn hóa mã đơn hàng");
  console.log("2. Tính tiền và in hóa đơn");
  console.log("3. Thoát chương trình");
  console.log("=".repeat(40));

  const choice = readlineSync.question("Chọn chức năng (1-3): ");

  switch (choice) {
    case "1":
      orderCode = readlineSync.question("Nhập mã đơn hàng: ");
      orderCode = orderCode.trim().toUpperCase();

      if (orderCode.length < 8 || !orderCode.startsWith("MED-")) {
        console.log("Mã đơn hàng không hợp lệ. Yêu cầu tối thiểu 8 ký tự và bắt đầu bằng MED-.");
        orderCode = "";
      } else {
        console.log("Mã đơn hàng đã chuẩn hóa:", orderCode);
        const vipAnswer = readlineSync.question("Khách có thẻ VIP? (Y/N): ");
        isVIP = vipAnswer.trim().toUpperCase() === "Y";
      }
      break;

    case "2":
      if (!orderCode) {
        console.log("Chưa có mã đơn hàng hợp lệ. Vui lòng nhập trước.");
        break;
      }

      const items = orderCode.split("-");
      let total = 0;
      let billRows = [];

      for (let i = 1; i < items.length; i++) {
        let code = items[i];
        let price = 0;
        let name = "";

        switch (code) {
          case "SHAKER":
            name = "Bình lắc";
            price = 120000;
            break;
          case "GLOVES":
            name = "Găng tay";
            price = 180000;
            break;
          case "STRAP":
            name = "Dây kéo lưng";
            price = 150000;
            break;
          default:
            name = code;
            price = 0;
        }

        total += price;
        billRows.push({ name, price });
      }

      if (isVIP) {
        total = total * 0.9;
      }

      console.log("-".repeat(40));
      console.log("HÓA ĐƠN BÁN LẺ");
      console.log("-".repeat(40));
      console.log("Tên phụ kiện".padEnd(20) + "Giá".padStart(15));
      console.log("-".repeat(40));

      billRows.forEach(row => {
        console.log(row.name.padEnd(20) + row.price.toString().padStart(15));
      });

      console.log("-".repeat(40));
      console.log("TỔNG CỘNG".padEnd(20) + total.toString().padStart(15));
      console.log("-".repeat(40));
      break;

    case "3":
      console.log("Thoát chương trình.");
      break;

    default:
      console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
  }
} while (choice !== "3");
