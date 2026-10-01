const appRoutes = new Set(["inicio.html", "projetos.html", "cadastro.html"]);

export function initRouter(onRouteRendered) {
	const appDirectory = new URL(".", window.location.href).pathname;
	let activeUrl = new URL(window.location.href);
	const routeStatus = document.createElement("p");
	routeStatus.className = "route-status";
	routeStatus.setAttribute("role", "status");
	routeStatus.setAttribute("aria-live", "polite");
	routeStatus.hidden = true;
	document.querySelector("header").after(routeStatus);

	async function navigate(url, addHistory = true) {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error();

			const page = new DOMParser().parseFromString(await response.text(), "text/html");
			const nextMain = page.querySelector("main");
			const currentMain = document.querySelector("main");
			if (!nextMain || !currentMain) throw new Error();

			const renderedMain = nextMain.cloneNode(true);
			onRouteRendered(renderedMain);
			currentMain.replaceChildren(...renderedMain.childNodes);
			currentMain.querySelector("h1")?.focus();
			document.title = page.title;
			if (addHistory) history.pushState({}, "", url);
			activeUrl = new URL(url.href);
			routeStatus.hidden = true;
			routeStatus.textContent = "";

			document.querySelectorAll("header nav a[href]").forEach((link) => {
				const active = new URL(link.href).pathname === url.pathname;
				link.classList.toggle("ativo", active);
				if (active) link.setAttribute("aria-current", "page");
				else link.removeAttribute("aria-current");
			});
			window.scrollTo(0, 0);
		} catch {
			if (!addHistory) history.replaceState({}, "", activeUrl.href);
			routeStatus.textContent = "Não foi possível carregar esta página. Verifique a conexão e tente novamente.";
			routeStatus.hidden = false;
		}
	}

	document.addEventListener("click", (event) => {
		const link = event.target.closest("a[href]");
		if (
			!link ||
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey ||
			(link.target && link.target !== "_self") ||
			link.hasAttribute("download")
		) {
			return;
		}

		const url = new URL(link.href);
		const routeName = url.pathname.slice(appDirectory.length);
		if (
			url.origin !== window.location.origin ||
			!url.pathname.startsWith(appDirectory) ||
			!appRoutes.has(routeName)
		) {
			return;
		}

		event.preventDefault();
		navigate(url);
	});

	window.addEventListener("popstate", () => navigate(new URL(window.location.href), false));
	document.querySelectorAll("header nav a[href]").forEach((link) => {
		if (new URL(link.href).pathname === window.location.pathname) {
			link.classList.add("ativo");
			link.setAttribute("aria-current", "page");
		}
	});
}
