/// <reference path="./env.d.ts" />
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';
import signal from "@vtbag/turn-signal?url";
import shaft from "@vtbag/cam-shaft?raw";
import names from "@vtbag/utensil-drawer/declarative-names?url";

export const onRequest = defineRouteMiddleware((context) => {
	const allPages = process.env.vtbagAllPages;
	const declarativeNames = process.env.vtbagDeclarativeNames;
	const directionTypes = process.env.vtbagDirectionTypes;
	const directionAttribute = process.env.vtbagDirectionAttribute;
	const camShaftNames = process.env.vtbagCamShaftNames;
	const data = context.locals.starlightRoute.entry.data;
	const head = data.head ?? [];
	if (!expect(data.renderBlocking, head)) {
		// might be set by remarkEndOfMarkdownId
		expect(process.env.vtbotEndOfContentId, head);
	}
	{
		const attrs = {};
		camShaftNames ?? (attrs["data-view-transition-names"] = camShaftNames);
		head.push({ tag: "script", attrs, content: shaft });
	}
	{
		const attrs = {};
		attrs["src"] = signal;
		(allPages === undefined) || (attrs["data-selector"] = allPages);
		(directionTypes === undefined) || (attrs["data-direction-types"] = directionTypes);
		(directionAttribute === undefined) || (attrs["data-direction-attribute"] = directionAttribute);
		head.push({ tag: "script", attrs });
	}
	{
		const attrs = {};
		attrs["src"] = names;
		attrs["data-vtbag-decl"] = declarativeNames;
		declarativeNames && head.push({ tag: "script", attrs });
	}
});


function expect(id: string | undefined, head: {}[]) {
	if (id) {
		const href = (id.startsWith("#") ? "" : "#") + id;
		head.push({ tag: "link", attrs: { rel: "expect", href, blocking: "render" } });
		return true;
	}
	return false;
}
