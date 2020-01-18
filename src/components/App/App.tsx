import React, {Component, createRef, MouseEvent} from 'react';
import {observer} from 'mobx-react';
import Floating from '../Floating';
import {IFloatingImperativeHandle} from '../Floating/Floating';
import {FloatingExampleContent} from './App.style';

@observer
export default class App extends Component {
	floatingRef = createRef<IFloatingImperativeHandle>();

	render() {
		return (
			<div onContextMenu={this.onDivContextMenu}>

				<Floating ref={this.floatingRef}>
					<FloatingExampleContent>
						Плавающий блок:
						<input/>
					</FloatingExampleContent>
				</Floating>

				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
			</div>
		);
	}

	private onDivContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		if (this.floatingRef.current) {
			this.floatingRef.current.setPositionByMouseEvent(event);
		}
	};
};