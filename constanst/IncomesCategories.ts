const IncomesCategories = {
	Wypłata: 'Wypłata',
	Zwroty: 'Zwroty',
	Prezenty: 'Prezenty',
	Inne: 'Inne',
} as const;

const incomesCategoriesArray = Object.values(IncomesCategories);

export { IncomesCategories, incomesCategoriesArray };

export type TIncomesCategories = typeof IncomesCategories;
