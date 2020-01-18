import {FocusEvent, RefObject} from 'react';

export default function elementContainsRelatedTarget(ref: RefObject<Element>, event: FocusEvent) {
	const element = ref.current;
	return element && event.relatedTarget instanceof Element && element.contains(event.relatedTarget);
}