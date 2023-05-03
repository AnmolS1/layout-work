import styled from 'styled-components/macro';

const StyledGenerator = styled.main`
	padding-top: 0;

	#linker {
		display: flex;
		align-items: flex-end;
		text-transform: uppercase;
		color: var(--light-grey);
		font-size: var(--fz-xxl);
		font-weight: 700;
		letter-spacing: 0.1em;
		margin: var(--spacing-xl);
	}
	
	#button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	button {
		display: block;
		margin-bottom: var(--spacing-xs);
		font-size: var(--fz-xl);
		width: 100%;
		max-width: 1000px;
		height: 50px;
		
		border-radius: 0;
		background-color: var(--blue-90);
		
		&:hover, &:focus {
			filter: brightness(1.1);
		}
	}
	
	#table-container {
		display: flex;
		justify-content: center;
	}
	
	table {
		width: 100%;
		max-width: 1000px;
		border-collapse: collapse;
		
		margin-top: var(--spacing-md);
		
		thead {
			background-color: var(--warm-gray-90);
			height: 40px;
		}
		
		th, td {
			width: 33%;
			text-align: center;
			vertical-align: middle;
		}
		
		th {
			font-size: var(--fz-xl);
		}
		
		td {
			height: 40px;
			
			input, select {
				font-size: var(--fz-lg);
				width: 100%;
				height: 100%;
			}
			
			input {
				background: transparent;
				border: none;
				color: var(--white);
				padding: var(--spacing-md) var(--spacing-lg);
			}
			
			select {
				background: transparent;
				border: none;
				color: var(--white);
			}
		}
	}
`;

export default StyledGenerator;