import $ from 'npm-zepto'
import { buildCarousel } from './carousel'

function transformTable(tableElement, publisher, config) {
	let mainContainer

	if (config.container) {
		mainContainer = $(config.container)
	} else {
		mainContainer = $('<div class="carousel">')
		mainContainer.insertBefore(tableElement)
	}

	if (config.class) mainContainer.addClass(config.class)

	const frame = $('<div class="carousel__frame">')
		.appendTo(mainContainer)
	const slidesContainer = $('<div class="carousel__slides">')
		.appendTo(frame)
	const slideTemplate = $('<div class="carousel__slide">')
	$('<i class="carousel__button carousel__button--previous icon-angle-down" data-action="previous">')
		.appendTo(mainContainer)
	$('<i class="carousel__button carousel__button--next icon-angle-down" data-action="next">')
		.appendTo(mainContainer)

	const table = $(tableElement)

	table.find('tr').each((i, el) => {
		const tds = $(el).find('td')
		const element = slideTemplate.clone()
		$(tds[0]).find('img').appendTo(element)
		const captionText = $(tds[1]).text()
		$('<h4 class="column--narrow">').text(captionText).appendTo(element)
		element.appendTo(slidesContainer)
	})

	mainContainer.removeClass('carousel__placeholder')
	buildCarousel(mainContainer, publisher)
	table.remove()
}

function stripEmptyBeginningTags(article) {
	const children = article.children()
	for (let i = 0; i < children.length; i += 1) {
		const child = children[i]
		if (child.children.length === 0 && (child.innerHTML === '' || child.innerText.trim() === '')) {
			child.remove()
		} else {
			return true
		}
	}
}

function buildBlogCarousels(publisher) {
	const article = $('.article__body')
	stripEmptyBeginningTags(article)
	const placeholder = $('section.article .carousel__placeholder')
	$('section.article table').each((i, table) => {
		const isFirstChild = (table === article.children()[0])
		const config = (isFirstChild) ? { container: placeholder, class: 'top-carousel' } : {}
		transformTable(table, publisher, config)
	})
}

function articlePages(publisher) {
	buildBlogCarousels(publisher)
}

export default articlePages
