import React, {createRef, useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import {PropsWithChildren, MouseEventHandler, MouseEvent, FocusEvent} from 'react';
import createBodyPortal from '../../functions/createBodyPortal';
import offsetOverflow from '../../functions/offsetOverflow';
import {FloatingDiv} from './Floating.style';

interface IFloatingProps {

}

export interface IFloatingImperativeHandle {
	/**
	 * Изменить координаты плавающего элемента на основе события
	 * мышки (берутся свойства event.pageX и event.pageY).
	 */
	setPositionByMouseEvent: MouseEventHandler;

	/**
	 * Изменить координаты плавающего элемента.
	 * После изменения координат элемент становится видимым.
	 */
	setPosition: (x: number, y: number) => void;
}

/**
 * Плавающий элемент.
 *
 * Внимание, про использование PropsWithChildren читайте по ссылке:
 * @link https://stackoverflow.com/questions/54654303/using-a-forwardref-component-with-children-in-typescript
 */
const Floating = (
	forwardRef<IFloatingImperativeHandle, PropsWithChildren<IFloatingProps>>(
		(props, ref) => {
			const {children} = props;
			const [visibled, setVisibled] = useState(false);
			const [position, setPosition] = useState({x: 0, y: 0});
			const floatingDivRef = createRef<HTMLDivElement>();
			const onFloatingDivBlur = (event: FocusEvent<HTMLDivElement>) => {
				const floatingDiv = floatingDivRef.current;
				// Фокус перемещен был на event.relatedTarget и плавающий элемент скрываем, если event.relatedTarget находится снаружи.
				if (!(floatingDiv && event.relatedTarget instanceof Element && floatingDiv.contains(event.relatedTarget))) {
					setVisibled(false);
				}
			};
			useEffect(() => {
				if (floatingDivRef.current) {
					floatingDivRef.current.focus();
					setPosition(offsetOverflow(floatingDivRef.current));
				}
			}, [position.x, position.y]);
			useImperativeHandle(ref, () => ({
				setPositionByMouseEvent(event: MouseEvent) {
					event.preventDefault();
					this.setPosition(event.pageX, event.pageY);
				},
				setPosition(x: number, y: number) {
					setPosition({x, y});
					setVisibled(true);
				}
			}));
			return (
				createBodyPortal(
					visibled && (
						<FloatingDiv
							ref={floatingDivRef}
							onBlur={onFloatingDivBlur}
							{...{...position, children}}
						/>
					)
				)
			);
		}
	)
);

export default Floating;