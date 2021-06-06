interface ITitleProps {
	title: string;
}

export function Title(props: ITitleProps) {
	const { title } = props;

	return (
		<header>
			<h1>{title}</h1>
		</header>
	);
}
