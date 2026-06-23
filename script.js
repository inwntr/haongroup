const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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

loadDiscordUser("504786925085917229", "ceo-avatar", "ceo-name");
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
  },

    kr: {
    pageTitle: "하온그룹",

    navHome: "시작",
    navAuthority: "기술 그룹",
    navBuild: "우리가 만든 것",
    navAbout: "~에",
    navHistory: "역사",
    navLeadership: "지도",
    navCompanies: "회사",
    navVision: "비전",

    heroBase: "장기적인 디지털 인프라 구축에 집중하는 기술 그룹.",
    heroTitle: "차세대 기업, 시스템 및 기술을 구축합니다.",
    heroText: `<strong>하온그룹</strong> 이 회사는 디지털 비즈니스, 확장 가능한 시스템 및 장기적인 인프라를 구축합니다.`,
    heroBtn: "그룹을 만나보세요",

    aboutTitle: "에 대한 하온그룹",
    aboutText1: `그만큼 <strong>하온그룹</strong> 이는 기술 중심 기업을 명확성, 일관성 및 장기적인 방향성을 가지고 구조화하고 확장하기 위해 만들어졌습니다.`,
    aboutText2: `그룹은 자체 생태계를 통해 전략적 비전, 기술적 실행력, 제품 개발을 결합하여 성장, 관련성 및 실질적인 영향력을 위한 솔루션을 지원합니다.`,

    historyTitle: "우리의 기지",
    historyText: `그만큼 <strong>하온그룹</strong> 이는 현대 디지털 사업을 개발, 유지 및 확장하기 위해 만들어진 장기적인 기술 프레임워크의 기반으로 설립되었습니다.`,

    leadershipTitle: "경영진 리더십",
    ceoText: `<strong><span class="ceoclass">전무이사</span></strong><br><br>그룹의 전략적 방향, 장기 비전 및 조직 성장을 주도합니다.`,
    ctoText: `<strong><span class="ctoclass">기술 이사</span></strong><br><br>전체 운영 과정에서 기술, 시스템 아키텍처 및 기술 실행을 감독합니다.`,

    companiesTitle: "그룹 구조",
    haonTechText: "소프트웨어 엔지니어링, 디지털 시스템, 웹 인프라 및 제품 개발.",
    haonSystemsText: "인프라, 기술 운영 및 시스템 아키텍처.",
    haonLabsText: "신기술 연구, 자동화 및 개발.",
    visit: "방문하다",

    visionTitle: "우리의 비전",
    visionText: `그만큼 <strong>하온그룹</strong> 이곳은 장기적인 전략적 가치를 지닌 비즈니스, 시스템 및 인프라 개발에 중점을 둔 글로벌 기술 생태계로 구축되었습니다.`,

    footerBrand: `<strong>하온그룹</strong> 이 회사는 장기적인 관련성을 고려하여 설계된 기업, 시스템 및 디지털 인프라를 구축합니다.`,
    footerStructure: "구조",
    footerNavigation: "항해",
    footerContact: "연락하다",
    footerRights: "하온그룹 © 2026 — 모든 권리 보유.",

    authorityOneTitle: "기술그룹",
    authorityOneText: "디지털 비즈니스를 개발하고 확장하기 위해 만들어졌습니다.",
    authorityTwoTitle: "장기 비전",
    authorityTwoText: "지속 가능한 성장과 지속적인 가치에 중점을 둡니다.",
    authorityThreeTitle: "디지털 인프라",
    authorityThreeText: "미래를 위한 시스템, 플랫폼 및 제품들.",

    buildTitle: "우리가 만든 것",
    buildText: `우리는 장기적인 관련성을 고려하여 설계된 디지털 비즈니스, 확장 가능한 시스템 및 현대적인 인프라를 구축합니다.

저희는 엔지니어링, 실행력, 전략적 비전을 결합한 제품, 플랫폼 및 기술 프레임워크를 개발하는 데 집중하고 있습니다.`,

    companiesTitle: "그룹 구조",
    haonTechText: "소프트웨어 엔지니어링, 디지털 시스템, 웹 인프라 및 제품 개발.",
    haonSystemsText: "인프라, 기술 운영 및 시스템 아키텍처.",
    haonLabsText: "신기술 연구, 자동화 및 개발.",
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "ko-KR";
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

setLanguage(localStorage.getItem("lang") || "en" || "pt" || "kr");
