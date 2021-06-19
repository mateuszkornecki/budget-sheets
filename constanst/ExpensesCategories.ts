const ExpensesCategories = {
	Food: {
		value: 'Jedzonko',
		subcategories: ['Essential', 'Pleasure'],
	},
	Sport: {
		value: 'Sport',
		subcategories: ['Rower', 'Wspinaczka', 'Inne'],
	},
	Car: {
		value: 'Samochód',
		subcategories: ['Naprawy', 'Paliwo', 'Inne'],
	},
	Services: {
		value: 'Usługi',
		subcategories: ['Telefon', 'Księgowa', 'Subskrybcje'],
	},
	Other: {
		value: 'Inne',
		subcategories: ['Prezenty', 'Długi', 'Nieplanowane'],
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
