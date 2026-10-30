let currentTicketCode = "";
let isTicketValid = false;
let totalRevenue = 0;
let totalVisits = 0;

let choice;

do {
    console.log("Menu điều hành:");
    console.log("1. Nhập và kiểm chuẩn mã phiếu khám bệnh");
    console.log("2. Tính viện phí xét nghiệm");
    console.log("3. Thẩm định mã hồ sơ may mắn");
    console.log("0. Thoát chương trình");

    choice = prompt("Nhập lựa chọn của bạn (0-3): ");

    if (choice === null || choice.trim() === "") {
        console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
        continue;
    }

    switch (choice) {

        case '1': {
            currentTicketCode = "";
            isTicketValid = false;

            let maPhieu = prompt("Nhập mã phiếu khám bệnh (ví dụ: MED-12345): ");

            if (maPhieu === null || maPhieu.trim() === "") {
                console.log("Mã phiếu khám bệnh không hợp lệ. Vui lòng thử lại.");
                break;
            }

            maPhieu = maPhieu.trim().toUpperCase();

            if (maPhieu.length < 6) {
                console.log("Mã phiếu khám bệnh không hợp lệ. Độ dài tối thiểu là 6 ký tự.");
            }
            else if (!maPhieu.startsWith("MED-")) {
                console.log("Mã phiếu khám bệnh không hợp lệ. Mã phải bắt đầu bằng 'MED-'.");
            }
            else if (maPhieu.includes(" ")) {
                console.log("Mã phiếu khám bệnh không hợp lệ. Mã không được chứa khoảng trắng.");
            }
            else {
                currentTicketCode = maPhieu;
                isTicketValid = true;
                console.log("Mã phiếu khám bệnh hợp lệ: ", currentTicketCode);
            }

            break;
        }

        case '2': {
            if (!isTicketValid) {
                console.log("Vui lòng nhập mã phiếu khám bệnh hợp lệ trước khi tính viện phí.");
                break;
            }

            let serviceCount;
            let cancelled = false;

            do {
                let input = prompt("Nhập số lượng chỉ định xét nghiệm (số nguyên > 0): ");

                if (input === null) {
                    console.log("Hủy giao dịch. Quay về menu.");
                    cancelled = true;
                    break;
                }

                serviceCount = parseInt(input);

                if (isNaN(serviceCount) || serviceCount <= 0) {
                    console.log("Số lượng chỉ định không hợp lệ. Vui lòng nhập lại.");
                }

            } while (isNaN(serviceCount) || serviceCount <= 0);

            if (cancelled) {
                break;
            }

            let pricePerService;

            while (true) {
                let input = prompt("Nhập đơn giá xét nghiệm (số nguyên > 0): ");

                if (input === null) {
                    console.log("Hủy giao dịch. Quay về menu.");
                    cancelled = true;
                    break;
                }

                pricePerService = parseInt(input);

                if (isNaN(pricePerService) || pricePerService <= 0) {
                    console.log("Đơn giá không hợp lệ. Vui lòng nhập lại.");
                }
                else {
                    break;
                }
            }

            if (cancelled) {
                break;
            }

            let baseCost = serviceCount * pricePerService;
            let discount = serviceCount >= 4 ? Math.round(baseCost * 0.1) : 0;
            let medicalSuppliesFee = Math.round((baseCost - discount) * 0.08);
            let totalPayment = (baseCost - discount) + medicalSuppliesFee;

            totalRevenue += totalPayment;
            totalVisits += 1;

            console.log("Hóa đơn viện phí:");
            console.log("Mã phiếu khám bệnh: ", currentTicketCode);
            console.log("Số chỉ định xét nghiệm: ", serviceCount);
            console.log("Đơn giá xét nghiệm: ", pricePerService);
            console.log("Chi phí cơ sở: ", baseCost);
            console.log("Tiền giảm giá: ", discount);
            console.log("Phụ phí vật tư y tế: ", medicalSuppliesFee);
            console.log("Tổng thanh toán: ", totalPayment);

            currentTicketCode = "";
            isTicketValid = false;

            break;
        }

        case '3': {
            let serialNumber = prompt(
                "Nhập số seri trên thẻ hồ sơ bệnh nhân điện tử (chỉ gồm các chữ số): "
            );

            if (serialNumber === null || serialNumber.trim() === "") {
                console.log("Số seri không hợp lệ. Vui lòng thử lại.");
                break;
            }

            serialNumber = serialNumber.trim();

            if (
                !/^\d+$/.test(serialNumber) ||
                serialNumber.length < 2 ||
                /^0+$/.test(serialNumber)
            ) {
                console.log("Số seri không hợp lệ. Vui lòng thử lại.");
                break;
            }

            let reversedSerial = serialNumber.split('').reverse().join('');

            let digitSum = 0;

            for (let char of serialNumber) {
                digitSum += parseInt(char);
            }

            let isDivisibleBy9 = digitSum % 9 === 0;
            let isPalindrome = serialNumber === reversedSerial;

            let prize;

            if (isDivisibleBy9) {
                if (isPalindrome) {
                    prize = "Giải đặc biệt";
                }
                else {
                    prize = "Giải nhì";
                }
            }
            else {
                prize = "Không có giải thưởng";
            }

            console.log("Kết quả thẩm định mã hồ sơ:");
            console.log("Mã số gốc: ", serialNumber);
            console.log("Mã đảo ngược: ", reversedSerial);
            console.log("Tổng chữ số: ", digitSum);
            console.log("Chia hết cho 9: ", isDivisibleBy9 ? "Có" : "Không");
            console.log("Giải thưởng: ", prize);

            break;
        }

        case '0':
            console.log("Thoát chương trình.");
            break;

        default:
            console.log("Lựa chọn không hợp lệ. Vui lòng thử lại.");
    }

} while (choice !== '0');