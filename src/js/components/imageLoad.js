import $ from 'npm-zepto';
import publisher from '../tools/pubSub';

function watchImage(element, onLoadCallback) {
	const mainContainer = (element instanceof $) ? element : $(element);
	const fullImage = mainContainer.find('.img-preload-full img');

	fullImage.on('load', () => {
		onLoadCallback(mainContainer);
	});

	function loadFullImage() {
		const src = fullImage.attr('data-full-src');
		const srcset = fullImage.attr('data-full-srcset');
		fullImage.attr('src', src)
			.attr('srcset', srcset)
			.removeAttr('data-full-src')
			.removeAttr('data-full-srcset');
	}

	publisher.subscribe('windowLoaded', loadFullImage);
}

function watchImages() {
	const images = $('.img-preload');
	const unBlurElements = [];
	const delay = 200;

	function triggerUnBlur() {
		unBlurElements[0].addClass('img-preload--loaded');
		setTimeout(() => {
			unBlurElements.shift();
			if (unBlurElements.length) triggerUnBlur();
		}, delay);
	}

	function queueUnBlur(element) {
		unBlurElements.push(element);
		if (unBlurElements.length === 1) triggerUnBlur();
	}

	images.each((index, image) => {
		watchImage(image, queueUnBlur);
	});
}

export default watchImages;
