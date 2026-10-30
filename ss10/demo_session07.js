let bienso = ['30A-111', '29B-222', '51C-333']
console.log("danh sach bien so hien tai: ", bienso)
let newbienso = '43D-444'
bienso.push(newbienso)
console.log("sau khi them bien so moi: ", bienso)
bienso.splice(1, 0, '14A-999')
console.log("sau khi chen bien so moi: ", bienso)
let xevaosac = bienso.shift()
console.log("bien so xe vao sac: ", xevaosac)
console.log("danh sach bien so sau khi xoa xe vao sac: ", bienso)
let kWh = [30, 45, 25]; 
let Price = 4500;
let totalEnergy = kWh.reduce((sum, kwh) => sum + kwh * Price, 0);
console.log("Tổng tiền ca trực: ", totalEnergy);
