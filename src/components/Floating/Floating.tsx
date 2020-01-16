import React, {Component, ReactNode} from 'react';
import {observer} from 'mobx-react';
import {FloatingDiv} from './Floating.style';
import createBodyPortal from '../../functions/createBodyPortal';

interface IFloatingProps {
	x: number;
	y: number;
}

/**
 * Floating.
 */
 @observer
export default class Floating extends Component<IFloatingProps> {
	public render(): ReactNode {
		const {x, y, children} = this.props;
		return (
			createBodyPortal(
				<FloatingDiv {...{x, y}}>
					{children}
				</FloatingDiv>
			)
		);
	}
}