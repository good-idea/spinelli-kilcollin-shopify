import $ from 'npm-zepto';
import Cookie from 'js-cookie';


function mailerPopup(publisher) {
	const notified = (Cookie.get('newsletter-notified') === 'true');

	function setCookie(args) {
		if (args.id === 'newsletter-overlay') {
			Cookie.set('newsletter-notified', 'true', { expires: 7 });
		}
	}

	publisher.subscribe('overlayClosed', setCookie);

	$(window).on('load', () => {
		if (!notified) {
			setTimeout(() => {
				$('#newsletter-overlay').addClass('visible');
			}, 4000);
		}
	});
}

export default mailerPopup;
