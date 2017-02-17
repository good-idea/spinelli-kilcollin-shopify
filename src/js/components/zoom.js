import $ from 'npm-zepto';

function between(number, min = 0, max = 1) {
	return Math.max(min, Math.min(max, number))
}

function buildZoom(element, publisher) {
	const windo = $(window);
	const zoom = {};
	const calc = {};
	const mainContainer = (element instanceof $) ? element : $(element);
	const zoomImage = mainContainer.find('.zoom__zoom');

	function calculateScroll() {
		calc.relx = windo.scrollLeft();
		calc.rely = windo.scrollTop();
	}

	function calculate() {
		const offset = mainContainer.offset();
		const width = mainContainer.width();
		const height = mainContainer.height();
		calc.xmin = offset.left;
		calc.xmax = calc.xmin + width;
		calc.ymin = offset.top;
		calc.ymax = calc.ymin + height;
		calc.zoomWidth = zoomImage.width() - width;
		calc.zoomHeight = zoomImage.height() - height;

		calculateScroll();
	}

	function moveZoom(pos) {
		const newX = -(pos.x * calc.zoomWidth);
		const newY = -(pos.y * calc.zoomWidth);
		const transform = `translate(${newX}px, ${newY}px)`;
		zoomImage.css('transform', transform);
	}

	function getPosition(e) {
		const pos = {};
		const x = e.clientX + calc.relx;
		const y = e.clientY + calc.rely;
		pos.x = (x - calc.xmin) / (calc.xmax - calc.xmin);
		pos.y = (y - calc.ymin) / (calc.ymax - calc.ymin);
		moveZoom(pos);
	}

	mainContainer.on('mouseenter', () => {
		mainContainer.addClass('zoom-active');
	});

	mainContainer.on('mouseleave', () => {
		mainContainer.removeClass('zoom-active');
	});

	mainContainer.on('mousemove', (e) => {
		getPosition(e);
	});

	zoom.toggle = function toggle(activate = true) {
		mainContainer.toggleClass('active', activate);
		if (activate) calculate();
	};

	publisher.subscribe('calculate', calculate);
	publisher.subscribe('windowScrolled', calculateScroll);

	return zoom;
}

function buildGallery(element, publisher) {
	const mainContainer = (element instanceof $) ? element : $(element);
	const frames = [];
	const frameDivs = mainContainer.find('.zoom__frame');
	const frameThumbs = mainContainer.find('.zoom__thumb');
	const currentFrame = 0;

	function activateFrame(activateIndex) {
		for (let i = 0; i < frameDivs.length; i += 1) {
			const activate = (i === activateIndex);
			frames[i].element.toggle(activate);
		}
	}

	frameDivs.each((index, frameElement) => {
		const frame = {};
		frame.element = buildZoom(frameElement, publisher);
		frame.thumbnail = frameThumbs[index];
		frames.push(frame);
	});

	frameThumbs.each((index, thumbnail) => {
		thumbnail.addEventListener('click', () => {
			activateFrame(index);
		});
	});

	activateFrame(currentFrame);
}


function buildZooms(publisher) {
	$(window).on('load', () => {
		const galleries = $('.zoom-gallery');
		galleries.each((index, gallery) => {
			buildGallery(gallery, publisher);
		});
	});
}

export default buildZooms;
