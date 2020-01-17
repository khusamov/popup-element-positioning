import React, {Component, MouseEvent} from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import Floating from '../Floating';
import {FloatingExampleContent} from './App.style';

const positionFromEvent = (event: MouseEvent) => ({x: event.pageX, y: event.pageY});

@observer
export default class App extends Component {

	@observable floatingVisibled = false;
	@observable floatingPosition = {x: 0, y: 0};

	render() {
		return (
			<div onContextMenu={this.onDivContextMenu}>

				{this.floatingVisibled && (
					<Floating x={this.floatingPosition.x} y={this.floatingPosition.y} onBlur={this.onFloatingBlur}>
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
		this.floatingPosition = positionFromEvent(event);
		this.floatingVisibled = true;
	};

	private onFloatingBlur = () => {
		this.floatingVisibled = false;
	};
};