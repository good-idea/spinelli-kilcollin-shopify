import $ from 'jquery';

function toggles() {
	$('.toggle-container').each((i, element) => {
		const container = $(element);
		const trigger = container.find('.toggle-trigger');
		trigger.on('click', () => {
			container.toggleClass('toggle-on');
		});
	});
}

function overlays(publisher) {
	$('.overlay').each((i, element) => {
		const container = $(element);
		const id = container.attr('id');
		const closeButton = container.find('.overlay-close');

		function close() {
			container.removeClass('visible');
			publisher.emit('overlayClosed', { id });
			$(document).unbind('.overlay');
		}

		$(closeButton).on('click', () => {
			close();
		});

		$(document).on('keyup.overlay', (e) => {
			if (e.keyCode === 27) close();
		});
	});
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

function mobileNav() {
	const header = $('header');
	const burger = header.find('.burger');
	const html = $('html');
	burger.on('click', () => {
		html.toggleClass('menu-open nav-open');
	});
}

function buildUx(publisher) {
	toggles();
	mobileNav();
	overlays(publisher);

	$(window).on('load', () => {
		lazies();
	});
}

export default buildUx;
