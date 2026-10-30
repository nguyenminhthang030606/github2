let smartHomeDevices = [];

const createDevice = (list, newDev) => {
  if (!newDev.name || !newDev.room || typeof newDev.power !== 'number' || newDev.power <= 0) {
    return false;
  }
  
  const id = `DEV_${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
  const deviceToAdd = { id, ...newDev };
  
  list.push(deviceToAdd);
  return deviceToAdd;
};

const readDevicesByRoom = (list, roomName) => {
  return list.filter(device => device.room === roomName);
};

const updateDevice = (list, id, updateData) => {
  const index = list.findIndex(device => device.id === id);
  if (index === -1) return false;

  if (updateData.name !== undefined) {
    list[index].name = updateData.name;
  }
  if (updateData.room !== undefined) {
    list[index].room = updateData.room;
  }
  if (updateData.power !== undefined) {
    list[index].power = updateData.power;
  }
  if (updateData.isActive !== undefined) {
    list[index].isActive = updateData.isActive;
  }

  return true;
};

const deleteDevice = (list, id) => {
  const index = list.findIndex(device => device.id === id);
  if (index === -1) return false;
  
  list.splice(index, 1);
  return true;
};

const dev1 = createDevice(smartHomeDevices, { name: "Điều hòa", room: "Phòng khách", power: 1500, isActive: true });
console.log("1. Thêm thiết bị:", smartHomeDevices);

updateDevice(smartHomeDevices, dev1.id, { isActive: false, power: 0 });
console.log("2. Sau khi tắt và hạ công suất về 0W:", smartHomeDevices);

deleteDevice(smartHomeDevices, dev1.id);
console.log("3. Sau khi xóa:", smartHomeDevices);