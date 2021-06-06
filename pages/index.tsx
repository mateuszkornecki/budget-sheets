import Head from 'next/head';

import styles from '../styles/Home.module.css';
import { ExpenseForm } from '../components/ExpenseForm';
import { PageLayout } from '../components/PageLayout';
import { Title } from '../components/Title';

function Home() {
	// const { isLoading, isError, data, error } = useQuery('filteredExpenses', () =>
	// 	getFilteredExpenses({ filter: 'createdAt', value: '2021-05' })
	// );

	// const content = isLoading ? (
	// 	<p>Loading...</p>
	// ) : (
	// 	data.map((expense) => <p>{expense.createdAt}</p>)
	// );

	return (
		<div className={styles.container}>
			<Head>
				<title>Budget Sheets App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<PageLayout>
				<Title title={'Add expense'} />
				<ExpenseForm />
			</PageLayout>
		</div>
	);
}

export default Home;
