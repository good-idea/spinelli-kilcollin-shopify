import $ from 'npm-zepto'
import axios from 'axios'
// import Cookies from 'js-cookie'

const ajaxifyMailer = inputContainer => {
	const container =
		inputContainer instanceof $ ? inputContainer : $(inputContainer)
	const form = container.find('form.signup__form')
	const errors = container.find('.signup__errors')

	const forceSubmit = () => {
		form.off('submit')
		form.submit()
	}

	const handleSubmit = e => {
		e.preventDefault()
		console.log(e)
		const formData = form.serialize()
		errors.text('')
		container.addClass('thinking')
		setTimeout(() => {
			axios
				.post('https://ms.good-idea.studio/mailchimp/subscribe', formData)
				.then(response => {
					if (response.status !== 200) {
						forceSubmit()
						return
					}
					container.addClass('success')
				})
				.catch(e => {
					console.log(e)
					// forceSubmit()
				})
		}, 2800)
	}

	form.on('submit', handleSubmit)
}

const init = () => {
	const forms = $('.ajax-form')

	forms.map((index, element) => {
		ajaxifyMailer(element)
	})
}

export default init
