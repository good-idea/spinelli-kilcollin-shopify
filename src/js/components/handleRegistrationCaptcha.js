import $ from 'jquery'

const handleCaptcha = () => {
	const form = $('form#create_customer')
	const inputs = form.find('input')
	console.log(inputs)
	debugger
}

window.handleRegistrationCaptcha = handleCaptcha
