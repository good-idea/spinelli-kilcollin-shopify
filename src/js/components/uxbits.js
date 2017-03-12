import $ from 'jquery';

function inView(publisher = false) {
	$('.watch-in-view').each((i, element) => {
		const outerContainer = (element instanceof $) ? element : $(element);
		let top = 0;
		let height = 0;
		let wheight = 0;
		let oversize = 1;

		function calculate() {
			top = outerContainer.offset().top;
			height = outerContainer.outerHeight();
			wheight = $(window).height();
			oversize = Math.max(1, (height / wheight));
		}

		function check(ypos = $(window).scrollTop()) {
			let percentage = 1;
			const hiddenBefore = ypos - top;
			const hiddenAfter = (top + height) - (ypos + wheight);

			if (hiddenBefore > 0) percentage -= hiddenBefore / height;
			if (hiddenAfter > 0) percentage -= hiddenAfter / height;

			percentage *= oversize;
			percentage = Math.min(1, percentage); // not greater than 1
			percentage = Math.max(0, percentage); // nor less than 0

			if (percentage === 1) outerContainer.addClass('in-view');
		}


		if (publisher) {
			publisher.subscribe('WindowScrolled', check);
			publisher.subscribe('Calculate', calculate);
		} else {
			$(window).on('scroll', () => {
				const ypos = $(window).scrollTop;
				check(ypos);
			});
			$(window).on('resize', calculate);
		}

		calculate();
		check();
	});
}

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
		inView(publisher);
	});
}

export default buildUx;
