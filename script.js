var salesList = [

]
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
 
 // arrayComponentes
 const componentArray = store.prices.map(({ component }) => component)

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
 const componentSaleQuantity = component => {
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
 // ComponenteMasVendido()
 const bestSeller = () => {
    let bestNumber = store.prices.map(e => componentSaleQuantity(e.component)).reduce((a,b) => a > b ? a : b)
    let componentName = store.prices.filter(e =>{
       if (bestNumber === componentSaleQuantity(e.component)) return e
    })
    return componentName[0].component;
 };
 // renderPorSucursal()
 const sucursalRender = () => {
    let sucursalSales = store.sucursals.map(a => {
       let x = {
          month: a,
          total: filteredSales(a)
       }
       return x
    })
    return sucursalSales
 }

 //renderPorMes()
 const monthsRender = () => {
   let objectSales;
    let allYears = store.sales.map( e => e.saleDate.getFullYear())
    let years = allYears.filter((e, i) => allYears.indexOf(e) === i)
    years.forEach( y => {
       let allMonths = store.sales.map( e => e.saleDate.getFullYear() === y ? e.saleDate.getMonth() : '')
       let months = allMonths.filter((e, i) => allMonths.indexOf(e) === i)
       objectSales = months.map( m => {
         let x = {
         month: m+1,
         total: monthSales(m+1, y)
        }
      return x
     }
    )
 })
 return objectSales
}
 //let openSelect = () => {
 //  document.getElementById("options").style.display= "block";
 //}
 
 let myFunction = () => {
    let element = document.getElementById("options");
    element.classList.toggle("options");
  }

 //createLi
 const createLi = (lista,id) => {
   let sucursalUl = document.getElementById(id)
   lista.forEach (m => 
      {let li = document.createElement('li')
      li.innerText = `${m.month}: ${m.total} ventas`
      sucursalUl.appendChild(li)
      })
   }

  //createOption
  const createOption = (list,id) => {
    let select = document.getElementById(id)
    list.forEach(e => {
       let option = document.createElement('option')
       option.innerText = e;
       select.appendChild(option)
       return option
 })
 }

 //obtener info del option
 const createSale = () => {
   let sale = { saleDate: new Date(2019, 1, 4), agentName: "", components:[], sucursal: "", totalPrice: "" }
   let agent = document.getElementById("agent")
   let component = document.getElementById("component")
   let store = document.getElementById("store")
   sale.agentName = agent.value 
   sale.components.push(component.value)
   sale.sucursal = store.value
   sale.totalPrice = machinePrice(sale.components)
   if (sale.agentName && sale.components && sale.sucursal != "0" && ["0"]) 
   {salesList.push(sale)} else 
   {alert("Selecciona tu opcion para continuar")}
}

 
 const initialize = () => {
    createLi(sucursalRender(),"sucursalRender")
    createLi(monthsRender(),"monthRender")
    createOption(store.agents,"agent")
    createOption(store.sucursals,"store")
    createOption(componentArray,"component")  
 }
