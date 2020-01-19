import React, {FC, MouseEvent, useState, Fragment} from 'react';
import Floating from '../Floating';
import useFloatingRef from '../Floating/useFloatingRef';
import {FloatingExampleContent} from './App.style';

const App: FC = () => {
	const floatingRef = useFloatingRef();

	const [selected, setSelected] = useState<string | null>(null);

	const onDivContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		if (floatingRef.current) {
			floatingRef.current.onContextMenu(event);
			setSelected((event.target as HTMLElement).getAttribute('data-item'))
		}
	};

	return (
		<Fragment>
			<Floating ref={floatingRef}>
				<FloatingExampleContent>
					<div>Плавающий блок:</div>
					<div><input/></div>
					<div>Связанный элемент: {selected}</div>
				</FloatingExampleContent>
			</Floating>
			<div onContextMenu={onDivContextMenu}>
				<p data-item='Пункт1'>React application on RollupJS.</p>
				<p data-item='Пункт2'>React application on RollupJS.</p>
				<p data-item='Пункт3'>React application on RollupJS.</p>
				<p data-item='Пункт4'>React application on RollupJS.</p>
				<p data-item='Пункт5'>React application on RollupJS.</p>
			</div>
		</Fragment>
	);
};

export default App;