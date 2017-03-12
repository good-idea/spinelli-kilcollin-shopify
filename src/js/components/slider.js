import $ from 'npm-zepto';

$('a').on('click', (e) => {
	e.preventDefault();
	console.log(e.target.parentElement.getAttribute('href'));
});

function makeSlider(slider, publisher) {
	const mainContainer = (slider instanceof $) ? slider : $(slider);
	const overlayContainer = mainContainer.find('.slider__overlay-container');
	const sliderLink = mainContainer.find('a');
	const scrubber = mainContainer.find('.slider__scrubber');
	const primaryUrl = sliderLink.attr('data-href-primary');
	const secondaryUrl = sliderLink.attr('data-href-secondary');
	const setWidth = mainContainer.find('.slider-set-width');
	let currentUrl = primaryUrl;
	let containerLeft;
	let containerWidth;
	let isAnimating = false;
	let targetWidth = 0;
	let overlayWidth = 0;
	let sliderWidth = 0;
	// let percentage = 0;

	function calculate() {
		containerLeft = mainContainer.offset().left;
		containerWidth = mainContainer.width();
		overlayWidth = overlayContainer.width();
	}

	function moveSlider() {
		isAnimating = true;
		const diff = (targetWidth - sliderWidth);
		sliderWidth += diff * 0.15;
		// sliderWidth = Math.max(0, Math.min(containerWidth, sliderWidth));
		setWidth.css('width', sliderWidth);
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
		const percentage = Math.round(e.clientX - containerLeft) / containerWidth;
		setTargetWidth(percentage);
		const newUrl = ((sliderWidth / containerWidth) < 0.5) ? primaryUrl : secondaryUrl;
		setUrl(newUrl);
	});

	mainContainer.on('mouseleave', (e) => {
		const percentage = Math.round(e.clientX - containerLeft) / containerWidth;
		const isPrimary = (percentage > 0.5);
		const newWidth = (isPrimary) ? 1 : 0;
		setTargetWidth(newWidth);
	});

	scrubber.on('touchstart', () => {
		scrubber.on('touchmove', (e) => {
			mainContainer.unbind('mouseleave mousemove');
			const percentage = Math.round(e.touches[0].clientX - containerLeft) / containerWidth;
			setTargetWidth(percentage);
		});
		scrubber.on('touchend', () => {
			scrubber.off('touchmove');
		});
	});

	if (scrubber.parent().css('display') !== 'none') {
		mainContainer.on('in-view', () => {
			setTimeout(() => {
				setTargetWidth(0.5);
			}, 800);
		});
	}

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
