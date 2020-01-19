import {useState} from 'react';

export default function useVisibled(visibledDefault: boolean): [boolean, () => void, () => void] {
	const [visibled, setVisibled] = useState(visibledDefault);
	const show = () => setVisibled(true);
	const hide = () => setVisibled(false);
	return [visibled, show, hide];
}