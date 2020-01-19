import {FocusEvent, MouseEvent, Ref, RefObject, useImperativeHandle, useRef, useState} from 'react';
import elementContainsRelatedTarget from '../../functions/elementContainsRelatedTarget';
import IPosition, {ZERO_POSITION} from '../../types/interfaces/IPosition';
import useVisibled from '../../hooks/useVisibled';
import useFocusEffect from '../../hooks/useFocusEffect';
import useOffsetOverflowEffect from '../../hooks/useOffsetOverflowEffect';
import IFloatingImperativeHandle from './IFloatingImperativeHandle';

type TUseFloatingResult<R> = [(event: FocusEvent) => void, RefObject<R>, IPosition, boolean];

/**
 * Организация плавающего элемента.
 * @param ref
 */
export default function useFloating<R extends HTMLElement>(ref: Ref<IFloatingImperativeHandle>): TUseFloatingResult<R> {
	// Ссылка на элемент, который требуется сделать плавающим.
	const floatingHtmlElementRef = useRef<R>(null);

	const [visibled, show, hide] = useVisibled(false);
	const [position, setPosition] = useState<IPosition>(ZERO_POSITION);

	useFocusEffect(floatingHtmlElementRef);
	useOffsetOverflowEffect(floatingHtmlElementRef, setPosition, position);

	useImperativeHandle(ref, () => ({
		onContextMenu(event: MouseEvent) {
			event.preventDefault();
			this.showAt(event.pageX, event.pageY);
		},
		showAt(x: number, y: number) {
			setPosition({x, y});
			show();
		}
	}));

	const onFloatingHtmlElementBlur = (event: FocusEvent) => {
		// Скрываем плавающий элемент, если event.relatedTarget находится снаружи.
		if (!elementContainsRelatedTarget(floatingHtmlElementRef, event)) {
			hide();
		}
	};

	return [onFloatingHtmlElementBlur, floatingHtmlElementRef, position, visibled];
}