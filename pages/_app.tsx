import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from '../components/Navigation';
import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

const useStyles = makeStyles({
	root: {
		height: '100%',
	},
});

function MyApp({ Component, pageProps }) {
	const muiStyles = useStyles();
	return (
		<QueryClientProvider client={queryClient}>
			<Container maxWidth='sm' className={muiStyles.root}>
				<div className={styles.container}>
					<Grid
						container
						direction='column'
						justify='space-between'
						alignItems='stretch'
						classes={{ root: muiStyles.root }}
					>
						<Component {...pageProps} />
						<Grid item>
							<Navigation />
						</Grid>
					</Grid>
				</div>
			</Container>
		</QueryClientProvider>
	);
}

export default MyApp;
