const axios = require('axios').default
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
	const { color } = JSON.parse(event.body)

	const res = await axios({
		method: 'put',
		url: `https://api.lifx.com/v1/lights/id:d073d52e5835/state`,
		headers: {
			Authorization: `Bearer c87cf9ee4f676bcfeece28640a9b204816ce6fa71eb8858de8a40ad6e169048d`,
		},
		data: {
			color,
		},
	})
	return 'all good! 👍🏽'
}
