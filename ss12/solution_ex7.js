const subscriptions = [
  { id: 'SUB_001', name: 'Nguyen Van A', plan: 'PERSONAL', deviceLimit: 1 },
  { id: 'SUB_002', name: 'Tran Thi B', plan: 'FAMILY', deviceLimit: 5 },
  { id: 'SUB_003', name: 'Le Van C', plan: 'PERSONAL', deviceLimit: 1 }
];

const addSubscription = () => {
  const name = prompt("Nhập tên khách hàng:");
  if (!name) return;
  
  const plan = prompt("Nhập gói cước (PERSONAL / FAMILY):").toUpperCase();
  const deviceLimit = plan === 'FAMILY' ? 5 : 1;
  const id = `SUB_${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  
  subscriptions.push({ id, name, plan, deviceLimit });
  console.log("Thêm thành công:", id);
};

const listSubscriptions = () => {
  console.table(subscriptions);
};

const updateSubscription = () => {
  const id = prompt("Nhập mã thuê bao cần cập nhật:");
  const index = subscriptions.findIndex(sub => sub.id === id);
  
  if (index === -1) {
    console.log("Không tìm thấy mã thuê bao!");
    return;
  }
  
  const newPlan = prompt("Nhập gói cước mới (PERSONAL / FAMILY):").toUpperCase();
  subscriptions[index].plan = newPlan;
  subscriptions[index].deviceLimit = newPlan === 'FAMILY' ? 5 : 1;
  console.log("Cập nhật thành công!");
};

const deleteSubscription = () => {
  const id = prompt("Nhập mã thuê bao cần hủy:");
  const index = subscriptions.findIndex(sub => sub.id === id);
  
  if (index === -1) {
    console.log("Không tìm thấy mã thuê bao!");
    return;
  }
  
  subscriptions.splice(index, 1);
  console.log("Hủy thuê bao thành công!");
};

const startApp = () => {
  let choice;
  do {
    const menu = "--- MENU RIKKEISTREAM ---\n" +
                 "1. Thêm thuê bao mới\n" +
                 "2. Xem danh sách thuê bao\n" +
                 "3. Cập nhật gói cước\n" +
                 "4. Hủy thuê bao\n" +
                 "5. Thoát\n" +
                 "Nhập lựa chọn của bạn:";
    
    choice = prompt(menu);

    switch (choice) {
      case '1':
        addSubscription();
        break;
      case '2':
        listSubscriptions();
        break;
      case '3':
        updateSubscription();
        break;
      case '4':
        deleteSubscription();
        break;
      case '5':
        console.log("Đã thoát chương trình.");
        break;
      default:
        console.log("Lựa chọn không hợp lệ, vui lòng nhập lại!");
    }
  } while (choice !== '5');
};

startApp();