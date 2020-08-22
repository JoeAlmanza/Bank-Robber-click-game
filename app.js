let cash = 0;

let clickUpgrades = [
  { name: "Backpack",
    price: 40,
    quantity: 0,
    multiplier: 1
  },
  { name: "Duffle",
    price: 300,
    quantity: 0,
    multiplier: 5
  },
  { name: "Wheelbarrow",
    price: 1500,
    quantity: 0,
    multiplier: 15
  }

]
let automaticUpgrades = [{
    name: "Hack In",
    price: 500,
    quantity: 0,
    multiplier: 5
  },
  {
    name: "Armored Truck",
    price: 3000,
    quantity: 0,
    multiplier: 15
  }
]

let currentUpgrades = []

function mine(){
  cash++;
  for (let i = 0; i < clickUpgrades.length; i++) {
    const upgrade = clickUpgrades[i];
    if(upgrade.quantity > 0){
      cash+= (upgrade.multiplier * upgrade.quantity)
    }
  }
  // if(automaticUpgrades[0].quantity > 0){
  //   cash+= (automaticUpgrades[0].multiplier * automaticUpgrades[0].quantity)
  // }
  // if(automaticUpgrades[1].quantity > 0){
  //   cash+= (automaticUpgrades[0].multiplier * automaticUpgrades[1].quantity)
  // }
  console.log(cash);
  update()
}

function autoMine(){
  cash+= 0;
  for (let i = 0; i < automaticUpgrades.length; i++) {
    const upgrade = automaticUpgrades[i];
    if(upgrade.quantity > 0){
      cash+= (upgrade.multiplier * upgrade.quantity)
    }
  }
  update()
}

function startInterval() {
  setInterval(autoMine, 2000);
}

function update(){
  let cashDisplay = document.getElementById("cashDisplay")
  cashDisplay.innerHTML = `${cash}`
}

function buyClickUpgrade(ugName){
  let clickUpgrade = clickUpgrades.find(i => i.name == ugName)
  if (cash >= clickUpgrade.price){
    cash -= clickUpgrade.price;
    currentUpgrades.push(clickUpgrade)
    clickUpgrade.quantity++;
    clickUpgrade.price += 50;
    console.log("purchased")
    update()
    drawUpgrades()
    }
    else{
      console.log("you need more money, rob the bank")
    }
  console.log(currentUpgrades)
}
function buyAutomaticUpgrade(ugName){
    let autoUpgrade = automaticUpgrades.find(i => i.name == ugName)
  if (cash >= autoUpgrade.price){
    cash -= autoUpgrade.price;
    currentUpgrades.push(autoUpgrade)
    autoUpgrade.quantity++;
    autoUpgrade.price += 150;
    console.log("purchased")
    update()
    drawUpgrades()
    startInterval()
    }
    else{
      console.log("you need more money, rob the bank")
    }
  console.log(currentUpgrades)
}

let upgradeArea = document.getElementById("upgradeBox")

function drawUpgrades(){
  let template = ""
  clickUpgrades.forEach(u => template += `<button id="upgradeButton" onclick="buyClickUpgrade('${u.name}')">$${u.price} - ${u.name} <br>x${u.quantity}</button>`)
  automaticUpgrades.forEach(u => template += `<button id="upgradeButton" onclick="buyAutomaticUpgrade('${u.name}')">$${u.price} - ${u.name} <br> x${u.quantity}</button>`)
  upgradeArea.innerHTML = template
}

drawUpgrades()

