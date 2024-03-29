import $ from 'npm-zepto'

import publisher from './tools/pubSub'
import buildHeader from './components/header'
import buildSliders from './components/slider'
import buildZooms from './components/zoom'
import watchProducts from './components/product'
import watchImages from './components/imageLoad'
import buildUx from './components/uxbits'
import { buildCarousels } from './components/carousel'
// import mailerPopup from './components/mailerPopup'
import mailerSignup from './components/mailerSignup'
import articlePages from './components/blog'
import './components/ajaxifyCart'
import './components/handleRegistrationCaptcha'
import video from './components/video'
// import { buildZoomOverlays } from './components/zoomOverlay'
import './components/photoSwipe'

const windo = $(window)

function testForTouch() {
	const el = document.createElement('div')
	el.setAttribute('ontouchstart', 'return;')
	if (typeof el.ontouchstart === 'function') return true
	return 'ountouchstart' in window || navigator.msMaxTouchPoints
}

const hasTouchEvents = testForTouch()
if (hasTouchEvents) document.documentElement.classList.add('hasTouchEvents')
document.documentElement.classList.remove('no-js')

$(() => {
	buildHeader(publisher)
	buildSliders(publisher)
	buildZooms(publisher)
	buildCarousels(publisher)
	articlePages(publisher)
	watchProducts()
	watchImages()
	buildUx(publisher)
	mailerSignup()
	video(publisher)
	// buildZoomOverlays(publisher)
	// mailerPopup(publisher); // Uncomment to re-enable popup
})

windo.on('load', () => {
	publisher.emit('windowLoaded')
})

windo.on('scroll', () => {
	const ypos = windo.scrollTop()
	publisher.emit('WindowScrolled', ypos)
})

if (document.fonts) {
	document.fonts.ready.then(() => {
		publisher.emit('Calculate')
	})
}

let resizeTimer = null
windo.on('resize', () => {
	clearTimeout(resizeTimer)
	resizeTimer = setTimeout(() => {
		publisher.emit('Calculate')
	}, 250)
})
