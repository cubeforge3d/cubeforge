/**
 * ============================================================================
 * CONFIGURAÇÃO DA SUA LOJA DE IMPRESSÃO 3D
 * Edite apenas os dados abaixo com o seu WhatsApp e Instagram!
 * ============================================================================
 */
const SITE_CONFIG = {
  // Número oficial do WhatsApp da empresa com DDI (55) + DDD (27) + Número (apenas dígitos)
  whatsappNumber: "5527936183114",

  // Formato legível para exibição e acessibilidade
  whatsappDisplay: "+55 27 93618-3114",

  // Link oficial direto do WhatsApp Business da empresa
  whatsappBusinessLink: "https://wa.me/message/RTGDS4KCBUCHL1",

  // Nome da sua Marca / Negócio
  brandName: "Cube Forge",

  // Seu @ do Instagram (sem o @)
  instagramUser: "cubeforge3d",

  // Mensagem padrão ao clicar no WhatsApp principal (se aplicável)
  defaultWhatsappMsg: "Olá! Vim pelo site Cube Forge e gostaria de encomendar uma peça em 3D.",

  // Mensagem para peça do catálogo (nome e preço são inseridos automaticamente)
  catalogWhatsappMsg: "Olá! Gostei do modelo \"{item}\" ({price}) no site da Cube Forge e gostaria de encomendar.",

  // Mensagem quando o cliente viu uma ideia em outro lugar (Instagram/Pinterest/TikTok)
  customIdeaWhatsappMsg: "Olá! Vi um modelo na internet e gostaria de saber se vocês conseguem imprimir para mim (vou te mandar a foto)."
};

/**
 * ============================================================================
 * CATÁLOGO DE PRODUTOS / PREÇOS
 * Extraído para produtos.json (gerenciável visualmente via Pages CMS)
 * ============================================================================
 */
const FALLBACK_CATALOG_ITEMS = [
  {
    id: 1,
    nome: "Action Figures & Colecionáveis",
    preco: "A partir de R$ 40",
    categoria: "colecionaveis",
    categoriaNome: "Colecionáveis",
    descricao: "Seus personagens favoritos de animes, games e filmes impressos com riqueza de detalhes.",
    imagem: "./assets/img/produtos/item1.jpg",
    icon: "fa-solid fa-dragon",
    disponivel: true
  },
  {
    id: 2,
    nome: "Vaso Geométrico Moderno",
    preco: "R$ 35,00",
    categoria: "decoracao",
    categoriaNome: "Decoração",
    descricao: "Design geométrico moderno e elegante para dar vida à sua mesa, sala ou escritório.",
    imagem: "./assets/img/produtos/item2.jpg",
    icon: "fa-solid fa-seedling",
    disponivel: true
  },
  {
    id: 3,
    nome: "Suporte para Headset & Celular",
    preco: "R$ 45,00",
    categoria: "setup",
    categoriaNome: "Setup & Suportes",
    descricao: "Organize seus fones e smartphone com uma base firme, moderna e ergonômica.",
    imagem: "./assets/img/produtos/item3.jpg",
    icon: "fa-solid fa-headphones",
    disponivel: true
  },
  {
    id: 4,
    nome: "Luminária de Foto (Litofania)",
    preco: "R$ 65,00",
    categoria: "decoracao",
    categoriaNome: "Decoração",
    descricao: "Sua foto de família, pet ou casal esculpida em relevo 3D. A imagem aparece ao acender a luz!",
    imagem: "./assets/img/produtos/item4.jpg",
    icon: "fa-solid fa-lightbulb",
    disponivel: true
  },
  {
    id: 5,
    nome: "Chaveiros Personalizados",
    preco: "R$ 15,00",
    categoria: "personalizados",
    categoriaNome: "Presentes",
    descricao: "Personalize com seu nome, apelido, logotipo ou símbolos de jogos para você ou para presentear.",
    imagem: "./assets/img/produtos/item5.jpg",
    icon: "fa-solid fa-key",
    disponivel: true
  },
  {
    id: 6,
    nome: "Suporte para Controle de Videogame",
    preco: "R$ 39,00",
    categoria: "setup",
    categoriaNome: "Setup & Suportes",
    descricao: "Base temática estilosa para deixar seus controles de PS5, Xbox ou Switch sempre organizados.",
    imagem: "./assets/img/produtos/item6.jpg",
    icon: "fa-solid fa-gamepad",
    disponivel: true
  }
];

