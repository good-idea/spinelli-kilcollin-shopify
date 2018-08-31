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
		if (video.volume === 0) {
			btn.text('Unmute')
		} else {
			btn.text('Mute')
		}
	}

	const handleMuteButton = () => {
		if (video.volume === 0) {
			video.volume = 1
			updateMuteButton()
		} else {
			video.volume = 0
			updateMuteButton()
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
		const sources = container.find('source')
		sources.each((i, source) => {
			const src = source.getAttribute('data-full-src')
			if (src) {
				source.setAttribute('src', src)
			}
		})
	}

	function handleScroll(ypos) {
		// console.log(videoTop < ypos + windowHeight)
		if (ypos - 500 < videoBottom && videoTop - 500 < ypos + windowHeight) {
			publisher.unsubscribe('WindowScrolled', handleScroll)
			publisher.unsubscribe('Calculate', calculate)
			loadVideo()
		}
	}

	video.addEventListener('load', () => {
		console.log('video loaded')
	})

	if (video.getAttribute('data-lazy') === 'true') {
		calculate()
		handleScroll(windo.scrollTop())
		publisher.subscribe('WindowScrolled', handleScroll)
		publisher.subscribe('Calculate', calculate)
	} else {
		publisher.subscribe('windowLoaded', loadVideo)
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

	video.addEventListener('playing', handlePlay)
	video.addEventListener('error', handleError)
	btn.on('click', handleMuteButton)
	if (!video.paused) handlePlay()

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
