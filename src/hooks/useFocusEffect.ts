import {RefObject, useEffect} from 'react';

export default function useFocusEffect(refObject: RefObject<HTMLElement>) {
	useEffect(() => {
		if (refObject.current) {
			refObject.current.focus();
		}
	});
}