import $ from 'jquery'

const form = $('form#create_customer')
const isBotField = form.find('.form__is-bot-field')
const inputs = form.find('input')

let verified = false

const handleCaptcha = () => {
	isBotField.remove()
	for (const input of inputs) {
		const name = input.getAttribute('name').replace(/unverified-(.*)/, '$1')
		input.setAttribute('name', name)
	}
	$('#g-recaptcha-response').remove()
	verified = true
	form.submit()
}

form.on('submit', e => {
	console.log('submit?')
	if (!verified) e.preventDefault()
})

window.handleRegistrationCaptcha = handleCaptcha
