import {Dispatch, RefObject, SetStateAction, useEffect} from 'react';
import IPosition from '../types/interfaces/IPosition';
import offsetOverflow from '../functions/offsetOverflow';

export default function useOffsetOverflowEffect(refObject: RefObject<HTMLElement>, setPosition: Dispatch<SetStateAction<IPosition>>, position: IPosition) {
	useEffect(() => {
		if (refObject.current) {
			setPosition(offsetOverflow(refObject.current));
		}
	}, [position.x, position.y]);
}