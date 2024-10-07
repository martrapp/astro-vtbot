import inspectionChamber from '@vtbag/inspection-chamber/lib/index.js?raw';

export async function GET({ params, request }) {
	return new Response(
		`if (!!top.document.startViewTransition && top.sessionStorage.getItem('vtbot-inspection-chamber') === 'true') {${inspectionChamber}};`,
		{
			status: 200,
			headers: {
				'Content-Type': 'text/javascript',
			},
		}
	);
}