let ALL_PRODUCTS = [];
let CATALOG_ITEMS = [];

/**
 * Mapeamento e auxílio de categorias e ícones
 */
function getCategoryLabel(category) {
  const map = {
    colecionaveis: "Colecionáveis",
    decoracao: "Decoração",
    setup: "Setup & Suportes",
    personalizados: "Presentes"
  };
  return map[category] || "Geral";
}

function getCategoryIcon(category) {
  const map = {
    colecionaveis: "fa-solid fa-dragon",
    decoracao: "fa-solid fa-seedling",
    setup: "fa-solid fa-headphones",
    personalizados: "fa-solid fa-gift"
  };
  return map[category] || "fa-solid fa-cube";
}

/**
 * Normaliza os dados vindos de produtos.json ou Pages CMS garantindo
 * compatibilidade total tanto com campos em português quanto em inglês.
 */
function normalizeProduct(raw, index) {
  const category = (raw.categoria || raw.category || "outros").toLowerCase();
  const title = raw.nome || raw.title || "Peça 3D";
  const price = raw.preco || raw.price || "Consulte";
  const desc = raw.descricao || raw.desc || "";
  let image = raw.imagem || raw.image || raw.foto || "";

  // Garante caminhos relativos compatíveis com GitHub Pages (subcaminhos como /cubeforge/)
  if (image && !image.startsWith("http") && !image.startsWith("./") && !image.startsWith("/")) {
    image = "./" + image;
  } else if (image.startsWith("/")) {
    image = "." + image;
  }

  const id = raw.id !== undefined && raw.id !== null ? Number(raw.id) : (index + 1);
  const isAvailable = raw.disponivel !== undefined ? Boolean(raw.disponivel) : (raw.available !== undefined ? Boolean(raw.available) : true);

  return {
    id,
    nome: title,
    title,
    preco: price,
    price,
    numericPrice: parseItemPrice(price),
    categoria: category,
    category,
    categoriaNome: raw.categoriaNome || raw.categoryName || getCategoryLabel(category),
    categoryName: raw.categoriaNome || raw.categoryName || getCategoryLabel(category),
    descricao: desc,
    desc,
    imagem: image,
    image,
    icon: raw.icon || getCategoryIcon(category),
    disponivel: isAvailable
  };
}

// Inicializa previamente com fallback para evitar qualquer tela vazia antes do fetch
ALL_PRODUCTS = FALLBACK_CATALOG_ITEMS.map((item, idx) => normalizeProduct(item, idx));
CATALOG_ITEMS = ALL_PRODUCTS.filter(item => item.disponivel);

/**
 * Busca produtos.json dinamicamente via fetch e atualiza a interface
 */
async function loadProductsData() {
  try {
    const response = await fetch('./produtos.json', { cache: 'no-cache' });
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      ALL_PRODUCTS = data.map((item, idx) => normalizeProduct(item, idx));
      CATALOG_ITEMS = ALL_PRODUCTS.filter(item => item.disponivel);
    }
  } catch (err) {
    console.warn("Aviso: fetch de produtos.json não completou, usando catálogo fallback local:", err);
    if (!CATALOG_ITEMS || CATALOG_ITEMS.length === 0) {
      ALL_PRODUCTS = FALLBACK_CATALOG_ITEMS.map((item, idx) => normalizeProduct(item, idx));
      CATALOG_ITEMS = ALL_PRODUCTS.filter(item => item.disponivel);
    }
  }

  // Renderiza vitrine e showroom com os produtos carregados e disponíveis
  const activeBtn = document.querySelector(".filter-btn.active");
  const currentCategory = activeBtn ? activeBtn.getAttribute("data-category") : "all";
  renderCatalog(currentCategory || "all");
  setupHeroSlider();
}

// ============================================================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupBrandInfo();
  renderCatalog("all");
  setupFilterButtons();
  setupModal();
  setupSmoothScroll();
  setupHeroSlider();
  setupFaqAccordion();
  loadCart();
  setupCartListeners();
  initInteractiveMotion();
  loadProductsData();
});

/**
 * Aplica os dados configurados (WhatsApp, Instagram, Nome) nos links da página
 */
