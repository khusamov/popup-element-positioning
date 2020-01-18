/**
 * Вычисляет новые координаты прямоугольника с учетом компенсации его выхода за пределы экрана.
 */
export default function offsetOverflow(element: Element, viewportWidth: number = document.documentElement.clientWidth, viewportHeight: number = document.documentElement.clientHeight) {
	const {x, y, width, height} = element.getBoundingClientRect();

	const offsetX = x + width - viewportWidth;
	const offsetY = y + height - viewportHeight;

	return {
		x: offsetX > 0 ? x - offsetX : x,
		y: offsetY > 0 ? y - offsetY : y
	};
}