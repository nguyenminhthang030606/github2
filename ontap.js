let orderList = [
  { orderId: "CIN-001", clientName: "Nguyễn Văn An",
    filmName: "Ánh Trăng Cuối Phố", quantity: 2,
    unitPrice: 90000, finalCost: 194400 },
  { orderId: "CIN-002", clientName: "Trần Thị Bình",
    filmName: "Biệt Đội Sao Băng", quantity: 4,
    unitPrice: 90000, finalCost: 349920 },
  { orderId: "CIN-003", clientName: "Lê Minh Châu",
    filmName: "Mùa Hè Rực Lửa", quantity: 6,
    unitPrice: 110000, finalCost: 641520 }
];

function formatOrderId(id) {
    return String(id ?? "").trim().toUpperCase();
}

function checkOrderIdValidity(id) {
    if (id === null) {
        return "Hủy thao tác";
    }

    const cleanId = String(id).trim();
    if (cleanId === "") {
        return "Mã đơn đặt vé không được để trống.";
    }

    const capitalId = cleanId.toUpperCase();
    if (capitalId.length < 6) {
        return "Mã đơn đặt vé phải có ít nhất 6 ký tự.";
    }

    if (!capitalId.startsWith("CIN-")) {
        return "Mã đơn đặt vé phải bắt đầu bằng 'CIN-'.";
    }

    if (locateOrderIndex(capitalId) !== -1) {
        return "Mã đơn đặt vé đã tồn tại. Vui lòng nhập mã khác.";
    }

    return "";
}

function locateOrderIndex(id) {
    const searchedId = formatOrderId(id);
    if (!searchedId) {
        return -1;
    }

    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].orderId === searchedId) {
            return i;
        }
    }

    return -1;
}

function getValidInteger(msg, minNum = Number.MIN_SAFE_INTEGER, maxNum = Number.MAX_SAFE_INTEGER) {
    while (true) {
        const userInput = prompt(msg);

        if (userInput === null) {
            return null;
        }

        const cleanInput = userInput.trim();
        if (cleanInput === "") {
            alert("Vui lòng nhập một số nguyên.");
            continue;
        }

        const parsedNum = Number(cleanInput);
        if (Number.isInteger(parsedNum) && Number.isFinite(parsedNum) && parsedNum >= minNum && parsedNum <= maxNum) {
            return parsedNum;
        }

        const limitMsg = Number.isFinite(minNum) && Number.isFinite(maxNum)
            ? ` trong khoảng từ ${minNum} đến ${maxNum}`
            : "";
        alert(`Giá trị nhập vào không hợp lệ. Vui lòng nhập một số nguyên${limitMsg}.`);
    }
}

function capitalizeWords(str) {
    if (!str) {
        return "";
    }

    const cleanStr = str.trim();
    if (cleanStr === "") {
        return "";
    }

    const strParts = cleanStr.split(/\s+/).filter(Boolean);
    return strParts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ");
}

function showAllOrders(ordersArray) {
    const arr = Array.isArray(ordersArray) ? ordersArray : [];
    if (arr.length === 0) {
        console.log("Danh sách đơn đặt vé trống.");
        return;
    }

    let sumRevenue = 0;
    console.log("Danh sách đơn đặt vé:");
    arr.forEach((item, pos) => {
        sumRevenue += Number(item.finalCost) || 0;
        console.log(`${pos + 1}. Mã đơn đặt vé: ${item.orderId} | Tên khách hàng: ${item.clientName} | Tên phim: ${item.filmName} | Số lượng vé: ${item.quantity} | Giá vé: ${item.unitPrice} | Tổng tiền: ${item.finalCost}`);
    });

    console.log(`Tổng vé: ${arr.length}, Tổng doanh thu: ${sumRevenue}`);
}

function addOrder(ordersArray = orderList) {
    const inputId = prompt("Nhập mã đơn đặt vé:");
    if (inputId === null) {
        console.log("Hủy thao tác tạo đơn đặt vé.");
        return;
    }

    const validationErr = checkOrderIdValidity(inputId);
    if (validationErr !== "") {
        console.log(`Lỗi: ${validationErr}`);
        return;
    }

    const inputClient = prompt("Nhập tên khách hàng:");
    if (inputClient === null) {
        console.log("Hủy thao tác tạo đơn đặt vé.");
        return;
    }
    if (inputClient.trim() === "") {
        console.log("Tên khách hàng không được để trống.");
        return;
    }

    const inputFilm = prompt("Nhập tên phim:");
    if (inputFilm === null) {
        console.log("Hủy thao tác tạo đơn đặt vé.");
        return;
    }
    if (inputFilm.trim() === "") {
        console.log("Tên phim không được để trống.");
        return;
    }

    const inputQuantity = getValidInteger("Nhập số lượng vé:", 1, Number.MAX_SAFE_INTEGER);
    if (inputQuantity === null) {
        console.log("Hủy thao tác tạo đơn đặt vé.");
        return;
    }

    const inputUnitPrice = getValidInteger("Nhập giá vé:", 1, Number.MAX_SAFE_INTEGER);
    if (inputUnitPrice === null) {
        console.log("Hủy thao tác tạo đơn đặt vé.");
        return;
    }

    const baseCost = inputQuantity * inputUnitPrice;
    let priceReduction = 0;
    if (inputQuantity > 4) {
        priceReduction = baseCost * 0.1;
    }

    const extraFee = (baseCost - priceReduction) * 0.08;
    const calculatedFinalCost = baseCost - priceReduction + extraFee;

    const formattedOrderId = formatOrderId(inputId);
    const formattedClientName = capitalizeWords(inputClient);
    const formattedFilmName = capitalizeWords(inputFilm);
    
    const createdOrder = {
        orderId: formattedOrderId,
        clientName: formattedClientName,
        filmName: formattedFilmName,
        quantity: inputQuantity,
        unitPrice: inputUnitPrice,
        finalCost: calculatedFinalCost
    };

    ordersArray.push(createdOrder);
    console.log("Đơn đặt vé đã được tạo thành công.");
}

