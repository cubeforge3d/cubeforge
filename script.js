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

  // Link oficial da Loja Online no Jim / InfinitePay (Pix e Cartão em até 12x)
  jimStoreUrl: "https://jim.com/a/cubeforge",

  // InfiniteTag / Handle oficial da sua loja na InfinitePay (sem @ ou $)
  infinitePayHandle: "cubeforge",

  // CEP de Origem da Cube Forge para cálculo de frete no Melhor Envio (apenas dígitos)
  cepOrigem: "29101010",

  // Token Bearer da API do Melhor Envio (opcional, gerenciável no Pages CMS)
  melhorEnvioToken: "",

  // Ambiente de teste Sandbox do Melhor Envio
  melhorEnvioSandbox: false,

  // Nome da sua Marca / Negócio
  brandName: "Cube Forge",

  // Seu @ do Instagram (sem o @)
  instagramUser: "cubeforge3d",

  // Mensagem padrão ao clicar no WhatsApp principal (Fazer Pedido)
  defaultWhatsappMsg: "Olá! Vim pelo site da Cube Forge e gostaria de fazer um pedido de impressão 3D.",

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
    preco: "A partir de R$ 30",
    categoria: "colecionaveis",
    categoriaNome: "Colecionáveis",
    descricao: "Seus personagens favoritos de animes, games e filmes impressos com riqueza de detalhes.",
    imagem: "./assets/img/produtos/item1.jpg",
    icon: "fa-solid fa-dragon",
    disponivel: true,
    destaque: true,
    estoque: 2,
    somente_encomenda: false
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
    disponivel: true,
    destaque: true,
    estoque: 0,
    somente_encomenda: false
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
    disponivel: true,
    destaque: true,
    estoque: 1,
    somente_encomenda: false
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
    disponivel: true,
    destaque: true,
    estoque: 0,
    somente_encomenda: true
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
    disponivel: true,
    destaque: true,
    estoque: 4,
    somente_encomenda: false
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
    disponivel: true,
    destaque: true,
    estoque: 0,
    somente_encomenda: false
  }
];

let ALL_PRODUCTS = [];
let CATALOG_ITEMS = [];

/**
 * ============================================================================
 * SISTEMA DINÂMICO DE CATEGORIAS E SINCRONIZAÇÃO COM PAGES CMS
 * ============================================================================
 */
const DEFAULT_CATEGORY_METADATA = {
  colecionaveis: { name: "Colecionáveis", emoji: "🐉", icon: "fa-solid fa-dragon" },
  decoracao: { name: "Decoração", emoji: "🌿", icon: "fa-solid fa-seedling" },
  setup: { name: "Setup & Suportes", emoji: "🎧", icon: "fa-solid fa-headphones" },
  personalizados: { name: "Presentes", emoji: "🎁", icon: "fa-solid fa-gift" },
  geek: { name: "Geek & Games", emoji: "🎮", icon: "fa-solid fa-gamepad" },
  iluminacao: { name: "Iluminação & Litofanias", emoji: "💡", icon: "fa-solid fa-lightbulb" },
  utilidades: { name: "Utilidades & Casa", emoji: "🛠️", icon: "fa-solid fa-wrench" },
  cosplay: { name: "Cosplay & Acessórios", emoji: "🎭", icon: "fa-solid fa-mask" },
  miniaturas: { name: "Miniaturas & RPG", emoji: "🎲", icon: "fa-solid fa-dice-d20" }
};

/**
 * Converte qualquer texto de categoria em um identificador slug seguro
 */
function slugifyCategory(str) {
  if (!str) return "outros";
  return str
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Determina o nome legível de exibição da categoria
 */
function getCategoryLabel(category) {
  if (DEFAULT_CATEGORY_METADATA[category]?.name) {
    return DEFAULT_CATEGORY_METADATA[category].name;
  }
  const clean = category.replace(/-/g, " ");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/**
 * Determina o emoji adequado para a categoria (seja pré-definida ou nova criada no CMS)
 */
function getCategoryEmoji(category, categoryName = "") {
  if (DEFAULT_CATEGORY_METADATA[category]?.emoji) {
    return DEFAULT_CATEGORY_METADATA[category].emoji;
  }
  const text = (category + " " + categoryName).toLowerCase();
  if (text.includes("drag") || text.includes("figure") || text.includes("colecion")) return "🐉";
  if (text.includes("decor") || text.includes("vaso") || text.includes("plant")) return "🌿";
  if (text.includes("setup") || text.includes("headset") || text.includes("suporte") || text.includes("fone")) return "🎧";
  if (text.includes("present") || text.includes("chaveir") || text.includes("brinde")) return "🎁";
  if (text.includes("game") || text.includes("geek") || text.includes("jog") || text.includes("nerd") || text.includes("control")) return "🎮";
  if (text.includes("luz") || text.includes("litofan") || text.includes("lamp") || text.includes("ilumin")) return "💡";
  if (text.includes("util") || text.includes("ferrament") || text.includes("casa")) return "🛠️";
  if (text.includes("cosplay") || text.includes("mascar") || text.includes("fantasia")) return "🎭";
  if (text.includes("miniat") || text.includes("rpg") || text.includes("dnd")) return "🎲";
  if (text.includes("trofeu") || text.includes("premio") || text.includes("medal")) return "🏆";
  if (text.includes("caneca") || text.includes("copo") || text.includes("cafe")) return "☕";
  if (text.includes("joia") || text.includes("anel") || text.includes("brinco")) return "💎";
  if (text.includes("carro") || text.includes("auto") || text.includes("moto")) return "🚗";
  if (text.includes("pet") || text.includes("cachorro") || text.includes("gato")) return "🐾";
  return "✨";
}

/**
 * Determina o ícone FontAwesome correspondente à categoria
 */
function getCategoryIcon(category, categoryName = "") {
  if (DEFAULT_CATEGORY_METADATA[category]?.icon) {
    return DEFAULT_CATEGORY_METADATA[category].icon;
  }
  const text = (category + " " + categoryName).toLowerCase();
  if (text.includes("drag") || text.includes("figure") || text.includes("colecion")) return "fa-solid fa-dragon";
  if (text.includes("decor") || text.includes("vaso") || text.includes("plant")) return "fa-solid fa-seedling";
  if (text.includes("setup") || text.includes("headset") || text.includes("suporte") || text.includes("fone")) return "fa-solid fa-headphones";
  if (text.includes("present") || text.includes("chaveir") || text.includes("brinde")) return "fa-solid fa-gift";
  if (text.includes("game") || text.includes("geek") || text.includes("jog") || text.includes("nerd") || text.includes("control")) return "fa-solid fa-gamepad";
  if (text.includes("luz") || text.includes("litofan") || text.includes("lamp") || text.includes("ilumin")) return "fa-solid fa-lightbulb";
  if (text.includes("util") || text.includes("ferrament") || text.includes("casa")) return "fa-solid fa-wrench";
  if (text.includes("cosplay") || text.includes("mascar") || text.includes("fantasia")) return "fa-solid fa-mask";
  if (text.includes("miniat") || text.includes("rpg") || text.includes("dnd")) return "fa-solid fa-dice-d20";
  return "fa-solid fa-cube";
}

/**
 * Normaliza os dados vindos de produtos.json ou Pages CMS garantindo
 * compatibilidade total com seleção no dropdown E criação de novas categorias.
 */
function normalizeProduct(raw, index) {
  const customCat = (raw.nova_categoria || raw.categoria_personalizada || "").toString().trim();
  const rawCat = (raw.categoria || raw.category || "").toString().trim();

  let categorySlug = "outros";
  let categoryLabel = "";

  // Prioriza nova categoria se tiver sido digitada no CMS
  if (customCat && (rawCat === "nova" || rawCat === "outros" || !rawCat)) {
    categorySlug = slugifyCategory(customCat);
    categoryLabel = customCat;
  } else if (rawCat && rawCat !== "nova") {
    categorySlug = slugifyCategory(rawCat);
    categoryLabel = raw.categoriaNome || raw.categoryName || getCategoryLabel(categorySlug);
  } else if (customCat) {
    categorySlug = slugifyCategory(customCat);
    categoryLabel = customCat;
  } else {
    categorySlug = "outros";
    categoryLabel = raw.categoriaNome || raw.categoryName || "Geral";
  }

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
  const isDestaque = raw.destaque !== undefined 
    ? Boolean(raw.destaque) 
    : (raw.em_destaque !== undefined 
       ? Boolean(raw.em_destaque) 
       : (raw.showroom !== undefined 
          ? Boolean(raw.showroom) 
          : true));
  const stock = Math.max(0, parseInt(raw.estoque ?? raw.stock ?? raw.estoque_pronta_entrega ?? 0, 10) || 0);
  const isOrderOnly = raw.somente_encomenda !== undefined 
    ? Boolean(raw.somente_encomenda) 
    : (raw.sob_encomenda !== undefined 
       ? Boolean(raw.sob_encomenda) 
       : false);

  // Ícone/Emoji customizado ou inteligente
  let icon = raw.categoria_icone || raw.icon || "";
  if (!icon) {
    icon = getCategoryIcon(categorySlug, categoryLabel);
  }

  return {
    id,
    nome: title,
    title,
    preco: price,
    price,
    numericPrice: parseItemPrice(price),
    categoria: categorySlug,
    category: categorySlug,
    categoriaNome: categoryLabel,
    categoryName: categoryLabel,
    descricao: desc,
    desc,
    imagem: image,
    image,
    icon: icon,
    categoria_icone: raw.categoria_icone || "",
    nova_categoria: raw.nova_categoria || "",
    disponivel: isAvailable,
    destaque: isDestaque,
    somente_encomenda: isOrderOnly,
    sob_encomenda: isOrderOnly,
    estoque: stock,
    prontaEntrega: !isOrderOnly && stock > 0
  };
}

// Inicializa previamente com fallback para evitar qualquer tela vazia antes do fetch
ALL_PRODUCTS = FALLBACK_CATALOG_ITEMS.map((item, idx) => normalizeProduct(item, idx));
CATALOG_ITEMS = ALL_PRODUCTS.filter(item => item.disponivel);

/**
 * Renderiza dinamicamente as abas de filtro a partir das categorias reais dos produtos
 * Mantém tudo rigorosamente em 1 linha. No PC, se houver muitas categorias, exibe botão "Mais ⌄" estilo AliExpress.
 */
function renderFilterTabs(preferredCategory = null) {
  const container = document.getElementById("filter-tabs-container");
  if (!container) return;

  // Categoria ativa atual
  let activeCategory = preferredCategory;
  if (!activeCategory) {
    const currentActiveBtn = container.querySelector(".filter-btn.active") || container.querySelector(".filter-dropdown-item.active");
    activeCategory = currentActiveBtn ? currentActiveBtn.getAttribute("data-category") : "all";
  }

  // Agrupa categorias únicas a partir dos produtos disponíveis
  const categoryMap = new Map();
  const hasReadyStock = CATALOG_ITEMS.some(item => item.estoque > 0);

  CATALOG_ITEMS.forEach(item => {
    const slug = item.categoria || item.category;
    if (!slug) return;
    if (!categoryMap.has(slug)) {
      const meta = DEFAULT_CATEGORY_METADATA[slug] || {};
      let emoji = "";
      if (item.categoria_icone && item.categoria_icone.length <= 4 && !item.categoria_icone.includes("fa-")) {
        emoji = item.categoria_icone;
      } else {
        emoji = meta.emoji || getCategoryEmoji(slug, item.categoryName);
      }

      categoryMap.set(slug, {
        slug: slug,
        name: item.categoriaNome || item.categoryName || meta.name || slug,
        emoji: emoji,
        icon: item.icon || meta.icon || "fa-solid fa-cube"
      });
    }
  });

  // Se a categoria selecionada não existir mais, volta para "all"
  if (activeCategory !== "all" && activeCategory !== "pronta-entrega" && !categoryMap.has(activeCategory)) {
    activeCategory = "all";
  }
  if (activeCategory === "pronta-entrega" && !hasReadyStock) {
    activeCategory = "all";
  }

  // Monta lista de abas ordenada
  const allTabs = [
    { slug: "all", name: "Todos", emoji: "✨", isReady: false }
  ];

  if (hasReadyStock) {
    allTabs.push({ slug: "pronta-entrega", name: "Pronta Entrega", emoji: "⚡", isReady: true });
  }

  categoryMap.forEach(cat => {
    allTabs.push({ slug: cat.slug, name: cat.name, emoji: cat.emoji, isReady: false });
  });

  const isMobile = window.innerWidth < 768;
  let html = "";

  if (isMobile) {
    // No celular: todos os botões em linha única com deslizamento horizontal touch nativo
    allTabs.forEach(tab => {
      const isActive = activeCategory === tab.slug;
      if (tab.isReady) {
        html += `
          <button class="filter-btn filter-btn-ready ${isActive ? 'active' : ''}" data-category="pronta-entrega" title="Filtrar apenas peças com envio imediato">
            <span class="stock-pulse-dot"></span> ⚡ Pronta Entrega
          </button>
        `;
      } else {
        html += `
          <button class="filter-btn ${isActive ? 'active' : ''}" data-category="${tab.slug}">
            ${tab.emoji} ${tab.name}
          </button>
        `;
      }
    });
  } else {
    // No PC / Desktop: linha única com limite visível e menu dropdown "Mais ⌄" no final (Estilo AliExpress)
    let maxVisible = 5;
    if (window.innerWidth < 992) {
      maxVisible = 3;
    } else if (window.innerWidth < 1200) {
      maxVisible = 4;
    }

    const visibleTabs = allTabs.length > maxVisible ? allTabs.slice(0, maxVisible) : allTabs;
    const overflowTabs = allTabs.length > maxVisible ? allTabs.slice(maxVisible) : [];

    // Renderiza botões visíveis
    visibleTabs.forEach(tab => {
      const isActive = activeCategory === tab.slug;
      if (tab.isReady) {
        html += `
          <button class="filter-btn filter-btn-ready ${isActive ? 'active' : ''}" data-category="pronta-entrega" title="Filtrar apenas peças com envio imediato">
            <span class="stock-pulse-dot"></span> ⚡ Pronta Entrega
          </button>
        `;
      } else {
        html += `
          <button class="filter-btn ${isActive ? 'active' : ''}" data-category="${tab.slug}">
            ${tab.emoji} ${tab.name}
          </button>
        `;
      }
    });

    // Se houver itens excedentes, renderiza o botão "Mais ⌄" com menu popover estilo AliExpress
    if (overflowTabs.length > 0) {
      const activeOverflowItem = overflowTabs.find(t => t.slug === activeCategory);
      const isMoreActive = !!activeOverflowItem;
      const moreBtnLabel = isMoreActive ? `Mais: ${activeOverflowItem.emoji} ${activeOverflowItem.name}` : "Mais";

      html += `
        <div class="filter-more-wrapper" id="filter-more-wrapper">
          <button class="filter-btn filter-btn-more ${isMoreActive ? 'active' : ''}" id="filter-btn-more" type="button" aria-expanded="false" title="Ver mais categorias">
            <span class="more-label">${moreBtnLabel}</span>
            <i class="fa-solid fa-chevron-down more-chevron"></i>
          </button>
          <div class="filter-more-dropdown" id="filter-more-dropdown" role="menu">
            ${overflowTabs.map(t => {
              const isActive = activeCategory === t.slug;
              return `
                <button class="filter-dropdown-item ${isActive ? 'active' : ''}" data-category="${t.slug}" role="menuitem">
                  <span>${t.emoji} ${t.name}</span>
                  <i class="fa-solid fa-check dropdown-item-check"></i>
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }
  }

  container.innerHTML = html;

  // Reconecta os eventos de clique, dropdown e scroll
  setupFilterButtons();
}

/**
 * Busca produtos.json dinamicamente via fetch e atualiza a interface
 */
/**
 * ============================================================================
 * CONFIGURAÇÕES GERAIS E MODO DE MANUTENÇÃO (Pages CMS)
 * ============================================================================
 */
let SITE_SETTINGS = {
  modo_manutencao: false,
  titulo_manutencao: "Estamos em Manutenção",
  subtitulo_manutencao: "Voltamos em breve com novidades!",
  mensagem_manutencao: "Estamos realizando ajustes em nossos equipamentos, estoque e catálogo para trazer peças exclusivas com a máxima qualidade. Nossas compras online voltam em breve!\n\nEnquanto isso, você pode encomendar, orçar ou tirar dúvidas diretamente pelo nosso WhatsApp ou Instagram.",
  previsao_retorno: "Voltamos em breve!"
};

async function loadSiteSettings() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramManutencao = urlParams.get("manutencao") || urlParams.get("maintenance");

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch("./configuracoes.json?v=" + Date.now(), { cache: "no-store", signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        SITE_SETTINGS = { ...SITE_SETTINGS, ...data };
        if (data.cep_origem) SITE_CONFIG.cepOrigem = data.cep_origem.replace(/\D/g, "");
        if (data.melhorenvio_token) SITE_CONFIG.melhorEnvioToken = data.melhorenvio_token.trim();
        if (typeof data.melhorenvio_sandbox === "boolean") SITE_CONFIG.melhorEnvioSandbox = data.melhorenvio_sandbox;
      }
    }
  } catch (err) {
    console.warn("Aviso: fetch de configuracoes.json não completou, usando padrão:", err);
  }

  // Permite testar e pré-visualizar via URL (?manutencao=1 para forçar ativo, ?manutencao=0 para desativar)
  if (paramManutencao === "1" || paramManutencao === "true") {
    SITE_SETTINGS.modo_manutencao = true;
  } else if (paramManutencao === "0" || paramManutencao === "false") {
    SITE_SETTINGS.modo_manutencao = false;
  }

  applyMaintenanceMode(Boolean(SITE_SETTINGS.modo_manutencao));
}

