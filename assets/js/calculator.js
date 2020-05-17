let calcMemoryValue = 0;
let result = document.querySelector(".calculator_result_display");
let isCalculating = false;
let resultVariable = 0;
let currentVariable = 0;
let actionSign = "";
let canConcat = true;
let isReapitingOperation = false;
const calculatorHistoryColumn = document.querySelector(".calculator_history_column");
const calcMCButton = document.querySelector("#MC");
const calcMRButton = document.querySelector("#MR");
const calcMPlusButton = document.querySelector("#MPlus");
const calcMMinusButton = document.querySelector("#MMinus");
const calcMSButton = document.querySelector("#MS");
const dataNumberButtons = document.querySelectorAll('[data-number]');
const dataOperationButtons = document.querySelectorAll('[data-operation]');
const percentButton = document.querySelector("#percent");
const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#back");
const invertButton = document.querySelector("#invert");
const cancleButton = document.querySelector("#cancle");
const powerButton = document.querySelector("#power");
const squareButton = document.querySelector("#square");
const fractionButton = document.querySelector("#fraction");
const equalButton = document.querySelector("#equal");
const calculatorHistory = document.querySelector("#calculator_history");

calcMPlusButton.addEventListener("click", ()=>{
    calcMemoryValue = parseFloat(calcMemoryValue) + parseFloat(result.innerHTML);
    standardOperation();
})

calcMMinusButton.addEventListener("click", ()=>{
    calcMemoryValue = parseFloat(calcMemoryValue) - parseFloat(result.innerHTML);
    standardOperation();
})

calcMRButton.addEventListener("click", ()=>{
    result.innerHTML = calcMemoryValue;
    standardOperation();
})

calcMSButton.addEventListener("click", ()=>{
    calcMemoryValue = result.innerHTML;
    standardOperation();
})

calcMCButton.addEventListener("click", ()=>{
    calcMemoryValue = 0;
    standardOperation();
})


cancleButton.addEventListener("click", cancleFunction);
clearButton.addEventListener("click", cleansContent);
backButton.addEventListener("click", backFunction);
invertButton.addEventListener("click", invertFunction);

function standardOperation(){
    isCalculating = false;
    canConcat = false;
    resultVariable = result.innerHTML;
}

function cancleFunction(){
    result.innerHTML = 0;
    canConcat = true;
    isCalculating = false;
}

function cleansContent(){
    cancleFunction();
    resultVariable = 0;
    currentVariable = 0;
    actionSign = '';
    isReapitingOperation = false;
    calculatorMemoryValue = 0;
}

function backFunction(){
    if(isCalculating === true || canConcat === false) return;
    if(result.innerHTML.length > 1){
        result.innerHTML = result.innerHTML.substring(0, result.innerHTML.length-1);
    }
    else{
        result.innerHTML = 0;
    }
}

function invertFunction(){
    result.innerHTML = result.innerHTML * (-1);
}



powerButton.addEventListener("click", () => {
    result.innerHTML *= result.innerHTML;
    standardOperation();
});

squareButton.addEventListener("click", () =>{
    result.innerHTML = Math.sqrt(result.innerHTML)
    standardOperation();
})

fractionButton.addEventListener("click", ()=>{
    result.innerHTML = 1 / result.innerHTML;
    standardOperation();
})

percentButton.addEventListener("click", ()=>{
    result.innerHTML = result.innerHTML / 100 * resultVariable;
    currentVariable = result.innerHTML;
    isCalculating = false;
    canConcat = false;
})

dataNumberButtons.forEach(number => {
    number.addEventListener("click", function(){
        appendNumber(this.innerHTML);
    })
})

function appendNumber(sign){
    if(sign === "." && result.innerHTML.includes(".")) return;
    if(isCalculating === true || canConcat === false){
        cancleFunction();
    }
    if (result.innerHTML === '0' && sign != '.'){
        result.innerHTML = sign;
    }
    else{
        result.innerHTML = result.innerHTML + sign;
    }
    currentVariable = result.innerHTML;
}

dataOperationButtons.forEach(button => {
    button.addEventListener("click", function(){
        if(isCalculating === false && isReapitingOperation === false){
            resultVariable = result.innerHTML;
            isCalculating = true;
            isReapitingOperation = true;
        }else{
            doMath(actionSign);
        }
        actionSign = this.innerHTML;
    });
})

equalButton.addEventListener("click", () => {
    doMath(actionSign);
    isCalculating = false;
    canConcat = false;
    isReapitingOperation = false;
});

function doMath (sign){
    switch(sign){
        case '+':
            result.innerHTML = parseFloat(resultVariable) + parseFloat(currentVariable);
            appendElement(sign);
            break;
        case '-':
            result.innerHTML = parseFloat(resultVariable) - parseFloat(currentVariable);
            appendElement(sign);
            break;
        case '/':
            result.innerHTML = parseFloat(resultVariable) / parseFloat(currentVariable);
            appendElement(sign);
            break;
        case 'x':
            result.innerHTML = parseFloat(resultVariable) * parseFloat(currentVariable);
            appendElement(sign);
            break;
    }
    resultVariable = result.innerHTML;
    isCalculating = true;
    canConcat = false;
}

function appendElement(sign){
    let firstParagraph = document.querySelector(".calculator_history_column p")
    let newItem = document.createElement('p');
    newItem.textContent = resultVariable.toString() + ' ' + sign + ' ' + currentVariable.toString() + ' = ' + result.innerHTML.toString();
    calculatorHistoryColumn.insertBefore(newItem, firstParagraph);
}




