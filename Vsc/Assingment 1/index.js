const balanceElement = document.getElementById("balance");
const getloanElement = document.getElementById("loan-button");
const outstandingElement = document.getElementById("outstanding");
const paymentElement = document.getElementById ("payment");
const workElement = document.getElementById ("work-button");
const bankElement = document.getElementById ("bank-button");
const repayElement = document.getElementById("repay-button");
const laptopsElement = document.getElementById("laptops");
const featureElement = document.getElementById("features");
//const buyElement = document.getElementById("buy-now")
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");

let balance = 200;
let outstanding = 0;
let payment = 0;
let laptops = [];

outstandingElement.innerText = "Outstanding loan "+ outstanding + "kr"
balanceElement.innerText= "Balance " + balance + "kr"
paymentElement.innerText= "Payment " + payment + "kr"



function handelGetLoan() {

    if (outstanding> 0){
        alert("You already have a loan. You need to pay that one first")
    }
    else if (balance==0){
        alert("You can't loan if you don't have any mooney");
    }

    else if (balance>0){
        const loan = prompt("Please enter how much you want to loan");
        if (loan<=balance*2){
            alert("Congratulations with youre new Loan");
            outstanding += parseInt(loan)
            balance += parseInt(loan)
            outstandingElement.innerText = "Outstanding " + loan + " kr";
            balanceElement.innerText = "Balance " + balance + " kr";
            outstandingElement.hidden = false
            repayElement.hidden = false
        }
        if (loan > balance*2){
            alert("You can only get a loan doble youre balance")
        }          
    }    
}

function handelWork() {
    payment += 100
    paymentElement.innerText = "Payment " + payment + "kr"
}

function handelBank(){
    if(outstanding > 0){
        if(outstanding > payment*0.1){
            outstanding -= payment*0.1;
            balance += payment * 0.9;
        } else{
            balance += (payment - outstanding);
            outstanding = 0;
        }
    } else{
        balance += payment;
    }
    payment = 0;

    balanceElement.innerText = "Balance" + balance + " kr";
    paymentElement.innerText = "Payment " + payment + "kr";
    outstandingElement.innerText = "Outstanding loan " + outstanding + "kr";

    if (outstanding === 0){
        outstandingElement.hidden = true
        repayElement.hidden = true
    }

}

function handelRepay(){
    if (outstanding >= payment){
        outstanding -= payment;
        payment = 0;
        
    } else if  (outstanding > 0){
        payment -= outstanding;
        outstanding = 0 ;
    }
    paymentElement.innerText = "Payment " + payment + "kr"
    outstandingElement.innerText = "Outstanding loan " + outstanding  + "kr"

    if (outstanding === 0){
        outstandingElement.hidden = true
        repayElement.hidden = true
    }
}



getloanElement.addEventListener("click",handelGetLoan);
workElement.addEventListener("click",handelWork);
bankElement.addEventListener("click",handelBank);
repayElement.addEventListener("click", handelRepay)

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then (laptops => addLaptopsToMenu(laptops))

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x));
    featureElement.innerText = laptops[0].specs
}

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    document.getElementById("laptops").appendChild(laptopElement);
}

const handelLaptopsFeature = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    featureElement.innerText = selectedLaptop.specs;

}

const selectComputer = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex]
    titleElement
}


laptopsElement.addEventListener("change", handelLaptopsFeature)

