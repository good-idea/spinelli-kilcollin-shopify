import $ from 'npm-zepto';

function makeSlider(slider, publisher) {
	const mainContainer = (slider instanceof $) ? slider : $(slider);
	const overlayContainer = mainContainer.find('.slider__overlay-container');
	const altOverlay = mainContainer.find('.slider__item-alt .slider__overlay');
	const altMask = mainContainer.find('.slider__item-alt .slider__overlay-svg rect');
	const sliderLink = mainContainer.find('a');
	const primaryUrl = sliderLink.attr('data-href-primary');
	const secondaryUrl = sliderLink.attr('data-href-secondary');
	let currentUrl = primaryUrl;
	let containerLeft;
	let containerWidth;
	let isAnimating = false;
	let targetWidth = 0;
	let overlayWidth = 0;
	let sliderWidth = 0;
	let percentage = 0;

	function calculate() {
		containerLeft = mainContainer.offset().left;
		containerWidth = mainContainer.width();
		overlayWidth = overlayContainer.width();
	}


	function moveSlider() {
		isAnimating = true;
		const diff = (targetWidth - sliderWidth);
		sliderWidth += diff * 0.15;
		altOverlay.css('width', sliderWidth);
		altMask.attr('width', sliderWidth);
		if (Math.abs(diff) > 0.5) {
			window.requestAnimationFrame(moveSlider);
		} else {
			isAnimating = false;
		}
	}

	function setTargetWidth(percent) {
		const newWidth = overlayWidth * percent;
		targetWidth = newWidth;
		if (!isAnimating) window.requestAnimationFrame(moveSlider);
	}

	function setUrl(newUrl) {
		if (newUrl !== currentUrl) {
			sliderLink.attr('href', newUrl);
			currentUrl = newUrl;
		}
	}

	// Events
	mainContainer.on('mousemove', (e) => {
		percentage = Math.round(e.clientX - containerLeft) / containerWidth;
		setTargetWidth(percentage);
		const newUrl = ((sliderWidth / containerWidth) < 0.5) ? primaryUrl : secondaryUrl;
		setUrl(newUrl);
	});

	mainContainer.on('mouseleave', () => {
		const isPrimary = (percentage > 0.5);
		const newWidth = (isPrimary) ? 1 : 0;
		setTargetWidth(newWidth);
	});

	// Subscribe
	publisher.subscribe('Calculate', calculate);

	// Initialize
	calculate();
	mainContainer.addClass('initialized');
}

function buildSliders(publisher) {
	const sliders = $('.slider');
	sliders.each((index, slider) => {
		makeSlider(slider, publisher);
	});
}

export default buildSliders;
