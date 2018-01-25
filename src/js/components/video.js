import $ from 'npm-zepto'
import VimeoPlayer from '@vimeo/player'

const buildVideo = (element, publisher) => {
	const container = element instanceof $ ? element : $(element)
	const frame = $(container.find('.video__frame'))
	const wrapper = $(container.find('.video__wrapper'))
	const id = frame.attr('data-vimeo-video-id')
	const autoplay = frame.attr('data-autoplay') === 'true'
	const loop = frame.attr('data-loop') === 'true'
	const background = autoplay
	const muted = frame.attr('data-muted') === 'true'
	let videoWidth
	let videoHeight
	const options = {
		id,
		background,
		autoplay,
		loop,
		width: 'auto',
		height: 'auto',
		title: false,
	}

	const calculateSizing = () => {
		const containerRatio = container.height() / container.width()
		const videoRatio = videoHeight / videoWidth
		const widthDiff = 2 * (containerRatio - videoRatio)
		const newWidth = widthDiff > 0 ? 100 + widthDiff * 100 : 100
		wrapper.css({ width: `${newWidth}%` })
		frame.css({ 'padding-bottom': `${videoRatio * 100}%` })
	}

	const player = new VimeoPlayer(frame[0], options)
	Promise.all([player.getVideoHeight(), player.getVideoWidth()]).then(
		([height, width]) => {
			videoHeight = height
			videoWidth = width
			calculateSizing()
		},
	)

	if (muted) player.setVolume(0)

	if (autoplay) {
		player.on('play', () => {
			setTimeout(() => {
				frame.addClass('visible')
			}, 700)
		})
	}

	publisher.subscribe('Calculate', calculateSizing)
}

const buildVideos = publisher => {
	const videos = $('.video__container')
	videos.each((index, element) => {
		buildVideo(element, publisher)
	})
}

export default buildVideos
