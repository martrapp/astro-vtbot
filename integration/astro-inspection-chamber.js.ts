import { readFileSync } from 'node:fs';

const inspectionChamber = readFileSync('node_modules/@vtbag/inspection-chamber/lib/index.js');

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
