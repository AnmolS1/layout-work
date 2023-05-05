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
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	table {
		width: 100%;
		max-width: 1100px;
		overflow-x: scrollable;
		border-collapse: collapse;
		border-top: 1px solid var(--white);
		border-bottom: 1px solid var(--white);
		
		margin-top: var(--spacing-md);
		
		thead {
			background-color: var(--warm-gray-90);
			height: 40px;
			
			.head-row {
				font-size: var(--fz-md);
			}
			
			tr {
				.layout-name {
					padding: var(--spacing-xs) 0;
					font-size: var(--fz-lg);
					border-bottom: 1px solid var(--white);
				}
				
				th {
					padding: var(--spacing-xxs) 0;
				}
			}
		}
		
		tbody {
			tr {
				.wrong {
					border-top: 1px solid var(--red-60);
					border-bottom: 1px solid var(--red-60);
				}
				
				.wrong-left {
					border-left: 1px solid var(--red-60);
				}
				
				.wrong-right {
					border-right: 1px solid var(--red-60);
				}
				
				td {
					font-size: var(--fz-xs);
					padding: var(--spacing-xxs) var(--spacing-xs);
				}
			}
		}
	}
`;

export default StyledValidator;