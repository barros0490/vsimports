document.addEventListener('DOMContentLoaded', () => {

    // 1. ENVIO DO FORMULÁRIO DE PEDIDO
    const formPedido = document.getElementById('form-pedido');
    if (formPedido) {
        formPedido.addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const pagamento = document.getElementById('forma-pagamento').value.toUpperCase();
            alert(`Obrigado, ${nome}!\nSeu pedido foi registrado com sucesso via ${pagamento}.\nEm breve entraremos em contato para confirmação do envio.`);
            formPedido.reset();
        });
    }

    // 2. MÁSCARA AUTOMÁTICA DE CEP
    const inputCep = document.getElementById('cep');
    if (inputCep) {
        inputCep.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 5) {
                valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = valor.slice(0, 9);
        });
    }

    // 3. FUNCIONAMENTO DOS BOTÕES DE COOKIES
    const bannerCookies = document.getElementById('banner-cookies');
    const btnAceitar = document.getElementById('btn-aceitar-cookies');
    const btnRecusar = document.getElementById('btn-recusar-cookies');

    // Verifica se já existe preferência salva
    const preferenciaCookies = localStorage.getItem('cookiesPreferencia');

    if (preferenciaCookies === 'aceito' || preferenciaCookies === 'recusado') {
        if (bannerCookies) {
            bannerCookies.classList.add('oculto');
        }
    }

    // Clique em Aceitar
    if (btnAceitar) {
        btnAceitar.addEventListener('click', () => {
            localStorage.setItem('cookiesPreferencia', 'aceito');
            if (bannerCookies) {
                bannerCookies.classList.add('oculto');
            }
        });
    }

    // Clique em Recusar
    if (btnRecusar) {
        btnRecusar.addEventListener('click', () => {
            localStorage.setItem('cookiesPreferencia', 'recusado');
            if (bannerCookies) {
                bannerCookies.classList.add('oculto');
            }
        });
    }

});