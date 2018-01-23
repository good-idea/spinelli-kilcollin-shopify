import $ from 'npm-zepto'
import publisher from '../tools/pubSub'

const windo = $(window)

function watchImage(element, onLoadCallback) {
	const mainContainer = element instanceof $ ? element : $(element)
	const fullImage = mainContainer.find('.img-preload-full img')
	fullImage.on('load', () => {
		onLoadCallback(mainContainer)
	})

	let imageTop
	let imageBottom
	let windowHeight

	function calculate() {
		imageTop = mainContainer.offset().top
		imageBottom = imageTop + mainContainer.height()
		windowHeight = windo.height()
	}

	function loadFullImage() {
		const src = fullImage.attr('data-full-src')
		const srcset = fullImage.attr('data-full-srcset')
		fullImage.attr('src', src).attr('srcset', srcset)
		// .removeAttr('data-full-src')
		// .removeAttr('data-full-srcset')
	}

	function handleScroll(ypos) {
		// console.log(imageTop < ypos + windowHeight)
		if (ypos - 500 < imageBottom && imageTop - 500 < ypos + windowHeight) {
			publisher.unsubscribe('WindowScrolled', handleScroll)
			publisher.unsubscribe('Calculate', calculate)
			loadFullImage()
		}
	}

	if (mainContainer.attr('data-lazy') === 'true') {
		calculate()
		handleScroll(windo.scrollTop())
		publisher.subscribe('WindowScrolled', handleScroll)
		publisher.subscribe('Calculate', calculate)
	} else {
		publisher.subscribe('windowLoaded', loadFullImage)
	}
}

function watchImages() {
	console.log('?')
	const images = $('.img-preload')
	const unBlurElements = []
	const delay = 200

	function triggerUnBlur() {
		unBlurElements[0].addClass('img-preload--loaded')
		setTimeout(() => {
			unBlurElements.shift()
			if (unBlurElements.length) triggerUnBlur()
		}, delay)
	}

	function queueUnBlur(element) {
		unBlurElements.push(element)
		if (unBlurElements.length === 1) triggerUnBlur()
	}

	images.each((index, image) => {
		watchImage(image, queueUnBlur)
	})
}

export default watchImages
