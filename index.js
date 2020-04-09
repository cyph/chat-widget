import 'material-design-lite';
import {chatBubbleIcon} from './assets/chat_bubble.svg';
import {cyphLogo} from './assets/cyph-logo.png';
import {materialStylesheet} from './assets/material.min.css';

const config = {
	chatButtonText:
		document
			.querySelector('meta[name="cyph-chat-button-text"]')
			?.getAttribute('content') || 'Chat Now',
	description:
		document
			.querySelector('meta[name="cyph-description"]')
			?.getAttribute('content')
			.trim()
			.replace(/\n+/g, '\n') ||
		'You can use this to chat with us using strong quantum-computing-resistant end-to-end encryption.',
	openButtonText:
		document
			.querySelector('meta[name="cyph-open-button-text"]')
			?.getAttribute('content') || 'Chat with Us',
	titleText:
		document
			.querySelector('meta[name="cyph-title-text"]')
			?.getAttribute('content') || 'Secure Chat Line',
	username:
		document
			.querySelector('meta[name="cyph-username"]')
			?.getAttribute('content') || ''
};

/* Set up container */

const root = document.createElement('div');
root.id = 'cyph-chat-widget';

root.style.position = 'fixed';
root.style.bottom = '0';
root.style.right = '0';
root.style.zIndex = '10';

const shadowRoot = root.attachShadow({mode: 'open'});

const container = document.createElement('div');
container.style.fontFamily = 'Helvetica, Arial, sans-serif';

const style = document.createElement('style');
style.innerHTML = materialStylesheet;

shadowRoot.appendChild(container);
shadowRoot.appendChild(style);

/* Button to open widget */

const button = document.createElement('button');
button.id = 'cyph-chat-open';

button.classList.add(
	'mdl-button',
	'mdl-js-button',
	'mdl-button--raised',
	'mdl-js-ripple-effect',
	'mdl-button--colored'
);

const buttonIcon = document.createElement('span');
buttonIcon.innerHTML = chatBubbleIcon;

buttonIcon.style.marginRight = '16px';

const buttonText = document.createElement('span');
buttonText.textContent = config.openButtonText;

button.appendChild(buttonIcon);
button.appendChild(buttonText);

button.style.height = '52px';
button.style.paddingTop = '8px';
button.style.paddingBottom = '8px';
button.style.borderBottomLeftRadius = '0';
button.style.borderBottomRightRadius = '0';
button.style.borderTopRightRadius = '0';

/* Widget content */

const menu = document.createElement('ul');

menu.classList.add(
	'mdl-menu',
	'mdl-menu--top-right',
	'mdl-js-menu',
	'mdl-js-ripple-effect'
);
menu.setAttribute('data-mdl-for', button.id);

menu.style.padding = '0';

const menuTitle = document.createElement('li');

menuTitle.textContent = config.titleText;

menuTitle.style.background = '#444';
menuTitle.style.color = 'white';
menuTitle.style.borderTopLeftRadius = '2px';
menuTitle.style.height = '40px';
menuTitle.style.lineHeight = '40px';
menuTitle.style.fontSize = '16px';
menuTitle.style.textAlign = 'center';
menuTitle.style.fontWeight = 'bold';

const menuDescription = document.createElement('li');

for (const descriptionParagraph of config.description.split('\n')) {
	const p = document.createElement('p');
	p.textContent = descriptionParagraph;
	menuDescription.appendChild(p);
}

menuDescription.style.color = 'rgba(0,0,0,.87)';
menuDescription.style.marginTop = '8px';
menuDescription.style.marginBottom = '16px';
menuDescription.style.width = '320px';
menuDescription.style.height = 'auto';
menuDescription.style.minHeight = '100px';
menuDescription.style.whiteSpace = 'normal';
menuDescription.style.lineHeight = 'unset';

for (const elem of [menuTitle, menuDescription]) {
	elem.classList.add('mdl-menu__item');
	elem.setAttribute('disabled', '');
	elem.style.userSelect = 'unset';
}

const menuButton = document.createElement('li');
menuButton.classList.add('mdl-menu__item');

menuButton.style.textAlign = 'center';
menuButton.style.paddingTop = '8px';
menuButton.style.paddingBottom = '8px';

const menuButtonContent = document.createElement('button');
menuButtonContent.classList.add(
	'mdl-button',
	'mdl-js-button',
	'mdl-button--primary'
);
menuButtonContent.textContent = config.chatButtonText;

menuButtonContent.style.marginTop = '6px';
menuButtonContent.style.pointerEvents = 'none';

menuButton.addEventListener('click', () => {
	if (!config.username) {
		return;
	}

	const a = document.createElement('a');
	a.href = `https://cyph.app/burner/${config.username}/chat-request`;
	a.target = '_blank';
	a.rel = 'noopener';
	a.click();
});

menuButton.appendChild(menuButtonContent);

const menuPoweredBy = document.createElement('li');

menuPoweredBy.style.textAlign = 'center';
menuPoweredBy.style.backgroundColor = '#8b62d9';
menuPoweredBy.style.fontSize = '12px';
menuPoweredBy.style.fontWeight = '300';
menuPoweredBy.style.borderBottomLeftRadius = '2px';

const menuPoweredByContent = document.createElement('a');
menuPoweredByContent.href = 'https://www.cyph.com/why-use-cyph';
menuPoweredByContent.target = '_blank';
menuPoweredByContent.rel = 'noopener';

menuPoweredByContent.style.color = 'white';
menuPoweredByContent.style.textDecoration = 'none';
menuPoweredByContent.style.display = 'block';
menuPoweredByContent.style.width = '100%';

const menuPoweredByContentChild1 = document.createElement('span');
menuPoweredByContentChild1.textContent = 'Powered by';

const menuPoweredByContentChild2 = document.createElement('img');
menuPoweredByContentChild2.alt = 'Cyph';
menuPoweredByContentChild2.src = cyphLogo;

menuPoweredByContentChild2.style.height = '20px';
menuPoweredByContentChild2.style.margin = '0 4px';

const menuPoweredByContentChild3 = document.createElement('span');
menuPoweredByContentChild3.textContent = 'Encrypted Messenger';

menuPoweredByContent.appendChild(menuPoweredByContentChild1);
menuPoweredByContent.appendChild(menuPoweredByContentChild2);
menuPoweredByContent.appendChild(menuPoweredByContentChild3);
menuPoweredBy.appendChild(menuPoweredByContent);

menu.appendChild(menuTitle);
menu.appendChild(menuDescription);
menu.appendChild(menuButton);
menu.appendChild(menuPoweredBy);

/* Add to page */

container.appendChild(button);
container.appendChild(menu);

for (const elem of [
	button,
	menuButtonContent,
	menuButton,
	menuDescription,
	menuTitle,
	menu
]) {
	componentHandler.upgradeElement(elem);
}

document.body.appendChild(root);
