/**
 * Chatbot Widget Auto-Injetável - BR.IMPORTS (Dark & Neon)
 */
(function () {
  if (document.getElementById("faq-chatbot-widget")) return;

  // 1. ESTILOS CSS DO WIDGET
  const cssStyles = `
    #faq-chatbot-widget {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 99999999 !important;
    }

    #faq-toggle-btn {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: #CCFF00 !important;
      color: #121212 !important;
      border: none !important;
      box-shadow: 0 4px 16px rgba(204, 255, 0, 0.5) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      outline: none !important;
      transition: transform 0.2s ease, background-color 0.2s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.1) !important;
      background: #b8e600 !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #121212 !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 360px !important;
      max-width: calc(100vw - 40px) !important;
      height: 520px !important;
      max-height: calc(100vh - 120px) !important;
      background-color: #1a1a1a !important;
      border-radius: 16px !important;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.85) !important;
      border: 1px solid #333333 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 99999999 !important;
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
      transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s !important;
      visibility: visible !important;
    }

    #faq-chat-window.faq-hidden {
      opacity: 0 !important;
      transform: translateY(20px) scale(0.95) !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }

    .faq-header {
      background: #121212 !important;
      border-bottom: 1px solid #CCFF00 !important;
      color: #CCFF00 !important;
      padding: 14px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-size: 14px !important;
      color: #CCFF00 !important;
      font-weight: bold !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 18px !important;
      cursor: pointer !important;
      opacity: 0.8;
      padding: 4px !important;
      line-height: 1 !important;
    }

    .faq-icon-btn:hover {
      opacity: 1;
      color: #CCFF00 !important;
    }

    #faq-messages {
      flex: 1 !important;
      padding: 14px !important;
      overflow-y: auto !important;
      background-color: #121212 !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }

    .faq-msg {
      max-width: 85% !important;
      padding: 10px 12px !important;
      border-radius: 12px !important;
      font-size: 13.5px !important;
      line-height: 1.45 !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: #1e1e1e !important;
      color: #f1f1f1 !important;
      border: 1px solid #333333 !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background-color: #CCFF00 !important;
      color: #121212 !important;
      font-weight: 600 !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin-top: 6px !important;
    }

    .faq-chip {
      background-color: #1e1e1e !important;
      color: #CCFF00 !important;
      border: 1px solid #CCFF00 !important;
      padding: 7px 11px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }

    .faq-chip:hover {
      background-color: #CCFF00 !important;
      color: #121212 !important;
      font-weight: bold !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: #181818 !important;
      border-top: 1px solid #333333 !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      border: 1px solid #333333 !important;
      background-color: #121212 !important;
      color: #ffffff !important;
      border-radius: 20px !important;
      font-size: 13.5px !important;
      outline: none !important;
    }

    #faq-input:focus {
      border-color: #CCFF00 !important;
    }

    #faq-send-btn {
      background-color: #CCFF00 !important;
      color: #121212 !important;
      border: none !important;
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #121212 !important;
    }
  `;

  // 2. ESTRUTURA HTML DO CHATBOT
  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Chatbot">
      <svg id="faq-icon-open" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <div id="faq-chat-window" class="faq-hidden">
      <div class="faq-header">
        <h3>BR.IMPORTS | Suporte Virtual</h3>
        <button type="button" id="faq-close-btn" class="faq-icon-btn" title="Fechar Chat">✕</button>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Pergunte sobre tênis, frete, tamanhos..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar">
            <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  let baseConhecimento = [];

  function inicializarWidget() {
    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");

    function addMessage(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.innerHTML = texto.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage("Olá! 👋 Seja bem-vindo à **BR.IMPORTS**.\nComo posso ajudar você hoje?", "bot");

      if (baseConhecimento.length > 0) {
        const optsContainer = document.createElement("div");
        optsContainer.className = "faq-options";

        baseConhecimento.slice(0, 5).forEach(item => {
          if (item.titulo) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "faq-chip";
            btn.innerText = item.titulo;
            btn.addEventListener("click", () => {
              addMessage(item.titulo, "user");
              setTimeout(() => addMessage(item.resposta, "bot"), 200);
            });
            optsContainer.appendChild(btn);
          }
        });

        messagesBox.appendChild(optsContainer);
        messagesBox.scrollTop = messagesBox.scrollHeight;
      }
    }

    function normalizarTexto(txt) {
      return txt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/gi, "");
    }

    function buscarResposta(textoUsuario) {
      const queryNorm = normalizarTexto(textoUsuario);
      const palavrasUsuario = queryNorm.split(/\s+/).filter(w => w.length > 2);

      let melhorMatch = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach(item => {
        let pontos = 0;
        const tituloNorm = normalizarTexto(item.titulo || item.pergunta || "");
        const respostaNorm = normalizarTexto(item.resposta || "");

        if (tituloNorm.includes(queryNorm)) pontos += 10;

        palavrasUsuario.forEach(palavra => {
          if (tituloNorm.includes(palavra)) pontos += 4;
          if (respostaNorm.includes(palavra)) pontos += 1;
          if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
              if (normalizarTexto(kw).includes(palavra)) pontos += 3;
            });
          }
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhorMatch = item;
        }
      });

      if (melhorMatch && maiorPontuacao >= 3) {
        return melhorMatch.resposta;
      }
      return "Não encontrei essa informação com exatidão. 😅 Você pode escolher uma das opções do menu ou enviar sua dúvida direto no formulário no final do site!";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 250);
    }

    // 3. FUNÇÃO DE ABRIR E FECHAR O CHATBOT
    function toggleChat() {
      const estaFechado = chatWindow.classList.contains("faq-hidden");
      if (estaFechado) {
        chatWindow.classList.remove("faq-hidden");
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
        input.focus();
      } else {
        chatWindow.classList.add("faq-hidden");
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    }

    // CARREGAR FICHEIRO JSON EXTERNO
    fetch("minha base de dados.json")
      .then(res => res.json())
      .then(dados => {
        if (Array.isArray(dados)) {
          baseConhecimento = dados;
          carregarMenuInicial();
        }
      })
      .catch(err => {
        console.error("Erro ao carregar 'minha base de dados.json':", err);
        carregarMenuInicial();
      });

    // Eventos
    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarWidget);
  } else {
    inicializarWidget();
  }
})();