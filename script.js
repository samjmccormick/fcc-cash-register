const changeDueDiv = document.getElementById("change-due");
const userInputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const cidDiv = document.getElementById("cid");
const cidSpans = document.querySelectorAll(".cid-divs > span")
const statusEl = document.getElementById("status");
const changeHolderClass = document.querySelectorAll(".change-holder");

const moneyValue = [
{name: 'HUNDRED',
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

let price = 1.00;
let cid = [
  ['PENNY', .01],
  ['NICKEL', .05],
  ['DIME', .1],
  ['QUARTER', .25],
  ['ONE', 1],
  ['FIVE', 5],
  ['TEN', 10],
  ['TWENTY', 20],
  ['ONE HUNDRED', 100]
];

let accumulator = 0;

function changeDue (cash) {
	if (cash === 0) {
		return "";
	}
	
	for (let i = 0; i < moneyValue.length; i++) {
		if (cash.toFixed(2) >= moneyValue[i].value && moneyValue[i].value <= cid[cid.length - i - 1][1]) {
			let total = 0;
			for (let j = 0; j < cid.length - i; j++) {
				 total += cid[j][1]
			}
			
			if (total < cash) {
				statusEl.parentElement.classList.remove("hide");
				statusEl.textContent = "INSUFFICIENT_FUNDS";
				return
			}else if (document.getElementById(`${moneyValue[i].name}`).textContent === "") {
				document.getElementById(`${moneyValue[i].name}`).parentElement.classList.remove("hide");
				accumulator = moneyValue[i].value;
				document.getElementById(`${moneyValue[i].name}`).textContent = moneyValue[i].value;
			} else {
				accumulator += moneyValue[i].value;
				document.getElementById(`${moneyValue[i].name}`).textContent = accumulator;
			}; 
		cid[cid.length - i - 1][1] -= moneyValue[i].value;
		
		return changeDue(cash.toFixed(2) - moneyValue[i].value)
		}
	}
};



function populateCid () {
	for (let i = 0; i < cid.length; i++) {
		cidSpans[i].textContent = cid[i][1]
	}
};

function changeNeeded (price, customerCash) {
	return customerCash.toFixed(2) - price.toFixed(2);
};

function cidTotal () {
	let total = 0;
	for (let i = 0; i < cid.length; i++) {
		 total += cid[i][1];
	}
	return total;
};



function cidChecks (cid, changeRequired) {
	if (cid < changeRequired) {
		statusEl.parentElement.classList.remove("hide");
		statusEl.textContent = "INSUFFICIENT_FUNDS";
	} else if (cid === changeRequired) {
		statusEl.parentElement.classList.remove("hide");
		statusEl.textContent = "CLOSED";
		changeDue(changeRequired);
	} else {
		statusEl.parentElement.classList.remove("hide");
		statusEl.textContent = "OPEN";
		changeDue(changeRequired);
	}
	
}

function populatePrice () {
	priceSpan.textContent = price;
}

function clear () {
	for (let i = 0; i <changeHolderClass.length; i++) {
	changeHolderClass[i].className = "change-holder hide";
	}
}


populatePrice();

populateCid();

purchaseBtn.addEventListener("click", () => {
	clear();
	const total = cidTotal();
	const change = changeNeeded(price, Number(userInputCash.value));
	
	cidChecks(total, change);
	populateCid();
});

