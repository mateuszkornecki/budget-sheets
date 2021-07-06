const ExpensesCategories = {
	Food: {
		value: 'Jedzonko',
		subcategories: ['Essential', 'Pleasure'],
	},
	Sport: {
		value: 'Sport',
		subcategories: ['Rower', 'Wspinaczka', 'Inne'],
	},
	Transport: {
		value: 'Transport',
		subcategories: ['Samochód', 'Inne'],
	},
	Services: {
		value: 'Usługi',
		subcategories: ['Telefon', 'Księgowa', 'Subskrybcje'],
	},
	Health: {
		value: 'Zdrowie',
		subcategories: ['Fizjoterapeuta', 'Endokrynolog', 'Lekarstwa', 'Inne'],
	},
	Beauty: {
		value: 'Uroda',
		subcategories: ['Kosmetyki', 'Fryzjer'],
	},
	Other: {
		value: 'Inne',
		subcategories: [
			'Prezenty',
			'Długi',
			'Nieplanowane',
			'Fryzjer',
			'Kosmetyki',
			'Rozwój',
		],
	},
	Savings: {
		value: 'Oszczędności',
		subcategories: ['Poducha', 'Cele', 'Inne'],
	},
	Apartment: {
		value: 'Mieszkanie',
		subcategories: ['Czynsz', 'Kaucja'],
	},
} as const;

const expensesCategoriesArray = Object.values(ExpensesCategories).map(
	(category) => category.value
);

export type TCategoriesValues = typeof expensesCategoriesArray[number];

function getExpenseSubcategory(category: keyof typeof ExpensesCategories) {
	return ExpensesCategories[category].subcategories;
}

export default ExpensesCategories;
export { getExpenseSubcategory, expensesCategoriesArray };
