const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const transactionUl = document.querySelector("#transactions")
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount') 
// console.log({inputTransactionAmount, inputTransactionName});

let dummyTransactions = [
    {id: 1, name: 'Bolo de Brigadeiro', amount: -20},
    {id: 2, name: 'Salário', amount: 300},
    {id: 3, name: 'Torta de Frango', amount: -10},
    {id: 4, name: 'Violão', amount: -150}
];

console.log(dummyTransactions);

const removeTransaction = ID => {
    dummyTransactions = dummyTransactions.filter(transaction => transaction.id !== ID)
    //console.log(dummyTransactions);
    init()
}

const addTransactionIntoDOM = (transaction) => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? "minus" : "plus";
    const amountWithoutOperator = Math.abs(transaction.amount);
    const li = document.createElement("li");  

    li.classList.add(CSSClass);    
    li.innerHTML =  
        `
            ${transaction.name} 
            <span> ${operator} R$ ${amountWithoutOperator}</span>
            <button class="delete-btn" onClick = "removeTransaction(${transaction.id})">
                x   
            </button>
        `;
    transactionUl.append(li);
    transactionUl.prepend(li);
    // console.log(operator);
    console.log(li);
};

// addTransactionIntoDOM(dummyTransactions[0]);
// addTransactionIntoDOM(dummyTransactions[1]);

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(
        (transaction) => transaction.amount
    );
    console.log(transactionsAmounts);
    const total = transactionsAmounts
        .reduce((accumalator, transaction) => accumalator + transaction, 0)
        .toFixed(2);
    const income = transactionsAmounts
        .filter((value) => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2);
    const expense = Math.abs(transactionsAmounts
        .filter((value) => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2));

    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    dummyTransactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init()

const generateID = ()=> Math.round(Math.random()*1000)
form.addEventListener('submit', event => {
    event.preventDefault()
    const transName = inputTransactionName.value.trim()
    const transAmount = inputTransactionAmount.value.trim()
    if(transName==='' || transAmount === ''){
        alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
        return
    }

    const transaction = { 
        id: generateID(), 
        name: transName, 
        amount: Number(transAmount) }
    //console.log(transaction);
    
    dummyTransactions.push(transaction)

    init()

    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
 })