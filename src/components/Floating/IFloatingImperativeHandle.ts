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
	 * Изменить координаты плавающего элемента.
	 * После изменения координат элемент становится видимым.
	 */
	setPosition: (x: number, y: number) => void;
}