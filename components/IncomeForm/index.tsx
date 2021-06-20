import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';

import { IIncome, postIncome } from '../../api/incomes';
import { renderMenuItem } from '../ExpenseForm/utils/renderMenuItem';
import {
	IncomesCategories,
	incomesCategoriesArray,
} from '../../constanst/IncomesCategories';

const validationSchema = yup.object({
	date: yup.string().required('Date is required!'),
	amount: yup.number().required('Amount is required!').positive().min(0),
	category: yup.mixed().oneOf(incomesCategoriesArray).required('Category is required'),
});

const useStyles = makeStyles({
	loadingSpinner: {
		marginLeft: '1rem',
	},
	form: {
		padding: '0.5rem',
	},
});

export function IncomeForm() {
	const mutation = useMutation((income: IIncome) => postIncome(income));

	const formik = useFormik({
		initialValues: {
			date: format(new Date(), 'yyyy-MM-dd'),
			amount: 0,
			category: IncomesCategories.Wypłata,
		},
		validationSchema: validationSchema,
		onSubmit: (income, formProps) => {
			mutation.mutate(income);
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
							id='amount'
							type='number'
							name='amount'
							label='Amount'
							variant='outlined'
							InputProps={{ inputProps: { min: 0, step: 1 } }}
							value={formik.values.amount}
							onChange={formik.handleChange}
							error={formik.touched.amount && Boolean(formik.errors.amount)}
							helperText={formik.touched.amount && formik.errors.amount}
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
							{incomesCategoriesArray.map(renderMenuItem)}
						</TextField>
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