function setupBrandInfo() {
  const { whatsappNumber, whatsappDisplay, whatsappBusinessLink, instagramUser, customIdeaWhatsappMsg } = SITE_CONFIG;

  // Atualizar Textos na Tela
  const brandDisplay = document.getElementById("brand-name-display");
  if (brandDisplay) brandDisplay.innerHTML = '<span class="brand-cube">CUBE</span> <span class="brand-forge">FORGE</span>';

  const footerBrand = document.getElementById("footer-brand-name");
  if (footerBrand) footerBrand.innerHTML = '<span class="brand-cube">Cube</span> <span class="brand-forge">Forge</span>';

  const instaDisplay = document.getElementById("instagram-handle-display");
  if (instaDisplay) instaDisplay.textContent = `@${instagramUser}`;

  const currentYear = document.getElementById("current-year");
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Links do WhatsApp
  const directBusinessUrl = whatsappBusinessLink || `https://wa.me/${whatsappNumber}`;
  const customIdeaWhatsAppUrl = createWhatsappUrl(whatsappNumber, customIdeaWhatsappMsg);

  // Botões de direcionamento direto do WhatsApp da Empresa (apontam para o link oficial)
  const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
  if (heroWhatsappBtn) {
    heroWhatsappBtn.href = directBusinessUrl;
    heroWhatsappBtn.setAttribute("title", `WhatsApp Cube Forge: ${whatsappDisplay}`);
  }

  const desktopWhatsappBtn = document.getElementById("desktop-whatsapp-btn");
  if (desktopWhatsappBtn) {
    desktopWhatsappBtn.href = directBusinessUrl;
    desktopWhatsappBtn.setAttribute("title", `WhatsApp Cube Forge: ${whatsappDisplay}`);
  }

  const navWhatsappBtn = document.getElementById("nav-whatsapp-btn");
  if (navWhatsappBtn) {
    navWhatsappBtn.href = directBusinessUrl;
    navWhatsappBtn.setAttribute("title", `WhatsApp: ${whatsappDisplay}`);
  }

  const floatingWhatsappBtn = document.getElementById("floating-whatsapp-btn");
  if (floatingWhatsappBtn) {
    floatingWhatsappBtn.href = directBusinessUrl;
    floatingWhatsappBtn.setAttribute("title", `Fale com a gente no WhatsApp: ${whatsappDisplay}`);
  }

  const footerWhatsappLink = document.getElementById("footer-whatsapp-link");
  if (footerWhatsappLink) {
    footerWhatsappLink.href = directBusinessUrl;
    footerWhatsappLink.setAttribute("title", `WhatsApp Cube Forge: ${whatsappDisplay}`);
    footerWhatsappLink.setAttribute("aria-label", `WhatsApp: ${whatsappDisplay}`);
  }

  const finalCtaBtn = document.querySelector(".btn-whatsapp-large");
  if (finalCtaBtn) {
    finalCtaBtn.href = directBusinessUrl;
    finalCtaBtn.setAttribute("title", `WhatsApp Cube Forge: ${whatsappDisplay}`);
  }

  // Botão de Ideia Personalizada (Viu na internet? / Orçar no Zap)
  const customIdeaBtn = document.getElementById("custom-idea-whatsapp-btn");
  if (customIdeaBtn) {
    customIdeaBtn.href = customIdeaWhatsAppUrl;
    customIdeaBtn.setAttribute("title", `Orçar pelo WhatsApp: ${whatsappDisplay}`);
  }

  const desktopHeroCustomBtn = document.getElementById("desktop-hero-custom-btn");
  if (desktopHeroCustomBtn) {
    desktopHeroCustomBtn.href = customIdeaWhatsAppUrl;
    desktopHeroCustomBtn.setAttribute("title", `Orçar pelo WhatsApp: ${whatsappDisplay}`);
  }

  // Links do Instagram
  const instagramUrl = `https://instagram.com/${instagramUser}`;
  const heroInstagramBtn = document.getElementById("hero-instagram-btn");
  if (heroInstagramBtn) heroInstagramBtn.href = instagramUrl;

  const desktopInstagramBtn = document.getElementById("desktop-instagram-btn");
  if (desktopInstagramBtn) desktopInstagramBtn.href = instagramUrl;

  const navInstagramLink = document.getElementById("nav-instagram-link");
  if (navInstagramLink) navInstagramLink.href = instagramUrl;

  const footerInstagramLink = document.getElementById("footer-instagram-link");
  if (footerInstagramLink) footerInstagramLink.href = instagramUrl;
}

/**
 * Gera URL segura do WhatsApp
 */
