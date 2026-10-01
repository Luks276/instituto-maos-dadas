import { initRouter } from "./modules/router.js";
import { renderProjects } from "./modules/projects.js";
import { initSignupForm, renderSignupHistory } from "./modules/signup.js";

function renderPage(root = document) {
	renderProjects(root);
	renderSignupHistory(root);
}

initRouter(renderPage);
initSignupForm();
renderPage();
