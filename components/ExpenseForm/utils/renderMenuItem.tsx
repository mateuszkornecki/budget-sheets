import { MenuItem } from '@material-ui/core';

export function renderMenuItem(item) {
	return (
		<MenuItem key={item} value={item}>
			{item}
		</MenuItem>
	);
}
