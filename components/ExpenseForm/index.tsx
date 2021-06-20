import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';

import { IExpense, postExpense } from '../../api/expenses';
import ExpensesCategories, {
	expensesCategoriesArray,
} from '../../constanst/ExpensesCategories';
import { SubcategoryField } from './components/SubcategoryField';
import { renderMenuItem } from './utils/renderMenuItem';

const validationSchema = yup.object({
	date: yup.string().required('Transaction date is required!'),
	price: yup.number().required('Price is required!').positive().min(0),
	category: yup.mixed().oneOf(expensesCategoriesArray).required('Category is required'),
	subcategory: yup.string().notRequired(),
	comment: yup.string().notRequired(),
});

const useStyles = makeStyles({
	loadingSpinner: {
		marginLeft: '1rem',
	},
	form: {
		padding: '0.5rem',
	},
});

export function ExpenseForm() {
	const mutation = useMutation((expense: IExpense) => postExpense(expense));

	const formik = useFormik({
		initialValues: {
			date: format(new Date(), 'yyyy-MM-dd'),
			price: 0,
			category: ExpensesCategories.Food.value,
			subcategory: '',
			comment: '',
		},
		validationSchema: validationSchema,
		onSubmit: (expense, formProps) => {
			mutation.mutate(expense);
			formProps.resetForm();
		},
	});

	const styles = useStyles();

	return (
		<main>
			<form onSubmit={formik.handleSubmit} className={styles.form}>
				<Grid
					container
					direction='column'
					justify='flex-start'
					alignItems='stretch'
					wrap='nowrap'
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
							InputProps={{ inputProps: { min: 0, step: 1 } }}
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
							error={
								formik.touched.category && Boolean(formik.errors.category)
							}
							helperText={formik.touched.category && formik.errors.category}
						>
							{expensesCategoriesArray.map(renderMenuItem)}
						</TextField>
					</Grid>
					<SubcategoryField
						categoryValue={formik.values.category}
						value={formik.values.subcategory}
						onChange={formik.handleChange}
						error={
							formik.touched.subcategory &&
							Boolean(formik.errors.subcategory)
						}
						helperText={
							formik.touched.subcategory && formik.errors.subcategory
						}
					/>
					<Grid item>
						<TextField
							fullWidth
							id='comment'
							name='comment'
							label='Comment'
							variant='outlined'
							multiline
							rows={2}
							value={formik.values.comment}
							onChange={formik.handleChange}
							error={
								formik.touched.comment && Boolean(formik.errors.comment)
							}
							helperText={formik.touched.comment && formik.errors.comment}
						/>
					</Grid>
					<Grid container item justify='center'>
						<Button
							disabled={mutation.isLoading}
							color='primary'
							variant='outlined'
							type='submit'
						>
							Add
							{mutation.isLoading ? (
								<CircularProgress
									className={styles.loadingSpinner}
									size={20}
								/>
							) : null}
						</Button>
					</Grid>
				</Grid>
			</form>
		</main>
	);
}
