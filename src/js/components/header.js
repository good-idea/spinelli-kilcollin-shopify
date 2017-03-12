import $ from 'npm-zepto';

function buildHeader(publisher) {
	const header = $('header');
	/*
	 Search
	*/

	const searchOpen = header.find('.search-activate');
	const searchInput = header.find('input[type="search"]');

	searchOpen.on('click', () => {
		header.addClass('search-open');
		searchInput.focus();
		searchInput.on('blur', () => {
			header.removeClass('search-open');
			searchInput.off('blur');
		});
	});

	/*
	 Sticky Nav
	*/

	const nav = header.find('nav');
	let min;

	function calculate() {
		min = header.height() - nav.height();
	}

	function checkScroll(ypos) {
		const shouldStick = (ypos > min);
		nav.toggleClass('stuck', shouldStick);
	}

	publisher.subscribe('windowLoaded', calculate);
	publisher.subscribe('WindowScrolled', checkScroll);

	calculate();
	checkScroll($(window).scrollTop());
	header.addClass('initialized');
}

export default buildHeader;