function removeOrder(ordersArray = orderList) {
    const idToRemove = prompt("Nhập vào mã muốn xóa:");
    if (idToRemove === null) {
        console.log("Hủy thao tác xóa đơn đặt vé.");
        return;
    }

    const normalizedRemoveId = formatOrderId(idToRemove);
    const idx = locateOrderIndex(normalizedRemoveId);
    if (idx === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã: " + normalizedRemoveId);
        return;
    }

    const userOption = prompt("Xác nhận xóa vé: (Y/N)");
    if (userOption === null || (userOption.toUpperCase() !== "Y" && userOption.toUpperCase() !== "N")) {
        console.log("Hủy thao tác xóa đơn đặt vé.");
        return;
    }

    if (userOption.toUpperCase() === "Y") {
        ordersArray.splice(idx, 1);
        console.log("Đơn đặt vé đã được xóa thành công.");
        return;
    }

    console.log("Hủy thao tác xóa đơn đặt vé.");
}

function modifyOrder(ordersArray = orderList) {
    const idToModify = prompt("Nhập vào mã muốn cập nhập: ");
    if (idToModify === null) {
        console.log("Hủy thao tác cập nhật đơn đặt vé.");
        return;
    }

    const normalizedModifyId = formatOrderId(idToModify);
    const idx = locateOrderIndex(normalizedModifyId);
    if (idx === -1) {
        console.log("Không tìm thấy đơn đặt vé có mã: " + normalizedModifyId);
        return;
    }

    const updatedQuantity = getValidInteger("Nhập số lượng vé mới:", 1, Number.MAX_SAFE_INTEGER);
    if (updatedQuantity === null) {
        console.log("Hủy thao tác cập nhật đơn đặt vé.");
        return;
    }

    const updatedUnitPrice = getValidInteger("Nhập giá vé mới:", 1, Number.MAX_SAFE_INTEGER);
    if (updatedUnitPrice === null) {
        console.log("Hủy thao tác cập nhật đơn đặt vé.");
        return;
    }

    const updatedBaseCost = updatedQuantity * updatedUnitPrice;
    let updatedReduction = 0;
    if (updatedQuantity > 4) {
        updatedReduction = updatedBaseCost * 0.1;
    }

    const updatedExtraFee = (updatedBaseCost - updatedReduction) * 0.08;
    const updatedFinalCost = updatedBaseCost - updatedReduction + updatedExtraFee;

    console.log("Đơn giá trước khi cập nhật: " + ordersArray[idx].finalCost);
    ordersArray[idx].quantity = updatedQuantity;
    ordersArray[idx].unitPrice = updatedUnitPrice;
    ordersArray[idx].finalCost = updatedFinalCost;
    
    console.log("Đơn giá sau khi cập nhật: " + ordersArray[idx].finalCost);
    console.log("Đơn đặt vé đã được cập nhật thành công.");
}

function findOrderByFilm() {
    const filmQuery = prompt("Nhập tên phim muốn tìm kiếm: ");
    if (filmQuery === null) {
        console.log("Hủy thao tác tìm kiếm đơn đặt vé.");
        return;
    }

    const lowerQuery = filmQuery.trim().toLowerCase();
    let isMatched = false;
    
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].filmName.toLowerCase().includes(lowerQuery)) {
            console.log("Mã vé tìm thấy: " + orderList[i].orderId);
            isMatched = true;
            break;
        }
    }

    if (!isMatched) {
        console.log("Không tìm thấy đơn đặt vé cho phim: " + filmQuery);
    }
}

function startApp() {
    let menuSelection = "";
    do {
        menuSelection = prompt(`=====================================================
     HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
=====================================================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
=====================================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`);

        if (menuSelection === null) {
            console.log("Hủy thao tác. Chương trình kết thúc.");
            break;
        }

        switch (menuSelection) {
            case "1":
                showAllOrders(orderList);
                break;
            case "2":
                addOrder(orderList);
                break;
            case "3":
                modifyOrder(orderList);
                break;
            case "4":
                removeOrder(orderList);
                break;
            case "5":
                findOrderByFilm();
                break;
            case "0":
                console.log("Thoát chương trình.");
                break;
            default:
                alert("Lựa chọn không hợp lệ. Vui lòng nhập lại.");
                break;
        }
    } while (menuSelection !== "0");
}

startApp();