function createWhatsappUrl(number, message) {
  const cleanNumber = (number || SITE_CONFIG.whatsappNumber || "5527936183114").replace(/\D/g, "");
  if (!message || !message.trim()) {
    return SITE_CONFIG.whatsappBusinessLink || `https://wa.me/${cleanNumber}`;
  }
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Renderiza os cards do catálogo na tela com animação dinâmica
 */
function renderCatalog(filterCategory = "all") {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  const filteredItems = filterCategory === "all" 
    ? CATALOG_ITEMS 
    : CATALOG_ITEMS.filter(item => item.category === filterCategory);

  grid.innerHTML = "";

  filteredItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "product-card animate-card";
    card.style.animationDelay = `${index * 0.05}s`;

    // Imagem ou ícone estilizado 3D
    const imageContent = item.image 
      ? `<img src="${item.image}" alt="${item.title}" loading="lazy">` 
      : `<div class="product-art-preview">
          <i class="${item.icon}"></i>
          <span>${item.categoryName}</span>
         </div>`;

    card.innerHTML = `
      <div class="product-img-box" onclick="openProductModal(${item.id})" style="cursor: pointer;" title="Clique para ver detalhes de ${item.title}">
        <span class="product-category-tag">${item.categoryName}</span>
        ${imageContent}
      </div>
      <div class="product-info">
        <div class="product-header-row">
          <h3 class="product-title" onclick="openProductModal(${item.id})" style="cursor: pointer;">${item.title}</h3>
          <span class="product-price-badge">${item.price}</span>
        </div>
        <p class="product-desc">${item.desc}</p>
        <div class="product-actions-group">
          <button class="btn-card-cart" onclick="addToCart(${item.id}, 1, this)" aria-label="Adicionar ${item.title} ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> + Carrinho
          </button>
          <button class="btn-card-direct" onclick="openProductModal(${item.id})" aria-label="Pedir ${item.title} direto no WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Pedir Direto
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Configura as abas de filtro com rolagem dinâmica, centralização e auto-scroll
 */
function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");
  const filterTabsContainer = document.getElementById("filter-tabs-container");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // 1. Centraliza horizontalmente o botão dentro da barra no celular (sem interferir na rolagem vertical)
      if (filterTabsContainer) {
        const btnLeft = btn.offsetLeft;
        const btnWidth = btn.offsetWidth;
        const containerWidth = filterTabsContainer.offsetWidth;
        filterTabsContainer.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: "smooth"
        });
      }

      // 2. Renderiza os itens filtrados
      const category = btn.getAttribute("data-category");
      renderCatalog(category);

      // 3. Rola a página para que os produtos fiquem exatamente no campo de visão
      scrollToCatalogProducts();
    });
  });
}

/**
 * Rola a janela perfeitamente para o topo dos produtos e da barra de filtros
 */
function scrollToCatalogProducts() {
  const catalogSection = document.getElementById("catalogo");
  if (!catalogSection) return;

  const catalogRect = catalogSection.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const sectionHeader = catalogSection.querySelector(".section-header");
  const headerHeight = sectionHeader ? sectionHeader.offsetHeight : 0;
  
  const isDesktop = window.innerWidth >= 768;
  // Posiciona a barra de filtros no topo e os produtos logo abaixo
  const targetY = currentScrollY + catalogRect.top + headerHeight - (isDesktop ? 14 : 0);

  window.scrollTo({
    top: Math.max(0, Math.round(targetY)),
    behavior: "smooth"
  });
}

/**
 * Modal interativo de detalhes e encomenda direta
 */
function setupModal() {
  const modal = document.getElementById("product-modal");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", closeProductModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProductModal();
    }
  });

  // Fecha com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeProductModal();
    }
  });
}

window.closeProductModal = function() {
  const modal = document.getElementById("product-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

/**
 * Abre o modal preenchendo as informações da peça e ações (Carrinho ou Direto)
 */
window.openProductModal = function(productId) {
  const item = CATALOG_ITEMS.find(p => p.id === productId) || ALL_PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body-content");

  // Mensagem customizada para a peça com nome e preço
  const quoteMsg = SITE_CONFIG.catalogWhatsappMsg
    .replace("{item}", item.title)
    .replace("{price}", item.price);
  const whatsappUrl = createWhatsappUrl(SITE_CONFIG.whatsappNumber, quoteMsg);

  // Imagem real ou ícone estilizado
  const modalImageContent = item.image 
    ? `<img src="${item.image}" alt="${item.title}">` 
    : `<div class="product-art-preview">
        <i class="${item.icon}" style="font-size: 3.5rem;"></i>
        <span>${item.categoryName}</span>
       </div>`;

  modalBody.innerHTML = `
    <div class="modal-image-area">
      ${modalImageContent}
    </div>
    <div class="modal-inner-content">
      <div class="modal-header-row">
        <h3 class="modal-title">${item.title}</h3>
        <span class="modal-price-tag">${item.price}</span>
      </div>
      <p class="modal-desc">${item.desc}</p>
      
      <div class="modal-note-box">
        <i class="fa-solid fa-palette"></i>
        <span>Peça personalizada sob demanda na cor que você preferir!</span>
      </div>

      <div class="modal-actions-container">
        <button class="modal-cart-btn" onclick="addToCart(${item.id}, 1, this); closeProductModal();">
          <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
        </button>
        <a href="${whatsappUrl}" class="modal-direct-btn" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-whatsapp"></i> Pedir Direto no WhatsApp
        </a>
      </div>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

/**
 * Rolagem suave ao clicar em botões internos
 */
function setupSmoothScroll() {
  const exploreBtn = document.getElementById("btn-explore");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToCatalogProducts();
    });
  }

  const exploreDesktopBtn = document.getElementById("btn-explore-desktop");
  if (exploreDesktopBtn) {
    exploreDesktopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToCatalogProducts();
    });
  }
}

