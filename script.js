// Partículas para a seção viva-leve (background animado)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const colors = ['#ffffff', '#a8edea', '#fed6e3', '#34d399', '#059669'];

let width, height;

function initCanvas() {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = height + 10 + Math.random() * 50;
    this.radius = 2 + Math.random() * 3;
    this.speed = 0.5 + Math.random() * 1.5;
    this.angle = Math.random() * 2 * Math.PI;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = 0.4 + Math.random() * 0.6;
    this.swing = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.angle) * 1.5;
    this.angle += this.swing;
    if (this.y < -this.radius) {
      this.y = height + this.radius;
      this.x = Math.random() * width;
    }
  }

  draw() {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let count = Math.floor((width * height) / 8000);
  for(let i = 0; i < count; i++) {
    particlesArray.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  initCanvas();
  initParticles();
});
initCanvas();
initParticles();
animate();

// --- Carrinho funcional ---

const cartSidebar = document.getElementById('cart-sidebar');
const cartToggleBtn = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalDisplay = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

// Abrir carrinho
cartToggleBtn.addEventListener('click', () => {
  cartSidebar.classList.add('open');
  cartSidebar.setAttribute('aria-hidden', 'false');
});

// Fechar carrinho
closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
  cartSidebar.setAttribute('aria-hidden', 'true');
});

// Função para adicionar produto ao carrinho
function addToCart(name, price) {
  const productIndex = cart.findIndex(item => item.name === name);
  if(productIndex > -1) {
    cart[productIndex].quantity++;
  } else {
    cart.push({name, price, quantity: 1});
  }
  updateCartUI();
}

// Atualiza o UI do carrinho
function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if(cart.length === 0) {
    cartItemsContainer.innerHTML = `<p style="text-align:center; color:#666; margin-top:1rem;">Carrinho vazio 🛒</p>`;
    cartTotalDisplay.textContent = '';
    cartCount.textContent = '0';
    return;
  }

  cart.forEach((item, idx) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <div>
        <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-btn" aria-label="Remover ${item.name}" data-index="${idx}">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
  cartCount.textContent = totalItems;

  // Remove produto
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.dataset.index;
      removeFromCart(idx);
    });
  });
}

// Remove produto do carrinho pelo índice
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

// Finalizar compra
checkoutBtn.addEventListener('click', () => {
  if(cart.length === 0) {
    alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
    return;
  }
  alert('Compra finalizada com sucesso! Obrigado pela preferência 😊');
  cart = [];
  updateCartUI();
  cartSidebar.classList.remove('open');
  cartSidebar.setAttribute('aria-hidden', 'true');
});

// Inicializar o carrinho na interface
updateCartUI();

// --- Conectar os botões dos produtos ---
// Todos os botões "Adicionar ao carrinho" têm data-attributes: data-name e data-price
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    addToCart(name, price);
  });
});
