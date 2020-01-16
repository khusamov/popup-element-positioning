import React, {Component, MouseEvent} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import Floating from '../Floating';
import {FloatingExampleContent} from './App.style';

@observer
export default class App extends Component {

	@observable floatingVisibled = false;
	@observable floatingPosition = {x: 0, y: 0};

	render() {
		return (
			<div onContextMenu={this.onDivContextMenu}>

				{this.floatingVisibled && (
					<Floating x={this.floatingPosition.x} y={this.floatingPosition.y}>
						<FloatingExampleContent>
							Плавающий блок.
						</FloatingExampleContent>
					</Floating>
				)}

				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
				<p>React application on RollupJS.</p>
			</div>
		);
	}

	private onDivContextMenu = (event: MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		this.floatingPosition = {x: event.pageX, y: event.pageY};
		this.floatingVisibled = true;
	};
};