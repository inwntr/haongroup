const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ativa/desativa o menu
  });
}

const sectionsTitles = [
  { id: 'inicio', title: 'Haon Group – Home' },
  { id: 'historia', title: 'Haon Group – History' },
  { id: 'lideranca', title: 'Haon Group – Leadership' },
  { id: 'empresas', title: 'Haon Group – Companies' },
  { id: 'visao', title: 'Haon Group – Vision' }
];

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const sections = document.querySelectorAll('.section, .hero-content, .card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.animation = 'fadeInUp 1s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

const observerTitle = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const current = sectionsTitles.find(s => s.id === entry.target.id);
      if (current) {
        document.title = current.title;
      }
    }
  });
}, { threshold: 0.5 })

sectionsTitles.forEach(s => {
  const sec = document.getElementById(s.id);
  if (sec) observerTitle.observe(sec);
});

const menuLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("portfolioGrid");
  const filtros = document.querySelectorAll(".filtro");

  if (grid) {
    try {
      const res = await fetch("/projetos.json");
      const projetos = await res.json();

      function renderizar(categoria = "todos") {
        grid.innerHTML = "";
        const filtrados = categoria === "todos"
          ? projetos
          : projetos.filter(p => p.categoria === categoria);

        filtrados.forEach((p, index) => {
          const card = document.createElement("div");
          card.classList.add("projeto-card");
          card.style.animationDelay = `${index * 0.2}s`;
          card.innerHTML = `
            <img src="${p.imagem}" alt="${p.titulo}">
            <div class="projeto-info">
              <h3>${p.titulo}</h3>
              <p>${p.descricao}</p>
              <a href="${p.link}" target="_blank">Ver Projeto ↗</a>
            </div>
          `;
          grid.appendChild(card);

          // efeito de brilho dentro do render
          card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
          });
          card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', `50%`);
            card.style.setProperty('--y', `50%`);
          });
        });
      }

      renderizar();

      filtros.forEach(btn => {
        btn.addEventListener("click", () => {
          filtros.forEach(f => f.classList.remove("ativo"));
          btn.classList.add("ativo");
          renderizar(btn.dataset.cat);
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

    } catch (err) {
      grid.innerHTML = "<p>Erro ao carregar portfólio 😢</p>";
    }
  }
});

const logo = document.querySelector('.logo-img')
logo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  hero.style.backgroundPositionY = `${scroll * 0.3}px`;
});

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  card.classList.add('animate');
});

document.querySelectorAll('.projeto-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
  });
});

