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
  window.location.href = '/'
})

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
