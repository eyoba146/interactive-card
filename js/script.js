const holderName = document.getElementById("cardholder")
const cardNumber = document.getElementById("cardnumber")
const month = document.getElementById("month")
const year = document.getElementById("year")
const cvc = document.getElementById("cvc")
const confirmBtn = document.getElementById("confirm")
const myCvc = document.getElementById("my-cvc")
const date = document.getElementById("date")
const nameError = document.getElementById("name-error")
const numberError = document.getElementById("number-error")
const dateError = document.getElementById("date-error")
const cvcError = document.getElementById("cvc-error")
const accNo= document.getElementById("account-number")
const myName = document.getElementById("card-holder-name")
const success = document.getElementById("success-message")
const inputForm = document.getElementById("input-lists")
const typeErrors = ["Can't be blank","Wrong format, numbers only","Wrong format"]
const errBorder = "1px solid  hsl(0, 100%, 66%)"
const normalBorder = "1px solid hsl(270, 3%, 87%)"
var accNoFormat = [0,0,0,0," ",0,0,0,0," ",0,0,0,0," ",0,0,0,0]
var dateFormat = [0,0,"/",0,0]
var errors = [0,0,0,0,0,0,0]
var updatedNo = "";
updatedDateFormat = "";
let isSubmitted = 0;
holderName.addEventListener("input",() => {
        myName.innerText = holderName.value;
})

cardNumber.addEventListener("input",function() {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
    for(let i = 0; i < cardNumber.value.length;i++) {
        accNoFormat[i] = cardNumber.value[i]    
    }
    // console.log(accNoFormat)
    for(let j= 0; j < accNoFormat.length ;j++) {
            updatedNo+= accNoFormat[j]
    } 
    accNo.innerText = updatedNo
    updatedNo = ""    

})

month.addEventListener("input",function() {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
    for(let i=0; i< month.value.length;i++) {
        dateFormat[i] = month.value[i]
    }
    for(let i =0; i < dateFormat.length;i++) {
        updatedDateFormat+= dateFormat[i]
    }
    date.innerText = updatedDateFormat;
    updatedDateFormat = ""

})
year.addEventListener("input",function (){
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
    for(let i=0; i< year.value.length;i++) {
        dateFormat[i+3] = year.value[i]
    }
    for(let i =0; i < dateFormat.length;i++) {
        updatedDateFormat+= dateFormat[i]
    }
    date.innerText = updatedDateFormat;
    updatedDateFormat = ""

})
cvc.addEventListener("input",function() {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
    }
    myCvc.innerText = cvc.value
})

function checkName() {
    if(holderName.value == "") {
        errors[0] = 1
        nameError.innerText = typeErrors[0]
        holderName.style.border = errBorder
    }else {
        errors[0] = 0
        nameError.innerHTML = "&nbsp"
        holderName.style.border = normalBorder
    }
}
function checkNumber() {
    if(cardNumber.value == "") {
        numberError.innerText = typeErrors[0]
        cardNumber.style.border = errBorder
        errors[1] = 1;
    }else {
        errors[1] = 0;
        let numbers = cardNumber.value.split(" ")
        let notNumber;
        let notCorrectForm;
        console.log(numbers)
        if(numbers.length != 4) {
            numberError.innerText = typeErrors[2]
            cardNumber.style.border = errBorder
            errors[2] = 1
        }else {
        for(let i=0; i < numbers.length; i++) {
            for(let j = 0; j < numbers[i].length; j++) {
                if(isNaN(numbers[i][j])) {
                    notNumber = true
                }else if(numbers[i].length != 4) {
                    notCorrectForm = true
                    console.log(numbers[i][j])
                }
            }
        }
            if(notNumber){
                numberError.innerText = typeErrors[1]
                cardNumber.style.border = errBorder
                errors[2] = 1
            }else if(notCorrectForm) {
                numberError.innerText = typeErrors[2]
                cardNumber.style.border = errBorder
            }
            else {
                numberError.innerHTML = "&nbsp;";
                cardNumber.style.border = normalBorder;
                errors[2] = 0
            }
        }
    }
    }
function checkDate() {
    if(month.value == "" && year.value == "") {
        dateError.innerText = typeErrors[0]
        month.style.border = errBorder
        dateError.innerText = typeErrors[0]
        year.style.border = errBorder
        errors[5] = 1
    }else if(month.value == ""){
        dateError.innerText = typeErrors[0]
        month.style.border = errBorder
        errors[3] = 1
    }else if(!(month.value > 0 &&  month.value <= 12)) {
        dateError.innerText = typeErrors[2]
        month.style.border = errBorder
        errors[4] = 1
    }else if(year.value == "") {
        dateError.innerText = typeErrors[0]
        year.style.border = errBorder
        errors[5] = 1
    }else if (!(year.value >0 && year.value <=99)) {
        dateError.innerText = typeErrors[1]
        year.style.border = errBorder
    }
    else {
        year.style.border = normalBorder
        month.style.border = normalBorder
        dateError.innerHTML = "&nbsp;"
        errors[5] = 0
    }
}
function checkCvc() {
    if(cvc.value == "") {
        cvcError.innerText = typeErrors[0]
        cvc.style.border = errBorder
        errors[6] = 1
    }else if(!(cvc.value >=0 && cvc.value <= 999)) {
        cvcError.innerText = typeErrors[1]
        cvc.style.border = errBorder
    }else if(cvc.value.length != 3) {
        cvcError.innerText = typeErrors[2]
        cvc.style.border = errBorder
    }
    else {
        cvcError.innerHTML = "&nbsp;"
        cvc.style.border = normalBorder;
        errors[6] = 0
    }
}

confirmBtn.addEventListener("click",()=>{
    if(!isSubmitted) {
        let anyError;
        checkCvc();checkDate();checkNumber();checkName();
        for(let i =0; i < errors.length; i++) {
            if(errors[i] == 1) {
                anyError = true;
            }
        }
        if(!anyError) {
            inputForm.setAttribute("class","disappear")
            success.setAttribute("class","appear")
            inputForm.style.display = "none"
            success.style.display = "flex"
            isSubmitted = 1
            confirmBtn.innerText = "Continue"
        }
    }else {
        success.setAttribute("class","disappear")
        inputForm.setAttribute("class","appear")
        success.style.display = "none"
        inputForm.style.display = "block" 
        confirmBtn.innerText = "Confirm"
        cardNumber.value = ""
        holderName.value = ""
        month.value = ""
        year.value = ""
        cvc.value = ""
        isSubmitted = 0;
    }
  
})