import { TIncomesCategories } from '../constanst/IncomesCategories';

interface IIncome {
	date: string;
	amount: number | string;
	category: keyof TIncomesCategories;
}

interface IIncomeFilters {
	filter: keyof IIncome;
	value: string;
}

function getFilteredIncomes({ filter, value }: IIncomeFilters): Promise<IIncome[]> {
	return fetch(
		`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Incomes/${filter}/${value}*`
	).then((response) => response.json());
}

function getAllIncomes(): Promise<IIncome[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Incomes`).then(
		(response) => response.json()
	);
}

function postIncome(income: IIncome): Promise<IIncome[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Incomes`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(income),
	}).then((response) => response.json());
}

export type { IIncome };
export { getFilteredIncomes, getAllIncomes, postIncome };
