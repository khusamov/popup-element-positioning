import {ReactNode, ReactPortal} from 'react';
import {createPortal} from 'react-dom';

/**
 * Создать портал в `document.body`.
 * @param children
 * @param key
 */
export default function createBodyPortal(children: ReactNode, key?: null | string): ReactPortal {
	return createPortal(children, document.body, key);
}