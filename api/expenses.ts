enum ExpenseCategories {
  Food = 'FOOD',
  Sport = 'SPORT'
}

interface Expense {
  createdAt: string,
  category: ExpenseCategories,
  subcategory: string,
  comment: string,
}

interface ExpenseFilters  {
  filter: keyof Expense,
  value: string,
}

function getFilteredExpenses({filter, value}: ExpenseFilters): Promise<Expense[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses/${filter}/${value}*`,
  )
    .then((response) => response.json());
}

function getAllExpenses(): Promise<Expense[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses`,
  )
    .then((response) => response.json());
}

function postExpense(expense: Expense): Promise<Expense[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
    .then((response) => response.json());
}

export type { Expense };
export { getFilteredExpenses, getAllExpenses, postExpense, ExpenseCategories };
