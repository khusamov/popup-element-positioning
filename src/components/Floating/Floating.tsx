import React, {createRef, useEffect, useState, forwardRef, useImperativeHandle} from 'react';
import {PropsWithChildren, MouseEventHandler, MouseEvent, FocusEvent} from 'react';
import createBodyPortal from '../../functions/createBodyPortal';
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
 */
const Floating = (
	forwardRef<IFloatingImperativeHandle, PropsWithChildren<IFloatingProps>>(
		(props, ref) => {
			const {children} = props;
			const [visibled, setVisibled] = useState(false);
			const [x, setX] = useState(0);
			const [y, setY] = useState(0);
			const floatingDivRef = createRef<HTMLDivElement>();
			const onFloatingDivBlur = (event: FocusEvent<HTMLDivElement>) => {
				const floatingDiv = floatingDivRef.current;
				if (!(floatingDiv && event.relatedTarget instanceof Element && floatingDiv.contains(event.relatedTarget))) {
					setVisibled(false);
				}
			};
			useEffect(() => {
				if (floatingDivRef.current) {
					floatingDivRef.current.focus();
				}
			});
			useImperativeHandle(ref, () => ({
				setPositionByMouseEvent(event: MouseEvent) {
					event.preventDefault();
					this.setPosition(event.pageX, event.pageY);
				},
				setPosition(x: number, y: number) {
					setX(x);
					setY(y);
					setVisibled(true);
				}
			}));
			return (
				createBodyPortal(
					visibled && <FloatingDiv
						ref={floatingDivRef}
						onBlur={onFloatingDivBlur}
						{...{x, y, children}}
					/>
				)
			);
		}
	)
);

export default Floating;