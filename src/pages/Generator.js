import { Link } from 'react-router-dom';
import { StyledGenerator } from '../styles';
import { useRef, useState } from 'react';

const Generator = () => {
	const jsonTableBody = useRef(null);
	const [rowNum, setRow] = useState(0);
	
	const addRow = () => {
		setRow(rowNum + 1);
		
		var row = jsonTableBody.current.insertRow(-1);
		
		if (rowNum % 2 === 1)
			row.style = "background-color: var(--warm-gray-50)";
		
		row.insertCell(0).innerHTML = `<input placeholder="Field ID"></input>`;
		
		row.insertCell(1).innerHTML = `
		<select>
			<option value="Generic Text">Generic Text</option>
			<option value="Signature">Signature</option>
			<option value="Checkbox">Checkbox</option>
			<option value="AlphaNumeric">AlphaNumeric</option>
			<option value="Address">Address</option>
			<option value="AlphaNumeric Symbols">AlphaNumeric Symbols</option>
			<option value="AlphaNumeric Symbols Rev">AlphaNumeric Symbols Rev</option>
			<option value="Currency - X,XXX.XX">Currency - X,XXX.XX</option>
			<option value="Date - MMDDYYYY">Date - MMDDYYYY</option>
			<option value="Email Address">Email Address</option>
			<option value="Freeform Characters">Freeform Characters</option>
			<option value="Name">Name</option>
			<option value="Numeric Text">Numeric Text</option>
			<option value="Phone Number">Phone Number</option>
			<option value="Signature">Signature</option>
			<option value="SSN/EIN/TIN">SSN/EIN/TIN</option>
			<option value="US State">US State</option>
			<option value="US Zip Code">US Zip Code</option>
		</select>
		`;
		
		row.insertCell(2).innerHTML = `
		<select>
			<option value="Autotranscribe">Autotranscribe</option>
			<option value="Default">Default</option>
			<option value="Always">Always</option>
			<option value="Consensus">Consensus</option>
		</select>
		`;
	};
	
	function downloadJson() {
		const table = jsonTableBody.current;
		
		if (table.rows.length === 0) {
			alert('there are no entered fields');
			return;
		}
		
		let fields = [];
		for (let i = 0; i < table.rows.length; i++) {
			const curr_row = {
				"name": table.rows[i].cells[0].firstElementChild.value,
				"type": table.rows[i].cells[1].firstElementChild.value,
				"supervision": table.rows[i].cells[2].firstElementChild.value
			}
			fields.push(curr_row);
		}
		
		const json_output = JSON.stringify(fields, null, 4);
		
		let link = document.createElement('a');
		link.href = `data:text/json;charset=utf-8,${encodeURIComponent(json_output)}`;
		link.download = 'dictionary.json';
		link.click();
		link.remove();
	}
	
	return (
		<StyledGenerator>
			<Link to='/' id='linker'>Back</Link>
			
			<div id="button-container">
				<button onClick={addRow}>add new field</button>
				<button onClick={downloadJson}>download json</button>
			</div>
			
			<div id="table-container">
				<table>
					<thead>
						<tr>
							<th>Field ID</th>
							<th>Data Type</th>
							<th>Supervision</th>
						</tr>
					</thead>
					
					<tbody ref={jsonTableBody}></tbody>
				</table>
			</div>
		</StyledGenerator>
	)
};

export default Generator;