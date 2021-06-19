import { Grid, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

import ExpensesCategories, {
	TCategoriesValues,
} from '../../../constanst/ExpensesCategories';

import { renderMenuItem } from '../utils/renderMenuItem';

type TSubcategoryFieldProps = {
	categoryValue: TCategoriesValues;
} & TextFieldProps;

export function SubcategoryField(props: TSubcategoryFieldProps) {
	const { categoryValue, value, onChange, error, helperText } = props;
	const categoryObject = Object.values(ExpensesCategories).find(
		(category) => category.value === categoryValue
	);

	const hasSubcategories = categoryObject.subcategories.length;

	return hasSubcategories ? (
		<Grid item>
			<TextField
				fullWidth
				id='subcategory'
				select
				name='subcategory'
				label='Subcategory'
				variant='outlined'
				value={value}
				onChange={onChange}
				error={error}
				helperText={helperText}
			>
				{categoryObject.subcategories.map(renderMenuItem)}
			</TextField>
		</Grid>
	) : null;
}
