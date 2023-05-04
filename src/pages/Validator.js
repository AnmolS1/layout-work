import { Link } from 'react-router-dom';
import { StyledValidator } from '../styles';
import { useRef, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import querystring from 'querystring';

const Validator = () => {
	const comparison_tables = useRef(null);
	const file_upload = useRef(null);
	const input_url = useRef(null);
	const upload_button = useRef(null);
	const [api_key, setApiKey] = useState(null);
	const [expected_dict, setExpected] = useState(null);
	const [cookies, setCookie] = useCookies(['user']);
	
	useEffect(() => {
		if (cookies.api_key) {
			setApiKey(cookies.api_key);
		}
	}, [cookies.api_key]);
	
	function upload() {
		file_upload.current.click();
	}
	
	function getJson (event) {
		const uploadedFile = event.target.files[0];
		const fileReader = new FileReader();
		
		fileReader.onloadend = () => {
			try {
				setExpected(JSON.parse(fileReader.result));
			} catch (e) {
				console.error(e);
			}
		};
		
		fileReader.readAsText(uploadedFile);
		upload_button.current.innerHTML = uploadedFile.name;
	}
	
	async function getLayout(layout_url) {
		const pieces = layout_url.split('/');
		const layout_id = pieces[4], env_url = pieces[2];
		
		var response = await axios.get(`/api/get_layout?` +
			querystring.stringify({
				layout_id: layout_id,
				env_url: env_url,
				api_key: api_key
			})
		);
		
		return response.data;
	}
	
	function generate_locations(data) {
		var location = {};
		for (let i = 0; i < Object.keys(data).length; i++) {
			location[data[i].name] = i;
		}
		return location;
	}
	
	async function generateTable() {
		let layout_url = null;
		
		if (input_url.current.value === '') {
			alert('input layout url first');
			return;
		} else {
			layout_url = input_url.current.value;
		}
		
		if (file_upload.current.length === 0) {
			alert('upload expectations first');
			return;
		}
		
		const layout = await getLayout(layout_url);
		
		const expected_dict_location = generate_locations(expected_dict);
		
		const supervision_dict = {
			0: 'Default',
			1: 'Consensus',
			2: 'Autotranscribe',
			3: 'Always'
		};
		
		// generate table here
	}
	
	return (
		<StyledValidator>
			<input ref={file_upload} type='file' onChange={getJson} hidden />
			
			<Link id='linker' to='/'>Back</Link>
			
			<div id="input-container">
				<input ref={input_url} placeholder='enter layout url' />
				<button ref={upload_button} onClick={upload}>upload expectations</button>
				<button onClick={generateTable}>validate layout</button>
			</div>
			
			<div id="table-container" ref={comparison_tables}></div>
		</StyledValidator>
	)
};

export default Validator;