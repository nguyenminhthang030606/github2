const readlineSync = require("readline-sync");

let registeredMembers = [];
let totalRevenue = 0;
let checkInCount = 0;

let choice;

do {
  console.log("=".repeat(50));
  console.log("HỆ THỐNG QUẢN LÝ HỘI VIÊN GYM");
  console.log("1. Đăng ký hội viên mới");
  console.log("2. Tính tiền gói tập");
  console.log("3. Quét mã thẻ check-in");
  console.log("4. Xuất báo cáo và thoát");
  console.log("=".repeat(50));

  choice = readlineSync.question("Chọn chức năng (1-4): ");

  switch (choice) {
    case "1":
      const name = readlineSync.question("Nhập tên hội viên: ").trim().toUpperCase();
      const packageType = readlineSync.question("Chọn gói (STANDARD/VIP): ").trim().toUpperCase();
      const months = parseInt(readlineSync.question("Số tháng đăng ký: ").trim());
      const ptSessions = parseInt(readlineSync.question("Số buổi thuê PT: ").trim());

      registeredMembers.push({ name, packageType, months, ptSessions });
      console.log("Đăng ký thành công cho hội viên:", name);
      break;

    case "2":
      if (registeredMembers.length === 0) {
        console.log("Chưa có hội viên nào đăng ký. Vui lòng chọn chức năng 1 trước.");
        break;
      }

      const memberIndex = readlineSync.question("Nhập số thứ tự hội viên cần tính tiền (0-" + (registeredMembers.length - 1) + "): ");
      const member = registeredMembers[memberIndex];

      let basePrice = member.packageType === "VIP" ? 800000 : 500000;
      let total = basePrice * member.months + member.ptSessions * 300000;

      if (member.months >= 12) {
        total *= 0.75;
      } else if (member.months >= 6) {
        total *= 0.85;
      }

      totalRevenue += total;

      console.log("-".repeat(50));
      console.log("HÓA ĐƠN HỘI VIÊN:", member.name);
      console.log("Gói tập:", member.packageType);
      console.log("Số tháng:", member.months);
      console.log("Số buổi PT:", member.ptSessions);
      console.log("Thành tiền:", total.toLocaleString(), "VNĐ");
      console.log("-".repeat(50));
      break;

    case "3":
      const cardCode = readlineSync.question("Quét mã thẻ hội viên: ").trim().toUpperCase();
      const currentYear = new Date().getFullYear().toString();

      if (cardCode.startsWith("GYM-") && cardCode.endsWith(currentYear)) {
        checkInCount++;
        console.log("Check-in thành công. Tổng lượt check-in:", checkInCount);
      } else {
        console.log("Mã thẻ không hợp lệ.");
      }
      break;

    case "4":
      console.log("=".repeat(50));
      console.log("BÁO CÁO TỔNG KẾT CA TRỰC");
      console.log("Số hội viên đăng ký:", registeredMembers.length);
      console.log("Tổng doanh thu:", totalRevenue.toLocaleString(), "VNĐ");
      console.log("Tổng lượt check-in:", checkInCount);
      console.log("Thoát chương trình.");
      console.log("=".repeat(50));
      break;

    default:
      console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
  }
} while (choice !== "4");
