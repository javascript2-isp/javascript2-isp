var store = {
  agents: ["Ada", "Grace", "Hedy", "Sheryl"],
  sucursals: ["Centro","Caballito"],
  sales: [

    { saleDate: new Date(2019, 1, 4), agentName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
    { saleDate: new Date(2019, 0, 1), agentName: "Ada", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: "Centro" },
    { saleDate: new Date(2019, 0, 2), agentName: "Grace", components: ["Monitor ASC 543", "Motherboard MZI"], sucursal: "Caballito" },
    { saleDate: new Date(2019, 0, 10), agentName: "Ada", components: ["Monitor ASC 543", "Motherboard ASUS 1200"], sucursal: "Centro" },
    { saleDate: new Date(2019, 0, 12), agentName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1200"], sucursal: "Caballito" }
  ],

  prices: [
    { component: "Monitor GPRS 3000", price: 200 },
    { component: "Motherboard ASUS 1500", price: 120 },
    { component: "Monitor ASC 543", price: 250 },
    { component: "Motherboard ASUS 1200", price: 100 },
    { component: "Motherboard MZI", price: 30 },
    { component: "HDD Toyiva", price: 90 },
    { component: "HDD Wezter Dishital", price: 75 },
    { component: "RAM Quinston", price: 110 },
    { component: "RAM Quinston Fury", price: 230 }
  ]
};

//  precioMaquina(componentes)
const machinePrice = components => {
 let totalPrice = 0
 components.forEach(c => {
    let prices = store.prices
    prices.forEach(e => {
       if (c === e.component) {
          totalPrice += e.price
       }
    })
 })
 return totalPrice;
}
//  cantidadVentasComponente(componente)
const componentsSaleQuantity = component => {
 let sales = store.sales
 let totalQuantity = 0
 sales.forEach(c => {
    c.components.forEach(e => {
       if (component === e) {
          totalQuantity++
       }
    })
 })
 return totalQuantity;
}
// VentasMes
const monthSales = (month, year, data = store.sales) => {
 let list = []
 data.forEach(c => {
    if (year === c.saleDate.getFullYear() && month === c.saleDate.getMonth() + 1) {
       list.push(machinePrice(c.components))
    }
 })
 let total = list.length ? list.reduce((a, b) => a + b) : 0
 return total
}
// vendedoraDelMes(mes, anio)
const agentOfTheMonth = (m, y) => {
 let list = store.agents.map(a => {
    let x = {
       name: a,
       total: monthSales(m, y, store.sales.filter(s => s.agentName === a))
    }
    return x
 }).reduce((a, b) => a.total > b.total ? a : b)
 return list.name
}
// ventasVendedora(nombre)
const filteredSales = (type) => {
 let filteredSales = 0
 let sales = store.sales
 sales.forEach(e => {
    switch (type) {
       case e.agentName:
          return filteredSales += machinePrice(e.components)
          break
       case e.sucursal:
          return filteredSales += machinePrice(e.components)
          break
    }
 })
 return filteredSales;
}
// huboVentas
const salesPositive = (month, year) => {
 if (monthSales(month, year) > 0) {
    return true
 } else {
    return false
 }
}
// sucursalDelMes(mes, anio)
const SucursalOfTheMonth = (m, y) => {
 let list = store.sucursals.map(a => {
    let x = {
       name: a,
       total: monthSales(m, y, store.sales.filter(s => s.sucursal === a))
    }
    return x
 }).reduce((a, b) => a.total > b.total ? a : b)
 return list.name
}
//Button
var deleteItem = function(btn) {
 taskInput.splice(btn.id, 1)
 printTaskList()
}
var toggleItem = function(btn) {
 taskInput[btn.id].isPending = !taskInput[btn.id].isPending
 printTaskList()
}