//* API para puxar icons dos CEO & CTO. 
async function loadDiscordUser(userId, avatarElId, nameElId) {
  try {
    const response = await fetch(`https://haon-api.vercel.app/api/v1/haon/${userId}`, {
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await response.json();

    const avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256`;

    document.getElementById(avatarElId).src = avatar;
    document.getElementById(nameElId).textContent = data.global_name || data.username;
  } catch (err) {
    console.error(err);
  }
}

// CEO
loadDiscordUser("504786925085917229", "ceo-avatar", "ceo-name");

// CTO
loadDiscordUser("1119661939002458193", "cto-avatar", "cto-name");

const translations = {
  en: {
    pageTitle: "Haon Group",

    navHome: "Home",
    navAuthority: "Technology Group",
    navBuild: "What We Build",
    navAbout: "About",
    navHistory: "History",
    navLeadership: "Leadership",
    navCompanies: "Companies",
    navVision: "Vision",

    heroBase: "A technology group focused on long-term digital infrastructure.",
    heroTitle: "Building companies, systems, and technology for the next generation.",
    heroText: `<strong>Haon Group</strong> builds digital companies, scalable systems, and long-term infrastructure.`,
    heroBtn: "Explore the Group",

    aboutTitle: "About Haon Group",
    aboutText1: `<strong>Haon Group</strong> was created to structure and expand technology-driven companies with clarity, consistency, and long-term direction.`,
    aboutText2: `Through its ecosystem, the group brings together strategic vision, technical execution, and product development to support solutions built for growth, relevance, and real-world impact.`,

    historyTitle: "Our Foundation",
    historyText: `<strong>Haon Group</strong> was established as the foundation for a long-term technology structure built to create, support, and scale modern digital ventures.`,

    leadershipTitle: "Executive Leadership",
    ceoText: `<strong><span class="ceoclass">Chief Executive Officer</span></strong><br><br>Leads strategic direction, long-term vision, and organizational growth across the group.`,
    ctoText: `<strong><span class="ctoclass">Chief Technology Officer</span></strong><br><br>Oversees technology, systems architecture, and technical execution across all operations.`,

    companiesTitle: "Group Structure",
    haonTechText: "Software engineering, digital systems, web infrastructure, and product development.",
    haonSystemsText: "Infrastructure, technical operations, and systems architecture.",
    haonLabsText: "Research, automation, and emerging technology development.",
    visit: "Visit",

    visionTitle: "Our Vision",
    visionText: `<strong>Haon Group</strong> is built to become a global technology ecosystem focused on developing companies, systems, and infrastructure with long-term strategic value.`,

    footerBrand: `<strong>Haon Group</strong> builds companies, systems, and digital infrastructure designed for long-term relevance.`,
    footerStructure: "Structure",
    footerNavigation: "Navigation",
    footerContact: "Contact",
    footerRights: "Haon Group © 2026 — All rights reserved.",

    authorityOneTitle: "Technology Group",
    authorityOneText: "Built to create and scale digital companies.",
    authorityTwoTitle: "Long-Term Vision",
    authorityTwoText: "Focused on sustainable growth and lasting value.",
    authorityThreeTitle: "Digital Infrastructure",
    authorityThreeText: "Systems, platforms, and products designed for the future.",

    buildTitle: "What We Build",
    buildText: `We build digital companies, scalable systems, and modern infrastructure designed for long-term relevance.

Our focus is centered on creating products, platforms, and technological structures that combine engineering, execution, and strategic vision.`,
  },

  pt: {
    pageTitle: "Haon Group",

    navHome: "Início",
    navAuthority: "Grupo de Tecnologia",
    navBuild: "O Que Construímos",
    navAbout: "Sobre",
    navHistory: "História",
    navLeadership: "Liderança",
    navCompanies: "Empresas",
    navVision: "Visão",

    heroBase: "Um grupo tecnológico focado em infraestrutura digital de longo prazo.",
    heroTitle: "Construindo empresas, sistemas e tecnologia para a próxima geração.",
    heroText: `<strong>Haon Group</strong> Constrói empresas digitais, sistemas escaláveis ​​e infraestrutura de longo prazo.`,
    heroBtn: "Conheça o Grupo",

    aboutTitle: "Sobre o Haon Group",
    aboutText1: `O <strong>Haon Group</strong> foi criado para estruturar e expandir empresas orientadas por tecnologia, com clareza, consistência e direção de longo prazo.`,
    aboutText2: `Por meio de seu ecossistema, o grupo reúne visão estratégica, execução técnica e desenvolvimento de produtos para sustentar soluções criadas para crescimento, relevância e impacto real.`,

    historyTitle: "Nossa Base",
    historyText: `O <strong>Haon Group</strong> foi estabelecido como a base de uma estrutura tecnológica de longo prazo, criada para desenvolver, sustentar e escalar iniciativas digitais modernas.`,

    leadershipTitle: "Liderança Executiva",
    ceoText: `<strong><span class="ceoclass">Diretor Executivo</span></strong><br><br>Lidera a direção estratégica, a visão de longo prazo e o crescimento organizacional do grupo.`,
    ctoText: `<strong><span class="ctoclass">Diretor de Tecnologia</span></strong><br><br>Supervisiona tecnologia, arquitetura de sistemas e execução técnica em toda a operação.`,

    companiesTitle: "Estrutura do Grupo",
    haonTechText: "Engenharia de software, sistemas digitais, infraestrutura web e desenvolvimento de produtos.",
    haonSystemsText: "Infraestrutura, operações técnicas e arquitetura de sistemas.",
    haonLabsText: "Pesquisa, automação e desenvolvimento de tecnologias emergentes.",
    visit: "Visitar",

    visionTitle: "Nossa Visão",
    visionText: `O <strong>Haon Group</strong> foi construído para se tornar um ecossistema global de tecnologia focado no desenvolvimento de empresas, sistemas e infraestrutura com valor estratégico de longo prazo.`,

    footerBrand: `<strong>Haon Group</strong> constrói empresas, sistemas e infraestrutura digital projetadas para relevância de longo prazo.`,
    footerStructure: "Estrutura",
    footerNavigation: "Navegação",
    footerContact: "Contato",
    footerRights: "Haon Group © 2026 — Todos os direitos reservados.",

    authorityOneTitle: "Grupo de Tecnologia",
    authorityOneText: "Criado para desenvolver e escalar empresas digitais.",
    authorityTwoTitle: "Visão de Longo Prazo",
    authorityTwoText: "Focado em crescimento sustentável e valor duradouro.",
    authorityThreeTitle: "Infraestrutura Digital",
    authorityThreeText: "Sistemas, plataformas e produtos projetados para o futuro.",

    buildTitle: "O Que Construímos",
    buildText: `Construímos empresas digitais, sistemas escaláveis e infraestrutura moderna projetada para relevância de longo prazo.

Nosso foco está na criação de produtos, plataformas e estruturas tecnológicas que unem engenharia, execução e visão estratégica.`,

    companiesTitle: "Estrutura do Grupo",
    haonTechText: "Engenharia de software, sistemas digitais, infraestrutura web e desenvolvimento de produtos.",
    haonSystemsText: "Infraestrutura, operações técnicas e arquitetura de sistemas.",
    haonLabsText: "Pesquisa, automação e desenvolvimento de tecnologias emergentes.",
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-US";
  document.title = translations[lang].pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  const langMenu = document.getElementById("langMenu");
  if (langMenu) langMenu.style.display = "none";
}

const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

if (langBtn && langMenu) {
  langBtn.addEventListener("click", () => {
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lang-dropdown")) {
      langMenu.style.display = "none";
    }
  });
}

setLanguage(localStorage.getItem("lang") || "en");
