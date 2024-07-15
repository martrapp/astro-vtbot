import { defineToolbarApp } from 'astro/toolbar';
//@ts-expect-error
import icon from "../assets/bag-of-tricks.svg?raw";
//@ts-expect-error
import imgSrc from '../assets/chamber.png';

const DTB_TOKEN = 'vtbot-inspection-chamber';
const VTBAG_REOPEN = '#vtbag-ui-reopen';

export default defineToolbarApp({
	init(canvas, app) {

		createVtbotWindow();
		document.addEventListener('astro:after-swap', createVtbotWindow);

		app.addEventListener('placement-updated', (evt) => {
			const windowElement = canvas.querySelector('astro-dev-toolbar-window');
			windowElement && (windowElement.placement = evt instanceof CustomEvent && evt.detail.placement);
		});

		function createVtbotWindow() {
			const astroWindow = document.createElement('astro-dev-toolbar-window');
			astroWindow.insertAdjacentHTML('beforeend', `
<div>
	<astro-dev-toolbar-icon class="logo">${icon}</astro-dev-toolbar-icon>
	<h1>The Bag of Tricks for Astro's View Transitions</h1>
	<p>The Bag of Tricks offers components to simplify view transitions for you. Plus: Detailed information about Astro's view transitions and the View Transition API in general.</p>
	<p>Visit <a href="https://events-3bg.pages.dev">The Bag's Website</a> and <a href="https://github.com/martrapp/astro-vtbot">star the Github project</a> to support this work.</p>
	<h2>!!! New !!! The Inspection Chamber</h2>
	<img style="float:right; border-radius: 50%; border: 8px dashed #8888;
		mask-image: radial-gradient(ellipse at center, white 35%, transparent 71%);"
	src=${imgSrc.src} alt="reopen the inspection chamber" />
	<p>Examine every detail of your view transitions! Put them through their paces! Step through the individual frames and discover precisely how the elements morph.</p>
	<p><span id="inspection-chamber-status">The Bag is cool</span><astro-dev-toolbar-button id="inspection-chamber-button">I love the Bag of Tricks!</astro-dev-toolbar-button></p>
	<style>
		a {
			color: white;
		}
		astro-dev-toolbar-button {
			width: 20ex;
		}
		astro-dev-toolbar-icon {
			width: 1rem;
				height: 1rem;
				display: inline-block;
			}
			.logo {
				width: 3.3rem;
				height: auto;
				margin-right: 0.25rem;
				transform: translateY(0.4rem);
				float: left;
				display:block;
				vertical-align: top;
			}
			h1 {
				font-size: 1.3rem;
			}
			h2 {
				font-size: 1.2rem;
			}
		}
	</style>
`);
			canvas.append(astroWindow);

		}
		app.onToggled((options) => {
			if (options.state) {

				const me = document.querySelector('astro-dev-toolbar')!
					.shadowRoot!.querySelector('astro-dev-toolbar-app-canvas[data-app-id="vtbot"]')!
					.shadowRoot!;
				const status = me.querySelector<HTMLSpanElement>('#inspection-chamber-status')!;
				const button = me.querySelector('#inspection-chamber-button')!;

				if (top!.document.querySelector(VTBAG_REOPEN)) {
					status.textContent = 'The Inspection Chamber is currently in standby mode.';
					button.textContent = 'Reactivate the Inspection Chamber';
					button.addEventListener('click', () => {
						top!.sessionStorage.removeItem('vtbag-ui-closed');
						top!.location.reload();
					});
				} else if (top!.document.querySelector('body > #vtbag-main-frame')
					&& top!.sessionStorage.getItem(DTB_TOKEN) !== 'true') {
					status.innerHTML = 'Chamber was activated by <code><InspectionChamber /></code> component.';
					button.textContent = 'Switch to standby mode';
					button.addEventListener('click', () => {
						top!.sessionStorage.setItem('vtbag-ui-closed', 'true');
						top!.location.reload();
					});
				} else if (top!.sessionStorage.getItem(DTB_TOKEN) === 'true') {
					status.textContent = 'The Inspection was summoned via the Dev Toolbar.';
					button.textContent = 'Remove the Inspection Chamber';

					button.addEventListener('click', () => {
						top!.sessionStorage.removeItem(DTB_TOKEN);
						top!.location.reload();
					});
				} else {
					status.textContent = 'There is an Inspection Chamber here.';
					button.textContent = 'Use Inspection Chamber';
					button.addEventListener('click', () => {
						top!.sessionStorage.removeItem('vtbag-ui-closed');
						top!.sessionStorage.setItem(DTB_TOKEN, 'true');
						top!.location.reload();
					});
				}
			}
		});
	}
});
