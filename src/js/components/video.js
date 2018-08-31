import $ from 'npm-zepto'

const buildVideo = element => {
	const container = element instanceof $ ? element : $(element)
	const video = container.find('video')[0]
	// const $video = $(video)

	const createUnmuteButton = () => {
		const btn = $("<button type='button' class='video__unmute'>Unmute</button")
		container.append(btn)
	}

	const show = () => setTimeout(() => container.addClass('visible'), 300)
	const hide = () => container.removeClass('visible')

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

	video.addEventListener('playing', show)
	video.addEventListener('error', hide)
	if (!video.paused) show()

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
