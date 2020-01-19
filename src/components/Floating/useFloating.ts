import {FocusEvent, MouseEvent, Ref, RefObject, useEffect, useImperativeHandle, useRef, useState} from 'react';
import elementContainsRelatedTarget from '../../functions/elementContainsRelatedTarget';
import offsetOverflow from '../../functions/offsetOverflow';
import IFloatingImperativeHandle from './IFloatingImperativeHandle';

type TUseFloatingResult<R> = [(event: FocusEvent) => void, RefObject<R>, {x: number, y: number}, boolean];

/**
 * Организация плавающего элемента.
 * @param ref
 */
export default function useFloating<R extends HTMLElement>(ref: Ref<IFloatingImperativeHandle>): TUseFloatingResult<R> {
	// Ссылка на элемент, который требуется сделать плавающим.
	const floatingHtmlElementRef = useRef<R>(null);

	const [visibled, setVisibled] = useState(false);
	const [position, setPosition] = useState({x: 0, y: 0});

	const onFloatingHtmlElementBlur = (event: FocusEvent) => {
		// Скрываем плавающий элемент, если event.relatedTarget находится снаружи.
		if (!elementContainsRelatedTarget(floatingHtmlElementRef, event)) {
			setVisibled(false);
		}
	};

	useEffect(() => {
		if (floatingHtmlElementRef.current) {
			floatingHtmlElementRef.current.focus();
			setPosition(offsetOverflow(floatingHtmlElementRef.current));
		}
	}, [position.x, position.y]);

	useImperativeHandle(ref, () => ({
		onContextMenu(event: MouseEvent) {
			event.preventDefault();
			this.showAt(event.pageX, event.pageY);
		},
		showAt(x: number, y: number) {
			setPosition({x, y});
			setVisibled(true);
		}
	}));

	return [onFloatingHtmlElementBlur, floatingHtmlElementRef, position, visibled];
}