import { QueryClient, QueryClientProvider } from 'react-query';
import { Navigation } from '../components/Navigation';
import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import '../styles/globals.css';

const queryClient = new QueryClient();

const useStyles = makeStyles({
	container: {
		height: '100%',
	},
	grid: {
		height: '100%',
	},
});

function MyApp({ Component, pageProps }) {
	const styles = useStyles();

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Container maxWidth='sm' className={styles.container}>
				<Grid
					container
					direction='column'
					justify='space-between'
					alignItems='stretch'
					className={styles.grid}
					wrap='nowrap'
				>
					<Component {...pageProps} />
					<Grid item>
						<Navigation />
					</Grid>
				</Grid>
			</Container>
		</QueryClientProvider>
	);
}

export default MyApp;