/**
 * Showroom Panorâmico Multi-Produtos no Desktop
 * Renderiza múltiplos cards em formato 3:4 simultâneos, paginação fluida e autoplay suave
 */
let currentShowroomPage = 0;

function setupHeroSlider() {
  const showroomHub = document.getElementById("desktop-showroom-hub");
  const track = document.getElementById("showroom-cards-track");
  const pageText = document.getElementById("showroom-page-text");
  const prevBtn = document.getElementById("showroom-prev-btn");
  const nextBtn = document.getElementById("showroom-next-btn");

  if (!track || !CATALOG_ITEMS || CATALOG_ITEMS.length === 0) return;

  // Renderiza todos os cards em formato 3:4
  track.innerHTML = CATALOG_ITEMS.map((item) => `
    <div class="showroom-product-card" data-id="${item.id}">
      <div class="showroom-card-media" onclick="openProductModal(${item.id})" title="Clique para ver detalhes de ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <span class="card-category-pill"><i class="${item.icon}"></i> ${item.categoryName}</span>
        <span class="card-price-pill">${item.price}</span>
      </div>
      <div class="showroom-card-info">
        <h4 class="showroom-card-title" onclick="openProductModal(${item.id})" title="${item.title}">${item.title}</h4>
        <p class="showroom-card-desc">${item.desc}</p>
        <div class="showroom-card-actions">
          <button class="btn-card-cart" onclick="event.stopPropagation(); addToCart(${item.id}, 1, this)" title="Adicionar ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> <span>+ Carrinho</span>
          </button>
          <button class="btn-card-direct" onclick="event.stopPropagation(); orderDirectFromCard(${item.id})" title="Pedir no WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> <span>Pedir</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");

  window.orderDirectFromCard = function(itemId) {
    const item = CATALOG_ITEMS.find((p) => p.id === itemId) || ALL_PRODUCTS.find(p => p.id === itemId);
    if (!item) return;
    const quoteMsg = SITE_CONFIG.catalogWhatsappMsg
      .replace("{item}", item.title)
      .replace("{price}", item.price);
    const url = createWhatsappUrl(SITE_CONFIG.whatsappNumber, quoteMsg);
    window.open(url, "_blank");
  };

  function getCardsPerView() {
    return window.innerWidth >= 1200 ? 3 : 2;
  }

  function getTotalPages() {
    const cardsPerView = getCardsPerView();
    return Math.ceil(CATALOG_ITEMS.length / cardsPerView);
  }

  function updateShowroom() {
    const totalPages = getTotalPages();
    if (currentShowroomPage >= totalPages) currentShowroomPage = 0;
    if (currentShowroomPage < 0) currentShowroomPage = totalPages - 1;

    // Deslocamento por página: 100% da viewport + gap (14px)
    track.style.transform = `translateX(calc(-${currentShowroomPage} * (100% + 14px)))`;

    if (pageText) {
      pageText.textContent = `${currentShowroomPage + 1} / ${totalPages}`;
    }
  }

  function nextShowroomPage() {
    const totalPages = getTotalPages();
    currentShowroomPage = (currentShowroomPage + 1) % totalPages;
    updateShowroom();
  }

  function prevShowroomPage() {
    const totalPages = getTotalPages();
    currentShowroomPage = (currentShowroomPage - 1 + totalPages) % totalPages;
    updateShowroom();
  }

  if (!track.dataset.eventsBound) {
    track.dataset.eventsBound = "true";

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextShowroomPage();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevShowroomPage();
        resetAutoplay();
      });
    }

    if (showroomHub) {
      showroomHub.addEventListener("mouseenter", stopAutoplay);
      showroomHub.addEventListener("mouseleave", startAutoplay);
    }

    window.addEventListener("resize", () => {
      updateShowroom();
    });
  }

  let autoplayTimer = null;

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextShowroomPage, 5200);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  updateShowroom();
  startAutoplay();
}

/**
 * ============================================================================
 * FAQ ACORDEÃO COM TRANSIÇÃO ULTRA-SUAVE
 * ============================================================================
 */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const summary = item.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains("faq-open");

      if (isOpen) {
        // Suavemente recolhe
        item.classList.remove("faq-open");
        setTimeout(() => {
          item.removeAttribute("open");
        }, 320);
      } else {
        // Suavemente expande
        item.setAttribute("open", "");
        void item.offsetWidth; // Força recálculo do layout para o CSS Grid transicionar suave
        item.classList.add("faq-open");
      }
    });
  });
}

/**
 * ============================================================================
 * SISTEMA DE CARRINHO DE COMPRAS & CHECKOUT VIA WHATSAPP
 * ============================================================================
 */
let cart = [];
let toastTimeout = null;

function parseItemPrice(priceStr) {
  if (!priceStr) return 0;
  const clean = priceStr.replace(/[^\d,]/g, "").replace(",", ".");
  const val = parseFloat(clean);
  return isNaN(val) ? 0 : val;
}

function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function loadCart() {
  try {
    const saved = localStorage.getItem("cubeforge_cart");
    if (saved) {
      cart = JSON.parse(saved);
      if (!Array.isArray(cart)) cart = [];
    }
  } catch (err) {
    console.error("Erro ao carregar carrinho:", err);
    cart = [];
  }
  updateCartUI();
}

function saveCart() {
  try {
    localStorage.setItem("cubeforge_cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Erro ao salvar carrinho:", err);
  }
  updateCartUI();
}

window.addToCart = function(productId, quantity = 1, triggerBtn = null) {
  const product = CATALOG_ITEMS.find(p => p.id === productId) || ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Animação imediata no botão clicado (+ Carrinho)
  if (triggerBtn) {
    triggerBtn.classList.remove("btn-added-pulse");
    void triggerBtn.offsetWidth;
    triggerBtn.classList.add("btn-added-pulse");
    setTimeout(() => triggerBtn.classList.remove("btn-added-pulse"), 450);
  }

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice: parseItemPrice(product.price),
      image: product.image,
      icon: product.icon,
      categoryName: product.categoryName,
      quantity: quantity
    });
  }

  saveCart();
  showCartToast(product.title, "add", "Adicionado ao carrinho!");
  animateCartBadges();
};

window.updateCartQuantity = function(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  if (cart[itemIndex].quantity + delta <= 0) {
    const itemTitle = cart[itemIndex].title;
    cart.splice(itemIndex, 1);
    saveCart();
    showCartToast(itemTitle, "remove", "Item removido do carrinho");
    return;
  }

  cart[itemIndex].quantity += delta;
  saveCart();
};

window.removeFromCart = function(productId) {
  const item = cart.find(i => i.id === productId);
  const itemTitle = item ? item.title : "Item";
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  showCartToast(itemTitle, "remove", "Item removido do carrinho");
};

window.clearCart = function() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  const confirmBar = document.getElementById("cart-clear-confirm-bar");
  if (confirmBar) confirmBar.classList.remove("active");
  showCartToast("Carrinho esvaziado", "empty", "Todos os itens foram removidos");
};

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (item.numericPrice * item.quantity), 0);
}

function updateCartUI() {
  const totalCount = getCartCount();
  const totalPrice = getCartTotal();

  // Atualizar badge do Desktop
  const navBadge = document.getElementById("nav-cart-badge");
  if (navBadge) {
    navBadge.textContent = totalCount;
    navBadge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }

  // Atualizar badge do Celular
  const mobileBadge = document.getElementById("mobile-cart-badge");
  if (mobileBadge) {
    mobileBadge.textContent = totalCount;
    mobileBadge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }

  const mobileFloatBtn = document.getElementById("mobile-cart-btn");
  if (mobileFloatBtn) {
    mobileFloatBtn.classList.toggle("has-items", totalCount > 0);
  }

  // Contador no cabeçalho do drawer
  const headerCount = document.getElementById("cart-header-count");
  if (headerCount) {
    headerCount.textContent = `(${totalCount})`;
  }

  // Total Estimado
  const totalDisplay = document.getElementById("cart-total-display");
  if (totalDisplay) {
    totalDisplay.textContent = formatBRL(totalPrice);
  }

  // Lista de itens no corpo do carrinho
  const container = document.getElementById("cart-items-container");
  const footerPanel = document.getElementById("cart-footer-panel");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <div class="cart-empty-icon"><i class="fa-solid fa-cart-shopping"></i></div>
        <h4>Seu carrinho está vazio</h4>
        <p>Explore as peças de impressão 3D e adicione seus itens favoritos!</p>
        <button class="btn-cart-start" onclick="closeCart(); scrollToCatalogProducts();">
          <i class="fa-solid fa-compass"></i> Ver Catálogo
        </button>
      </div>
    `;
    if (footerPanel) footerPanel.style.display = "none";
  } else {
    if (footerPanel) footerPanel.style.display = "flex";

    container.innerHTML = cart.map(item => {
      const imgContent = item.image 
        ? `<img src="${item.image}" alt="${item.title}">` 
        : `<i class="${item.icon}"></i>`;
      const itemSubtotal = formatBRL(item.numericPrice * item.quantity);

      return `
        <div class="cart-item-card">
          <div class="cart-item-img">
            ${imgContent}
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-unit-price">${item.price} cada</div>
            <div class="cart-item-actions-row">
              <div class="qty-control-box">
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" aria-label="Diminuir quantidade">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-number">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" aria-label="Aumentar quantidade">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <span class="cart-item-subtotal">${itemSubtotal}</span>
            </div>
          </div>
          <button class="cart-item-remove-btn" onclick="removeFromCart(${item.id})" title="Remover item">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `;
    }).join("");
  }
}

