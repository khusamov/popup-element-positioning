import {useRef} from 'react';
import IFloatingImperativeHandle from './IFloatingImperativeHandle';

export default function useFloatingRef() {
	return useRef<IFloatingImperativeHandle>(null);
}