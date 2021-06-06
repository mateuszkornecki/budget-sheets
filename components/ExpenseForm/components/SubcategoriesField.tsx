import { Grid, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField/TextField';

import Categories, { TCategoriesValues } from '../../../constanst/Categories';

import { renderMenuItem } from '../utils/renderMenuItem';

type TSubcategoriesProps = {
	categoryValue: TCategoriesValues;
} & TextFieldProps;

export function SubcategoriesField(props: TSubcategoriesProps) {
	const { categoryValue, value, onChange, error, helperText } = props;
	const categoryObject = Object.values(Categories).find(
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
