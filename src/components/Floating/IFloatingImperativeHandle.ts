import {MouseEventHandler} from 'react';

/**
 * Внешние методы компонента Floating.
 */
export default interface IFloatingImperativeHandle {
	/**
	 * Обработчик клика правой кнопкой мышки.
	 * Изменяет координаты плавающего элемента на основе события
	 * мышки (берутся свойства event.pageX и event.pageY).
	 */
	onContextMenu: MouseEventHandler;

	/**
	 * Показать плавающий элемент, переместив его по определенным координатам.
	 */
	showAt: (x: number, y: number) => void;
}