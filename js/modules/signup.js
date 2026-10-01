import { readSignupHistory, saveSignupHistory } from "./storage.js";

function showFieldError(form, field) {
	const message = field.validity.valueMissing
		? "Este campo é obrigatório."
		: field.validity.typeMismatch
			? "Informe um e-mail válido."
			: "";
	const error = form.querySelector(`[data-error-for="${field.name}"]`);
	if (error) error.textContent = message;

	const relatedFields = field.type === "radio"
		? form.querySelectorAll(`input[name="${field.name}"]`)
		: [field];
	relatedFields.forEach((control) => {
		control.setAttribute("aria-invalid", String(Boolean(message)));
		if (message && error) control.setAttribute("aria-describedby", error.id);
		else control.removeAttribute("aria-describedby");
	});

	return !message;
}

export function renderSignupHistory(root = document) {
	const form = root.matches?.(".formulario-cadastro") ? root : root.querySelector(".formulario-cadastro");
	if (!form) return;

	const history = readSignupHistory();
	const latest = history.at(-1);
	const message = form.querySelector("[data-signup-history]");
	if (!message) return;
	if (!latest) {
		message.textContent = "";
		return;
	}

	const profile = form.querySelector(`input[name="perfil"][value="${latest.profile}"]`);
	if (profile) profile.checked = true;
	const label = latest.profile === "voluntario" ? "Voluntário" : "Beneficiário";
	const date = new Date(latest.savedAt).toLocaleString("pt-BR");
	message.textContent = `Histórico local: ${history.length} cadastro(s) validado(s). Último perfil: ${label}, em ${date}.`;
}

export function initSignupForm() {
	document.addEventListener("input", (event) => {
		const field = event.target;
		if (!field.matches?.(".formulario-cadastro input, .formulario-cadastro select")) return;

		if (field.required || field.value !== "" || field.getAttribute("aria-invalid") === "true") {
			showFieldError(field.form, field);
		}
		field.form.querySelector("[data-form-status]").textContent = "";
	});

	document.addEventListener("submit", (event) => {
		const form = event.target;
		if (!form.matches(".formulario-cadastro")) return;

		event.preventDefault();
		const fields = [...form.querySelectorAll("input, select, textarea")];
		const invalidFields = fields.filter((field) => !showFieldError(form, field));
		const status = form.querySelector("[data-form-status]");
		if (invalidFields.length) {
			status.textContent = "Revise os campos destacados antes de continuar.";
			invalidFields[0].focus();
			return;
		}

		const saved = saveSignupHistory(form.elements.perfil.value);
		renderSignupHistory(form);
		status.textContent = saved
			? "Dados validados e histórico salvo neste navegador. O protótipo não envia o cadastro para um servidor."
			: "Dados validados, mas o navegador não permitiu salvar o histórico. O protótipo não envia o cadastro para um servidor.";
	});
}
