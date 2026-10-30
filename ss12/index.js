// 1. Hiển thị danh sách đơn đặt vé
//             2. Thêm đơn đặt vé mới
//             3. Cập nhật đơn đặt vé
//             4. Xóa đơn đặt vé
//             5. Tìm kiếm đơn đặt vé theo tên phim
let bookings = [  
    { 
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 9000,
    totalAmount: 194400
    },
                 
    { 
    bookingCode: "CIN-002", 
    customerName: "Trần Thị Bình",    
    movieTitle: "Biệt Đội Sao Băng", 
    ticketCount: 4,    
    pricePerTicket: 90000, 
    totalAmount: 349920 
},  
{ 
    bookingCode: "CIN-003", 
    customerName: "Lê Minh Châu",    
    movieTitle: "Mùa Hè Rực Lửa", 
    ticketCount: 6,    
    pricePerTicket: 110000, 
    totalAmount: 641520 
}];


function displayBookingList() {
    console.log("Hiển thị danh sách đơn đặt vé");
    if (!bookings || bookings.length === 0) {
        console.log("Danh sách đơn đặt vé trống.");
        return;
    }
    let totalRevenue = 0;
    bookings.forEach((Element, index) => {
        console.log(`Đơn đặt vé ${index + 1}. ${Element.bookingCode} - Khách hàng: ${Element.customerName} - Phim: ${Element.movieTitle} - Số vé: ${Element.ticketCount} - Giá vé: ${Element.pricePerTicket} - Tổng tiền: ${Element.totalAmount}`);
        totalRevenue += Element.totalAmount;
    });
    console.log(` tổng vé: ${bookings.length} - Tổng doanh thu: ${totalRevenue}`);
}
function formatName(name) {
    if (!name){
        return "";
    } 
    let tripmed = name.trim();
    let words = tripmed.split("");
    let cappitaledWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return cappitaledWords.join(" ");
}
function findBookingByCode(bookingCode) {
    if (!bookingCode) {
        return -1;
    }
    let targetCode = bookingCode.trim().toUpperCase();
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === targetCode) {
            return i;
        }
    }
    return -1;
}
//hàm kiểm tra mã đặt vé
function valideBookingCode(bookingCode) {
    if (bookingCode === null) {
        return "hủy thao tác";
    }
    if (bookingCode === "") {
        return "Mã đặt vé không được để trống";
    }
    let upperCaseCode = bookingCode.trim().toUpperCase();    

    if (upperCaseCode.length <6){
        return "Mã đặt vé phải có ít nhất 6 ký tự";
    }
    if (!upperCaseCode.startsWith("CIN-")) {
        return "Mã đặt vé phải bắt đầu bằng 'CIN-'";
    }
    if (findBookingByCode(upperCaseCode) !== -1) {
        return "Mã đặt vé đã tồn tại trong danh sách";
    }
    return "";
}
function addNewBooking() {
    console.log("Thêm đơn đặt vé mới");
}

function updateBooking() {
    console.log("Cập nhật đơn đặt vé");
}

function deleteBooking() {
    console.log("Xóa đơn đặt vé");
}

function searchBooking() {
    console.log("Tìm kiếm đơn đặt vé theo tên phim");
}

function main(){
    let choice;
    do {
        choice = +prompt(`
            =========================================    
            HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
            =========================================
            1. Hiển thị danh sách đơn đặt vé
            2. Thêm đơn đặt vé mới
            3. Cập nhật đơn đặt vé
            4. Xóa đơn đặt vé
            5. Tìm kiếm đơn đặt vé theo tên phim
            0. Thoát chương trình
            =========================================
            Vui lòng nhập lựa chọn của bạn (0 - 5): `);

        switch (choice) {
            case 1:
              displayBookingList();  
            break;

            case 2:
                addNewBooking();
                break;
            case 3:
                updateBooking();
                break;
            case 4:
                deleteBooking();
                break;
            case 5:
                searchBooking();
                break;
        
            default:
                break;
        }
    } while (choice !== 0);
}

main();