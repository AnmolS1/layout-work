const handler = async (req, res) => {
	console.log('starting here');
	
	const _importDynamic = new Function('modulePath', 'return import(modulePath)');
	
	console.log('declaring import function');
	
	const fetch = async function (...args) {
		const {default: fetch} = await _importDynamic('node-fetch');
		return fetch(...args);
	}
	
	console.log('declared fetch function');
	console.log(fetch);
	
	const { layout_id, env_url, api_key } = req.query;
	let url=`https://${env_url}/api/v5/layouts/${layout_id}`
	
	console.log('variable set up and url check');
	
	try {
		console.log('starting try');
		
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Token ' + api_key
			}
		});
		
		console.log('past response declaration');
		
		if (!response.ok) {
			res.status(response.status).json(response.statusText);
		}
		
		console.log('response was ok');
		
		const data = await response.json();
		
		console.log('got data');
		
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
};

export default handler;