import $ from 'npm-zepto';

import publisher from './tools/pubSub';
import buildHeader from './components/header';
import buildSliders from './components/slider';
import buildZooms from './components/zoom';
import watchProducts from './components/product';
import buildUx from './components/uxbits';
import buildCarousels from './components/carousel';

const windo = $(window);

/*
	Initialization
 */

const hasTouchEvents = 'ountouchstart' in window || navigator.msMaxTouchPoints;
if (hasTouchEvents) document.documentElement.classList.add('hasTouchEvents');
document.documentElement.classList.remove('no-js');

$(() => {
	buildHeader(publisher);
	buildSliders(publisher);
	buildZooms(publisher);
	buildCarousels(publisher);
	watchProducts();
	buildUx();
});

/*
	Events
 */

windo.on('load', () => {
	publisher.emit('windowLoaded');
});

windo.on('scroll', () => {
	const ypos = windo.scrollTop();
	publisher.emit('windowScrolled', ypos);
});

document.fonts.ready.then(() => {
	publisher.emit('calculate');
});

let resizeTimer = null;
windo.on('resize', () => {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		publisher.emit('calculate');
	}, 250);
});
