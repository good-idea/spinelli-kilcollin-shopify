import $ from 'npm-zepto'
// import { query } from '@artcommacode/query'
import publisher from '../tools/pubSub'

const windo = $(window)

const skipLazy = /backstop_test=true/.test(document.cookie)

const watchImage = element =>
	new Promise(resolve => {
		const mainContainer = element instanceof $ ? element : $(element)
		const fullImage = mainContainer.find('.img-preload-full img')
		fullImage.on('load', () => {
			mainContainer.addClass('img-preload--loaded')
			resolve()
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
			const srcset =
				fullImage.attr('data-full-srcset') || fullImage.attr('srcset')
			fullImage.attr('src', src).attr('srcset', srcset)
		}

		function handleScroll(ypos) {
			// console.log(imageTop < ypos + windowHeight)
			if (ypos - 500 < imageBottom && imageTop - 500 < ypos + windowHeight) {
				publisher.unsubscribe('WindowScrolled', handleScroll)
				publisher.unsubscribe('Calculate', calculate)
				loadFullImage()
			}
		}

		function handleIntersection(entries) {
			const entry = entries[0]
			if (entry.isIntersecting) {
				loadFullImage()
				/* eslint-disable-next-line no-use-before-define */
				observer.unobserve(mainContainer[0])
			}
		}

		const observer = new IntersectionObserver(handleIntersection, {
			rootMargin: '200px 0px 200px 0px',
		})

		if (!skipLazy && mainContainer.attr('data-lazy') === 'true') {
			if (window.IntersectionObserver) {
				observer.observe(mainContainer[0])
			} else {
				// Otherwise, watch for the scroll
				calculate()
				handleScroll(windo.scrollTop())
				publisher.subscribe('WindowScrolled', handleScroll)
				publisher.subscribe('Calculate', calculate)
			}
		} else {
			publisher.subscribe('windowLoaded', loadFullImage)
		}
	})

const watchImages = async () => {
	const images = Array.from(document.querySelectorAll('.img-preload'))
	setTimeout(() => {
		console.log('backstopjs_ready')
	}, 1000 * 60)
	await Promise.all(images.map(watchImage))
	console.log('backstopjs_ready')
}

export default watchImages
