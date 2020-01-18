/**
 * Вычисляет смещение прямоугольника, чтобы компенсировать его выход за пределы экрана.
 */
export default function calcOverflowOffset(x: number, y: number, width: number, height: number, viewportWidth: number, viewportHeight: number) {
	return {
		x: x + width - viewportWidth,
		y: y + height - viewportHeight
	};
}