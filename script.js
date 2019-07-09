var emailInfo = []
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

 const componentArray = store.prices.map(({ component }) => component)


  const createSale = () => {
   let sale = { saleDate: new Date(), agentName: "", components:[], sucursal: "", totalPrice: "" }
   let agent = document.getElementById("agent")
   let component = document.getElementById("component")
   let saleStore = document.getElementById("store")
   sale.agentName = agent.value 
   agent.value = "0"
   sale.components.push(component.value)
   component.value = "0"
   sale.sucursal = saleStore.value
   saleStore.value = "0"
   sale.totalPrice = machinePrice(sale.components)
   if (sale.agentName && sale.components && sale.sucursal != "0" && ["0"]) 
   {store.sales.push(sale) && createTr(store.sales)} else 
   {alert("Selecciona tu opcion para continuar")}
}


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

 const salesPositive = (month, year) => {
  if (monthSales(month, year) > 0) {
     return true
  } else {
     return false
  }
 }

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

 const bestSeller = () => {
    let bestNumber = store.prices.map(e => componentSaleQuantity(e.component)).reduce((a,b) => a > b ? a : b)
    let componentName = store.prices.filter(e =>{
       if (bestNumber === componentSaleQuantity(e.component)) return e
    })
    return componentName[0].component;
 };


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

 const createLi = (lista,id) => {
   let sucursalUl = document.getElementById(id)
   lista.forEach (m => 
      {let li = document.createElement('li')
      li.innerText = `${m.month}: ${m.total} ventas`
      sucursalUl.appendChild(li)
      })
   }

  const createOption = (list,id) => {
    let select = document.getElementById(id)
    list.forEach(e => {
       let option = document.createElement('option')
       option.innerText = e;
       select.appendChild(option)
       return option
 })
 }

 const initialize = () => {
    printInitialData()
 }

 const printInitialData = () => {
   createLi(sucursalRender(),"sucursalRender")
   createLi(monthsRender(),"monthRender")
   createOption(store.agents,"agent")
   createOption(store.sucursals,"store")
   createOption(componentArray,"component")  
   createTr(store.sales)
   award()
}

 let myFunction = () => {
   let element = document.getElementById("options");
   element.classList.toggle("togle");
}

 const createTr = (list) => {
   let container = document.getElementById("container")
   container.innerHTML = ''
   list.forEach(sale => {
      let tr = document.createElement('tr')
      Object.keys(sale).forEach( e=> {
         let td = document.createElement('td')
         if (e === 'saleDate'){
            td.innerText = `${sale[e].getFullYear()},${sale[e].getMonth()+1},${sale[e].getDate()}`
         } else {
            td.innerText =  sale[e]
         }
         tr.appendChild(td)
      })
      container.appendChild(tr)
   })
 }

 const award = () => { 
 let h4 = document.getElementById('bestSeller')
h4.innerText = bestSeller();
 }

 function validar_email( email ) 
 {
     var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     return regex.test(email) ? true : false;
 }
 

 const clientEmail = () => {
    let email = document.getElementById("email")
    if (validar_email(email.value)) {emailInfo.push(email.value) && alert("¡Gracias por sumarte!")} else {alert("Ingresa un email valido")}
    email.value = ""
    var aux = JSON.stringify(emailInfo)
   window.localStorage.setItem('email', aux)
   }
