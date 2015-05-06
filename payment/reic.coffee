
if Meteor.isClient

	Template.info.helpers

	
	Template.signup.events
		"click button#email-submit": ->
			event.preventDefault();

			if(! document.getElementById("user-signup").checkValidity())
				return

			firstName = $("#user-first-name").val()
			lastName = $("#user-last-name").val()
			userName = firstName + '|' + lastName
			userEmail = $("#user-email").val()
			chargeAmount = 1000

			StripeCheckout.open(
				key: 'pk_test_G6F7bXvkbxt9kERSp4UXAw4Y'
				amount: chargeAmount
				email: userEmail
				name: 'REIC MEMBERSHIP'
				description: 'YOUR NAME: ' + userName.replace("|", " ")
				panelLabel: 'JOIN:'
				zipCode: true
				token: (res) ->
					Meteor.call('chargeCard', res.id, res.email, userName, chargeAmount)
					# yay success
					$("#user-signup").fadeOut(500)
					$("#user-signup-success").fadeIn(500)

			)
			return

	Meteor.startup ->

if Meteor.isServer
	Meteor.methods(
		'chargeCard': (stripeToken, email, userName, chargeAmount) ->
			Stripe = StripeAPI(Meteor.settings.stripe_sk)
			Stripe.customers.create({
				source: stripeToken
				description: userName
				email: email
			})
				.then (customer) ->
					#console.log customer
					return Stripe.charges.create(
						amount: chargeAmount
						currency: 'usd'
						customer: customer.id
					)
				.then (charge) ->
					#saveStripeCustomerId
					#console.log charge
					#console.log email

	)

	Meteor.startup ->


