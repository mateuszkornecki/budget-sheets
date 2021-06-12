import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import { format, add, addYears } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Categories, { categoriesArray } from '../../constanst/Categories';
import {
	getFilteredPredictions,
	IPrediction,
	postPrediction,
} from '../../api/predictions.ts';

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

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const categories = categoriesArray.map((category) => category.toLowerCase());

export function PredictionsForm() {
	const { isSuccess, isLoading, isError, data, error } = useQuery(
		'filteredExpenses',
		() =>
			getFilteredPredictions({
				filter: 'period',
				value: format(new Date(), 'yyyy-MM'),
			})
	);

	const content = isLoading ? (
		<p>Loading...</p>
	) : (
		data.map((expense) => <p>{expense.createdAt}</p>)
	);
	const mutation = useMutation((expense: IPrediction) => postPrediction(expense));

	const formik = useFormik({
		initialValues: {
			period: format(new Date(), 'yyyy-MM'),
			...categories.reduce((x, y) => ((x[y] = 0), x), {}),
		},
		//validationSchema: validationSchema,
		onSubmit: (prediction, formProps) => {
			if (isSuccess) {
				console.log(prediction);
				console.log(data);
				if (data.length === 0) {
					mutation.mutate(prediction);
				} else {
					// TODO: PATH/PUT instead of POST
				}

				formProps.resetForm();
			}
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
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								fullWidth
								inputVariant='outlined'
								views={['year', 'month']}
								label='Period'
								minDate={new Date()}
								maxDate={addYears(new Date(), 1)}
								value={formik.values.period}
								onChange={(date) => {
									formik.setFieldValue('date', format(date, 'yyyy-MM'));
								}}
								error={
									formik.touched.period && Boolean(formik.errors.period)
								}
								helperText={formik.touched.period && formik.errors.period}
							/>
						</MuiPickersUtilsProvider>
					</Grid>
					{categories.map((category) => (
						<Grid item key={category}>
							<TextField
								fullWidth
								id={category}
								type='number'
								name={category}
								label={capitalizeFirstLetter(category)}
								variant='outlined'
								InputProps={{ inputProps: { min: 0, step: 1 } }}
								value={formik.values[category]}
								onChange={formik.handleChange}
								error={
									formik.touched[category] &&
									Boolean(formik.errors[category])
								}
								helperText={
									formik.touched[category] && formik.errors[category]
								}
							/>
						</Grid>
					))}
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
