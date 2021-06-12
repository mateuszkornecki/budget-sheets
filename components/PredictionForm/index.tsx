import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import { format, add } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';

import Categories, { categoriesArray } from '../../constanst/Categories';
import { renderMenuItem } from './utils/renderMenuItem';
import { IPrediction, postPrediction } from '../../api/predictions.ts';

const validationSchema = yup.object({
	date: yup.string().required('Transaction date is required!'),
	price: yup.number().required('Price is required!').positive().min(1),
	category: yup.mixed().oneOf(categoriesArray).required('Category is required'),
});

const useStyles = makeStyles({
	loadingSpinner: {
		marginLeft: '1rem',
	},
});

const nextMonth = add(new Date(), { months: 1 });

export function PredictionsForm() {
	const mutation = useMutation((expense: IPrediction) => postPrediction(expense));

	const formik = useFormik({
		initialValues: {
			date: format(nextMonth, 'yyyy-MM-dd'),
			price: 0,
			category: Categories.Food.value,
		},
		validationSchema: validationSchema,
		onSubmit: (prediction, formProps) => {
			console.log(prediction);
			mutation.mutate(prediction);
			formProps.resetForm();
		},
	});

	const styles = useStyles();

	return (
		<main>
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
							{categoriesArray.map(renderMenuItem)}
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
