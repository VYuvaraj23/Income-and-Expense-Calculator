const baseURL = "https://66d715ed006bfbe2e64fc4a8.mockapi.io";
getIncomeList();
getExpenseList();

const allClick = document.querySelector("#all");
const incomeClick = document.querySelector("#income");
const expenseClick = document.querySelector("#expense");

const incomeGroupClick = document.querySelector("#income-group-id");
const expenseGroupClick = document.querySelector("#expense-group-id");
const calculateBtn = document.querySelector("#calculate-id");
let totalIncomeDisplay = document.querySelector("#total-income-id");
const totalExpenseDisplay = document.querySelector("#total-expense-id");

const BalanceDisplay = document.querySelector("#balance-id");

const incomeAddBtn = document.querySelector("#income-add-id");
const expenseAddBtn = document.querySelector("#expense-add-id");

const incomeList = document.querySelector("#list-income");
const expenseList = document.querySelector("#expense-income");

itemIncomesArray = [];
itemExpensesArray = [];
incomeDisplayArray = [];
let oldIncomeValue;
let oldExpenseValue;
// let oldIncomeValueInput2 = "";
// let newIncomeValueInput1 = "";
// let newIncomeValueInput2 = "";
function getIncomeList() {
  fetch(`${baseURL}/Income`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then((data) => {
      if (data) {
        itemIncomesArray = data;
        renderIncomeUL();
        totalIncome();
      } else {
        throw new Error("render error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderIncomeUL() {
  incomeList.innerHTML = "";
  itemIncomesArray.forEach((item) => {
    // console.log( item.value)
    const li = document.createElement("li");
    li.id = `item-${+item.id}`;
    li.innerHTML = `<input readOnly type="text" placeholder="Income Detail..." id="incomeTitle-${item.id}" value="${item.title}" ><input readOnly type="number" placeholder="Enter Amount..." id="incomeAmount-${item.id}" value="${item.amount}"><button onclick="toggleEditSaveIncome(${item.id})" id="editIncomeBtn-${item.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 "
                id="editIncome-${item.id}"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hidden"
              id="saveIncome-${item.id}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
            </button>
            
            <button onclick="deleteIncomeItem(${item.id})" id="deleteIncomeBtn-${item.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>`;
    incomeList.appendChild(li);
  });
}

function toggleEditSaveIncome(id) {
  const input1 = document.getElementById(`incomeTitle-${id}`);
  const input2 = document.getElementById(`incomeAmount-${id}`);

  // console.log(input2);
  if (input1.readOnly && input2.readOnly) {
    editIncome(id);
  } else {
    saveIncome(id);
  }
}
function editIncome(id) {
  const input1 = document.getElementById(`incomeTitle-${id}`);
  const input2 = document.getElementById(`incomeAmount-${id}`);
  input1.readOnly = false;
  input2.readOnly = false;
  const editBtn = document.getElementById(`editIncome-${id}`);
  const saveBtn = document.getElementById(`saveIncome-${id}`);
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
  input1.focus();
  // input2.focus();
  input1.setSelectionRange(input1.value.length, input1.value.length);
  // oldIncomeValueInput1.value = input1.value;
  // oldIncomeValueInput2.value = input2.value;
  // console.log(typeof input2.value)
  oldIncomeValue = { title: input1.value, amount: +input2.value };
}

function saveIncome(id) {
  const input1 = document.getElementById(`incomeTitle-${id}`);
  const input2 = document.getElementById(`incomeAmount-${id}`);
  input1.readOnly = true;
  input2.readOnly = true;
  const editBtn = document.getElementById(`editIncome-${id}`);
  const saveBtn = document.getElementById(`saveIncome-${id}`);
  editBtn.classList.remove("hidden");
  saveBtn.classList.add("hidden");

  const newIncomeValue = { title: input1.value, amount: +input2.value };

  // console.log(oldIncomeValueInput1.value)
  // console.log(oldIncomeValueInput2.value)
  // console.log(oldIncomeValue);

  fetch(`${baseURL}/Income/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIncomeValue),
  })
    .then((response) => {
      if (!response.ok) {
        newIncomeValue = oldIncomeValue;
      }
    })
    .catch(() => {
      newIncomeValue = oldIncomeValue;
    })
    .finally(() => {
      getIncomeList();
    });
}

function deleteIncomeItem(id) {
  fetch(`${baseURL}/Income/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      itemIncomesArray = itemIncomesArray.filter((x) => x.id !== id);
    })
    .catch(() => {})
    .finally(() => {
      getIncomeList();
    });
}

function addIncomeItems() {
  const newIncomeItem = { title: "", amount: "" };

  fetch(`${baseURL}/Income/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newIncomeItem),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      itemIncomesArray.push(data);
      // console.log(itemIncomesArray);
    })
    .catch(() => {})
    .finally(() => {
      getIncomeList();
    });
}

function totalIncome() {
  const incomeDisplayArray = itemIncomesArray.map((item) => item.amount);
  totalIncomeDisplay.textContent = "Total Income : ";
  totalIncomeDisplay.textContent += incomeDisplayArray.reduce(
    (acc, curr) => acc + curr,
    0
  );
}

// expenses code

function getExpenseList() {
  fetch(`${baseURL}/Expense`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    })
    .then((data) => {
      if (data) {
        itemExpensesArray = data;
        renderExpenseUL();
        totalExpense();
      } else {
        throw new Error("render error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderExpenseUL() {
  expenseList.innerHTML = "";
  itemExpensesArray.forEach((item) => {
    // console.log( item.value)
    const li = document.createElement("li");
    li.id = `item-${+item.id}`;
    li.innerHTML = `<input readOnly type="text" placeholder="Expense Detail..." id="expenseTitle-${item.id}" value="${item.title}" ><input readOnly type="number" placeholder="Enter Amount..." id="expenseAmount-${item.id}" value="${item.amount}"><button onclick="toggleEditSaveExpense(${item.id})" id="editExpenseBtn-${item.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 "
                id="editExpense-${item.id}"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hidden"
              id="saveExpense-${item.id}">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
</svg>
            </button>
            
            <button onclick="deleteExpenseItem(${item.id})" id="deleteExpenseBtn-${item.id}">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>`;
    expenseList.appendChild(li);
  });
}

function toggleEditSaveExpense(id) {
  const input1 = document.getElementById(`expenseTitle-${id}`);
  const input2 = document.getElementById(`expenseAmount-${id}`);

  // console.log(input2);
  if (input1.readOnly && input2.readOnly) {
    editExpense(id);
  } else {
    saveExpense(id);
  }
}

function editExpense(id) {
  const input1 = document.getElementById(`expenseTitle-${id}`);
  const input2 = document.getElementById(`expenseAmount-${id}`);
  input1.readOnly = false;
  input2.readOnly = false;
  const editBtn = document.getElementById(`editExpense-${id}`);
  const saveBtn = document.getElementById(`saveExpense-${id}`);
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
  input1.focus();
  // input2.focus();
  input1.setSelectionRange(input1.value.length, input1.value.length);
  // oldIncomeValueInput1.value = input1.value;
  // oldIncomeValueInput2.value = input2.value;
  // console.log(typeof input2.value)
  oldExpenseValue = { title: input1.value, amount: +input2.value };
}

function saveExpense(id) {
  const input1 = document.getElementById(`expenseTitle-${id}`);
  const input2 = document.getElementById(`expenseAmount-${id}`);
  input1.readOnly = true;
  input2.readOnly = true;
  const editBtn = document.getElementById(`editExpense-${id}`);
  const saveBtn = document.getElementById(`saveExpense-${id}`);
  editBtn.classList.remove("hidden");
  saveBtn.classList.add("hidden");

  const newExpenseValue = { title: input1.value, amount: +input2.value };

  // console.log(oldIncomeValueInput1.value)
  // console.log(oldIncomeValueInput2.value)
  // console.log(oldExpenseValue);

  fetch(`${baseURL}/Expense/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpenseValue),
  })
    .then((response) => {
      if (!response.ok) {
        newExpenseValue = oldExpenseValue;
      }
    })
    .catch(() => {
      newExpenseValue = oldExpenseValue;
    })
    .finally(() => {
      getExpenseList();
    });
}

function deleteExpenseItem(id) {
  fetch(`${baseURL}/Expense/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      itemExpensesArray = itemExpensesArray.filter((x) => x.id !== id);
    })
    .catch(() => {})
    .finally(() => {
      getExpenseList();
    });
}

function addExpenseItems() {
  const newExpenseItem = { title: "", amount: "" };

  fetch(`${baseURL}/Expense/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExpenseItem),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      itemExpensesArray.push(data);
      // console.log(itemExpensesArray);
    })
    .catch(() => {})
    .finally(() => {
      getExpenseList();
    });
}

