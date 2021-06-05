const Categories = {
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

const categoriesArray = Object.values(Categories).map((category) => category.value);

export type TCategories = typeof categoriesArray[number];

function getSubcategory(category: keyof typeof Categories) {
	return Categories[category].subcategories;
}

export default Categories;
export { getSubcategory, categoriesArray };