window.openCart = function() {
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeCart = function() {
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  const confirmBar = document.getElementById("cart-clear-confirm-bar");
  if (confirmBar) confirmBar.classList.remove("active");
};

function checkoutCartWhatsApp() {
  if (cart.length === 0) return;

  const notesInput = document.getElementById("cart-custom-notes");
  const notesText = notesInput ? notesInput.value.trim() : "";
  const totalStr = formatBRL(getCartTotal());

  let message = `🛒 *NOVO PEDIDO - ${SITE_CONFIG.brandName.toUpperCase()}* 🛒\n`;
  message += `--------------------------------\n`;
  message += `Olá! Gostaria de encomendar os seguintes itens do meu carrinho:\n\n`;

  cart.forEach(item => {
    const subtotal = formatBRL(item.numericPrice * item.quantity);
    message += `• *${item.quantity}x* ${item.title} (${item.price} cada) = ${subtotal}\n`;
  });

  message += `\n💰 *Total Estimado:* ${totalStr}\n`;

  if (notesText) {
    message += `📝 *Observações / Personalização:* ${notesText}\n`;
  }

  message += `--------------------------------\n`;
  message += `Poderiam me confirmar a disponibilidade e o prazo de produção para estas peças?`;

  const url = createWhatsappUrl(SITE_CONFIG.whatsappNumber, message);
  window.open(url, "_blank");
}

function showCartToast(title, type = "add", subtitle = null) {
  const toast = document.getElementById("cart-toast");
  const nameEl = document.getElementById("toast-item-name");
  const statusEl = document.getElementById("toast-item-status");
  const iconBox = document.getElementById("toast-icon-box");
  if (!toast || !nameEl) return;

  nameEl.textContent = title;
  toast.classList.remove("toast-add", "toast-remove", "toast-empty");

  if (type === "empty") {
    toast.classList.add("toast-empty");
    if (statusEl) statusEl.textContent = subtitle || "Todos os itens foram removidos";
    if (iconBox) iconBox.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  } else if (type === "remove") {
    toast.classList.add("toast-remove");
    if (statusEl) statusEl.textContent = subtitle || "Item removido do carrinho";
    if (iconBox) iconBox.innerHTML = '<i class="fa-solid fa-minus"></i>';
  } else {
    toast.classList.add("toast-add");
    if (statusEl) statusEl.textContent = subtitle || "Adicionado ao carrinho!";
    if (iconBox) iconBox.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  }

  // Reinicia animação fluida instantaneamente
  toast.classList.remove("show");
  void toast.offsetWidth;
  toast.classList.add("show");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function animateCartBadges() {
  const badges = document.querySelectorAll(".cart-badge, .mobile-cart-badge");
  badges.forEach(b => {
    b.classList.remove("bump");
    void b.offsetWidth;
    b.classList.add("bump");
    setTimeout(() => b.classList.remove("bump"), 350);
  });

  const mobileFloat = document.getElementById("mobile-cart-btn");
  if (mobileFloat) {
    mobileFloat.classList.remove("added-pulse");
    void mobileFloat.offsetWidth;
    mobileFloat.classList.add("added-pulse");
    setTimeout(() => mobileFloat.classList.remove("added-pulse"), 500);
  }

  const navCartBtn = document.getElementById("nav-cart-btn");
  if (navCartBtn) {
    navCartBtn.classList.remove("added-pulse");
    void navCartBtn.offsetWidth;
    navCartBtn.classList.add("added-pulse");
    setTimeout(() => navCartBtn.classList.remove("added-pulse"), 450);
  }
}

function setupCartListeners() {
  const navCartBtn = document.getElementById("nav-cart-btn");
  if (navCartBtn) navCartBtn.addEventListener("click", openCart);

  const mobileCartBtn = document.getElementById("mobile-cart-btn");
  if (mobileCartBtn) mobileCartBtn.addEventListener("click", openCart);

  const closeBtn = document.getElementById("cart-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);

  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCart();
    });
  }

  const checkoutBtn = document.getElementById("btn-checkout-whatsapp");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutCartWhatsApp);

  // Esvaziar carrinho com barra de confirmação segura
  const clearBtn = document.getElementById("btn-clear-cart");
  const confirmBar = document.getElementById("cart-clear-confirm-bar");
  const confirmYesBtn = document.getElementById("btn-confirm-clear-yes");
  const confirmNoBtn = document.getElementById("btn-confirm-clear-no");

  if (clearBtn && confirmBar) {
    clearBtn.addEventListener("click", () => {
      confirmBar.classList.add("active");
    });
  }

  if (confirmNoBtn && confirmBar) {
    confirmNoBtn.addEventListener("click", () => {
      confirmBar.classList.remove("active");
    });
  }

  if (confirmYesBtn && confirmBar) {
    confirmYesBtn.addEventListener("click", () => {
      clearCart();
    });
  }

  const continueBtn = document.getElementById("btn-continue-shopping");
  if (continueBtn) continueBtn.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
      closeCart();
    }
  });
}