function applyMaintenanceMode(isActive) {
  const overlay = document.getElementById("maintenance-overlay");
  if (!overlay) return;

  if (isActive) {
    document.body.classList.add("body-maintenance");
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");

    // Fecha o carrinho caso esteja aberto
    if (typeof window.closeCart === "function") {
      window.closeCart();
    }

    // Atualiza os textos dinâmicos do Pages CMS
    const titleEl = document.getElementById("maintenance-title");
    if (titleEl && SITE_SETTINGS.titulo_manutencao) {
      titleEl.textContent = SITE_SETTINGS.titulo_manutencao;
    }

    const subtitleEl = document.getElementById("maintenance-subtitle");
    if (subtitleEl && SITE_SETTINGS.subtitulo_manutencao) {
      subtitleEl.textContent = SITE_SETTINGS.subtitulo_manutencao;
    }

    const messageEl = document.getElementById("maintenance-message");
    if (messageEl && SITE_SETTINGS.mensagem_manutencao) {
      messageEl.textContent = SITE_SETTINGS.mensagem_manutencao;
    }

    const returnTextEl = document.getElementById("maintenance-return-text");
    if (returnTextEl && SITE_SETTINGS.previsao_retorno) {
      returnTextEl.textContent = SITE_SETTINGS.previsao_retorno;
    }

    // Configura o link do WhatsApp na tela de manutenção
    const zapBtn = document.getElementById("maintenance-whatsapp-btn");
    if (zapBtn) {
      const zapMsg = "Olá! Vi que o site da Cube Forge está em manutenção e gostaria de tirar uma dúvida / fazer um pedido direto por aqui.";
      zapBtn.href = createWhatsappUrl(SITE_CONFIG.whatsappNumber, zapMsg);
    }
  } else {
    document.body.classList.remove("body-maintenance");
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
  }
}

async function loadProductsData() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const response = await fetch('./produtos.json', { cache: 'default', signal: controller.signal });
    clearTimeout(timeoutId);
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

  // Sincroniza abas de filtro dinâmicas com as categorias presentes nos produtos
  const currentActiveBtn = document.querySelector(".filter-btn.active");
  const currentCategory = currentActiveBtn ? currentActiveBtn.getAttribute("data-category") : "all";

  renderFilterTabs(currentCategory);
  renderCatalog(currentCategory || "all");
  setupHeroSlider();
  syncCartWithCatalog();
  updateCartUI();
}

