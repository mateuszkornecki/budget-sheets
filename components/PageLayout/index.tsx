import React, { ReactElement, Fragment } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { Navigation } from '../Navigation';

interface IPageLayoutProps {
	children: ReactElement | ReactElement[];
}

const useStyles = makeStyles({
	root: {
		height: '100%',
	},
});

function renderChildren(child: ReactElement) {
	return <Grid item>{child}</Grid>;
}

export function PageLayout(props: IPageLayoutProps) {
	const { children } = props;
	const styles = useStyles();

	return <Fragment>{React.Children.map(children, renderChildren)}</Fragment>;
}
