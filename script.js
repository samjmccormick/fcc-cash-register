const changeDueDiv = document.getElementById("change-due");
const userInputCash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const cidDiv = document.getElementById("cid");
const cidSpans = document.querySelectorAll(".cid-divs > span")
const statusEl = document.getElementById("status");
const changeHolderClass = document.querySelectorAll(".change-holder");
const exactDiv = document.getElementById("exact");

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

let price = 19.5;
let cid = [ ["PENNY", 0.5], 
			["NICKEL", 0], 
			["DIME", 0], 
			["QUARTER", 0], 
			["ONE", 0], 
			["FIVE", 0], 
			["TEN", 0], 
			["TWENTY", 0], 
			["ONE HUNDRED", 0]];

let accumulator = 0;

function changeDue (cash) {
	if (cash === 0) {
		return "";
	}

	let cashFixed = parseFloat(cash.toFixed(2));
	
	for (let i = 0; i < moneyValue.length; i++) {
		if (cashFixed >= moneyValue[i].value && moneyValue[i].value <= cid[cid.length - i - 1][1]) {
			let total = 0;
			for (let j = 0; j < cid.length - i; j++) {
				 total += parseFloat((cid[j][1]).toFixed(2));
			}
			console.log(total);
			console.log(cashFixed);
			if (total < cashFixed ) {
				statusEl.parentElement.classList.remove("hide");
				statusEl.textContent = "INSUFFICIENT_FUNDS";
				return
			}else if (document.getElementById(`${moneyValue[i].name}`).textContent === "") {
				document.getElementById(`${moneyValue[i].name}`).parentElement.classList.remove("hide");
				accumulator = parseFloat((moneyValue[i].value).toFixed(2));
				document.getElementById(`${moneyValue[i].name}`).textContent = moneyValue[i].value;
			} else {
				accumulator += parseFloat((moneyValue[i].value).toFixed(2));
				document.getElementById(`${moneyValue[i].name}`).textContent = accumulator;
			}; 
		cid[cid.length - i - 1][1] -= parseFloat((moneyValue[i].value).toFixed(2));
		
		return changeDue(cashFixed - parseFloat((moneyValue[i].value).toFixed(2)))
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
	const cash = Number(userInputCash.value); 
	const change = changeNeeded(price, cash);
	
	if (cash < price) {
		alert("Customer does not have enough money to purchase the item");
	} else if (cash === price) {
	  exactDiv.classList.remove("hide");
	  exactDiv.textContent = "No change due - customer paid with exact cash";
	} else {
		cidChecks(total, change);
	} 
	populateCid();
});

