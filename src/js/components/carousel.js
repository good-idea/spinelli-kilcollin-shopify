/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-expressions */
import $ from 'npm-zepto'

const minMax = (min, max, num) => Math.max(Math.min(num, max), min)

function roundToNearest(precision = 0, value) {
	/* eslint-disable-next-line no-restricted-properties */
	const multiplier = Math.pow(10, precision)
	return Math.round(value * multiplier) / multiplier
}

const debounce = (delay = 50, fn) => {
	let timerId
	const debouncedFn = (...args) => {
		if (timerId) {
			clearTimeout(timerId)
		}
		timerId = setTimeout(() => {
			fn(...args)
			timerId = null
		}, delay)
	}
	return debouncedFn
}

const calcDistance = (x1, x2, y1, y2) => {
	const xDiff = Math.pow(x2 - x1, 2)
	const yDiff = Math.pow(y2 - y1, 2)
	return Math.sqrt(xDiff + yDiff)
}

const getPinchDistance = ([touchA, touchB]) => {
	if (!touchB) return 0
	return calcDistance(
		touchA.clientX,
		touchB.clientX,
		touchA.clientY,
		touchB.clientY,
	)
}

const getPinchCenter = ([touchA, touchB]) => {
	if (!touchB) {
		return {
			x: touchA.clientX,
			y: touchA.clientY,
		}
	}
	return {
		x: (touchA.clientX + touchB.clientX) / 2,
		y: (touchA.clientY + touchB.clientY) / 2,
	}
}

