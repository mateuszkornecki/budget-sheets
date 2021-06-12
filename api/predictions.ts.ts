import { TCategoriesValues } from '../constanst/Categories';

interface IPrediction {
	date: string;
	price: number | string;
	category: TCategoriesValues;
}

interface IPredictionFilters {
	filter: keyof IPrediction;
	value: string;
}

function getFilteredPredictions({
	filter,
	value,
}: IPredictionFilters): Promise<IPrediction[]> {
	return fetch(
		`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Predictions/${filter}/${value}*`
	).then((response) => response.json());
}

function getAllPredictions(): Promise<IPrediction[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Predictions`).then(
		(response) => response.json()
	);
}

function postPrediction(expense: IPrediction): Promise<IPrediction[]> {
	return fetch(`${process.env.NEXT_PUBLIC_SHEET_BEST_URL}/tabs/Predictions`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(expense),
	}).then((response) => {
		console.log('reso', response);
		return response.json();
	});
}

export type { IPrediction };
export { getFilteredPredictions, getAllPredictions, postPrediction };
