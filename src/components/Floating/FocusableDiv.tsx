import React, {forwardRef} from 'react';

type TDivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * DIV-элемент, на котором включена фокусировка.
 */
const FocusableDiv = (
	forwardRef<HTMLDivElement, TDivProps>(
		(props, ref) => {
			const {children} = props;
			return (
				<div
					ref={ref}

					// tabindex="-1" позволяет фокусироваться на элементе только программно.
					// Клавиша Tab проигнорирует такой элемент, но метод elem.focus() будет действовать.
					// https://learn.javascript.ru/focus-blur#vklyuchaem-fokusirovku-na-lyubom-elemente-tabindex
					tabIndex={-1}

					{...props}
				/>
			)
		}
	)
);

export default FocusableDiv;