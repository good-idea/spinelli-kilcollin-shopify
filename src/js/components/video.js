import $ from 'npm-zepto'

const windo = $(window)

const buildVideo = (element, publisher) => {
	const container = element instanceof $ ? element : $(element)
	const video = container.find('video')[0]

	const btn = $("<button type='button' class='video__unmute'>Mute</button>")
	// const $video = $(video)
	let videoTop
	let videoBottom
	let windowHeight

	function calculate() {
		videoTop = container.offset().top
		videoBottom = videoTop + container.height()
		windowHeight = windo.height()
	}

	const createUnmuteButton = () => {
		container.append(btn)
	}

	const updateMuteButton = () => {
		if (video.muted) {
			btn.text('Unmute')
		} else {
			btn.text('Mute')
		}
	}

	const handleMuteButton = () => {
		if (video.muted) {
			video.muted = false
		} else {
			video.muted = true
		}
		updateMuteButton()
	}

	const handleLoad = () => {
		console.log(video.getAttribute('autoplay'))
		if (video.getAttribute('autoplay')) {
			video.play()
		}
	}

	const handlePlay = () => {
		updateMuteButton()
		setTimeout(() => container.addClass('visible'), 300)
	}

	const handleError = () => {
		container.removeClass('visible')
	}

	const loadVideo = () => {
		const w = window.innerWidth
		const sources = [].slice.call(container.find('source'))
		const webm = sources.filter(s => s.getAttribute('type') === 'video/webm')[0]
		const mp4 = sources.filter(s => s.getAttribute('type') === 'video/mp4')[0]
		const allowWebm = w < 860
		mp4.setAttribute('src', mp4.getAttribute('data-src'))
		if (allowWebm && video.canPlayType('video/webm') === 'maybe') {
			webm.setAttribute('src', webm.getAttribute('data-src'))
		}
		video.load()
	}

	// const setLazySrc = () => {
	// 	const sources = $video.find('source')
	// 	sources.map((i, source) => {
	// 		console.log(source)
	// 		// const src = source.getAttribute('data-src')
	// 		// source.setAttribute('src', src)
	// 	})
	// 	console.log($video.attr('autoplay'))
	// 	if ($video.attr('autoplay')) video.play()
	// }
	createUnmuteButton()
	video.addEventListener('load', handleLoad)
	video.addEventListener('playing', handlePlay)
	video.addEventListener('error', handleError)

	btn.on('click', handleMuteButton)

	loadVideo()

	// if (video.getAttribute('data-lazy') === 'true') {
	// 	publisher.subscribe('windowLoaded', setLazySrc)
	// }
}

const buildVideos = publisher => {
	const videos = $('.video__container')
	videos.each((index, element) => {
		buildVideo(element, publisher)
	})
}

export default buildVideos
