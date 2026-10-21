# 🚀 Site de Impressão 3D para Instagram (GitHub Pages)

Site institucional e catálogo mobile-first desenvolvido especificamente para negócios de **Impressão 3D e Prototipagem**, ideal para colocar na **bio do Instagram**.

---

## 🎨 Características do Projeto
- **Cores Oficiais**: Clean (fundo claro minimalista), Azul Escuro (#0F172A) e Laranja (#F97316).
- **Otimizado para Celular**: Carregamento instantâneo, navegação fluida estilo aplicativo/link hub.
- **Botões Estratégicos no Topo**: Acesso imediato ao WhatsApp para orçamentos e rolagem suave para o catálogo.
- **Portfólio com Filtros**: Separação por categorias (Peças Técnicas, Decoração, Colecionáveis, Suportes).
- **Orçamento Direto por Peça**: Ao clicar em qualquer peça, abre um modal com botão de WhatsApp com a mensagem já pré-preenchida com o nome daquele item.
- **Botão Flutuante do WhatsApp**: Acompanha o cliente durante toda a rolagem da página.
- **Guia de Filamentos**: Explica as vantagens do PLA, PETG e Resina UV para educar o cliente.
- **100% Gratuito**: Sem custos de hospedagem usando o GitHub Pages.

---

## 📁 Estrutura dos Arquivos

```text
site-impressao-3d/
├── index.html        # Estrutura e textos do site
├── style.css         # Visual, estilo clean, azul escuro e laranja
├── script.js         # Configurações do seu WhatsApp, Instagram e catálogo
└── README.md         # Este guia com passo a passo
```

---

## ⚙️ Como Personalizar com seus Dados (1 Minuto)

Abra o arquivo [`script.js`](file:///C:/Users/kaiob/.gemini/antigravity/scratch/site-impressao-3d/script.js) e edite as primeiras linhas no bloco `SITE_CONFIG`:

```javascript
const SITE_CONFIG = {
  // Número oficial do WhatsApp da empresa com DDI (55) + DDD (27) + Número
  whatsappNumber: "5527936183114",
  whatsappDisplay: "+55 27 93618-3114",
  whatsappBusinessLink: "https://wa.me/message/RTGDS4KCBUCHL1",

  // Nome da sua Loja/Marca
  brandName: "Cube Forge",

  // Seu @ do Instagram (sem o @)
  instagramUser: "cubeforge3d",
  
  ...
};
```

Pronto! Todos os botões do WhatsApp e do Instagram serão atualizados automaticamente.

---

## 🌐 Como Publicar Grátis no GitHub Pages (Passo a Passo)

### Passo 1: Criar o Repositório no GitHub
1. Acesse [github.com](https://github.com) e faça login (crie uma conta gratuita se ainda não tiver).
2. No canto superior direito, clique no botão **"+"** e depois em **"New repository"**.
3. Em **Repository name**, coloque um nome curto e limpo (exemplo: `link` ou `bio` ou `3d`).
4. Certifique-se de que a opção **"Public"** está selecionada.
5. Deixe as caixas de README desmarcadas e clique em **"Create repository"**.

### Passo 2: Fazer o Upload dos Arquivos
1. Na tela que aparecer, clique no link **"uploading an existing file"**.
2. Arraste os arquivos da pasta para a janela do navegador:
   - `index.html`
   - `style.css`
   - `script.js`
3. No final da página, clique no botão verde **"Commit changes"**.

### Passo 3: Ativar o GitHub Pages
1. No menu superior do seu repositório no GitHub, clique na aba **"Settings"** (ícone de engrenagem).
2. Na barra lateral esquerda, clique em **"Pages"**.
3. Na seção **"Build and deployment"** > **"Branch"**:
   - Onde está `None`, selecione **`main`** (ou `master`).
   - Mantenha a pasta como `/(root)`.
   - Clique em **"Save"**.
4. Aguarde cerca de 1 a 2 minutos e recarregue a página.
5. Um banner verde aparecerá no topo com o seu link ativo:
   👉 `https://seu-usuario.github.io/nome-do-repositorio/`

---

## 📱 Como Adicionar no Instagram
1. Abra o aplicativo do Instagram no seu celular.
2. Vá no seu perfil e clique em **"Editar perfil"**.
3. Toque em **"Links"** > **"Adicionar link externo"**.
4. Cole o link do seu site do GitHub Pages gerado acima.
5. Em **Título**, você pode colocar: *Orçamentos e Catálogo 3D* 🚀.
