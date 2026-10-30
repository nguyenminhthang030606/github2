let circulationLogs = [];
let logIdCounter = 1;

const borrowBook = (studentCode, bookIsbn) => {
  if (!studentCode || !bookIsbn) return;
  
  circulationLogs.push({
    logId: logIdCounter++,
    studentCode,
    bookIsbn,
    status: "BORROWING",
    fineAmount: 0,
    daysSinceResolved: 0 
  });
};

const returnBook = (logId, status, daysLate = 0) => {
  const log = circulationLogs.find(l => l.logId === logId);
  
  if (!log || log.status !== "BORROWING") return;

  log.status = status;
  
  if (status === "LOST") {
    log.fineAmount = 200000;
  } else if (status === "RETURNED" && daysLate > 0) {
    log.fineAmount = daysLate * 5000;
  }
};

const simulateTimePassing = (logId, days) => {
  const log = circulationLogs.find(l => l.logId === logId);
  if (log && log.status !== "BORROWING") {
    log.daysSinceResolved += days;
  }
};

const cleanupLogs = () => {
  circulationLogs = circulationLogs.filter(log => 
    log.status === "BORROWING" || log.daysSinceResolved <= 30
  );
};

const printReport = () => {
  const totalBorrowing = circulationLogs.filter(l => l.status === "BORROWING").length;
  const totalFines = circulationLogs.reduce((sum, l) => sum + l.fineAmount, 0);

  console.log("\n================ BÁO CÁO LƯU CHUYỂN SÁCH ================");
  console.table(circulationLogs);
  console.log("---------------------------------------------------------");
  console.log(`- Tổng sách đang được mượn : ${totalBorrowing} cuốn`);
  console.log(`- Tổng tiền phạt thu được  : ${totalFines.toLocaleString('vi-VN')} VNĐ`);
  console.log("=========================================================\n");
};


borrowBook("SV_1001", "ISBN-978-01"); 
borrowBook("SV_1002", "ISBN-978-02"); 
borrowBook("SV_1003", "ISBN-978-03"); 
borrowBook("SV_1004", "ISBN-978-04"); 

returnBook(1, "RETURNED", 0); 
returnBook(2, "RETURNED", 5); 
returnBook(3, "LOST", 0);     

simulateTimePassing(1, 35); 
simulateTimePassing(2, 10); 
simulateTimePassing(3, 5);  

cleanupLogs();

printReport();