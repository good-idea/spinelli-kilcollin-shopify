import $ from 'npm-zepto'

const bindCloseButtons = () => {
	const modals = $('.zoom__carousel-modal')

	modals.forEach(modal => {
		const ex = $(modal).find('.ex')[0]
		ex.addEventListener('click', () => {
			modal.classList.remove('open')
		})
	})
}

const bindButtons = publisher => {
	const buttons = $('[data-open-carousel-modal]').map((i, el) => {
		const modalId = el.getAttribute('data-open-carousel-modal')
		const modal = $(`[data-modal-id="${modalId}"]`)
		const carousel = modal.find('.carousel')
		const carouselId = carousel
			? carousel[0].getAttribute('data-carousel-id')
			: null
		const imageIndex =
			el.getAttribute('data-carousel-image') !== null
				? parseInt(el.getAttribute('data-carousel-image'), 10) - 1
				: null
		return {
			element: el,
			modal,
			carouselId,
			imageIndex,
		}
	})

	buttons.forEach(button => {
		const handleClick = () => {
			button.modal[0].classList.add('open')
			if (button.imageIndex && button.carouselId) {
				publisher.emit(
					'carouselMovedToImage',
					button.carouselId,
					button.imageIndex,
				)
			}
		}
		button.element.addEventListener('click', handleClick)
	})
}

export function buildZoomOverlays(publisher) {
	bindButtons(publisher)
	bindCloseButtons()
}
