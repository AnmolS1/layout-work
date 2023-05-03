import styled from 'styled-components/macro';

const StyledHomeContainer = styled.main`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 100vh;
	padding: 0;
`;

const GoTo = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	
	width: 50%;
	height: 100%;
	
	background-color: var(--warm-gray-100);
	
	font-size: var(--fz-xxl);
	
	&:hover, &:focus {
		filter: brightness(1.1);
	}
`;

const Home = () => {
	return (
		<StyledHomeContainer>
			<GoTo href="/generate-json">Generate JSON</GoTo>
			<GoTo href="/validate-layout">Validate Layout</GoTo>
		</StyledHomeContainer>
	)
};

export default Home;