const axios = require('axios')
const aws = require('aws-sdk')

async function fetchLightKey() {
	const { Parameters } = await new aws.SSM()
		.getParameters({
			Names: ['LIGHT_API_KEY'].map((secretName) => process.env[secretName]),
			WithDecryption: true,
		})
		.promise()

	return Parameters[0].Value
}

/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  LIGHT_ID
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
	const { color } = JSON.parse(event.body)
	const LIGHT_API_KEY = await fetchLightKey()
	axios({
		method: 'put',
		url: `https://api.lifx.com/v1/lights/id:${process.env.LIGHT_ID}/state`,
		headers: {
			Authorization: `Bearer ${LIGHT_API_KEY}`,
		},
		data: {
			color,
		},
	})
	const response = {
		statusCode: 200,
		body: JSON.stringify('Hello from Lambda!'),
	}
	return response
}
