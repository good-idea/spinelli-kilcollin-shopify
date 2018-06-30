/* eslint-disable camelcase */
import $ from 'npm-zepto'

const { PhotoSwipe, PhotoSwipeUI_Default } = window

$(() => {
	const galleries = $('.pswp[data-pwsp-id]')
	const allButtons = $('[data-open-carousel-modal]')

	galleries.forEach(gallery => {
		try {
			let galleryContainer
			const id = gallery.getAttribute('data-pwsp-id')
			const images = JSON.parse(
				gallery
					.getAttribute('data-images')
					.replace(/\s+/g, '')
					.replace('},]', '}]'),
			)
			const buttons = allButtons
				.toArray()
				.filter(b => b.getAttribute('data-open-carousel-modal') === id)
				.map(b => ({
					element: b,
					index: parseInt(b.getAttribute('data-carousel-image'), 10) - 1,
				}))

			const openGallery = (index = 0) => {
				galleryContainer = new PhotoSwipe(
					gallery,
					PhotoSwipeUI_Default,
					images,
					{
						index,
					},
				)
				galleryContainer.init()
				const centerPoint = {
					x: galleryContainer.viewportSize.x / 2,
					y: galleryContainer.viewportSize.y / 2,
				}
				galleryContainer.zoomTo(0.4, centerPoint, 0)
			}

			buttons.forEach(b => {
				b.element.addEventListener('click', () => {
					openGallery(b.index)
				})
			})
		} catch (err) {
			console.warn(err)
		}
	})

	// $('.pswp').forEach(el => {
	// 	try {
	// 		const images = JSON.parse(
	// 			el
	// 				.getAttribute('data-images')
	// 				.replace(/\s+/g, '')
	// 				.replace('},]', '}]'),
	// 		)
	// 		console.log(images)
	// 		const gallery = new PhotoSwipe(el, PhotoSwipeUI_Default, images, {})
	// 		console.log(gallery)
	// 		gallery.init()
	// 	} catch (err) {
	// 		console.warn(err)
	// 	}
	// })
})
