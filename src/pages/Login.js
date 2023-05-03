import styled from 'styled-components/macro';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const StyledLoginContainer = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const StyledLoginButton = styled.button`
	display: inline-block;
	background-color: var(--blue-90);
	color: var(--white);
	border-radius: var(--border-radius-pill);
	font-weight: 700;
	font-size: var(--fz-lg);
	padding: var(--spacing-sm) var(--spacing-xl);
	
	&:hover, &:focus {
		background-color: var(--blue-90);
		text-decoration: none;
		filter: brightness(1.1);
	}
`;

const InputAPI = styled.input`
	background-color: var(--warm-gray-20);
	margin-bottom: var(--spacing-xl);
	font-size: var(--fz-xxl);
	width: 50%;
	min-width: 500px;
	height: 50px;
	padding: var(--spacing-sm) var(--spacing-xl);
	
	&:focus {
		outline: none;
	}
	
	&:not(&:placeholder-shown) {
		filter: brightness(1.1);
	}
`;

const Login = () => {
	const [api_key, setApiKey] = useState('');
	const [cookies, setCookie] = useCookies(['user']);
	
	function handleSubmit() {
		if (api_key) {
			setCookie('api_key', api_key, { path: '/' });
			window.location.reload(false);
		} else {
			alert('input your api key');
		}
	}
	
	return (
		<StyledLoginContainer>
			<InputAPI
				value={api_key}
				placeholder='enter api key'
				onChange={(e) => setApiKey(e.target.value)}
			/>
			
			<StyledLoginButton onClick={handleSubmit}>
				log in
			</StyledLoginButton>
		</StyledLoginContainer>
	);
};

export default Login;