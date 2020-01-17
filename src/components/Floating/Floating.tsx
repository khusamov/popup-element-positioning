import React, {Component, ReactNode, createRef} from 'react';
import {observer} from 'mobx-react';
import createBodyPortal from '../../functions/createBodyPortal';
import {FloatingDiv} from './Floating.style';

interface IFloatingProps {
	x: number;
	y: number;
	onBlur: () => void;
}

/**
 * Floating.
 */
 @observer
export default class Floating extends Component<IFloatingProps> {
 	private floatingDivRef = createRef<HTMLDivElement>();

	public render(): ReactNode {
		const {x, y, children, onBlur} = this.props;
		return (
			createBodyPortal(
				<FloatingDiv
					ref={this.floatingDivRef}
					onBlur={onBlur}
					{...{x, y, children}}
				/>
			)
		);
	}

	componentDidUpdate(): void {
		this.focus();
	}

	componentDidMount(): void {
		this.focus();
	}

	private focus() {
		if (this.floatingDivRef.current) {
			this.floatingDivRef.current.focus();
		}
	}
}