import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import { format, add, addYears } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Categories, { categoriesArray } from '../../constanst/Categories';
import {
	getFilteredPredictions,
	IPrediction,
	postPrediction,
	updatePrediction,
} from '../../api/predictions';
import React, { Fragment, useEffect, useState } from 'react';

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
	const [newPeriod, setNewPeriod] = useState(format(new Date(), 'yyyy-MM'));

	const { isSuccess, isLoading, isError, data, error, refetch } = useQuery(
		['filteredExpenses', { status: 'active', newPeriod }],
		() => {
			console.log('fetching new data..');
			return getFilteredPredictions({ filter: 'period', value: newPeriod });
		}
	);

	const postMutation = useMutation((prediction: IPrediction) =>
		postPrediction(prediction)
	);

	const updateMutation = useMutation((prediction: IPrediction) =>
		updatePrediction(prediction)
	);

	useEffect(() => console.log(data), [data]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			period: newPeriod,
			...categories.reduce((x, y) => {
				return (x[y] = data?.length ? Number(data[0][y]) : 0), x;
			}, {}),
		},
		//validationSchema: validationSchema,
		onSubmit: (prediction, formProps) => {
			if (isSuccess) {
				console.log(prediction);
				if (data.length === 0) {
					postMutation.mutate(prediction);
				} else {
					// TODO: PATH/PUT instead of POST
					console.log(prediction, formik.values.period);
					updateMutation.mutate(prediction, formik.values.period);
				}
			}
		},
	});

	const styles = useStyles();

	if (isSuccess) {
		const hasPrediction = data.length > 0;

		const FormButton = () => {
			const add = (
				<Fragment>
					Add
					{postMutation.isLoading ? (
						<CircularProgress className={styles.loadingSpinner} size={20} />
					) : null}
				</Fragment>
			);

			const edit = (
				<Fragment>
					Edit
					{updateMutation.isLoading ? (
						<CircularProgress className={styles.loadingSpinner} size={20} />
					) : null}
				</Fragment>
			);

			return (
				<Button
					disabled={postMutation.isLoading}
					color='primary'
					variant='outlined'
					type='submit'
				>
					{hasPrediction ? edit : add}
				</Button>
			);
		};

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
										formik.setFieldValue(
											'period',
											format(date, 'yyyy-MM')
										);

										console.log('setting new date');
										setNewPeriod(format(date, 'yyyy-MM'));

										//await refetch();
									}}
									error={
										formik.touched.period &&
										Boolean(formik.errors.period)
									}
									helperText={
										formik.touched.period && formik.errors.period
									}
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
										formik.touched[category] &&
										formik.errors[category]
									}
								/>
							</Grid>
						))}
						<Grid container item justify='center'>
							<FormButton />
						</Grid>
					</Grid>
				</form>
			</main>
		);
	}

	return null;
}
