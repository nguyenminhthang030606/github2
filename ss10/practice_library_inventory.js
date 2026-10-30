let library = [
  { bookCode: "B01", title: "JavaScript Cơ bản", category: "Lập trình", price: 150000, totalCopies: 10, availableCopies: 10, shelfLocation: "A1", status: "CÒN SÁCH" },
  { bookCode: "B02", title: "Cấu trúc dữ liệu", category: "Lập trình", price: 200000, totalCopies: 5, availableCopies: 5, shelfLocation: "A2", status: "CÒN SÁCH" }
];

function addBook(bookCode, title, category, price, totalCopies, shelfLocation) {
  let newBook = {
    bookCode: bookCode,
    title: title,
    category: category,
    price: price,
    totalCopies: totalCopies,
    availableCopies: totalCopies, 
    shelfLocation: shelfLocation,
    status: "CÒN SÁCH"
  };
  library.push(newBook);
  console.log(`[NHẬP KHO] Đã thêm sách mới: ${title}`);
}

function borrowBook(bookCode) {
  let book = library.find(b => b.bookCode === bookCode);
  
  if (!book) {
    console.log(`[LỖI] Không tìm thấy mã sách ${bookCode} trong kho.`);
    return;
  }

  if (book.availableCopies > 0) {
    book.availableCopies--;
    console.log(`[MƯỢN SÁCH] Đã xuất mượn 1 cuốn "${book.title}". Còn lại trên kệ: ${book.availableCopies}`);
    
    if (book.availableCopies === 0) {
      book.status = "HẾT SÁCH TRÊN KỆ";
      console.log(`[CẢNH BÁO] Sách "${book.title}" đã HẾT SÁCH TRÊN KỆ.`);
    }
  } else {
    console.log(`[TỪ CHỐI] Sách "${book.title}" đã hết, không thể mượn thêm.`);
  }
}

function removeDamagedBook(bookCode) {
  let index = library.findIndex(b => b.bookCode === bookCode);
  
  if (index !== -1) {
    let removedBook = library.splice(index, 1)[0];
    console.log(`[THANH LÝ] Đã loại bỏ sách "${removedBook.title}" khỏi kho.`);
  } else {
    console.log(`[LỖI] Không tìm thấy mã sách ${bookCode} để thanh lý.`);
  }
}

function inventoryReport() {
  let totalInventoryCopies = 0;
  let totalInventoryValue = 0;

  for (let i = 0; i < library.length; i++) {
    totalInventoryCopies += library[i].totalCopies;
    totalInventoryValue += (library[i].totalCopies * library[i].price);
  }

  console.log("\n==================== BẢNG KIỂM KÊ KHO SÁCH ====================");
  console.table(library, ["bookCode", "title", "price", "totalCopies", "availableCopies", "shelfLocation", "status"]);
  console.log("---------------------------------------------------------------");
  console.log(`- Tổng số lượng sách trong kho : ${totalInventoryCopies} cuốn`);
  console.log(`- Tổng giá trị tài sản kho     : ${totalInventoryValue.toLocaleString('vi-VN')} VNĐ`);
  console.log("===============================================================\n");
}

addBook("B03", "Thiết kế UI/UX", "Design", 250000, 3, "B1");

borrowBook("B01"); 

borrowBook("B03");
borrowBook("B03");
borrowBook("B03");
borrowBook("B03"); 

removeDamagedBook("B02");

inventoryReport();