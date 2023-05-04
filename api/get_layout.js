const _importDynamic = new Function('modulePath', 'return import(modulePath)');

export const fetch = async function (...args) {
	const {default: fetch} = await _importDynamic('node-fetch');
	return fetch(...args);
}

const handler = async (req, res) => {
	const { layout_id, env_url, api_key } = req.query;
	let url=`https://${env_url}/api/v5/layouts/${layout_id}`
	
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Token ' + api_key
			}
		});
		
		if (!response.ok) {
			res.status(response.status).json(response.statusText);
		}
		
		const data = await response.json();
		
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;