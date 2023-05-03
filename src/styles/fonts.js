import { css } from 'styled-components/macro';

const public_url = process.env.PUBLIC_URL;

const fonts = css`
	@font-face {
		font-family: 'Plex Bold';
		src: url('${public_url}/fonts/IBMPlexSans-Bold.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Bold Italic';
		src: url('${public_url}/fonts/IBMPlexSans-BoldItalic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Extra Light';
		src: url('${public_url}/fonts/IBMPlexSans-ExtraLight.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Extra Light Italic';
		src: url('${public_url}/fonts/IBMPlexSans-ExtraLightItalic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Italic';
		src: url('${public_url}/fonts/IBMPlexSans-Italic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Light';
		src: url('${public_url}/fonts/IBMPlexSans-Light.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Light Italic';
		src: url('${public_url}/fonts/IBMPlexSans-LightItalic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Medium';
		src: url('${public_url}/fonts/IBMPlexSans-Medium.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Medium Italic';
		src: url('${public_url}/fonts/IBMPlexSans-MediumItalic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex';
		src: url('${public_url}/fonts/IBMPlexSans-Regular.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex SemiBold';
		src: url('${public_url}/fonts/IBMPlexSans-SemiBold.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex SemiBold Italic';
		src: url('${public_url}/fonts/IBMPlexSans-SemiBoldItalic.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Thin';
		src: url('${public_url}/fonts/IBMPlexSans-Thin.ttf') format('truetype');
	}
	
	@font-face {
		font-family: 'Plex Thin Italic';
		src: url('${public_url}/fonts/IBMPlexSans-ThinItalic.ttf') format('truetype');
	}
`;

export default fonts;