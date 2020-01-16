import {styled} from '@material-ui/styles';
import {TopProperty, LeftProperty} from 'csstype';

type TLength = string | 0;

const div = styled('div');

interface IFloatingDivProps {
	x: number;
	y: number;
}

export const FloatingDiv = div<{}, IFloatingDivProps>(({x, y}) => ({
	position: 'absolute',
	left: x as TopProperty<TLength>,
	top: y as LeftProperty<TLength>
}));