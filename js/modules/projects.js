const projects = [
	{
		category: "Educação",
		title: 'Apoio Escolar "Caminho do Saber"',
		description: "Aulas de reforço escolar gratuitas e acompanhamento pedagógico direcionado para crianças e jovens do ensino fundamental, combatendo ativamente a evasão escolar.",
		audience: "Crianças dos 6 aos 14 anos.",
		frequency: "De segunda a quinta-feira, no contraturno escolar.",
	},
	{
		category: "Tecnologia",
		title: "Informática para o Futuro",
		description: "Oficinas básicas de informática, uso prático de ferramentas de escritório e introdução ao universo digital para preparar os jovens para o mercado de trabalho.",
		audience: "Jovens a partir dos 15 anos.",
		frequency: "Turmas aos sábados pela manhã.",
	},
	{
		category: "Assistência",
		title: "Mãos Unidas pela Alimentação",
		description: "Recolha e distribuição regular de cabazes de alimentos essenciais e produtos de higiene para apoiar famílias em situação de vulnerabilidade social na região.",
		audience: "Famílias cadastradas no programa de assistência.",
		frequency: "Distribuição mensal.",
	},
];

export function renderProjects(root = document) {
	const list = root.querySelector("[data-project-list]");
	const template = root.querySelector("#project-card-template");
	if (!list || !template) return;

	const cards = projects.map((project) => {
		const card = template.content.cloneNode(true);
		card.querySelector("[data-category]").textContent = project.category;
		card.querySelector("[data-title]").textContent = project.title;
		card.querySelector("[data-description]").textContent = project.description;
		card.querySelector("[data-audience]").textContent = project.audience;
		card.querySelector("[data-frequency]").textContent = project.frequency;
		return card;
	});

	list.replaceChildren(...cards);
}
