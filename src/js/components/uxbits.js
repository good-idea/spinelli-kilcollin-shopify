import $ from 'jquery';
import { lory } from 'lory.js';

function toggles() {
	$('.toggle-container').each((i, element) => {
		const container = $(element);
		const trigger = container.find('.toggle-trigger');
		trigger.on('click', () => {
			container.toggleClass('toggle-on');
		});
	});
}

function carousels() {
	const selector = document.querySelector('.js_slider');
	lory(selector);
}

function lazies() {
	$('img.lazy-src').each((i, element) => {
		element.onload = function markAsLoaded() {
			element.classList.add('loaded');
		};
		const src = element.getAttribute('lazy-src');
		element.setAttribute('src', src);
	});
}

function buildUx() {
	toggles();

	$(window).on('load', () => {
		lazies();
		// carousels();
	});
}

export default buildUx;
