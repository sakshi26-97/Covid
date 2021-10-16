import _covid from 'covid-core/src/index';

const covid: any = _covid;

covid.config.backendAPI = '/api/v1/covid';

export default function getCore(): any {
	return covid;
}
