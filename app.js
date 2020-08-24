// ---------- CASH AND ITEMS

let cash = 0;

let clickUpgrades = [
{ name: "Backpack",
  price: 40,
  quantity: 0,
  multiplier: 1
},
{ name: "Duffle",
  price: 200,
  quantity: 0,
  multiplier: 3
},
{ name: "Wheelbarrow",
  price: 500,
  quantity: 0,
  multiplier: 5
}
]
let automaticUpgrades = [{
  name: "Hack In",
  price: 300,
  quantity: 0,
  multiplier: 2
},
{
  name: "Armored Truck",
  price: 1000,
  quantity: 0,
  multiplier: 5
}
]

// ---------- GAME FUNCTION

let currentUpgrades = JSON.parse(localStorage.getItem("upgradeData")) || []

function update(){
  let cashDisplay = document.getElementById("cashDisplay")
  cashDisplay.innerHTML = `${cash}`
}

function mine(){
  cash++;
  for (let i = 0; i < clickUpgrades.length; i++) {
    let upgrade = clickUpgrades[i];
    if(upgrade.quantity > 0){
      cash+= (upgrade.multiplier * upgrade.quantity)
    }
  }
  console.log(cash);
  update()
}

function autoMine(){
  cash+= 0;
  for (let i = 0; i < automaticUpgrades.length; i++) {
    let upgrade = automaticUpgrades[i];
    if(upgrade.quantity > 0){
      cash+= (upgrade.multiplier * upgrade.quantity)
    }
  }
  update()
}

function buyClickUpgrade(ugName){
  let clickUpgrade = clickUpgrades.find(i => i.name == ugName)
  if (cash >= clickUpgrade.price){
    cash -= clickUpgrade.price;
    currentUpgrades.push(clickUpgrade)
    clickUpgrade.quantity++;
    clickUpgrade.price += 50;
    update()
    drawUpgrades()
  }
  localStorage.setItem("upgradeData", JSON.stringify(currentUpgrades))
}

function buyAutomaticUpgrade(ugName){
    let autoUpgrade = automaticUpgrades.find(i => i.name == ugName)
  if (cash >= autoUpgrade.price){  
    cash -= autoUpgrade.price;
    currentUpgrades.push(autoUpgrade)
    autoUpgrade.quantity++;
    autoUpgrade.price += 150;
    update()
    drawUpgrades()
  }
  localStorage.setItem("upgradeData", JSON.stringify(currentUpgrades))
}

function startInterval() {
  setInterval(autoMine, 3000);
}

let upgradeArea = document.getElementById("upgradeBox")

function drawUpgrades(){
  let template = ""
  clickUpgrades.forEach(u => template += `<button class="bg-secondary" id="upgradeButton" onclick="buyClickUpgrade('${u.name}')"><b class="text-info">$${u.price} - ${u.name}</b> <br>x${u.quantity}  <br> <b class="text-success">Current Bonus:</b> $${u.quantity * u.multiplier}<br> every click</button>`)

  automaticUpgrades.forEach(u => template += `<button class="bg-secondary "id="upgradeButton" onclick="buyAutomaticUpgrade('${u.name}')"><b class="text-info">$${u.price} - ${u.name}</b> <br> x${u.quantity}  <br> <b class="text-success">Current Bonus:</b> $${u.quantity * u.multiplier}<br> every 3 seconds</button>`)
  upgradeArea.innerHTML = template
}

startInterval()
drawUpgrades()
