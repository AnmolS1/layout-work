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
		
		let url = `https://${env_url}/api/v5/layouts/${layout_id}`;
		const response = await fetch(url, {
			method: 'GET',
			crossorigin: true,
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Authorization': `Token ${api_key}`,
				'Access-Control-Allow-Origin': '*'
			}
		});
		const layout = await response.json();
		
		return layout;
	}
	
	function generate_locations(data) {
		var location = {};
		for (let i = 0; i < Object.keys(data).length; i++) {
			location[data[i].name] = i;
		}
		return location;
	}
	
	async function getFields(layout, layout_url) {
		let fields = [];
		let check_for_existing = {};
		const supervision_dict = {
			0: 'Default',
			1: 'Consensus',
			2: 'Autotranscribe',
			3: 'Always'
		};
		const expected_dict_location = generate_locations(expected_dict);
		
		const variations = layout.layout_version.layout_variations;
		let variation;
		for (let i = 0; i < variations.length; i++) {
			if (!variations[i].origin_version_id) {
				variation = variations[i];
			}
		}
		
		for (let field_index = 0; field_index < variation.layout_fields.length; field_index++) {
			const curr_field = variation.layout_fields[field_index];
			
			if (curr_field.name in expected_dict_location) {
				if (curr_field.name in check_for_existing) {
					fields[check_for_existing[curr_field.name]].amount += 1;
					continue;
				} else {
					check_for_existing[curr_field.name] = fields.length;
				}
				
				const expected_item = expected_dict[expected_dict_location[curr_field.name]];
				let temp = {
					name: curr_field.name, amount: 1,
					data_type: curr_field.data_type_id,
					expected_data_type: expected_item.type,
					data_type_mismatch: false,
					expected_supervision: expected_item.supervision,
					supervision: supervision_dict[curr_field.supervision],
					supervision_mismatch: false,
				};
				
				let url = `https://${layout_url.split('/')[2]}/api/v5/data_types/${temp.data_type}`;
				const response = await fetch(url, {
					method: 'GET', mode: 'cors',
					crossorigin: true, credentials: 'include',
					headers: {
						'Accept': 'application/json',
						'Authorization': `Token ${api_key}`,
						'Access-Control-Allow-Origin': '*',
					}
				});
				var answer = await response.json();
				temp.data_type = answer.name;
				
				temp.supervision_mismatch = temp.expected_supervision !== temp.supervision;
				temp.data_type_mismatch = temp.expected_data_type !== temp.data_type;
				
				fields.push(temp);
			}
		}
		
		return fields;
	}
	
	function createHeader(title) {
		const thead = document.createElement('thead');
		
		const names = ['Field ID', 'Data Type', 'Expected Data Type', 'Supervision', 'Expected Supervision'];
		const numCols = names.length;
		
		const headtr1 = document.createElement('tr');
		const nameCell = document.createElement('th');
		nameCell.className = 'layout-name';
		nameCell.setAttribute('colspan', numCols);
		nameCell.innerHTML = title;
		headtr1.appendChild(nameCell);
		thead.appendChild(headtr1);
		
		const headtr2 = document.createElement('tr');
		headtr2.className = 'head-row';
		
		for (let i = 0; i < numCols; i++) {
			const temp = document.createElement('th');
			temp.innerHTML = names[i];
			headtr2.appendChild(temp);
		}
		thead.appendChild(headtr2);
		
		return thead;
	}
	
	async function createBody(layout, layout_url) {
		const tbody = document.createElement('tbody');
		
		const fields = await getFields(layout, layout_url);
		for (let f_index = 0; f_index < fields.length; f_index++) {
			const row = tbody.insertRow(-1);
			
			if (f_index % 2 === 1) {
				row.style = "background-color: var(--warm-gray-50)";
			}
			
			const curr_field = fields[f_index];
			
			const num = curr_field.amount > 1 ? ` (${curr_field.amount})` : '';
			row.insertCell(0).innerHTML = curr_field.name + num;
			
			const c1 = row.insertCell(1), c2 = row.insertCell(2);
			c1.innerHTML = curr_field.data_type;
			c2.innerHTML = curr_field.expected_data_type;
			if (curr_field.data_type_mismatch) {
				c1.classList.add('wrong', 'wrong-left');
				c2.classList.add('wrong', 'wrong-right');
			}
			
			const c3 = row.insertCell(3), c4 = row.insertCell(4);
			c3.innerHTML = curr_field.supervision;
			c4.innerHTML = curr_field.expected_supervision;
			if (curr_field.supervision_mismatch) {
				c3.classList.add('wrong', 'wrong-left');
				c4.classList.add('wrong', 'wrong-right');
			}
		}
		
		return tbody;
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
		
		const table = document.createElement('table');
		
		table.appendChild(createHeader(layout.name));
		table.appendChild(await createBody(layout, layout_url));
		
		comparison_tables.current.appendChild(table);
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