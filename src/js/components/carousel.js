import $ from 'npm-zepto'

export function buildCarousel(element, publisher) {
	const mainContainer = (element instanceof $) ? element : $(element)
	const frame = $(mainContainer.find('.carousel__frame'))
	const slidesContainer = $(mainContainer.find('.carousel__slides'))
	const controls = []
	const slides = []

	let enabled = false
	let frameWidth = 0
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
		slidesInFrame = Math.round(frameWidth / slideWidth)
		const hasEnoughSlides = (slides.length > slidesInFrame)
		toggle(hasEnoughSlides)
		lastSlide = slides.length - slidesInFrame
	}

	function getCurrentSlide() {
		let findIndex = Math.round(-currentPosition / slideWidth)
		if (findIndex < 0) findIndex = 0
		if (findIndex > lastSlide) findIndex = lastSlide
		return findIndex
	}

	function moveToSlide(index) {
		let newIndex = index
		if (index === 'firstVisible') newIndex = getCurrentSlide()
		if (index === 'next') newIndex = currentIndex + 1
		if (index === 'previous') newIndex = currentIndex - 1
		if (newIndex < 0) newIndex = lastSlide
		if (newIndex > lastSlide) newIndex = 0
		const newLeft = -(slides[newIndex].element[0].offsetLeft)
		const translate = `translateX(${newLeft}px)`
		if (enabled) slidesContainer.css('transform', translate)
		currentIndex = newIndex
		currentPosition = newLeft
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

	let xDown = 0
	let dragLeft = 0
	function watchTouch() {
		frame.on('touchstart', (e) => {
			xDown = e.touches[0].clientX
		})
		frame.on('touchmove', (e) => {
			const xTouch = e.touches[0].clientX
			const xDiff = xDown - xTouch
			dragLeft = currentPosition - xDiff
			const translate = `translateX(${dragLeft}px)`
			if (enabled) slidesContainer.css('transform', translate)
		})
		frame.on('touchend', () => {
			currentPosition = dragLeft
			moveToSlide('firstVisible')
			dragLeft = 0
		})
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
}

export function buildCarousels(publisher) {
	$('.carousel').each((i, element) => {
		buildCarousel(element, publisher)
	})
}
