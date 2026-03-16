#  Viagem dos Sonhos

Site de uma agência de viagens focada em destinos nacionais brasileiros, com catálogo de pacotes, carrinho de compras, checkout completo e formulário de orçamento. (Estudo)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## Funcionalidades

### Página Principal (index.html)
- Hero com carrossel de slides automático e controles manuais
- Barra de estatísticas com contadores animados (viajantes, destinos, anos, satisfação)
- Catálogo de pacotes de viagem (Gramado, Porto Seguro, Maceió) com preços e botão de reserva
- Seção de taxas e serviços adicionais (passagens, hotel, aluguel de carro)
- Formulário de orçamento com validação, seleção de serviços e forma de pagamento
- Carrinho de compras via modal com badge animado, adição/remoção de itens e total
- Footer com links rápidos, contato e redes sociais
- Scroll reveal (animações ao rolar a página)
- Smooth scroll para navegação entre seções

### Checkout (checkout.html)
- Fluxo em 3 etapas com indicador visual de progresso: Carrinho → Pagamento → Confirmação
- Resumo do pedido com subtotal, desconto e parcelamento
- Sistema de cupons de desconto (SONHOS10, VDS20, PROMO15)
- 3 formas de pagamento: Cartão (com preview ao vivo do cartão), Pix (chave copiável) e Boleto
- Máscaras de input para CPF, telefone, número do cartão e validade
- Validação de campos obrigatórios
- Tela de confirmação com número do pedido, resumo e próximos passos
- Animação de sucesso ao confirmar

### Geral
- Tema claro e escuro com toggle e persistência via localStorage
- Navbar com efeito de blur ao rolar
- Menu hamburger responsivo para mobile
- Carrinho persistente entre páginas via localStorage
- Notificações toast para feedback de ações

---

## Estrutura do Projeto

```
website-ex/
├── css/
│   ├── style.css          # Estilos da página principal
│   └── checkout.css       # Estilos do checkout
├── img/
│   └── nossos-pacotes/    # Imagens dos destinos
├── js/
│   ├── main.js            # Lógica da página principal
│   └── checkout.js        # Lógica do checkout
├── index.html             # Página principal
├── checkout.html          # Página de checkout
└── README.md
```

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica |
| CSS3 (Custom Properties) | Temas claro/escuro, animações, responsividade |
| JavaScript ES6+ | Carrinho, checkout, carrossel, formulários, validações |
| Bootstrap Icons | Iconografia |
| Google Fonts | Playfair Display + DM Sans |
| localStorage | Persistência do carrinho, tema e dados entre páginas |
| IntersectionObserver | Contadores animados e scroll reveal |

---

## Como Usar

1. Clone o repositório
```bash
git clone https://github.com/MagdielPaulo/website-ex.git
```
2. Abra o `index.html` no navegador

Não precisa de instalação, build ou servidor.

---

## Cupons de Teste

| Cupom | Desconto |
|---|---|
| SONHOS10 | 10% |
| VDS20 | 20% |
| PROMO15 | 15% |

---

## Autor

**Magdiel Paulo** — Maceió, AL

---

## Licença

MIT