// ============================================================================
// INICIALIZAÇÃO DA PÁGINA
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadSiteSettings();
  setupBrandInfo();
  renderFilterTabs("all");
  renderCatalog("all");
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
  const { whatsappNumber, whatsappDisplay, whatsappBusinessLink, instagramUser, defaultWhatsappMsg, customIdeaWhatsappMsg } = SITE_CONFIG;

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
  const defaultOrderWhatsAppUrl = createWhatsappUrl(whatsappNumber, defaultWhatsappMsg);
  const customIdeaWhatsAppUrl = createWhatsappUrl(whatsappNumber, customIdeaWhatsappMsg);

  // Botões de Fazer Pedido no WhatsApp (com mensagem pronta predefinida)
  const heroWhatsappBtn = document.getElementById("hero-whatsapp-btn");
  if (heroWhatsappBtn) {
    heroWhatsappBtn.href = defaultOrderWhatsAppUrl;
    heroWhatsappBtn.setAttribute("title", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
  }

  const desktopWhatsappBtn = document.getElementById("desktop-whatsapp-btn");
  if (desktopWhatsappBtn) {
    desktopWhatsappBtn.href = defaultOrderWhatsAppUrl;
    desktopWhatsappBtn.setAttribute("title", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
  }

  const floatingWhatsappBtn = document.getElementById("floating-whatsapp-btn");
  if (floatingWhatsappBtn) {
    floatingWhatsappBtn.href = defaultOrderWhatsAppUrl;
    floatingWhatsappBtn.setAttribute("title", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
  }

  const footerWhatsappLink = document.getElementById("footer-whatsapp-link");
  if (footerWhatsappLink) {
    footerWhatsappLink.href = defaultOrderWhatsAppUrl;
    footerWhatsappLink.setAttribute("title", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
    footerWhatsappLink.setAttribute("aria-label", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
  }

  const finalCtaBtn = document.querySelector(".btn-whatsapp-large");
  if (finalCtaBtn) {
    finalCtaBtn.href = defaultOrderWhatsAppUrl;
    finalCtaBtn.setAttribute("title", `Fazer Pedido no WhatsApp: ${whatsappDisplay}`);
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

  const btnCheckoutJim = document.getElementById("btn-checkout-jim");
  if (btnCheckoutJim) {
    updateCartNotesValidation();
  }
}

/**
 * Gera URL segura do WhatsApp preservando 100% dos emojis (sem corromper no wa.me)
 */
function createWhatsappUrl(number, message) {
  const cleanNumber = (number || SITE_CONFIG.whatsappNumber || "5527936183114").replace(/\D/g, "");
  if (!message || !message.trim()) {
    return SITE_CONFIG.whatsappBusinessLink || `https://api.whatsapp.com/send?phone=${cleanNumber}`;
  }
  const encodedText = encodeURIComponent(message.trim());
  // Usa o endpoint oficial api.whatsapp.com/send para garantir que emojis como 🛒, ⚡, 💰, 📝
  // não sejam corrompidos em símbolos de interrogação () pelo redirecionador wa.me
  return `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodedText}`;
}

/**
 * Renderiza os cards do catálogo na tela com animação dinâmica
 */
function renderCatalog(filterCategory = "all") {
  const grid = document.getElementById("portfolio-grid");
  if (!grid) return;

  let filteredItems = [];
  if (filterCategory === "all") {
    filteredItems = CATALOG_ITEMS;
  } else if (filterCategory === "pronta-entrega") {
    filteredItems = CATALOG_ITEMS.filter(item => item.estoque > 0 && !item.somente_encomenda);
  } else {
    filteredItems = CATALOG_ITEMS.filter(item => item.category === filterCategory);
  }

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

    // Selo de Pronta Entrega / Urgência / Somente sob Encomenda
    const isOrderOnly = Boolean(item.somente_encomenda);
    const isReady = !isOrderOnly && item.estoque > 0;

    let stockPill = "";
    if (isOrderOnly) {
      stockPill = `<span class="stock-pill order-only" title="Peça fabricada exclusivamente sob encomenda">
                     📦 Somente sob Encomenda
                   </span>`;
    } else if (isReady) {
      stockPill = `<span class="stock-pill in-stock" title="Temos ${item.estoque} unidade(s) pronta(s) para envio imediato!">
                     <span class="stock-pulse-dot"></span>
                     ⚡ ${item.estoque === 1 ? 'Última pronta!' : item.estoque + ' prontas'}
                   </span>`;
    } else {
      stockPill = `<span class="stock-pill on-demand" title="Feito sob encomenda na cor que você preferir">
                     🛠️ Sob Encomenda
                   </span>`;
    }

    let stockBar = "";
    if (isOrderOnly) {
      stockBar = `<div class="product-stock-bar order-only">
                    <i class="fa-solid fa-box-archive"></i>
                    <span><strong>Somente sob Encomenda:</strong> Feito sob pedido</span>
                  </div>`;
    } else if (isReady) {
      stockBar = `<div class="product-stock-bar in-stock">
                    <i class="fa-solid fa-bolt"></i>
                    <span><strong>Pronta Entrega:</strong> ${item.estoque === 1 ? 'Apenas 1 unidade' : item.estoque + ' unidades disponíveis'}</span>
                  </div>`;
    } else {
      stockBar = `<div class="product-stock-bar on-demand">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    <span><strong>Sob Encomenda:</strong> Feito na sua cor</span>
                  </div>`;
    }

    let actionsHtml = "";
    if (isOrderOnly) {
      actionsHtml = `
        <div class="product-actions-group">
          <button class="btn-card-cart" onclick="addToCart(${item.id}, 1, this)" aria-label="Adicionar ${item.title} ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> + Carrinho
          </button>
          <button class="btn-card-direct" onclick="openProductModal(${item.id})" aria-label="Ver detalhes de ${item.title}">
            <i class="fa-solid fa-eye"></i> Detalhes
          </button>
          <button type="button" class="btn-card-order-zap" onclick="orderEncomendaFromCard(${item.id})" aria-label="Encomendar ${item.title} pelo WhatsApp" title="Conversar no WhatsApp para encomendar">
            <i class="fa-brands fa-whatsapp"></i> <span>Encomendar no WhatsApp</span>
          </button>
        </div>
      `;
    } else {
      actionsHtml = `
        <div class="product-actions-group">
          <button class="btn-card-cart" onclick="addToCart(${item.id}, 1, this)" aria-label="Adicionar ${item.title} ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> + Carrinho
          </button>
          <button class="btn-card-direct" onclick="openProductModal(${item.id})" aria-label="Pedir ${item.title} direto no WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Pedir Direto
          </button>
          <button type="button" class="btn-card-buy-online" onclick="buySingleProductOnline(${item.id}, event)" aria-label="Comprar ${item.title} online no Pix ou Cartão em até 12x" title="Comprar no Cartão ou Pix • Até 12x">
            <i class="fa-solid fa-credit-card"></i> <span>Comprar Online • Até 12x no Cartão</span>
          </button>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="product-img-box" onclick="openProductModal(${item.id})" style="cursor: pointer;" title="Clique para ver detalhes de ${item.title}">
        <div class="card-media-badges">
          <span class="product-category-tag">${item.categoryName}</span>
          ${stockPill}
        </div>
        ${imageContent}
      </div>
      <div class="product-info">
        <div class="product-header-row">
          <h3 class="product-title" onclick="openProductModal(${item.id})" style="cursor: pointer;">${item.title}</h3>
          <span class="product-price-badge">${item.price}</span>
        </div>
        <p class="product-desc">${item.desc}</p>
        ${stockBar}
        ${actionsHtml}
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Configura as abas de filtro com suporte a linha única, dropdown "Mais ⌄" (AliExpress),
 * rolagem dinâmica, centralização e auto-scroll suave
 */
function setupFilterButtons() {
  const container = document.getElementById("filter-tabs-container");
  if (!container) return;

  const buttons = container.querySelectorAll(".filter-btn:not(.filter-btn-more)");
  const dropdownItems = container.querySelectorAll(".filter-dropdown-item");
  const moreWrapper = document.getElementById("filter-more-wrapper");
  const moreBtn = document.getElementById("filter-btn-more");
  const moreDropdown = document.getElementById("filter-more-dropdown");

  // Cliques nos botões visíveis da barra principal
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active de todos os botões e itens do dropdown
      container.querySelectorAll(".filter-btn, .filter-dropdown-item").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Reseta rótulo e estado do botão "Mais" se existir
      if (moreBtn) {
        const labelEl = moreBtn.querySelector(".more-label");
        if (labelEl) labelEl.textContent = "Mais";
        moreBtn.classList.remove("active");
      }
      if (moreWrapper) {
        moreWrapper.classList.remove("open");
        if (moreDropdown) moreDropdown.classList.remove("open");
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "false");
      }

      // 1. Centraliza horizontalmente o botão dentro da barra no celular
      if (window.innerWidth < 768) {
        const btnLeft = btn.offsetLeft;
        const btnWidth = btn.offsetWidth;
        const containerWidth = container.offsetWidth;
        container.scrollTo({
          left: btnLeft - (containerWidth / 2) + (btnWidth / 2),
          behavior: "smooth"
        });
      }

      // 2. Renderiza os itens filtrados
      const category = btn.getAttribute("data-category");
      renderCatalog(category);

      // 3. Rola a página para que os produtos e a barra fiquem perfeitamente alinhados
      scrollToCatalogProducts();
    });
  });

  // Toggle do Dropdown "Mais" estilo AliExpress no PC
  if (moreBtn && moreWrapper && moreDropdown) {
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = moreWrapper.classList.toggle("open");
      moreDropdown.classList.toggle("open", isOpen);
      moreBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Cliques nos itens do menu dropdown "Mais"
  dropdownItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      container.querySelectorAll(".filter-btn, .filter-dropdown-item").forEach(b => b.classList.remove("active"));
      item.classList.add("active");

      if (moreBtn) {
        moreBtn.classList.add("active");
        const labelEl = moreBtn.querySelector(".more-label");
        const itemText = item.querySelector("span") ? item.querySelector("span").textContent.trim() : item.textContent.trim();
        if (labelEl) labelEl.textContent = `Mais: ${itemText}`;
      }

      if (moreWrapper) {
        moreWrapper.classList.remove("open");
        if (moreDropdown) moreDropdown.classList.remove("open");
        if (moreBtn) moreBtn.setAttribute("aria-expanded", "false");
      }

      const category = item.getAttribute("data-category");
      renderCatalog(category);
      scrollToCatalogProducts();
    });
  });

  // Fecha o dropdown ao clicar fora ou pressionar ESC (configurado uma única vez)
  if (!window._filterDropdownEventsInitialized) {
    window._filterDropdownEventsInitialized = true;
    document.addEventListener("click", (e) => {
      const activeMoreWrapper = document.getElementById("filter-more-wrapper");
      const activeMoreDropdown = document.getElementById("filter-more-dropdown");
      const activeMoreBtn = document.getElementById("filter-btn-more");
      if (activeMoreWrapper && !activeMoreWrapper.contains(e.target)) {
        activeMoreWrapper.classList.remove("open");
        if (activeMoreDropdown) activeMoreDropdown.classList.remove("open");
        if (activeMoreBtn) activeMoreBtn.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        const activeMoreWrapper = document.getElementById("filter-more-wrapper");
        const activeMoreDropdown = document.getElementById("filter-more-dropdown");
        const activeMoreBtn = document.getElementById("filter-btn-more");
        if (activeMoreWrapper && activeMoreWrapper.classList.contains("open")) {
          activeMoreWrapper.classList.remove("open");
          if (activeMoreDropdown) activeMoreDropdown.classList.remove("open");
          if (activeMoreBtn) activeMoreBtn.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Redimensionamento responsivo para recalcular abas visíveis vs dropdown "Mais"
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const currentActive = document.querySelector("#filter-tabs-container .filter-btn.active, #filter-tabs-container .filter-dropdown-item.active");
        const activeCategory = currentActive ? currentActive.getAttribute("data-category") : "all";
        renderFilterTabs(activeCategory);
      }, 150);
    });
  }
}

/**
 * Rola a janela perfeitamente para o topo dos produtos e da barra de filtros fixa
 */
function scrollToCatalogProducts() {
  const catalogSection = document.getElementById("catalogo");
  if (!catalogSection) return;

  const catalogRect = catalogSection.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  const sectionHeader = catalogSection.querySelector(".section-header");
  const headerHeight = sectionHeader ? sectionHeader.offsetHeight : 0;
  
  const isDesktopNavbar = window.innerWidth >= 992;
  const navOffset = isDesktopNavbar ? 82 : (window.innerWidth >= 768 ? 14 : 0);
  const targetY = currentScrollY + catalogRect.top + headerHeight - navOffset;

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

  const isOrderOnly = Boolean(item.somente_encomenda);
  const isReady = !isOrderOnly && item.estoque > 0;

  let stockAlert = "";
  if (isOrderOnly) {
    stockAlert = `
      <div class="modal-stock-alert order-only">
        <div class="stock-alert-icon"><i class="fa-solid fa-box-archive"></i></div>
        <div>
          <strong>📦 Peça Somente sob Encomenda</strong>
          <div style="font-size: 0.78rem; opacity: 0.95; margin-top: 2px;">
            Esta peça é fabricada exclusivamente sob encomenda na cor e acabamento que você preferir. Prazos e detalhes são alinhados pelo WhatsApp!
          </div>
        </div>
      </div>
    `;
  } else if (isReady) {
    stockAlert = `
      <div class="modal-stock-alert in-stock">
        <div class="stock-alert-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
        <div>
          <strong>⚡ Peça com Pronta Entrega!</strong>
          <div style="font-size: 0.78rem; opacity: 0.95; margin-top: 2px;">
            Temos <strong>${item.estoque} ${item.estoque === 1 ? 'peça já impressa' : 'peças já impressas'}</strong> pronta(s) para envio ou retirada rápida. Aproveite antes que acabe!
          </div>
        </div>
      </div>
    `;
  } else {
    stockAlert = `
      <div class="modal-stock-alert on-demand">
        <div class="stock-alert-icon"><i class="fa-solid fa-hammer"></i></div>
        <div>
          <strong>🛠️ Produção Sob Encomenda</strong>
          <div style="font-size: 0.78rem; opacity: 0.95; margin-top: 2px;">
            Impressão 3D de alta resolução fabricada especialmente para você na cor e tamanho que preferir.
          </div>
        </div>
      </div>
    `;
  }

  let modalActionsHtml = "";
  if (isOrderOnly) {
    const orderMsg = `Olá! Vi o produto sob encomenda "${item.title}" (${item.price}) no site da Cube Forge e gostaria de encomendar! Poderia me passar prazos e opções de personalização?`;
    const orderZapUrl = createWhatsappUrl(SITE_CONFIG.whatsappNumber, orderMsg);
    modalActionsHtml = `
      <a href="${orderZapUrl}" class="modal-direct-btn modal-encomenda-main-btn" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-whatsapp"></i> Encomendar esta Peça no WhatsApp
      </a>
      <button class="modal-cart-btn" onclick="addToCart(${item.id}, 1, this); closeProductModal();">
        <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
      </button>
    `;
  } else {
    modalActionsHtml = `
      <button type="button" class="modal-buy-online-btn" onclick="buySingleProductOnline(${item.id}, event)">
        <i class="fa-solid fa-credit-card"></i> Comprar Online • Até 12x no Cartão
      </button>
      <button class="modal-cart-btn" onclick="addToCart(${item.id}, 1, this); closeProductModal();">
        <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
      </button>
      <a href="${whatsappUrl}" class="modal-direct-btn" target="_blank" rel="noopener noreferrer">
        <i class="fa-brands fa-whatsapp"></i> Pedir Direto no WhatsApp
      </a>
    `;
  }

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
      
      ${stockAlert}

      <div class="modal-note-box">
        <i class="fa-solid fa-palette"></i>
        <span>Peça personalizada sob demanda na cor que você preferir!</span>
      </div>

      <div class="modal-actions-container">
        ${modalActionsHtml}
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
 * Showroom Panorâmico Multi-Produtos no Desktop (Vitrine de Peças Prontas)
 * Renderiza múltiplos cards em formato 3:4 simultâneos, com paginação fluida,
 * transição suave de 8.5 segundos e pausa absoluta garantida ao passar o mouse.
 */
let currentShowroomPage = 0;
let showroomAutoplayTimer = null;
let isShowroomHovered = false;

function stopShowroomAutoplay() {
  if (showroomAutoplayTimer) {
    clearInterval(showroomAutoplayTimer);
    showroomAutoplayTimer = null;
  }
}

function setupHeroSlider() {
  const showroomHub = document.getElementById("desktop-showroom-hub");
  const track = document.getElementById("showroom-cards-track");
  const pageText = document.getElementById("showroom-page-text");
  const prevBtn = document.getElementById("showroom-prev-btn");
  const nextBtn = document.getElementById("showroom-next-btn");

  if (!track) return;
  // Em celulares (< 992px), o showroom do desktop está oculto; evita autoplay e processamento desnecessário
  if (window.innerWidth < 992) {
    stopShowroomAutoplay();
    return;
  }

  // Interrompe qualquer temporizador anterior imediatamente para evitar duplicação ou conflito
  stopShowroomAutoplay();

  const allAvailable = (CATALOG_ITEMS && CATALOG_ITEMS.length > 0) ? CATALOG_ITEMS : ALL_PRODUCTS;
  if (!allAvailable || allAvailable.length === 0) return;

  // Filtra apenas os produtos ativos com destaque habilitado no Pages CMS
  let showroomItems = allAvailable.filter(item => item.destaque !== false);
  if (showroomItems.length === 0) {
    // Fallback de segurança: se nenhum produto estiver marcado, exibe todos os disponíveis do catálogo
    showroomItems = allAvailable;
  }

  // Renderiza todos os cards dos produtos em destaque em formato 3:4
  track.innerHTML = showroomItems.map((item) => {
    const isOrderOnly = Boolean(item.somente_encomenda);
    const isReady = !isOrderOnly && item.estoque > 0;
    let stockPill = "";
    if (isOrderOnly) {
      stockPill = `<span class="stock-pill order-only">📦 Somente sob Encomenda</span>`;
    } else if (isReady) {
      stockPill = `<span class="stock-pill in-stock" title="Temos ${item.estoque} unidade(s) pronta(s) para envio imediato!"><span class="stock-pulse-dot"></span> ⚡ ${item.estoque === 1 ? '1 pronta' : item.estoque + ' prontas'}</span>`;
    } else {
      stockPill = `<span class="stock-pill on-demand">🛠️ Sob Encomenda</span>`;
    }

    let actionsHtml = "";
    if (isOrderOnly) {
      actionsHtml = `
        <div class="showroom-card-actions">
          <button class="btn-card-cart" onclick="event.stopPropagation(); addToCart(${item.id}, 1, this)" title="Adicionar ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> <span>+ Carrinho</span>
          </button>
          <button class="btn-card-direct" onclick="event.stopPropagation(); openProductModal(${item.id})" title="Ver detalhes">
            <i class="fa-solid fa-eye"></i> <span>Detalhes</span>
          </button>
          <button type="button" class="btn-card-order-zap showroom-order-btn" onclick="event.stopPropagation(); orderEncomendaFromCard(${item.id})" title="Encomendar via WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> <span>Encomendar</span>
          </button>
        </div>
      `;
    } else {
      actionsHtml = `
        <div class="showroom-card-actions">
          <button class="btn-card-cart" onclick="event.stopPropagation(); addToCart(${item.id}, 1, this)" title="Adicionar ao carrinho">
            <i class="fa-solid fa-cart-plus"></i> <span>+ Carrinho</span>
          </button>
          <button class="btn-card-direct" onclick="event.stopPropagation(); orderDirectFromCard(${item.id})" title="Pedir no WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> <span>Pedir</span>
          </button>
          <button type="button" class="btn-card-buy-online showroom-buy-btn" onclick="event.stopPropagation(); buySingleProductOnline(${item.id}, event)" title="Comprar online no Pix ou Cartão em até 12x">
            <i class="fa-solid fa-credit-card"></i> <span>Comprar Online • Até 12x no Cartão</span>
          </button>
        </div>
      `;
    }

    return `
    <div class="showroom-product-card" data-id="${item.id}">
      <div class="showroom-card-media" onclick="openProductModal(${item.id})" title="Clique para ver detalhes de ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="card-media-badges">
          <span class="card-category-pill"><i class="${item.icon}"></i> ${item.categoryName}</span>
          ${stockPill}
        </div>
        <span class="card-price-pill">${item.price}</span>
      </div>
      <div class="showroom-card-info">
        <h4 class="showroom-card-title" onclick="openProductModal(${item.id})" title="${item.title}">${item.title}</h4>
        <p class="showroom-card-desc">${item.desc}</p>
        ${actionsHtml}
      </div>
    </div>
  `;
  }).join("");

  window.orderDirectFromCard = function(itemId) {
    const item = allAvailable.find((p) => p.id === itemId) || (CATALOG_ITEMS && CATALOG_ITEMS.find((p) => p.id === itemId));
    if (!item) return;
    const quoteMsg = SITE_CONFIG.catalogWhatsappMsg
      .replace("{item}", item.title)
      .replace("{price}", item.price);
    const url = createWhatsappUrl(SITE_CONFIG.whatsappNumber, quoteMsg);
    window.open(url, "_blank");
  };

  window.orderEncomendaFromCard = function(itemId) {
    const item = allAvailable.find((p) => p.id === itemId) || (CATALOG_ITEMS && CATALOG_ITEMS.find((p) => p.id === itemId));
    if (!item) return;
    const quoteMsg = `Olá! Vi o produto sob encomenda "${item.title}" (${item.price}) no site da Cube Forge e gostaria de encomendar! Poderia me passar os prazos e opções?`;
    const url = createWhatsappUrl(SITE_CONFIG.whatsappNumber, quoteMsg);
    window.open(url, "_blank");
  };

  function getCardsPerView() {
    return window.innerWidth >= 1200 ? 3 : 2;
  }

  function getTotalPages() {
    const cardsPerView = getCardsPerView();
    return Math.max(1, Math.ceil(showroomItems.length / cardsPerView));
  }

  function updateShowroom() {
    const totalPages = getTotalPages();
    if (currentShowroomPage >= totalPages) currentShowroomPage = 0;
    if (currentShowroomPage < 0) currentShowroomPage = totalPages - 1;

    // Se houver apenas 1 página, fixa na posição 0 e desativa as setas
    if (totalPages <= 1) {
      track.style.transform = "translateX(0px)";
      if (pageText) pageText.textContent = "1 / 1";
      if (prevBtn) {
        prevBtn.style.opacity = "0.35";
        prevBtn.style.pointerEvents = "none";
      }
      if (nextBtn) {
        nextBtn.style.opacity = "0.35";
        nextBtn.style.pointerEvents = "none";
      }
      stopShowroomAutoplay();
      return;
    }

    // Restaura setas ativas para 2 ou mais páginas
    if (prevBtn) {
      prevBtn.style.opacity = "1";
      prevBtn.style.pointerEvents = "auto";
    }
    if (nextBtn) {
      nextBtn.style.opacity = "1";
      nextBtn.style.pointerEvents = "auto";
    }

    // Deslocamento por página: 100% da viewport + gap (14px)
    track.style.transform = `translateX(calc(-${currentShowroomPage} * (100% + 14px)))`;

    if (pageText) {
      pageText.textContent = `${currentShowroomPage + 1} / ${totalPages}`;
    }
  }

  function nextShowroomPage() {
    const totalPages = getTotalPages();
    if (totalPages <= 1) return;
    currentShowroomPage = (currentShowroomPage + 1) % totalPages;
    updateShowroom();
  }

  function prevShowroomPage() {
    const totalPages = getTotalPages();
    if (totalPages <= 1) return;
    currentShowroomPage = (currentShowroomPage - 1 + totalPages) % totalPages;
    updateShowroom();
  }

  function startAutoplay() {
    stopShowroomAutoplay();
    // Não inicia autoplay se o mouse estiver em cima ou se houver apenas 1 página
    if (isShowroomHovered) return;
    if (getTotalPages() <= 1) return;

    // Tempo ajustado: 8.5 segundos (8500ms) para leitura confortável sem pressa
    showroomAutoplayTimer = setInterval(() => {
      if (isShowroomHovered) {
        stopShowroomAutoplay();
        return;
      }
      nextShowroomPage();
    }, 8500);
  }

  function resetAutoplay() {
    stopShowroomAutoplay();
    if (!isShowroomHovered && getTotalPages() > 1) {
      startAutoplay();
    }
  }

  // Registra eventos do mouse e controles uma única vez
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

    // Pausa garantida sempre que o mouse estiver sobre o showroom ou sobre qualquer produto
    if (showroomHub) {
      showroomHub.addEventListener("mouseenter", () => {
        isShowroomHovered = true;
        stopShowroomAutoplay();
      });

      showroomHub.addEventListener("mouseleave", () => {
        isShowroomHovered = false;
        resetAutoplay();
      });

      // Suporte a foco de navegação por teclado e acessibilidade
      showroomHub.addEventListener("focusin", () => {
        isShowroomHovered = true;
        stopShowroomAutoplay();
      });

      showroomHub.addEventListener("focusout", (e) => {
        if (!showroomHub.contains(e.relatedTarget)) {
          isShowroomHovered = false;
          resetAutoplay();
        }
      });
    }

    window.addEventListener("resize", () => {
      updateShowroom();
    });
  }

  updateShowroom();
  resetAutoplay();
}

/**
 * ============================================================================
 * FAQ ACORDEÃO COM TRANSIÇÃO ULTRA-SUAVE
 * ============================================================================
 */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    // Sincronizar estado inicial se o item já vem com [open] no HTML
    if (item.hasAttribute("open") && !item.classList.contains("faq-open")) {
      item.classList.add("faq-open");
    }

    const summary = item.querySelector("summary");
    if (!summary) return;

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      // Cancelar timer de fechamento pendente caso o usuário clique rapidamente
      if (item._faqCloseTimer) {
        clearTimeout(item._faqCloseTimer);
        item._faqCloseTimer = null;
      }

      const isOpen = item.classList.contains("faq-open");

      if (isOpen) {
        // Suavemente recolhe via CSS Grid (1fr -> 0fr)
        item.classList.remove("faq-open");
        
        // Remove o atributo 'open' nativo apenas quando a altura já tiver zerado suavemente
        item._faqCloseTimer = setTimeout(() => {
          item.removeAttribute("open");
          item._faqCloseTimer = null;
        }, 340);
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
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\u00a0/g, " ");
}

function syncCartWithCatalog() {
  if (!Array.isArray(cart) || cart.length === 0) return;
  const pool = (ALL_PRODUCTS && ALL_PRODUCTS.length > 0) ? ALL_PRODUCTS : FALLBACK_CATALOG_ITEMS;
  let changed = false;
  cart.forEach(item => {
    const prod = pool.find(p => p.id === item.id);
    if (prod) {
      const orderOnly = Boolean(prod.somente_encomenda);
      if (item.somente_encomenda !== orderOnly) {
        item.somente_encomenda = orderOnly;
        changed = true;
      }
      if (item.estoque !== (prod.estoque || 0)) {
        item.estoque = prod.estoque || 0;
        changed = true;
      }
    }
  });
  if (changed) {
    try {
      localStorage.setItem("cubeforge_cart", JSON.stringify(cart));
    } catch (_) {}
  }
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
  syncCartWithCatalog();
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
    existing.estoque = product.estoque || 0;
    existing.somente_encomenda = Boolean(product.somente_encomenda);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice: parseItemPrice(product.price),
      image: product.image,
      icon: product.icon,
      categoryName: product.categoryName,
      estoque: product.estoque || 0,
      somente_encomenda: Boolean(product.somente_encomenda),
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
  const notesInput = document.getElementById("cart-custom-notes");
  if (notesInput) notesInput.value = "";
  updateCartNotesValidation();
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

  // Total Estimado no cabeçalho e resumos
  const totalDisplay = document.getElementById("cart-total-display");
  if (totalDisplay) {
    totalDisplay.textContent = formatBRL(totalPrice);
  }

  // Rodapé Fixo Slim Estilo iFood (Total e Quantidade)
  const fixedTotalDisplay = document.getElementById("cart-fixed-total-display");
  if (fixedTotalDisplay) {
    fixedTotalDisplay.textContent = formatBRL(totalPrice);
  }

  const fixedCountDisplay = document.getElementById("cart-fixed-count-display");
  if (fixedCountDisplay) {
    fixedCountDisplay.textContent = `/ ${totalCount} ${totalCount === 1 ? "item" : "itens"}`;
  }

  // Resumo de Valores Integrado à Rolagem
  const scrollSummaryTotal = document.getElementById("scroll-summary-items-total");
  if (scrollSummaryTotal) {
    scrollSummaryTotal.textContent = formatBRL(totalPrice);
  }

  // Lista de itens no corpo do carrinho
  const container = document.getElementById("cart-items-container");
  const footerPanel = document.getElementById("cart-footer-panel");
  const step1BottomContent = document.getElementById("cart-step1-bottom-content");
  const btnHeaderClean = document.getElementById("btn-header-clean");

  if (!container) return;

  if (cart.length === 0) {
    if (typeof setCartStep === "function") setCartStep(1);
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
    if (step1BottomContent) step1BottomContent.style.display = "none";
    if (btnHeaderClean) btnHeaderClean.style.display = "none";
  } else {
    if (footerPanel) footerPanel.style.display = "flex";
    if (step1BottomContent) step1BottomContent.style.display = "flex";
    if (btnHeaderClean) {
      btnHeaderClean.style.display = (currentCartStep === 1) ? "inline-block" : "none";
    }

    container.innerHTML = cart.map(item => {
      const imgContent = item.image 
        ? `<img src="${item.image}" alt="${item.title}">` 
        : `<i class="${item.icon}"></i>`;
      const itemSubtotal = formatBRL(item.numericPrice * item.quantity);

      let stockTagHtml = "";
      if (item.somente_encomenda) {
        stockTagHtml = `<span class="cart-item-stock-tag order-only">📦 Somente sob Encomenda</span>`;
      } else if (item.estoque > 0) {
        stockTagHtml = `<span class="cart-item-stock-tag">⚡ Pronta Entrega (${item.estoque} disp.)</span>`;
      }

      return `
        <div class="cart-item-card">
          <div class="cart-item-img">
            ${imgContent}
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-unit-price">${item.price} cada</div>
            ${stockTagHtml}
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

  updateCartValidation();
  if (currentCartStep === 2 && typeof renderCartStep2 === "function") renderCartStep2();
  if (currentCartStep === 3 && typeof renderCartStep3 === "function") renderCartStep3();
}


/**
 * ============================================================================
 * GERENCIADOR DE ETAPAS DO CARRINHO (3 ETAPAS: ITENS -> PAGAMENTO -> ENTREGA)
 * ============================================================================
 */
let currentCartStep = 1;

function setCartStep(step) {
  currentCartStep = step;
  const drawer = document.getElementById("cart-drawer");
  const backBtn = document.getElementById("cart-back-step-btn");
  const pill1 = document.getElementById("cart-step-pill-1");
  const pill2 = document.getElementById("cart-step-pill-2");
  const pill3 = document.getElementById("cart-step-pill-3");
  const titleText = document.getElementById("cart-header-title-text");
  const btnHeaderClean = document.getElementById("btn-header-clean");

  if (drawer) {
    drawer.setAttribute("data-current-step", String(step));
  }

  // Pílula 1: Itens
  if (pill1) {
    pill1.classList.toggle("active", step === 1);
    pill1.setAttribute("aria-selected", step === 1 ? "true" : "false");
    const badge1 = pill1.querySelector(".step-badge");
    if (badge1) badge1.innerHTML = step > 1 ? '<i class="fa-solid fa-check"></i>' : '1';
  }

  // Pílula 2: Pagamento
  if (pill2) {
    pill2.classList.toggle("active", step === 2);
    pill2.setAttribute("aria-selected", step === 2 ? "true" : "false");
    const badge2 = pill2.querySelector(".step-badge");
    if (badge2) badge2.innerHTML = step > 2 ? '<i class="fa-solid fa-check"></i>' : '2';
  }

  // Pílula 3: Entrega & Frete Correios
  if (pill3) {
    pill3.classList.toggle("active", step === 3);
    pill3.setAttribute("aria-selected", step === 3 ? "true" : "false");
    const badge3 = pill3.querySelector(".step-badge");
    if (badge3) badge3.innerHTML = '3';
  }

  if (step === 1) {
    if (backBtn) backBtn.style.display = "none";
    if (titleText) titleText.textContent = "Meu Carrinho";
    if (btnHeaderClean) btnHeaderClean.style.display = (cart && cart.length > 0) ? "inline-block" : "none";
  } else if (step === 2) {
    if (!cart || cart.length === 0) {
      setCartStep(1);
      return;
    }
    if (backBtn) backBtn.style.display = "inline-flex";
    if (titleText) titleText.textContent = "Forma de Pagamento";
    if (btnHeaderClean) btnHeaderClean.style.display = "none";
    renderCartStep2();
    const paymentBody = document.querySelector(".cart-payment-body");
    if (paymentBody) paymentBody.scrollTop = 0;
  } else if (step === 3) {
    if (!cart || cart.length === 0) {
      setCartStep(1);
      return;
    }
    if (backBtn) backBtn.style.display = "inline-flex";
    if (titleText) titleText.textContent = "Entrega & Checkout";
    if (btnHeaderClean) btnHeaderClean.style.display = "none";
    renderCartStep3();
    const deliveryBody = document.querySelector(".cart-delivery-body");
    if (deliveryBody) deliveryBody.scrollTop = 0;
  }

  updateCartValidation();
}

let selectedShippingOption = null;
let lastCalculatedQuotes = [];
let isCalculatingShipping = false;

/**
 * Tabela Oficial de Frete Correios (SEDEX e PAC)
 * Calcula valores e prazos reais com base no estado e cidade de destino.
 */
function getRegionalShippingQuotes(destCep, addressData) {
  const cleanCep = (destCep || "").replace(/\D/g, "");
  const uf = (addressData && addressData.uf ? addressData.uf.toUpperCase() : "ES");
  
  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0) || 1;
  const extraWeightFactor = Math.max(0, (totalUnits - 1) * 1.50);

  const quotes = [];

  // Somente Correios (SEDEX e PAC)
  if (uf === "ES") {
    quotes.push({
      id: "correios_sedex",
      name: "SEDEX",
      company: "Correios",
      price: +(15.90 + extraWeightFactor * 0.8).toFixed(2),
      days: "1 a 2 dias úteis",
      tag: "Mais Rápido",
      desc: "Envio prioritário dos Correios com rastreamento oficial"
    });
    quotes.push({
      id: "correios_pac",
      name: "PAC",
      company: "Correios",
      price: +(13.50 + extraWeightFactor * 0.6).toFixed(2),
      days: "2 a 4 dias úteis",
      tag: "Econômico",
      desc: "Envio econômico dos Correios com rastreamento oficial"
    });
  } else if (["SP", "RJ", "MG"].includes(uf)) {
    // Sudeste
    quotes.push({
      id: "correios_sedex",
      name: "SEDEX",
      company: "Correios",
      price: +(28.90 + extraWeightFactor * 1.8).toFixed(2),
      days: "2 a 3 dias úteis",
      tag: "Mais Rápido",
      desc: "Envio prioritário dos Correios com rastreamento oficial"
    });
    quotes.push({
      id: "correios_pac",
      name: "PAC",
      company: "Correios",
      price: +(21.50 + extraWeightFactor * 1.2).toFixed(2),
      days: "4 a 6 dias úteis",
      tag: "Econômico",
      desc: "Envio econômico dos Correios com rastreamento oficial"
    });
  } else if (["PR", "SC", "RS", "DF", "GO", "MS", "MT"].includes(uf)) {
    // Sul e Centro-Oeste
    quotes.push({
      id: "correios_sedex",
      name: "SEDEX",
      company: "Correios",
      price: +(42.90 + extraWeightFactor * 2.2).toFixed(2),
      days: "3 a 4 dias úteis",
      tag: "Mais Rápido",
      desc: "Envio prioritário dos Correios com rastreamento oficial"
    });
    quotes.push({
      id: "correios_pac",
      name: "PAC",
      company: "Correios",
      price: +(27.90 + extraWeightFactor * 1.4).toFixed(2),
      days: "6 a 9 dias úteis",
      tag: "Econômico",
      desc: "Envio econômico dos Correios com rastreamento oficial"
    });
  } else if (["BA", "PE", "CE", "PB", "RN", "AL", "SE", "MA", "PI"].includes(uf)) {
    // Nordeste
    quotes.push({
      id: "correios_sedex",
      name: "SEDEX",
      company: "Correios",
      price: +(48.90 + extraWeightFactor * 2.4).toFixed(2),
      days: "3 a 5 dias úteis",
      tag: "Mais Rápido",
      desc: "Envio prioritário dos Correios com rastreamento oficial"
    });
    quotes.push({
      id: "correios_pac",
      name: "PAC",
      company: "Correios",
      price: +(29.90 + extraWeightFactor * 1.5).toFixed(2),
      days: "7 a 10 dias úteis",
      tag: "Econômico",
      desc: "Envio econômico dos Correios com rastreamento oficial"
    });
  } else {
    // Norte
    quotes.push({
      id: "correios_sedex",
      name: "SEDEX",
      company: "Correios",
      price: +(68.90 + extraWeightFactor * 3.0).toFixed(2),
      days: "4 a 6 dias úteis",
      tag: "Mais Rápido",
      desc: "Envio prioritário dos Correios com rastreamento oficial"
    });
    quotes.push({
      id: "correios_pac",
      name: "PAC",
      company: "Correios",
      price: +(38.90 + extraWeightFactor * 1.6).toFixed(2),
      days: "10 a 16 dias úteis",
      tag: "Econômico",
      desc: "Envio econômico dos Correios com rastreamento oficial"
    });
  }

  return quotes;
}

/**
 * Consulta a API do Melhor Envio (se token estiver configurado)
 */
async function requestMelhorEnvioApi(destCep, addressData) {
  const token = SITE_CONFIG.melhorEnvioToken;
  if (!token) return null;

  const originCep = (SITE_CONFIG.cepOrigem || "29101010").replace(/\D/g, "");
  const cleanDestCep = destCep.replace(/\D/g, "");
  const baseUrl = SITE_CONFIG.melhorEnvioSandbox 
    ? "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate"
    : "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

  const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0) || 1;
  const payload = {
    from: { postal_code: originCep },
    to: { postal_code: cleanDestCep },
    package: {
      height: Math.min(60, 10 + totalUnits * 2),
      width: 16,
      length: Math.min(60, 16 + totalUnits * 3),
      weight: Math.min(10, Math.max(0.35, totalUnits * 0.25))
    },
    options: {
      receipt: false,
      own_hand: false
    }
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const valid = data.filter(s => {
        if (s.error) return false;
        const price = parseFloat(s.custom_price || s.price);
        if (isNaN(price) || price <= 0) return false;
        // Filtro estrito: Somente serviços oficiais dos Correios (SEDEX e PAC)
        const comp = (s.company && s.company.name) ? s.company.name.toLowerCase() : "";
        const svc = (s.name || "").toLowerCase();
        return comp.includes("correios") || svc.includes("sedex") || svc.includes("pac");
      });
      if (valid.length > 0) {
        return valid.map((s, idx) => ({
          id: `melhor_${s.id || idx}`,
          name: s.name,
          company: "Correios",
          price: parseFloat(s.custom_price || s.price),
          days: (s.custom_delivery_time || s.delivery_time) ? `${s.custom_delivery_time || s.delivery_time} dias úteis` : "A consultar",
          tag: /sedex/i.test(s.name) ? "Mais Rápido" : "Econômico",
          desc: "Cotação oficial dos Correios via Melhor Envio"
        }));
      }
    }
  } catch (err) {
    console.warn("Aviso ao conectar na API do Melhor Envio (usando cotação inteligente de mercado):", err);
  }
  return null;
}

/**
 * Calcula frete via CEP com preenchimento automático do endereço
 */
async function calculateShippingForCart(targetCep, autoTriggered = false) {
  const cleanCep = (targetCep || "").replace(/\D/g, "");
  const feedbackEl = document.getElementById("cep-feedback-msg");
  const optionsWrapper = document.getElementById("shipping-options-wrapper");
  const addressWrapper = document.getElementById("address-details-wrapper");
  const btnCalc = document.getElementById("btn-calc-cep");
  const spinner = btnCalc ? btnCalc.querySelector(".btn-cep-spinner") : null;
  const icon = btnCalc ? btnCalc.querySelector(".btn-cep-icon") : null;
  const btnText = btnCalc ? btnCalc.querySelector(".btn-cep-text") : null;
  const cityInput = document.getElementById("checkout-cust-city");

  if (cleanCep.length !== 8) {
    if (!autoTriggered && feedbackEl) {
      feedbackEl.style.display = "block";
      feedbackEl.className = "cep-feedback-msg error";
      feedbackEl.textContent = "Digite o CEP completo com 8 números.";
    }
    if (cityInput) cityInput.value = "";
    if (optionsWrapper) optionsWrapper.style.display = "none";
    selectedShippingOption = null;
    renderCartStep3();
    return;
  }

  if (isCalculatingShipping) return;
  isCalculatingShipping = true;

  if (spinner) spinner.style.display = "inline-block";
  if (icon) icon.style.display = "none";
  if (btnText) btnText.textContent = "Calculando...";
  if (feedbackEl) {
    feedbackEl.style.display = "block";
    feedbackEl.className = "cep-feedback-msg loading";
    feedbackEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Localizando cidade e calculando frete Correios...';
  }

  try {
    // 1. Consulta ViaCEP para obter Cidade, Estado e validação oficial
    const viaCepRes = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    if (!viaCepRes.ok) throw new Error("Erro ao consultar CEP");
    const addressData = await viaCepRes.json();

    const streetInput = document.getElementById("checkout-cust-street");
    const bairroInput = document.getElementById("checkout-cust-bairro");
    const numberInput = document.getElementById("checkout-cust-number");
    const syncStatusText = document.getElementById("address-sync-status-text");

    if (addressData.erro) {
      if (feedbackEl) {
        feedbackEl.style.display = "block";
        feedbackEl.className = "cep-feedback-msg error";
        feedbackEl.textContent = "CEP não encontrado. Por favor, confira os números digitados.";
      }
      if (cityInput) cityInput.value = "";
      if (optionsWrapper) optionsWrapper.style.display = "none";
      selectedShippingOption = null;
      renderCartStep3();
      return;
    }

    // Preenche Cidade e Estado (UF) e BLOQUEIA para alteração manual conforme solicitado
    if (cityInput) {
      cityInput.value = `${addressData.localidade} - ${addressData.uf}`;
      cityInput.readOnly = true;
      cityInput.setAttribute("readonly", "readonly");
    }

    // Preenche Rua e Bairro como sugestão automática, mantendo-os 100% editáveis pelo cliente
    if (streetInput && addressData.logradouro) {
      streetInput.value = addressData.logradouro;
    }
    if (bairroInput && addressData.bairro) {
      bairroInput.value = addressData.bairro;
    }

    if (syncStatusText) {
      syncStatusText.textContent = "Endereço localizado pelo CEP (Cidade e Estado definidos automaticamente):";
    }

    if (addressWrapper) addressWrapper.style.display = "block";

    if (feedbackEl) {
      feedbackEl.style.display = "block";
      feedbackEl.className = "cep-feedback-msg success";
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>${addressData.localidade} - ${addressData.uf}</strong> localizado com sucesso!`;
    }

    // 2. Calcula opções de frete exclusivas dos Correios (SEDEX e PAC)
    let quotes = await requestMelhorEnvioApi(cleanCep, addressData);
    if (!quotes || quotes.length === 0) {
      quotes = getRegionalShippingQuotes(cleanCep, addressData);
    }

    lastCalculatedQuotes = quotes;
    renderShippingOptionsList(quotes);

    // Salva dados no localStorage
    saveCustomerDeliveryData(getCustomerDeliveryData());

    // Se o número ainda estiver em branco, move foco suave para o campo de número
    if (numberInput && !numberInput.value.trim()) {
      setTimeout(() => numberInput.focus(), 250);
    }
  } catch (err) {
    console.warn("Erro no cálculo do frete:", err);
    if (feedbackEl) {
      feedbackEl.style.display = "block";
      feedbackEl.className = "cep-feedback-msg error";
      feedbackEl.textContent = "Não foi possível calcular o frete agora. Tente novamente ou use o WhatsApp.";
    }
  } finally {
    isCalculatingShipping = false;
    if (spinner) spinner.style.display = "none";
    if (icon) icon.style.display = "inline-block";
    if (btnText) btnText.textContent = "Calcular";
  }
}

/**
 * Renderiza cards de opções de frete selecionáveis
 */
function renderShippingOptionsList(quotes) {
  const container = document.getElementById("shipping-options-list");
  const wrapper = document.getElementById("shipping-options-wrapper");
  if (!container || !wrapper) return;

  if (!quotes || quotes.length === 0) {
    wrapper.style.display = "none";
    return;
  }

  wrapper.style.display = "block";

  // Se já havia uma opção selecionada do mesmo tipo, preserva
  if (!selectedShippingOption || !quotes.some(q => q.id === selectedShippingOption.id)) {
    // Escolhe por padrão a mais rápida ou a primeira
    selectedShippingOption = quotes[0];
  }

  container.innerHTML = quotes.map(q => {
    const isSelected = selectedShippingOption && selectedShippingOption.id === q.id;
    const priceFormatted = q.price === 0 ? "Grátis" : formatBRL(q.price);
    const priceClass = q.price === 0 ? "shipping-price-badge free" : "shipping-price-badge";

    return `
      <div class="shipping-card-option ${isSelected ? "selected" : ""}" data-shipping-id="${q.id}" onclick="selectShippingOption('${q.id}')" role="radio" aria-checked="${isSelected}">
        <div class="shipping-card-left">
          <div class="shipping-radio-circle"></div>
          <div class="shipping-card-info">
            <div class="shipping-card-top-row">
              <span class="shipping-carrier-pill">${q.company}</span>
              <span class="shipping-service-name">${q.name}</span>
            </div>
            <span class="shipping-delivery-days"><i class="fa-regular fa-clock"></i> ${q.days}</span>
          </div>
        </div>
        <span class="${priceClass}">${priceFormatted}</span>
      </div>
    `;
  }).join("");

  renderCartStep3();
}

window.selectShippingOption = function(optionId) {
  const quote = lastCalculatedQuotes.find(q => q.id === optionId);
  if (!quote) return;

  selectedShippingOption = quote;

  // Atualiza classes visuais
  const cards = document.querySelectorAll(".shipping-card-option");
  cards.forEach(card => {
    const id = card.getAttribute("data-shipping-id");
    if (id === optionId) {
      card.classList.add("selected");
      card.setAttribute("aria-checked", "true");
    } else {
      card.classList.remove("selected");
      card.setAttribute("aria-checked", "false");
    }
  });

  renderCartStep3();
};

function saveCustomerDeliveryData(data) {
  try {
    localStorage.setItem("cubeforge_customer_data", JSON.stringify(data));
  } catch (e) {}
}

function getCustomerDeliveryData() {
  const getVal = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  };
  return {
    name: getVal("checkout-cust-name"),
    phone: getVal("checkout-cust-phone"),
    cep: getVal("checkout-cust-cep"),
    street: getVal("checkout-cust-street"),
    number: getVal("checkout-cust-number"),
    comp: getVal("checkout-cust-comp"),
    bairro: getVal("checkout-cust-bairro"),
    city: getVal("checkout-cust-city")
  };
}

function highlightFieldError(element, message) {
  if (!element) return;
  element.classList.remove("field-error-shake");
  void element.offsetWidth;
  element.classList.add("field-error-shake");
  try {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (e) {}
  element.focus();
  setTimeout(() => {
    element.classList.remove("field-error-shake");
  }, 1400);
  if (message) {
    showCartToast(message, "remove", "Preenchimento obrigatório");
  }
}

function loadSavedCustomerData() {
  try {
    const raw = localStorage.getItem("cubeforge_customer_data");
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return;

    const nameInput = document.getElementById("checkout-cust-name");
    const phoneInput = document.getElementById("checkout-cust-phone");
    const cepInput = document.getElementById("checkout-cust-cep");
    const streetInput = document.getElementById("checkout-cust-street");
    const numberInput = document.getElementById("checkout-cust-number");
    const compInput = document.getElementById("checkout-cust-comp");
    const bairroInput = document.getElementById("checkout-cust-bairro");
    const cityInput = document.getElementById("checkout-cust-city");
    const addressWrapper = document.getElementById("address-details-wrapper");

    if (nameInput && data.name) nameInput.value = data.name;
    if (phoneInput && data.phone) phoneInput.value = data.phone;
    if (cepInput && data.cep) {
      cepInput.value = data.cep;
      if (streetInput && data.street) streetInput.value = data.street;
      if (numberInput && data.number) numberInput.value = data.number;
      if (compInput && data.comp) compInput.value = data.comp;
      if (bairroInput && data.bairro) bairroInput.value = data.bairro;
      if (cityInput && data.city) cityInput.value = data.city;
      if (addressWrapper && (data.street || data.number)) addressWrapper.style.display = "block";

      // Pré-calcula frete se CEP salvo for válido
      const cleanCep = data.cep.replace(/\D/g, "");
      if (cleanCep.length === 8) {
        calculateShippingForCart(cleanCep, true);
      }
    }
  } catch (e) {}
}

function initDeliveryAndShippingEvents() {
  const phoneInput = document.getElementById("checkout-cust-phone");
  const cepInput = document.getElementById("checkout-cust-cep");
  const btnCalcCep = document.getElementById("btn-calc-cep");
  const cityInput = document.getElementById("checkout-cust-city");

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
      } else if (v.length > 2) {
        e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      } else if (v.length > 0) {
        e.target.value = `(${v}`;
      } else {
        e.target.value = "";
      }
    });
  }

  // O CEP é obrigatório e preenche automaticamente Cidade e Estado (que ficam bloqueadas)
  if (cepInput) {
    cepInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "");
      if (v.length > 8) v = v.slice(0, 8);
      if (v.length > 5) {
        e.target.value = `${v.slice(0, 5)}-${v.slice(5)}`;
      } else {
        e.target.value = v;
      }

      // Se o usuário apagar o CEP, limpa a cidade bloqueada e as opções de frete
      if (v.length < 8) {
        if (cityInput) cityInput.value = "";
        const shippingWrapper = document.getElementById("shipping-options-wrapper");
        if (shippingWrapper) shippingWrapper.style.display = "none";
        selectedShippingOption = null;
        renderCartStep3();
      }

      // Ao completar 8 dígitos, busca cidade/estado e calcula frete Correios imediatamente
      if (v.length === 8) {
        calculateShippingForCart(v, true);
      }
    });

    cepInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        calculateShippingForCart(cepInput.value, false);
      }
    });
  }

  if (btnCalcCep) {
    btnCalcCep.addEventListener("click", () => {
      if (cepInput) calculateShippingForCart(cepInput.value, false);
    });
  }

  // Se o cliente clicar no campo de Cidade bloqueado sem CEP, orienta amigavelmente
  if (cityInput) {
    cityInput.addEventListener("click", () => {
      if (!cityInput.value.trim()) {
        showCartToast("Digite o CEP acima para preencher a Cidade e Estado", "remove");
        if (cepInput) cepInput.focus();
      }
    });
  }

  // Auto-salva informações e remove alerta visual ao digitar nos campos editáveis
  // (Rua, Número, Complemento, Bairro continuam 100% editáveis pelo cliente)
  const monitoredFields = [
    "checkout-cust-name",
    "checkout-cust-phone",
    "checkout-cust-street",
    "checkout-cust-number",
    "checkout-cust-comp",
    "checkout-cust-bairro"
  ];
  monitoredFields.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        el.classList.remove("field-error-shake");
        saveCustomerDeliveryData(getCustomerDeliveryData());
      });
    }
  });

  loadSavedCustomerData();
}

function renderCartStep2() {
  const summaryPreview = document.getElementById("summary-items-preview");
  const summaryCount = document.getElementById("summary-items-count");
  const summarySubtotal = document.getElementById("summary-subtotal-amount");
  const conditionsBox = document.getElementById("cart-payment-conditions");

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cart.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);

  if (summaryCount) {
    summaryCount.textContent = totalCount + (totalCount === 1 ? " item" : " itens");
  }

  if (summarySubtotal) {
    summarySubtotal.textContent = formatBRL(itemsPrice);
  }

  if (summaryPreview) {
    summaryPreview.innerHTML = cart.map(item => {
      const imgHtml = item.image 
        ? `<img src="${item.image}" alt="${item.title}" class="summary-item-thumb">`
        : `<div class="summary-item-thumb" style="display:flex;align-items:center;justify-content:center;"><i class="${item.icon}"></i></div>`;
      return `
        <div class="summary-item-row">
          <div class="summary-item-left">
            ${imgHtml}
            <span class="summary-item-title">${item.title}</span>
          </div>
          <span class="summary-item-qty">${item.quantity}x</span>
          <span class="summary-item-price">${formatBRL(item.numericPrice * item.quantity)}</span>
        </div>
      `;
    }).join("");
  }

  if (conditionsBox) {
    const notesInput = document.getElementById("cart-custom-notes");
    const hasNotes = notesInput ? (notesInput.value.trim().length > 0) : false;
    const hasOrderOnly = cart.some(item => Boolean(item.somente_encomenda));

    let html = "";
    if (hasOrderOnly) {
      html += `
        <div class="cart-order-only-warning active" id="cart-order-only-warning" role="alert" aria-live="polite">
          <div class="cart-order-only-warning-header">
            <div class="cart-order-only-warning-icon">
              <i class="fa-solid fa-box-archive"></i>
            </div>
            <span class="cart-order-only-warning-title">Item Somente sob Encomenda no Carrinho</span>
          </div>
          <p class="cart-order-only-warning-text">
            Seu carrinho contém produto(s) <strong>somente sob encomenda</strong>. Para comprar online, remova o item sob encomenda, ou finalize seu pedido diretamente pelo <strong>WhatsApp</strong>.
          </p>
          <div class="cart-order-only-warning-pill">
            <i class="fa-solid fa-lock"></i> Pagamento online indisponível para encomendas
          </div>
        </div>
      `;
    }
    if (hasNotes) {
      html += `
        <div class="cart-notes-warning active" id="cart-notes-warning" role="alert" aria-live="polite">
          <div class="cart-notes-warning-header">
            <div class="cart-notes-warning-icon">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <span class="cart-notes-warning-title">Atenção para Pedidos Personalizados</span>
          </div>
          <p class="cart-notes-warning-text">
            Como seu pedido contém <strong>observações personalizadas</strong>, ele deve ser alinhado diretamente pelo <strong>WhatsApp</strong> para combinarmos cores, nomes e acabamentos.
          </p>
          <div class="cart-notes-warning-pill">
            <i class="fa-solid fa-lock"></i> Pagamento online desativado temporariamente
          </div>
        </div>
      `;
    }
    if (!hasOrderOnly && !hasNotes) {
      html += `
        <div class="payment-condition-box alert-ready">
          <div class="payment-condition-header">
            <i class="fa-solid fa-circle-check"></i>
            <span>Pronto para Finalizar</span>
          </div>
          <p>Você pode pagar online com segurança no <strong>Cartão em até 12x</strong> ou <strong>Pix</strong>, ou se preferir, pode finalizar direto pelo <strong>WhatsApp</strong>.</p>
        </div>
      `;
    }
    conditionsBox.innerHTML = html;
  }

  updateCartValidation();
}

function renderCartStep3() {
  const summaryCount = document.getElementById("summary-items-count-step3");
  const summarySubtotal = document.getElementById("summary-subtotal-amount-step3");
  const summaryShipping = document.getElementById("summary-shipping-amount");
  const summaryTotal = document.getElementById("summary-total-amount");

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cart.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);
  const shippingPrice = selectedShippingOption ? selectedShippingOption.price : 0;
  const grandTotal = itemsPrice + shippingPrice;

  if (summaryCount) {
    summaryCount.textContent = totalCount + (totalCount === 1 ? " item" : " itens");
  }

  if (summarySubtotal) {
    summarySubtotal.textContent = formatBRL(itemsPrice);
  }

  if (summaryShipping) {
    if (selectedShippingOption) {
      const priceText = selectedShippingOption.price === 0 ? "Grátis" : formatBRL(selectedShippingOption.price);
      summaryShipping.innerHTML = `${selectedShippingOption.company} ${selectedShippingOption.name} (<strong>${priceText}</strong>)`;
      summaryShipping.className = selectedShippingOption.price === 0 ? "shipping-amount-text free" : "shipping-amount-text";
    } else {
      summaryShipping.textContent = "Digite o CEP ou endereço acima";
      summaryShipping.className = "shipping-amount-text";
    }
  }

  if (summaryTotal) {
    summaryTotal.textContent = formatBRL(grandTotal);
  }

  // Atualiza também os totais da Etapa 1
  const step1Shipping = document.getElementById("step1-shipping-label");
  const cartTotalDisplay = document.getElementById("cart-total-display");
  const cartFixedTotal = document.getElementById("cart-fixed-total-display");

  if (step1Shipping) {
    if (selectedShippingOption) {
      step1Shipping.textContent = selectedShippingOption.price === 0 ? "Grátis" : formatBRL(selectedShippingOption.price);
    } else {
      step1Shipping.textContent = "A calcular na etapa de entrega ›";
    }
  }

  if (cartTotalDisplay) {
    cartTotalDisplay.textContent = formatBRL(grandTotal);
  }
  if (cartFixedTotal) {
    cartFixedTotal.textContent = formatBRL(grandTotal);
  }

  updateCartValidation();
}
window.renderCartStep3 = renderCartStep3;
window.setCartStep = setCartStep;

window.openCart = function() {
  if (SITE_SETTINGS.modo_manutencao) {
    applyMaintenanceMode(true);
    return;
  }
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    setCartStep(1);
    updateCartValidation();
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

/**
 * Valida o carrinho e atualiza avisos e estado do botão de checkout online:
 * - Se houver produtos "Somente sob Encomenda": exibe aviso específico e bloqueia compra online.
 * - Se houver observações digitadas: exibe aviso de personalização e bloqueia compra online.
 * - Se estiver limpo: habilita o botão para gerar o checkout unificado na InfinitePay.
 */
function updateCartValidation() {
  const notesInput = document.getElementById("cart-custom-notes");
  const notesWarningEl = document.getElementById("cart-notes-warning");
  const orderOnlyWarningEl = document.getElementById("cart-order-only-warning");
  const btnGotoCard = document.getElementById("btn-goto-card-checkout");
  const btnCheckoutJim = document.getElementById("btn-checkout-jim");

  const hasNotes = notesInput ? (notesInput.value.trim().length > 0) : false;
  const hasOrderOnly = cart.some(item => Boolean(item.somente_encomenda));

  // 1. Alerta de Item Somente sob Encomenda no Carrinho
  if (orderOnlyWarningEl) {
    if (hasOrderOnly) {
      orderOnlyWarningEl.classList.add("active");
    } else {
      orderOnlyWarningEl.classList.remove("active");
    }
  }

  // 2. Alerta de Observações Personalizadas
  if (notesWarningEl) {
    if (hasNotes) {
      notesWarningEl.classList.add("active");
    } else {
      notesWarningEl.classList.remove("active");
    }
  }

  // 3. Atualiza estado do botão de prosseguir para Cartão (Etapa 2)
  if (btnGotoCard) {
    if (hasOrderOnly) {
      btnGotoCard.classList.add("disabled");
      btnGotoCard.setAttribute("aria-disabled", "true");
      btnGotoCard.setAttribute("tabindex", "-1");
      btnGotoCard.innerHTML = '<i class="fa-solid fa-lock"></i> Pagamento Online Indisponível (Item sob Encomenda)';
      btnGotoCard.title = "Seu carrinho contém item(ns) sob encomenda. Remova-o(s) para pagar no cartão ou finalize seu pedido pelo WhatsApp.";
    } else if (hasNotes) {
      btnGotoCard.classList.add("disabled");
      btnGotoCard.setAttribute("aria-disabled", "true");
      btnGotoCard.setAttribute("tabindex", "-1");
      btnGotoCard.innerHTML = '<i class="fa-solid fa-lock"></i> Pagamento Online Indisponível (Use o WhatsApp)';
      btnGotoCard.title = "Pedidos com observações ou personalizações devem ser verificados e combinados pelo WhatsApp.";
    } else {
      btnGotoCard.classList.remove("disabled");
      btnGotoCard.removeAttribute("aria-disabled");
      btnGotoCard.setAttribute("tabindex", "0");
      btnGotoCard.innerHTML = '<i class="fa-solid fa-credit-card"></i> Pagar no Cartão ou Pix • Até 12x';
      btnGotoCard.title = "Avançar para informar entrega e pagar com cartão ou Pix";
    }
  }

  // 4. Atualiza estado e valor do botão de conclusão na InfinitePay (Etapa 3)
  if (btnCheckoutJim) {
    const itemsPrice = cart.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);
    const shippingPrice = selectedShippingOption ? selectedShippingOption.price : 0;
    const grandTotal = itemsPrice + shippingPrice;

    if (hasOrderOnly) {
      btnCheckoutJim.classList.add("disabled");
      btnCheckoutJim.setAttribute("aria-disabled", "true");
      btnCheckoutJim.setAttribute("tabindex", "-1");
      btnCheckoutJim.innerHTML = '<i class="fa-solid fa-lock"></i> Compra Online Indisponível (Item sob Encomenda)';
      btnCheckoutJim.title = "Seu carrinho contém item(ns) sob encomenda. Remova-o(s) para comprar online ou finalize seu pedido pelo WhatsApp.";
    } else if (hasNotes) {
      btnCheckoutJim.classList.add("disabled");
      btnCheckoutJim.setAttribute("aria-disabled", "true");
      btnCheckoutJim.setAttribute("tabindex", "-1");
      btnCheckoutJim.innerHTML = '<i class="fa-solid fa-lock"></i> Compra Online Indisponível (Use o WhatsApp)';
      btnCheckoutJim.title = "Pedidos com observações ou personalizações devem ser verificados e combinados pelo WhatsApp.";
    } else {
      btnCheckoutJim.classList.remove("disabled");
      btnCheckoutJim.removeAttribute("aria-disabled");
      btnCheckoutJim.setAttribute("tabindex", "0");
      btnCheckoutJim.innerHTML = `<i class="fa-solid fa-lock"></i> Concluir Pagamento de ${formatBRL(grandTotal)} na InfinitePay`;
      btnCheckoutJim.title = "Finalizar pedido com frete Correios no checkout da InfinitePay";
    }
  }
}
window.updateCartNotesValidation = updateCartValidation;

/**
 * Ao clicar em 'Comprar Online / Cartão' direto na tela inicial da página (ou modal/showroom),
 * adiciona o produto ao carrinho e direciona imediatamente para a tela de solicitação de dados,
 * endereço com Cidade/UF bloqueadas pelo CEP, frete Correios e checkout na InfinitePay.
 */
window.buySingleProductOnline = function(productId, e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (SITE_SETTINGS.modo_manutencao) {
    applyMaintenanceMode(true);
    return;
  }

  const product = CATALOG_ITEMS.find(p => p.id === productId) || ALL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Se o item for somente sob encomenda, redireciona para o WhatsApp de encomendas
  if (product.somente_encomenda) {
    orderEncomendaFromCard(productId);
    return;
  }

  // Fecha o modal de detalhes do produto se estiver aberto
  if (typeof closeProductModal === "function") {
    closeProductModal();
  }

  // Remove eventuais itens sob encomenda do carrinho para não bloquear o checkout online
  cart = cart.filter(item => !item.somente_encomenda);

  // Garante que o produto clicado está presente no carrinho
  const existing = cart.find(item => item.id === productId);
  if (!existing) {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      numericPrice: parseItemPrice(product.price),
      image: product.image,
      icon: product.icon,
      categoryName: product.categoryName,
      estoque: product.estoque || 0,
      somente_encomenda: false,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  animateCartBadges();

  // Abre o drawer do carrinho
  const overlay = document.getElementById("cart-overlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Direciona imediatamente para a Etapa 3: Dados do Cliente, Endereço e Frete Correios
  setCartStep(3);

  // Rola o corpo da tela de entrega para o topo
  const deliveryBody = document.querySelector(".cart-delivery-body");
  if (deliveryBody) deliveryBody.scrollTop = 0;

  // Foco inteligente no primeiro campo obrigatório pendente
  setTimeout(() => {
    const nameInput = document.getElementById("checkout-cust-name");
    const cepInput = document.getElementById("checkout-cust-cep");
    const numberInput = document.getElementById("checkout-cust-number");

    if (nameInput && !nameInput.value.trim()) {
      nameInput.focus();
    } else if (cepInput && !cepInput.value.trim()) {
      cepInput.focus();
    } else if (numberInput && !numberInput.value.trim()) {
      numberInput.focus();
    }
  }, 220);
};

/**
 * Gera dinamicamente o link de checkout unificado na InfinitePay via API oficial
 * contendo TODOS os itens, quantidades e frete selecionado (Melhor Envio / Correios),
 * além dos dados de entrega e contato do cliente.
 */
async function checkoutCartOnlineInfinitePay(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (cart.length === 0) return;

  // Se o cliente ainda estiver na Etapa 1 ou 2, navega para a etapa correspondente
  if (currentCartStep === 1) {
    setCartStep(2);
    return;
  }
  if (currentCartStep === 2) {
    setCartStep(3);
    return;
  }

  // 1. Bloqueia compra online se houver item somente sob encomenda
  const hasOrderOnly = cart.some(item => Boolean(item.somente_encomenda));
  if (hasOrderOnly) {
    const warningEl = document.getElementById("cart-order-only-warning");
    if (warningEl) {
      warningEl.classList.remove("shake");
      void warningEl.offsetWidth;
      warningEl.classList.add("shake");
    }

    const zapBtn = document.getElementById("btn-checkout-whatsapp");
    if (zapBtn) {
      zapBtn.classList.remove("highlight-pulse");
      void zapBtn.offsetWidth;
      zapBtn.classList.add("highlight-pulse");
      setTimeout(() => zapBtn.classList.remove("highlight-pulse"), 1600);
    }
    return;
  }

  // 2. Bloqueia compra online se houver observações digitadas (personalizações manuais)
  const notesInput = document.getElementById("cart-custom-notes");
  if (notesInput && notesInput.value.trim().length > 0) {
    const warningEl = document.getElementById("cart-notes-warning");
    if (warningEl) {
      warningEl.classList.remove("shake");
      void warningEl.offsetWidth;
      warningEl.classList.add("shake");
    }

    const zapBtn = document.getElementById("btn-checkout-whatsapp");
    if (zapBtn) {
      zapBtn.classList.remove("highlight-pulse");
      void zapBtn.offsetWidth;
      zapBtn.classList.add("highlight-pulse");
      setTimeout(() => zapBtn.classList.remove("highlight-pulse"), 1600);
    }
    return;
  }

  // 3. Validação dos Dados de Entrega e Frete
  const custNameEl = document.getElementById("checkout-cust-name");
  const custPhoneEl = document.getElementById("checkout-cust-phone");
  const custCepEl = document.getElementById("checkout-cust-cep");
  const custStreetEl = document.getElementById("checkout-cust-street");
  const custNumberEl = document.getElementById("checkout-cust-number");
  const custCompEl = document.getElementById("checkout-cust-comp");
  const custBairroEl = document.getElementById("checkout-cust-bairro");
  const custCityEl = document.getElementById("checkout-cust-city");

  const custName = (custNameEl?.value || "").trim();
  const custPhone = (custPhoneEl?.value || "").replace(/\D/g, "");
  const custCep = (custCepEl?.value || "").replace(/\D/g, "");
  const custStreet = (custStreetEl?.value || "").trim();
  const custNumber = (custNumberEl?.value || "").trim();
  const custComp = (custCompEl?.value || "").trim();
  const custBairro = (custBairroEl?.value || "").trim();
  const custCity = (custCityEl?.value || "").trim();

  if (!custName) {
    highlightFieldError(custNameEl, "Por favor, preencha seu nome completo.");
    return;
  }

  if (custPhone.length < 10) {
    highlightFieldError(custPhoneEl, "Digite seu WhatsApp/celular com DDD.");
    return;
  }

  if (custCep.length !== 8) {
    highlightFieldError(custCepEl, "Digite um CEP válido para calcular o frete Correios.");
    return;
  }

  // Se o frete ainda não foi selecionado
  if (!selectedShippingOption) {
    if (lastCalculatedQuotes && lastCalculatedQuotes.length > 0) {
      selectedShippingOption = lastCalculatedQuotes[0];
      renderCartStep3();
    } else {
      highlightFieldError(custCepEl, "Calcule o frete para continuar.");
      calculateShippingForCart(custCep, false);
      return;
    }
  }

  // Se a rua ou número não estiverem preenchidos
  if (!custStreet) {
    highlightFieldError(custStreetEl, "Informe o nome da sua rua ou logradouro.");
    return;
  }

  if (!custNumber) {
    highlightFieldError(custNumberEl, "Informe o número do endereço de entrega.");
    return;
  }

  // Salva no localStorage para próxima visita
  saveCustomerDeliveryData({
    name: custName,
    phone: custPhoneEl ? custPhoneEl.value : custPhone,
    cep: custCepEl ? custCepEl.value : custCep,
    street: custStreet,
    number: custNumber,
    comp: custComp,
    bairro: custBairro,
    city: custCity
  });

  const btnCheckoutJim = document.getElementById("btn-checkout-jim");
  if (btnCheckoutJim && btnCheckoutJim.classList.contains("loading")) return;

  const originalHtml = btnCheckoutJim ? btnCheckoutJim.innerHTML : "";

  // Abre janela de destino no instante do clique para contornar bloqueador de pop-ups
  const checkoutWindow = window.open("", "_blank");
  if (checkoutWindow) {
    checkoutWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <title>Conectando ao Checkout - Cube Forge</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              margin: 0;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: #080d18;
              color: #ffffff;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              text-align: center;
              padding: 24px;
              box-sizing: border-box;
            }
            .spinner {
              width: 48px;
              height: 48px;
              border: 3px solid rgba(56, 189, 248, 0.15);
              border-top-color: #38bdf8;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
              margin-bottom: 22px;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
            h2 { font-size: 1.25rem; font-weight: 700; margin: 0 0 8px; color: #f8fafc; }
            p { font-size: 0.9rem; color: #94a3b8; margin: 0; line-height: 1.4; }
          </style>
        </head>
        <body>
          <div class="spinner"></div>
          <h2>Conectando ao Checkout Seguro</h2>
          <p>Preparando seus produtos e frete selecionado na InfinitePay...</p>
        </body>
      </html>
    `);
  }

  if (btnCheckoutJim) {
    btnCheckoutJim.classList.add("loading");
    btnCheckoutJim.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gerando Checkout com Frete...';
  }

  try {
    const items = cart.map(item => {
      const unitCents = Math.round((item.numericPrice || 0) * 100);
      return {
        quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
        price: unitCents > 0 ? unitCents : 1000,
        description: item.title
      };
    });

    // Se houver valor de frete (> R$ 0,00), inclui como item do pedido na InfinitePay
    const shippingPriceCents = Math.round((selectedShippingOption.price || 0) * 100);
    if (shippingPriceCents > 0) {
      const carrier = "Correios";
      const service = selectedShippingOption.name || "Frete";
      const addrShort = `${custStreet}, ${custNumber}${custBairro ? " - " + custBairro : ""}${custCity ? " (" + custCity + ")" : ""}`;
      const desc = `Frete: ${carrier} ${service} [${addrShort}]`.slice(0, 120);

      items.push({
        quantity: 1,
        price: shippingPriceCents,
        description: desc
      });
    }

    const cityOnly = custCity.includes("-") ? custCity.split("-")[0].trim() : custCity;
    const stateOnly = custCity.includes("-") ? custCity.split("-")[1].trim() : "ES";

    const customerPayload = {
      name: custName,
      phone_number: `+55${custPhone}`,
      phone: custPhone,
      address: {
        street: custStreet,
        number: custNumber,
        complement: custComp || "",
        neighborhood: custBairro || "",
        city: cityOnly,
        state: stateOnly,
        zip_code: custCep
      }
    };

    const response = await fetch("https://api.checkout.infinitepay.io/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        handle: SITE_CONFIG.infinitePayHandle || "cubeforge",
        redirect_url: window.location.href.split("?")[0],
        items: items,
        customer: customerPayload
      })
    });

    if (!response.ok) {
      throw new Error(`InfinitePay API Status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.url) {
      if (checkoutWindow) {
        checkoutWindow.location.href = data.url;
      } else {
        window.location.href = data.url;
      }
    } else {
      throw new Error("URL de checkout unificado não retornada");
    }
  } catch (err) {
    console.warn("Aviso ao gerar checkout unificado InfinitePay, usando fallback:", err);
    const fallbackUrl = SITE_CONFIG.jimStoreUrl || "https://jim.com/a/cubeforge";
    if (checkoutWindow) {
      checkoutWindow.location.href = fallbackUrl;
    } else {
      window.open(fallbackUrl, "_blank");
    }
  } finally {
    if (btnCheckoutJim) {
      btnCheckoutJim.classList.remove("loading");
      btnCheckoutJim.innerHTML = originalHtml;
    }
  }
}

function checkoutCartWhatsApp() {
  if (cart.length === 0) return;

  const notesInput = document.getElementById("cart-custom-notes");
  const notesText = notesInput ? notesInput.value.trim() : "";
  const totalCount = getCartCount();
  const hasCustom = cart.some(item => Boolean(item.somente_encomenda)) || Boolean(notesText);

  // Coleta dados de entrega se preenchidos
  const deliveryData = getCustomerDeliveryData();
  if (deliveryData.name || deliveryData.cep) {
    saveCustomerDeliveryData(deliveryData);
  }

  const itemsPrice = cart.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);
  const shippingPrice = selectedShippingOption ? selectedShippingOption.price : 0;
  const grandTotal = itemsPrice + shippingPrice;

  let message = `*Pedido - ${SITE_CONFIG.brandName}* 🛒\n\n`;
  message += totalCount === 1 
    ? `Olá! Gostaria de pedir o seguinte item:\n\n` 
    : `Olá! Gostaria de pedir os seguintes itens:\n\n`;

  cart.forEach(item => {
    const subtotal = formatBRL(item.numericPrice * item.quantity);
    message += `• ${item.quantity}x ${item.title} - ${subtotal}\n`;
  });

  message += `\n📦 *Subtotal dos Itens:* ${formatBRL(itemsPrice)}\n`;

  if (selectedShippingOption) {
    const shipPriceText = selectedShippingOption.price === 0 ? "Grátis" : formatBRL(selectedShippingOption.price);
    message += `🚚 *Frete (${selectedShippingOption.company} ${selectedShippingOption.name}):* ${shipPriceText} (${selectedShippingOption.days})\n`;
  }

  message += `💰 *Total do Pedido:* ${formatBRL(grandTotal)}\n`;

  if (deliveryData.name || deliveryData.street || deliveryData.cep) {
    message += `\n📍 *Dados para Entrega:*\n`;
    if (deliveryData.name) message += `• *Nome:* ${deliveryData.name}\n`;
    if (deliveryData.phone) message += `• *Telefone:* ${deliveryData.phone}\n`;
    if (deliveryData.street) {
      let addr = `${deliveryData.street}, ${deliveryData.number || "S/N"}`;
      if (deliveryData.comp) addr += ` (${deliveryData.comp})`;
      if (deliveryData.bairro) addr += ` - ${deliveryData.bairro}`;
      if (deliveryData.city) addr += ` - ${deliveryData.city}`;
      message += `• *Endereço:* ${addr}\n`;
    }
    if (deliveryData.cep) message += `• *CEP:* ${deliveryData.cep}\n`;
  }

  if (notesText) {
    message += `\n📝 *Observações / Personalização:*\n${notesText}\n`;
  }

  message += `\n${hasCustom ? "Poderiam me confirmar a disponibilidade e o prazo de produção?" : "Poderiam me confirmar os dados para prosseguir com o pagamento?"}`;

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

  const notesInput = document.getElementById("cart-custom-notes");

  // Navegação entre etapas (3 Etapas: Itens -> Pagamento -> Entrega)
  const btnGotoPayment = document.getElementById("btn-cart-goto-payment");
  if (btnGotoPayment) {
    btnGotoPayment.addEventListener("click", () => setCartStep(2));
  }

  // Avançar da Etapa 2 (Pagamento) para Etapa 3 (Entrega & Frete Correios) ao escolher Cartão/Pix
  const btnGotoCardCheckout = document.getElementById("btn-goto-card-checkout");
  if (btnGotoCardCheckout) {
    btnGotoCardCheckout.addEventListener("click", () => {
      const hasOrderOnly = cart.some(item => Boolean(item.somente_encomenda));
      const hasNotes = notesInput ? (notesInput.value.trim().length > 0) : false;
      if (hasOrderOnly || hasNotes) {
        showCartToast("Item sob encomenda ou personalizado: finalize pelo WhatsApp", "remove");
        return;
      }
      setCartStep(3);
    });
  }

  // Botão Voltar do Topo do Carrinho
  const btnBackStep = document.getElementById("cart-back-step-btn");
  if (btnBackStep) {
    btnBackStep.addEventListener("click", () => {
      if (currentCartStep === 3) setCartStep(2);
      else if (currentCartStep === 2) setCartStep(1);
    });
  }

  // Botão Voltar para os Itens (Etapa 2 -> Etapa 1)
  const btnBackToItems = document.getElementById("btn-back-to-items");
  if (btnBackToItems) {
    btnBackToItems.addEventListener("click", () => setCartStep(1));
  }

  // Botão Voltar para Pagamento (Etapa 3 -> Etapa 2)
  const btnBackToPayment = document.getElementById("btn-back-to-payment");
  if (btnBackToPayment) {
    btnBackToPayment.addEventListener("click", () => setCartStep(2));
  }

  // Pílulas do Stepper (Navegação direta no topo)
  const pill1 = document.getElementById("cart-step-pill-1");
  if (pill1) {
    pill1.addEventListener("click", () => setCartStep(1));
  }

  const pill2 = document.getElementById("cart-step-pill-2");
  if (pill2) {
    pill2.addEventListener("click", () => setCartStep(2));
  }

  const pill3 = document.getElementById("cart-step-pill-3");
  if (pill3) {
    pill3.addEventListener("click", () => {
      const hasOrderOnly = cart.some(item => Boolean(item.somente_encomenda));
      const hasNotes = notesInput ? (notesInput.value.trim().length > 0) : false;
      if (hasOrderOnly || hasNotes) {
        showCartToast("Item sob encomenda ou personalizado: finalize pelo WhatsApp", "remove");
        return;
      }
      setCartStep(3);
    });
  }

  // CORREÇÃO DO BUG: O fechamento ao clicar fora do drawer (overlay) foi removido
  // garantindo que o carrinho permaneça aberto mesmo ao clicar fora da gaveta.
  // O carrinho agora só fecha via 'X', 'Continuar Comprando' ou tecla Escape.

  const checkoutBtn = document.getElementById("btn-checkout-whatsapp");
  if (checkoutBtn) checkoutBtn.addEventListener("click", checkoutCartWhatsApp);

  // Monitora alterações no campo de observações para exibir aviso e bloquear/desbloquear compra online
  if (notesInput) {
    notesInput.addEventListener("input", updateCartNotesValidation);
    notesInput.addEventListener("change", updateCartNotesValidation);
    notesInput.addEventListener("keyup", updateCartNotesValidation);
  }

  // Checkout unificado na InfinitePay com todos os itens e quantidades do carrinho
  const btnCheckoutJim = document.getElementById("btn-checkout-jim");
  if (btnCheckoutJim) {
    btnCheckoutJim.addEventListener("click", checkoutCartOnlineInfinitePay);
  }

  // Inicializa eventos, máscaras e preenchimento automático de entrega e frete (Melhor Envio / ViaCEP)
  initDeliveryAndShippingEvents();

  // Atualiza validação inicial
  updateCartNotesValidation();

  // Esvaziar carrinho com barra de confirmação segura (via botão no rodapé ou no topo do carrinho)
  const clearBtn = document.getElementById("btn-clear-cart");
  const btnHeaderClean = document.getElementById("btn-header-clean");
  const confirmBar = document.getElementById("cart-clear-confirm-bar");
  const confirmYesBtn = document.getElementById("btn-confirm-clear-yes");
  const confirmNoBtn = document.getElementById("btn-confirm-clear-no");

  const openClearConfirm = () => {
    if (confirmBar) {
      confirmBar.classList.add("active");
      confirmBar.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  if (clearBtn) clearBtn.addEventListener("click", openClearConfirm);
  if (btnHeaderClean) btnHeaderClean.addEventListener("click", openClearConfirm);

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
    .btn-card-buy-online,
    .modal-buy-online-btn,
    .btn-cart-checkout-jim,
    .btn-jim-store,
    .nav-jim-link,
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
