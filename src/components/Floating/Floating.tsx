import React, {forwardRef, PropsWithChildren} from 'react';
import createBodyPortal from '../../functions/createBodyPortal';
import IFloatingImperativeHandle from './IFloatingImperativeHandle';
import useFloating from './useFloating';
import FocusableDiv from './FocusableDiv';

/**
 * Плавающий элемент.
 *
 * Внимание, про использование PropsWithChildren читайте по ссылке:
 * @link https://stackoverflow.com/questions/54654303/using-a-forwardref-component-with-children-in-typescript
 */
const Floating = (
	forwardRef<IFloatingImperativeHandle, PropsWithChildren<{}>>(
		(props, ref) => {
			const {children} = props;
			const [onFloatingDivBlur, floatingDivRef, position, visibled] = useFloating<HTMLDivElement>(ref);
			return (
				createBodyPortal(
					visibled && (
						<FocusableDiv
							ref={floatingDivRef}
							onBlur={onFloatingDivBlur}
							children={children}
							style={{
								position: 'absolute',
								outline: 'none',
								left: position.x,
								top: position.y
							}}
						/>
					)
				)
			);
		}
	)
);

export default Floating;