const balanceElement = document.getElementById("balance");
const getloanElement = document.getElementById("loan-button");
const outstandingElement = document.getElementById("outstanding");
const paymentElement = document.getElementById ("payment");
const workElement = document.getElementById ("work-button");
const bankElement = document.getElementById ("bank-button");
const repayElement = document.getElementById("repay-button");
const laptopsElement = document.getElementById("laptops");
const featureElement = document.getElementById("features");
const buyElement = document.getElementById("buy-now")
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const imageElement = document.getElementById ("image");
const laptopclassElement =document.getElementById("laptop-text")
const priceElement =document.getElementById("price")

//Variables
let balance = 0;
let outstanding = 0;
let payment = 0;
let laptops = [];
let selectedLaptop;

// Function to get a loan when hitting loanbutton 
function handelGetLoan() {

    if (outstanding> 0){
        alert("You already have a loan. You need to pay that one first")
    }
    else if (balance==0){
        alert("You can't loan if you don't have any mooney");
    }
    else if (balance>0){
        const loan = prompt("Please enter how much you want to loan");
        if(null === loan){
            loan=0
        }
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
//function to increase Payment with 100 kr every time the button is hitted. 
function handelWork() {
    payment += 100
    paymentElement.innerText = "Payment " + payment + " kr"
}
//Function to give 10% of the money transfer from payment to balance to existing loan. The rest will go to balance.
//If no Loan exist all the money will go to the balance when the bankbutton is hitted.
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

    balanceElement.innerText = "Balance " + balance + " kr";
    paymentElement.innerText = "Payment " + payment + " kr";
    outstandingElement.innerText = "Outstanding loan " + outstanding + " kr";

    if (outstanding === 0){
        outstandingElement.hidden = true
        repayElement.hidden = true
    }

}

// Function to payback the loan, the button only shows if you have a loan
function handelRepay(){
    if (outstanding >= payment){
        outstanding -= payment;
        payment = 0;
        
    } else if  (outstanding > 0){
        payment -= outstanding;
        outstanding = 0 ;
    }
    paymentElement.innerText = "Payment " + payment + " kr"
    outstandingElement.innerText = "Outstanding loan " + outstanding  + " kr"

    if (outstanding === 0){
        outstandingElement.hidden = true
        repayElement.hidden = true
    }
}

//Fetching from the API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then (laptops => addLaptopsToMenu(laptops))

    // Function to get all the laptops to the Menu
const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x));
    featureElement.innerText = laptops[0].specs
    titleElement.innerText = laptops [0].title
    descriptionElement.innerText = laptops [0].description
    priceElement.innerText = laptops [0].price + " kr"
    
}
//function to get a specific laptop in the menu
const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    document.getElementById("laptops").appendChild(laptopElement);
}

//Function to get Features from the API
const handelLaptopsFeature = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    featureElement.innerText = selectedLaptop.specs;
    titleElement.innerText = selectedLaptop.title;
    descriptionElement.innerText = selectedLaptop.description;
    imageElement.setAttribute("src","https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image);
    priceElement.innerText = selectedLaptop.price + " kr";
}

//Function to handel Buy Button
const handelBuyButton = () => {
    const selectedLaptop = laptops[laptopsElement.selectedIndex];
    const price = selectedLaptop.price;
    if (balance >= selectedLaptop.price){
    alert ("Congratulation with youre new laptop")
    balance = balance - price;
    balanceElement.innerText = "Balance " + balance + " kr";
    } else {
        alert ("You need to work a littel harder to buy this Laptop");
    
}
}  

//Event handler
laptopsElement.addEventListener("change", handelLaptopsFeature)
buyElement.addEventListener("click",handelBuyButton)
getloanElement.addEventListener("click",handelGetLoan);
workElement.addEventListener("click",handelWork);
bankElement.addEventListener("click",handelBank);
repayElement.addEventListener("click", handelRepay)

