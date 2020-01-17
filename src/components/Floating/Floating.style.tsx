import React, {forwardRef} from 'react';
import {styled} from '@material-ui/styles';
import {TopProperty, LeftProperty} from 'csstype';

type TLength = string | 0;
type TDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

interface IFloatingDivProps {
	x: number;
	y: number;
}

const createFloatingDiv = styled(
	forwardRef<HTMLDivElement, IFloatingDivProps & TDivProps>(({x, y, ...other}, ref) => (
		<div
			ref={ref}

			// tabindex="-1" позволяет фокусироваться на элементе только программно.
			// Клавиша Tab проигнорирует такой элемент, но метод elem.focus() будет действовать.
			// https://learn.javascript.ru/focus-blur#vklyuchaem-fokusirovku-na-lyubom-elemente-tabindex
			tabIndex={-1}

			{...other}
		/>
	))
);

export const FloatingDiv = (
	createFloatingDiv<{}, IFloatingDivProps>(({x, y}) => ({
		position: 'absolute',
		left: x as TopProperty<TLength>,
		top: y as LeftProperty<TLength>,
		outline: 'none'
	}), {name: 'FloatingDiv'})
);