import React, { ReactElement, Fragment } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { Navigation } from '../Navigation';

interface IPageLayoutProps {
	children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
	main: {
		overflow: 'auto',
		paddingTop: '1rem',
		paddingBottom: '1rem',
	},
});

function renderChildren(child: ReactElement, index: number) {
	const styles = useStyles();
	return (
		<Grid item className={index === 1 ? styles.main : ''}>
			{child}
		</Grid>
	);
}

export function PageLayout(props: IPageLayoutProps) {
	const { children } = props;

	return <Fragment>{React.Children.map(children, renderChildren)}</Fragment>;
}
