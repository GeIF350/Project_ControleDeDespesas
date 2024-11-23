const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const transactionUl = document.querySelector("#transactions")
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount') 
// console.log({inputTransactionAmount, inputTransactionName});

// let transactions = [
//     // {id: 1, name: 'Bolo de Brigadeiro', amount: -20},
//     // {id: 2, name: 'Salário', amount: 300},
//     // {id: 3, name: 'Torta de Frango', amount: -10},
//     // {id: 4, name: 'Violão', amount: -150}
// ];

// console.log(transactions);

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []
const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    //console.log(transactions);
    updateLocalStorage()
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

// addTransactionIntoDOM(transactions[0]);
// addTransactionIntoDOM(transactions[1]);

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const getIncomes = transactionsAmounts => (transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2)
);
const getTotal = transactionsAmounts => (transactionsAmounts
    .reduce((accumalator, transaction) => accumalator + transaction, 0)
    .toFixed(2)
);
const updateBalanceValues = () => {
    const transactionsAmounts = transactions.map(
        (transaction) => transaction.amount
    );
    // console.log(transactionsAmounts);
    const total = getTotal(transactionsAmounts)
    const income = getIncomes(transactionsAmounts)
    const expense = getExpenses(transactionsAmounts)
    // console.log(expense);
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const addToTransactionsArray = (transName, transAmount) => {
    transactions.push(transaction = { 
        id: generateID(), 
        name: transName, 
        amount: Number(transAmount) 
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
}

const handleFormSubmit =  event => {
    event.preventDefault()
    const transName = inputTransactionName.value.trim()
    const transAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transName === '' || transAmount === ''
    if (isSomeInputEmpty) {
        alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
        return
    }
    addToTransactionsArray(transName, transAmount)

    init()

    updateLocalStorage()

    cleanInputs();
}

const generateID = ()=> Math.round(Math.random()*1000)
form.addEventListener('submit', handleFormSubmit)