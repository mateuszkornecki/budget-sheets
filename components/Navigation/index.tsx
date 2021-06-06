import { useState } from 'react';
import { useRouter } from 'next/router';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

export function Navigation() {
	const router = useRouter();
	const [value, setValue] = useState(router.pathname);

	return (
		<footer>
			<nav>
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
						router.push(newValue);
					}}
					showLabels
				>
					<BottomNavigationAction label='Expense' value={'/'} />
					<BottomNavigationAction label='Prediction' value={'/prediction'} />
					<BottomNavigationAction label='Income' value={'/income'} />
					<BottomNavigationAction label='Stats' value={'/stats'} />
				</BottomNavigation>
			</nav>
		</footer>
	);
}
