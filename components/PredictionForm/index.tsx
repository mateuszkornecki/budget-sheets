import { useMutation, useQuery } from 'react-query';
import { useFormik } from 'formik';
import { format, addYears } from 'date-fns';
import * as yup from 'yup';
import { Button, Grid, TextField, CircularProgress, makeStyles } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import ExpensesCategories, {
	expensesCategoriesArray,
} from '../../constanst/ExpensesCategories';
import {
	getFilteredPredictions,
	IPrediction,
	postPrediction,
	updatePrediction,
} from '../../api/predictions';
import React, { Fragment, useEffect, useState } from 'react';

const validationSchema = yup.object({
	period: yup.string().required('Period is required!'),
	jedzonko: yup.string().required('Jedzonko is required!'),
	oszczędności: yup.string().required('Oszczędności is required!'),
	mieszkanie: yup.string().required('Mieszkanie is required!'),
	sport: yup.string().required('Sport is required!'),
	transport: yup.string().required('Transport is required!'),
	zdrowie: yup.string().required('Zdrowie is required!'),
	uroda: yup.string().required('Uroda is required!'),
	usługi: yup.string().required('Usługi is required!'),
	inne: yup.string().required('Inne is required!'),
});

const useStyles = makeStyles({
	loadingSpinner: {
		marginLeft: '1rem',
	},
	form: {
		padding: '0.5rem',
	},
});

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const categories = expensesCategoriesArray.map((category) => category.toLowerCase());

export function PredictionsForm() {
	const [newPeriod, setNewPeriod] = useState(format(new Date(), 'yyyy-MM'));

	const [total, setTotal] = useState(0);

	const { isSuccess, isLoading, isError, data, error, refetch } = useQuery(
		['filteredPredictions', { status: 'active', newPeriod }],
		() => {
			return getFilteredPredictions({ filter: 'period', value: newPeriod });
		}
	);

	const postMutation = useMutation((prediction: IPrediction) =>
		postPrediction(prediction)
	);

	const updateMutation = useMutation((prediction: IPrediction) =>
		updatePrediction(prediction)
	);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			period: newPeriod,
			...categories.reduce((x, y) => {
				return (x[y] = data?.length ? Number(data[0][y]) : 0), x;
			}, {}),
		} as IPrediction,
		validationSchema: validationSchema,
		onSubmit: (prediction, formProps) => {
			if (isSuccess) {
				if (data.length === 0) {
					postMutation.mutate(prediction);
				} else {
					updateMutation.mutate(prediction);
				}
			}
		},
	});

	useEffect(() => {
		const predictions = formik.values;
		const predictionsKeys = Object.keys(predictions);
		const predictionsWithoutDate = predictionsKeys.filter((key) => key !== 'period');

		const totalPredictionsValue = predictionsWithoutDate.reduce((acc, currentKey) => {
			const currentValue = predictions[currentKey];
			if (!Number.isNaN(Number(currentValue))) {
				return acc + Number(predictions[currentKey]);
			}

			return acc;
		}, 0);

		if (total !== totalPredictionsValue) {
			setTotal(totalPredictionsValue);
		}
	}, Object.values(formik?.values));

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
				<p>Total: {total}</p>
				<form onSubmit={formik.handleSubmit} className={styles.form}>
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

										setNewPeriod(format(date, 'yyyy-MM'));
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
