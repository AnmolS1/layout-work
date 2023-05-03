import { Link } from 'react-router-dom';
import { StyledValidator } from '../styles';
import { useRef, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const Validator = () => {
	const comparison_tables = useRef(null);
	const file_upload = useRef(null);
	const input_url = useRef(null);
	const upload_button = useRef(null);
	const [api_key, setApiKey] = useState(null);
	const [cookies, setCookie] = useCookies(['user']);
	
	useEffect(() => {
		if (cookies.api_key) {
			setApiKey(cookies.api_key);
		}
	}, [cookies.api_key]);
	
	function upload() {
		file_upload.current.click();
		
		file_upload.current.onchange = () => {
			upload_button.current.innerHTML = file_upload.current.files[0].name;
		};
	}
	
	async function getJson(file) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			
			fileReader.onload = event => resolve(JSON.parse(event.target.result));
			fileReader.onerror = error => reject(error);
			
			fileReader.readAsText(file);
		});
	}
	
	async function getLayout(layout_url) {
		const pieces = layout_url.split('/');
		
		const layout_id = pieces[4], env_url = pieces[2];
		
		const call = async() => {
			const response = await fetch('https:/' + env_url + '/api/v5/layouts/' + layout_id, {
				method: 'GET',
				crossorigin: true,
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'Token ' + api_key
				}
			});
			const layout = await response.json();
			return layout
		};
		
		return await call();
	}
	
	async function validate() {
		let layout_url = null, expected = null;
		
		if (input_url.current.value === '') {
			alert('input layout url first');
			return;
		} else {
			layout_url = input_url.current.value;
		}
		
		if (file_upload.current.length === 0) {
			alert('upload expectations first');
			return;
		} else {
			expected = await getJson(file_upload.current.files[0]);
		}
		
		const layout = await getLayout(layout_url);
		
		console.log(layout);
	}
	
	return (
		<StyledValidator>
			<input ref={file_upload} type='file' hidden />
			
			<Link id='linker' to='/'>Back</Link>
			
			<div id="input-container">
				<input ref={input_url} placeholder='enter layout url' />
				<button ref={upload_button} onClick={upload}>upload expectations</button>
				<button onClick={validate}>validate layout</button>
			</div>
			
			<div id="table-container" ref={comparison_tables}></div>
		</StyledValidator>
	)
};

export default Validator;