function totalExpense() {
  const expenseDisplayArray = itemExpensesArray.map((item) => item.amount);
  totalExpenseDisplay.textContent = "Total Income : ";
  totalExpenseDisplay.textContent += expenseDisplayArray.reduce(
    (acc, curr) => acc + curr,
    0
  );
}

allClick.addEventListener("click", () => {
  incomeGroupClick.classList.remove("hidden");
  expenseGroupClick.classList.remove("hidden");
  BalanceDisplay.classList.remove("hidden");
  totalIncomeDisplay.classList.remove("hidden");
  totalExpenseDisplay.classList.remove("hidden");
  calculateBtn.classList.remove("hidden");
});

incomeClick.addEventListener("click", () => {
  expenseGroupClick.classList.add("hidden");
  incomeGroupClick.classList.remove("hidden");

  totalIncomeDisplay.classList.remove("hidden");
  BalanceDisplay.classList.add("hidden");
  totalExpenseDisplay.classList.add("hidden");
  calculateBtn.classList.add("hidden");
});

expenseClick.addEventListener("click", () => {
  incomeGroupClick.classList.add("hidden");
  expenseGroupClick.classList.remove("hidden");

  totalIncomeDisplay.classList.add("hidden");
  BalanceDisplay.classList.add("hidden");
  totalExpenseDisplay.classList.remove("hidden");
  calculateBtn.classList.add("hidden");
});

function calculation() {
  const incomeDisplayArray = itemIncomesArray.map((item) => item.amount);
  const expenseDisplayArray = itemExpensesArray.map((item) => item.amount);

  let totalExpense = expenseDisplayArray.reduce((acc, curr) => acc + curr, 0);
  let totalIncome = incomeDisplayArray.reduce((acc, curr) => acc + curr, 0);

  const balance = totalIncome - totalExpense;
  BalanceDisplay.textContent = "Balance : ";
  BalanceDisplay.textContent += balance;
}