// Suporte a links ou parâmetros de rolagem imediata
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const scrollTarget = params.get("scroll");
  if (scrollTarget === "steps") {
    const el = document.getElementById("passo-a-passo") || document.getElementById("como-funciona");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  } else if (scrollTarget === "custom") {
    const el = document.querySelector(".custom-idea-banner");
    if (el) el.scrollIntoView({ behavior: "instant", block: "center" });
  }
});

/**
 * Inicializa a iluminação reativa do cursor:
 * O efeito do mouse iluminar as coisas fica estritamente confinado aos widgets e botões,
 * sem iluminar o papel de parede/fundo do site (que possui sua própria aurora orgânica suave em movimento).
 */
function initInteractiveMotion() {
  const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!isFinePointer) return;

  const interactiveElementsSelector = `
    .product-card, 
    .showroom-product-card, 
    .step-card, 
    .feature-strip-item, 
    .faq-item, 
    .custom-idea-banner, 
    .showroom-bottom-banner,
    .desktop-btn,
    .btn,
    .btn-custom-idea,
    .btn-card-cart,
    .btn-card-direct,
    .nav-cart-btn,
    .nav-cta-btn,
    .banner-zap-btn,
    .filter-btn
  `;

  // Atualizar iluminação especular apenas dentro do widget/botão sob o cursor
  document.addEventListener("mousemove", (e) => {
    const el = e.target.closest(interactiveElementsSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mouse-x", `${x}px`);
      el.style.setProperty("--mouse-y", `${y}px`);
    }
  }, { passive: true });

  // Desativar iluminação quando o cursor sair do widget/botão
  document.addEventListener("mouseout", (e) => {
    const el = e.target.closest(interactiveElementsSelector);
    if (el && (!e.relatedTarget || !el.contains(e.relatedTarget))) {
      el.style.setProperty("--mouse-x", "-500px");
      el.style.setProperty("--mouse-y", "-500px");
    }
  }, { passive: true });
}
