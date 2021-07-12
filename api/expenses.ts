import { TExpensesCategoriesValues } from '../constanst/ExpensesCategories';

interface IExpense {
	date: string;
	price: number | string;
	category: TExpensesCategoriesValues;
	subcategory?: string;
	comment: string;
}

interface IExpenseFilters {
	filter: keyof IExpense;
	value: string;
}

function getFilteredExpenses({ filter, value }: IExpenseFilters): Promise<IExpense[]> {
	return fetch(
		`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses/${filter}/${value}*`
	).then((response) => response.json());
}

function getAllExpenses(): Promise<IExpense[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses`).then(
		(response) => response.json()
	);
}

function postExpense(expense: IExpense): Promise<IExpense[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Expenses`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(expense),
	}).then((response) => response.json());
}

export type { IExpense };
export { getFilteredExpenses, getAllExpenses, postExpense };
