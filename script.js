const changeDueDiv = document.getElementById("change-due");
const userInputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceDiv = document.getElementById("price");
const cidDIV = document.getElementById("cid");

const moneyValue = [
{name: 'ONE HUNDRED',
value: 100.00},
{name: 'TWENTY',
value: 20.00},
{name: 'TEN',
value: 10.00},
{name: 'FIVE',
value: 5.00},
{name: 'ONE',
value: 1.00},
{name: 'QUARTER',
value: 0.25},
{name: 'DIME',
value: 0.10},
{name: 'NICKEL',
value: 0.05},
{name: 'PENNY',
value: 0.01}
];


/* price and cash in draw variables */

let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 9],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

function changeDue (cash) {
	if (cash === 0) {
		return "";
	}
	
	for (let i = 0; i < moneyValue.length; i++) {
		if (cash.toFixed(2) >= moneyValue[i].value && moneyValue[i].value <= cid[cid.length - i - 1][1]) {
			console.log(cid[cid.length - i - 1][1])
			cid[cid.length - i - 1][1] -= moneyValue[i].value;
			
			console.log(moneyValue[i].value);
			
			let holder = moneyValue[i].value;
			
			if (document.getElementById(`${moneyValue[i].name}`).textContent === "") {
				document.getElementById(`${moneyValue[i].name}`).textContent = Number(moneyValue[i].value)
			} else {
				document.getElementById(`${moneyValue[i].name}`).textContent += Number(moneyValue[i].value)
			};
			
			/* changeDueDiv.innerHTML += `<p id="${moneyValue[i].name}">${moneyValue[i].name}: $${moneyValue[i].value}</p>` */
			
			return changeDue(cash.toFixed(2) - moneyValue[i].value)
		}
		
	}
};

function totalChange (price, customerCash) {
	return customerCash.toFixed(2) - price.toFixed(2);
};

function checkCidAmount (demonination, cidAmount) {
	
	
};


console.log(changeDue(14.34)); 

console.log(cid);