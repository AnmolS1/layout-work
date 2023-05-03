import styled from 'styled-components/macro';

const StyledValidator = styled.main`
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
	
	#input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		input, button {
			width: 100%;
			margin-bottom: var(--spacing-xs);
			font-size: var(--fz-xl);
			max-width: 1000px;
			height: 50px;
		}
		
		input {
			background: transparent;
			border: none;
			color: var(--white);
			padding: var(--spacing-md) var(--spacing-lg);
		}
		
		button {
			border-radius: 0;
			background-color: var(--blue-90);
			
			&:hover, &:focus {
				filter: brightness(1.1);
			}
		}
	}
	
	#table-container {
		display: flex;
		justify-content: center;
	}
	
	
`;

export default StyledValidator;

	
// 	border-radius: 0;
// 	background-color: var(--blue-90);
	
// 	&:hover, &:focus {
// 		filter: brightness(1.1);
// 	}