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
	 Mobile Submenus
	*/

	const burger = header.find('.burger');
	const html = $('html');
	const tabletCheck = $('#bp-medium');
	const submenuOrigins = header.find('.nav__item.has-submenu');
	const mainMenu = header.find('.nav__inner');

	burger.on('click', () => {
		html.toggleClass('menu-open nav-open');
		mainMenu.removeClass('submenu-open');
	});

	submenuOrigins.each((i, el) => {
		const origin = $(el);
		const link = origin.find('.nav__link');
		const submenu = origin.find('.nav__submenu');
		const returnButton = submenu.find('.submenu__return');
		link.on('click', (e) => {
			if (tabletCheck.css('display') !== 'none') {
				e.preventDefault();
				submenu.addClass('visible');
				mainMenu.addClass('submenu-open');
			}
		});
		returnButton.on('click', () => {
			mainMenu.removeClass('submenu-open');
			submenu.removeClass('visible');
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