export function buildCarousel(element, publisher) {
	const mainContainer = element instanceof $ ? element : $(element)
	const frame = $(mainContainer.find('.carousel__frame'))
	const slidesContainer = $(mainContainer.find('.carousel__slides'))

	const pinchZoomEnabled =
		mainContainer.attr('data-pinch-zoom-enabled') === 'true'
	const containerId = mainContainer.attr('data-carousel-id')
	const controls = []
	const slides = []
	let enabled = false
	let frameWidth = 0
	let frameHeight = 0
	let slideWidth = 0
	let slidesInFrame = 1
	let lastSlide = 1
	let currentIndex = 0
	let currentPosition = 0

	function toggle(bool = true) {
		mainContainer.toggleClass('carousel--disabled', !bool)
		if (bool === false) slidesContainer.css('transform', 'none')
		enabled = bool
	}

	function calculate() {
		slideWidth = slides[0].element.width()
		frameWidth = frame.width()
		frameHeight = frame.height()
		slidesInFrame = Math.round(frameWidth / slideWidth)
		const hasEnoughSlides = slides.length > slidesInFrame
		toggle(hasEnoughSlides)
		lastSlide = slides.length - slidesInFrame
	}

	function getCurrentSlide() {
		let findIndex = Math.round(-currentPosition / slideWidth)
		if (findIndex < 0) findIndex = 0
		if (findIndex > lastSlide) findIndex = lastSlide
		return findIndex
	}

	function moveToSlide(index, config = { loop: true, animate: true }) {
		let newIndex = index
		if (index === 'current') newIndex = currentIndex
		if (index === 'firstVisible') newIndex = getCurrentSlide()
		if (index === 'next') newIndex = currentIndex + 1
		if (index === 'previous') newIndex = currentIndex - 1
		if (config.loop) {
			if (newIndex < 0) newIndex = lastSlide
			if (newIndex > lastSlide) newIndex = 0
		} else {
			newIndex = Math.max(Math.min(newIndex, slides.length - 1), 0)
		}
		const newLeft = -slides[newIndex].element[0].offsetLeft
		const translate = `translateX(${newLeft}px)`
		if (config.animate === false) slidesContainer.addClass('noTransition')
		slidesContainer[0].offsetHeight
		if (enabled) slidesContainer.css('transform', translate)
		slidesContainer[0].offsetHeight
		if (config.animate === false) slidesContainer.removeClass('noTransition')
		currentIndex = newIndex
		currentPosition = newLeft
	}

	function openToImage(carouselId, slideIndex) {
		if (carouselId === containerId) {
			moveToSlide(slideIndex, { animate: false })
		}
	}

	function buildButton(el) {
		const button = {}
		button.element = $(el)
		const action = button.element.attr('data-action')
		button.element.on('click', () => {
			moveToSlide(action)
		})
		return button
	}

	let blockZoom = false
	let xDown = 0
	let dragLeft = 0
	let swipeStarted
	let bothFingersUp
	let zoom = {
		initialScale: 1,
		initialDistance: 0,
		initialCenter: {
			x: 0,
			y: 0,
		},
		initialTranslate: {
			x: 0,
			y: 0,
		},
	}

	const setTouchValues = (values, e = null) => {
		/* eslint-disable indent */

		const calculated = e
			? {
					initialDistance: getPinchDistance(e.touches),
					initialCenter: getPinchCenter(e.touches),
			  }
			: {}

		zoom = Object.assign({}, zoom, values, calculated)
	}

	const handleTouchStart = e => {
		if (e.touches.length > 2) return

		if (e.touches.length > 1) {
			// handle Zoom
			if (!pinchZoomEnabled) return
		} else {
			xDown = e.touches[0].clientX
			swipeStarted = new Date()
		}
		setTouchValues({}, e)
		console.log(zoom)
	}

	const getNewTranslate = (
		x,
		y,
		scale = zoom.currentScale || zoom.initialScale,
	) => {
		const limitOffsetX = (frameWidth * scale - frameWidth) / 2
		const limitOffsetY = (frameHeight * scale - frameHeight) / 2

		const translateX = roundToNearest(
			0,
			minMax(
				limitOffsetX * -1,
				limitOffsetX,
				zoom.initialTranslate.x + (x - zoom.initialCenter.x),
			) / scale,
		)

		const translateY = roundToNearest(
			0,
			minMax(
				limitOffsetY * -1,
				limitOffsetY,
				zoom.initialTranslate.y + (y - zoom.initialCenter.y),
			) / scale,
		)
		return { translateX, translateY }
	}

	const setCss = (translateX, translateY, scale = zoom.currentScale) => {
		// console.log('setting css')
		// console.log(
		// 	`scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
		// )
		if (blockZoom) return
		frame.css(
			'transform',
			`scale(${scale}) translate3d(${translateX}px, ${translateY}px, 0)`,
		)

		const currentValues = {
			currentScale: scale,
			currentTranslate: {
				x: translateX,
				y: translateY,
			},
		}
		setTouchValues(currentValues)
	}

	const moveImage = e => {
		const { translateX, translateY } = getNewTranslate(
			e.touches[0].clientX,
			e.touches[0].clientY,
		)
		setCss(translateX, translateY)
	}

	const zoomImage = e => {
		const distance = getPinchDistance(e.touches)
		const currentCenter = getPinchCenter(e.touches)
		const scale = roundToNearest(
			4,
			minMax(1, 5, (distance / zoom.initialDistance) * zoom.initialScale),
		)
		const { translateX, translateY } = getNewTranslate(
			currentCenter.x,
			currentCenter.y,
		)
		setCss(translateX, translateY, scale)
	}

	const debouncedZoomImage = debounce(30, zoomImage)

	const handleTouchMove = e => {
		if (e.touches.length > 2) return
		if (e.touches.length > 1) {
			// handle Zoom
			if (!pinchZoomEnabled) return

			zoomImage(e)
		} else if (zoom.currentScale > 1) {
			// handle single touch move while zoomed in
			moveImage(e)
		} else {
			const xTouch = e.touches[0].clientX
			const xDiff = xDown - xTouch
			dragLeft = currentPosition - xDiff
			const translate = `translateX(${dragLeft}px)`
			if (enabled) slidesContainer.css('transform', translate)
		}
	}

	const handleTouchEnd = e => {
		if (e.touches.length > 2) return

		if (e.touches.length > 0) {
			// The user has zoomed and lifted the first finger
			zoom.start = null
			zoom.initialScale = zoom.currentScale
			setTouchValues({
				initialScale: zoom.currentScale,
				initialTranslate: {
					x: zoom.currentTranslate.x,
					y: zoom.currentTranslate.y,
				},
			})
			blockZoom = true
			setTimeout(() => {
				blockZoom = false
			}, 150)
			bothFingersUp = false

			return
		}
		// The second finger has been lifted
		// Return so we don't move to a new slide
		setTouchValues({
			initialScale: zoom.currentScale,
			initialTranslate: {
				x: zoom.currentTranslate.x,
				y: zoom.currentTranslate.y,
			},
		})

		if (!bothFingersUp) {
			setCss(0, 0, 1)
			setTimeout(() => {
				bothFingersUp = true
			}, 150)
			return
		}

		if (zoom.currentScale > 1) return
		const now = new Date()
		console.log(dragLeft - currentPosition, frameWidth * 0.2)
		const nextSlide =
			/* eslint-disable no-nested-ternary */
			now - swipeStarted < 300
				? // If we're swiping fast, we want to snap to the next slide in that direction
				  dragLeft - currentPosition < 0
					? 'next'
					: 'previous'
				: // Otherwise if the next or previous slide is 20% in view, scroll to it
				  Math.abs(dragLeft - currentPosition) > frameWidth * 0.2
					? // next or previous, depending on swipe direction
					  dragLeft - currentPosition < 0
						? 'next'
						: 'previous'
					: // Otherwise, move to the current slide
					  'current'
		moveToSlide(nextSlide, { loop: false })
		dragLeft = 0
	}

	function watchTouch() {
		frame.on('touchstart', handleTouchStart)
		frame.on('touchmove', handleTouchMove)
		frame.on('touchend', handleTouchEnd)
	}

	mainContainer.find('.carousel__slide').each((i, el) => {
		const slide = {}
		slide.element = $(el)
		slides.push(slide)
	})

	mainContainer.find('.carousel__button').each((i, el) => {
		const button = buildButton(el)
		controls.push(button)
	})

	if (slides.length > 0) {
		publisher.subscribe('Calculate', calculate)
		calculate()
		watchTouch()
		moveToSlide(0)
	}

	publisher.subscribe('carouselMovedToImage', openToImage)
}

export function buildCarousels(publisher) {
	$('.carousel').each((i, element) => {
		buildCarousel(element, publisher)
	})
}
