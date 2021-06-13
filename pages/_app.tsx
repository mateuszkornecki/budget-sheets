import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from '../components/Navigation';
import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import styles from '../styles/Home.module.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
	return (
		<QueryClientProvider client={queryClient}>
			<Container maxWidth='sm'>
				<div className={styles.container}>
					<Grid
						container
						direction='column'
						justify='space-between'
						alignItems='stretch'
						className={styles.muiGrid}
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
