import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GlobalStyle } from './styles';
import { Login, Home, Generator, Validator } from './pages';
import { useCookies } from 'react-cookie';

function ScrollToTop() {
	const { pathname } = useLocation();
	
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	
	return null;
}

function App() {
	const [apiKey, setApiKey] = useState(null);
	const [cookies, setCookie] = useCookies(['user']);
	
	useEffect(() => {
		if (cookies.api_key) {
			setApiKey(cookies.api_key);
		}
	}, [cookies.api_key]);
	
	return (
		<div className="App">
			<GlobalStyle />
			
			{
				!apiKey ? (
					<Login />
				) : (
					<>
						<Router>
							<ScrollToTop />
							<Routes>
								<Route path="/generate-json" element={<Generator />} />
								<Route path="/validate-layout" element={<Validator />} />
								<Route path="/" element={<Home />} />
							</Routes>
						</Router>
					</>
				)
			}
		</div>
	);
}

export default App;