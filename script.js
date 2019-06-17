var store = {
    agents: ["Ada", "Grace", "Hedy", "Sheryl"],
  
    sales: [

      { saleDate: new Date(2019, 1, 4), agentName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
      { saleDate: new Date(2019, 0, 1), agentName: "Ada", components: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
      { saleDate: new Date(2019, 0, 2), agentName: "Grace", components: ["Monitor ASC 543", "Motherboard MZI"] },
      { saleDate: new Date(2019, 0, 10), agentName: "Ada", components: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
      { saleDate: new Date(2019, 0, 12), agentName: "Grace", components: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
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

  // 1. precioMaquina(componentes)
  const machinePrice = components =>  {
    let totalPrice = 0
        components.forEach(c => {
        let prices = store.prices
        prices.forEach(e =>{
             if (c === e.component) {totalPrice += e.price}
      })
      })
    return totalPrice;
    }

console.log (machinePrice(["RAM Quinston Fury", "Motherboard ASUS 1500"]))

// 2. cantidadVentasComponente(componente)

const componentsSaleQuantity = component =>  {
  let sales= store.sales
  let totalQuantity = 0
      sales.forEach(c => { 
        c.components.forEach(e =>{
        if (component=== e) {totalQuantity ++}
      })
    })
        return totalQuantity;
       }
          
console.log(componentsSaleQuantity("Monitor GPRS 3000"))

// 3. vendedoraDelMes(mes, anio)
const saleswomanOfTheMonth = (month, year) =>  {
  let totalMonth= 0
  let saleDate=store.sales.saleDate
  saleDate.forEach(c => {
    agentName=store.sales.agentName
    agentName.forEach(e =>{
      if (c === e.agentName) {totalMonth += price.components}
})
})
return totalMonth;
}
console.log(saleswomanOfTheMonth(1, 2019) )

/*
// 5.ventasVendedora(nombre)

const agentSales = name => {

  let agentSales = 0

  let sales = store.sales
  sales.forEach(n => {
    if (name === n.agentName) {agentSales += machinePrice(n.components)}
  })

  return agentSales;
}
 
console.log (agentSales("Ada"))

// 6. componenteMasVendido()

/*const bestSeller = () => {
  let prices = store.prices
  let bestNumber = prices.map(e =>
    componentSaleQuantity(e.component)).reduce((a, b) => a > b ? a : b)
    prices.forEach(e =>{
      if (bestNumber === componentSaleQuantity(e.component)) {e.component}
})
  
}

console.log(bestSeller() )
*/
