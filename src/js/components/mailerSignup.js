import $ from 'npm-zepto'
import axios from 'axios'
// import Cookies from 'js-cookie'

const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,})$/

window.$ = $

const ajaxifyMailer = inputContainer => {
	const container =
		inputContainer instanceof $ ? inputContainer : $(inputContainer)
	const form = container.find('form.signup__form')
	const input = form.find('input[name="EMAIL"]')
	const errors = container.find('.signup__errors')

	console.log(input)

	const forceSubmit = () => {
		form.off('submit')
		form.submit()
	}

	const handleSubmit = e => {
		e.preventDefault()
		const email = input.val()
		if (!emailRegex.test(email)) {
			errors.text('Please enter a valid email address')
			return
		}
		errors.text('')
		container.addClass('thinking')
		setTimeout(() => {
			axios
				.post('https://ms.good-idea.studio/mailchimp/subscribe', {
					email,
					listName: 'spk',
				})
				.then(response => {
					if (response.status !== 200) {
						forceSubmit()
						return
					}
					container.addClass('success')
				})
				.catch(() => {
					forceSubmit()
				})
		}, 2800)
	}

	form.on('submit', handleSubmit)
}

const forms = $('.signup')

forms.map((index, element) => {
	ajaxifyMailer(element)
})
