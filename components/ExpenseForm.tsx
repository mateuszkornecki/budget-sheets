import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import * as yup from 'yup';
import { Button, TextField, MenuItem, Grid } from '@material-ui/core';

import { IExpense, postExpense } from '../api/expenses';
import Categories, { categoriesArray } from '../constanst/Categories';

const validationSchema = yup.object({
	date: yup.string().required('Transaction date is required!'),
	price: yup.number().required('Price is required!').positive().min(0),
	category: yup.mixed().oneOf(categoriesArray).required('Category is required'),
	subcategory: yup.string().notRequired(),
	comment: yup.string().notRequired(),
});

function renderMenuItem(item) {
	return (
		<MenuItem key={item} value={item}>
			{item}
		</MenuItem>
	);
}

export function ExpenseForm() {
	const mutation = useMutation((expense: IExpense) => postExpense(expense));

	const formik = useFormik({
		initialValues: {
			date: format(new Date(), 'yyyy-MM-dd'),
			price: 0,
			category: Categories.Food.value,
			subcategory: '',
			comment: '',
		},
		validationSchema: validationSchema,
		onSubmit: (expense, formProps) => {
			console.log('ex', expense);
			mutation.mutate(expense);
			formProps.resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<Grid
				container
				direction='column'
				justify='flex-start'
				alignItems='stretch'
				spacing={2}
			>
				<Grid item>
					<TextField
						fullWidth
						id='date'
						type='date'
						name='date'
						label='Transaction date'
						variant='outlined'
						value={formik.values.date}
						onChange={formik.handleChange}
						error={formik.touched.date && Boolean(formik.errors.date)}
						helperText={formik.touched.date && formik.errors.date}
					/>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						id='price'
						type='number'
						name='price'
						label='Price'
						variant='outlined'
						InputProps={{ inputProps: { min: 0, step: 5 } }}
						value={formik.values.price}
						onChange={formik.handleChange}
						error={formik.touched.price && Boolean(formik.errors.price)}
						helperText={formik.touched.price && formik.errors.price}
					/>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						id='category'
						select
						name='category'
						label='Category'
						variant='outlined'
						value={formik.values.category}
						onChange={formik.handleChange}
						error={formik.touched.category && Boolean(formik.errors.category)}
						helperText={formik.touched.category && formik.errors.category}
					>
						{categoriesArray.map(renderMenuItem)}
					</TextField>
				</Grid>
				{Categories[formik.values.category].subcategories.length ? (
					<Grid item>
						<TextField
							fullWidth
							id='subcategory'
							select
							name='subcategory'
							label='Subcategory'
							variant='outlined'
							value={formik.values.subcategory}
							onChange={formik.handleChange}
							error={
								formik.touched.subcategory &&
								Boolean(formik.errors.subcategory)
							}
							helperText={
								formik.touched.subcategory && formik.errors.subcategory
							}
						>
							{Categories[formik.values.category].subcategories.map(
								renderMenuItem
							)}
						</TextField>
					</Grid>
				) : null}
				<Grid item>
					<TextField
						fullWidth
						id='comment'
						name='comment'
						label='Comment'
						variant='outlined'
						value={formik.values.comment}
						onChange={formik.handleChange}
						error={formik.touched.comment && Boolean(formik.errors.comment)}
						helperText={formik.touched.comment && formik.errors.comment}
					/>
				</Grid>
				<Grid container item justify='center'>
					<Button
						disabled={mutation.isLoading}
						color='primary'
						variant='contained'
						type='submit'
					>
						Add
					</Button>
				</Grid>
			</Grid>
		</form>
	);
}
