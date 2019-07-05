var store = {
   agents: ["Ada", "Grace", "Hedy", "Sheryl"],
   sucursals: ["Centro","Caballito"],
   sales: [
 
     { saleDate: new Date(2019, 1, 4), agentName: "Grace", components: ["Oleo 12", "Crema facial"], sucursal: "Centro", totalPrice: 320 },
     { saleDate: new Date(2019, 2, 1), agentName: "Ada", components: ["Oleo 12", "Crema facial"], sucursal: "Centro", totalPrice: 320 },
     { saleDate: new Date(2019, 0, 2), agentName: "Grace", components: ["Contorno de Ojos", "Mascarilla"], sucursal: "Caballito", totalPrice: 280 } 
   ],
 
   prices: [
     { component: "Oleo 12", price: 200 },
     { component: "Crema Facial", price: 120 },
     { component: "Contorno de Ojos", price: 250 },
     { component: "Balsamo Labial", price: 100 },
     { component: "Mascarilla", price: 30 },
     { component: "Mascara de Carbon", price: 90 },
     { component: "Base Liquida", price: 75 },
     { component: "Sombras naturales", price: 110 },
     { component: "Hidratante", price: 230 }
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

 let toggleFunction = () => {
   let element = document.getElementById("toggle");
   element.classList.toggle("togle");
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
   let sale = { saleDate: new Date(), agentName: "", components:[], sucursal: "", totalPrice: "" }
   let agent = document.getElementById("agent")
   let component = document.getElementById("component")
   let saleStore = document.getElementById("store")

   sale.agentName = agent.value 
   sale.components.push(component.value)
   sale.sucursal = saleStore.value
   sale.totalPrice = machinePrice(sale.components)
   if (sale.agentName && sale.components && sale.sucursal != "0" && ["0"]) 
   {store.sales.push(sale)} else 
   {alert("Selecciona tu opcion para continuar")}
}


 
 const initialize = () => {
    createLi(sucursalRender(),"sucursalRender")
    createLi(monthsRender(),"monthRender")
    createOption(store.agents,"agent")
    createOption(store.sucursals,"store")
    createOption(componentArray,"component")  
    createTr(store.sales)

 }

 let myFunction = () => {
   let element = document.getElementById("options");
   element.classList.toggle("togle");
}

//fillbestComponent
 let p = document.getElementsByClassName("bestSeller")
p.innerText = bestSeller();
console.log(p)

 //createTrYTd
 const createTr = (list) => {
   let container = document.getElementById("container")
   list.forEach(sale => {
      let tr = document.createElement('tr')
      Object.keys(sale).forEach( e=> {
         let td = document.createElement('td')
         if (e === 'saleDate'){

         } else {
            td.innerText =  sale[e]
         }
         tr.appendChild(td)
      })
      container.appendChild(tr)
   })
 }

 