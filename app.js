const PRODUCT_DATA_URL = "./data.json";
const AVATAR_STYLES = ["", "avatar-pink", "avatar-mint", "avatar-lilac"];

let products = [];
let toastTimeout;

const domElements = {
  date: document.querySelector("#dashboard-date"),
  rows: document.querySelector("#product-rows"),
  totalProducts: document.querySelector("#total-products"),
  lowStockCount: document.querySelector("#low-stock-count"),
  totalUnits: document.querySelector("#total-units"),
  healthLabel: document.querySelector("#health-label"),
  healthBar: document.querySelector("#health-bar"),
  navCount: document.querySelector("#nav-count"),
  tableCount: document.querySelector("#table-count"),
  tableSummary: document.querySelector("#table-summary"),
  search: document.querySelector("#product-search"),
  filter: document.querySelector("#stock-filter"),
  form: document.querySelector("#product-form"),
  formFeedback: document.querySelector("#form-feedback"),
  aiSummary: document.querySelector("#ai-summary"),
  recommendations: document.querySelector("#recommendations"),
  toast: document.querySelector("#toast"),
};

function renderDate() {
  const date = new Date();
 domElements.date.dateTime = date.toISOString().slice(0, 10);
  domElements.date.textContent = date.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).toLocaleUpperCase("es");
}

function isLowStock(product) {
  return product.stock <= product.minStock;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function renderProducts() {
  const searchTerm = domElements.search.value.trim().toLocaleLowerCase("es");
  const selectedFilter = domElements.filter.value;
  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.sku} ${product.supplier}`
      .toLocaleLowerCase("es")
      .includes(searchTerm);
    const matchesFilter = selectedFilter === "all"
      || (selectedFilter === "low" && isLowStock(product))
      || (selectedFilter === "healthy" && !isLowStock(product));
    return matchesSearch && matchesFilter;
  });

  if (filteredProducts.length === 0) {
    const message = products.length === 0
      ? "No hay productos registrados."
      : "No se encontraron productos con esos criterios.";
    domElements.rows.innerHTML = `<tr><td class="empty-cell" colspan="5">${message}</td></tr>`;
  } else {
    domElements.rows.innerHTML = filteredProducts.map((product, index) => {
      const lowStock = isLowStock(product);
      const avatarStyle = AVATAR_STYLES[index % AVATAR_STYLES.length];
      const initial = escapeHTML(product.name.trim().charAt(0).toLocaleUpperCase("es"));
      return `
        <tr>
          <td><span class="product-name-cell"><span class="product-avatar ${avatarStyle}">${initial}</span>${escapeHTML(product.name)}</span></td>
          <td class="sku-cell">${escapeHTML(product.sku)}</td>
          <td class="stock-cell">${product.stock} <small>/ ${product.minStock} mín.</small></td>
          <td><span class="stock-badge ${lowStock ? "low" : "good"}">${lowStock ? "Stock bajo" : "En stock"}</span></td>
          <td class="supplier-cell" title="${escapeHTML(product.supplier)}">${escapeHTML(product.supplier)}</td>
        </tr>`;
    }).join("");
  }

  domElements.tableCount.textContent = String(products.length);
  domElements.tableSummary.textContent = `Mostrando ${filteredProducts.length} de ${products.length} productos`;
}

function renderMetrics() {
  const lowStockProducts = products.filter(isLowStock);
  const units = products.reduce((sum, product) => sum + product.stock, 0);
  const healthyPercentage = products.length === 0
    ? 100
    : Math.round(((products.length - lowStockProducts.length) / products.length) * 100);

  elements.totalProducts.textContent = String(products.length);
  elements.lowStockCount.textContent = String(lowStockProducts.length);
  elements.totalUnits.textContent = new Intl.NumberFormat("es-ES").format(units);
  elements.navCount.textContent = String(products.length);
  elements.healthBar.style.width = `${healthyPercentage}%`;

  const healthText = lowStockProducts.length === 0
    ? "Todo en orden"
    : `${healthyPercentage}% saludable`;
  elements.healthLabel.innerHTML = `<i></i>${healthText}`;
  if (lowStockProducts.length > 0) {
    elements.healthLabel.style.color = "#c97687";
    elements.healthLabel.querySelector("i").style.background = "#e795a8";
    elements.healthBar.style.background = "linear-gradient(90deg, #f1c0c8, #df91a2)";
  } else {
    elements.healthLabel.style.color = "";
    elements.healthLabel.querySelector("i").style.background = "";
    elements.healthBar.style.background = "";
  }
}

function renderRecommendations() {
  const lowStockProducts = products.filter(isLowStock);
  const urgentCount = lowStockProducts.filter((product) => product.stock === 0).length;

  if (lowStockProducts.length === 0) {
    elements.aiSummary.textContent = "Buen trabajo: tus niveles de stock están por encima del mínimo recomendado.";
    elements.recommendations.innerHTML = `
      <div class="recommendation-empty">
        <span class="empty-check" aria-hidden="true">✓</span>
        <p>No hay reabastecimientos urgentes. Seguiremos monitorizando tu inventario.</p>
      </div>`;
    return;
  }

  elements.aiSummary.textContent = urgentCount > 0
    ? `${urgentCount} producto${urgentCount === 1 ? "" : "s"} sin unidades y ${lowStockProducts.length - urgentCount} en nivel bajo. Prioriza estos pedidos.`
    : `${lowStockProducts.length} producto${lowStockProducts.length === 1 ? "" : "s"} alcanzaron su stock mínimo. Considera contactar a tus proveedores.`;
  elements.recommendations.innerHTML = lowStockProducts
    .slice()
    .sort((a, b) => (a.stock / a.minStock) - (b.stock / b.minStock))
    .slice(0, 3)
    .map((product) => {
      const reorderQuantity = Math.max(product.minStock * 2 - product.stock, product.minStock);
      return `
        <div class="recommendation-item">
          <span class="recommendation-icon" aria-hidden="true">${escapeHTML(product.name.trim().charAt(0).toLocaleUpperCase("es"))}</span>
          <span class="recommendation-copy">
            <strong>${escapeHTML(product.name)}</strong>
            <span>${escapeHTML(product.supplier)} · Stock ${product.stock}/${product.minStock}</span>
          </span>
          <span class="recommendation-quantity">+${reorderQuantity} uds.</span>
        </div>`;
    }).join("");
}

function renderDashboard() {
  renderDate();
  renderProducts();
  renderMetrics();
  renderRecommendations();
}

function showToast(message, isError = false) {
  window.clearTimeout(toastTimeout);
  elements.toast.textContent = message;
  elements.toast.classList.toggle("is-error", isError);
  elements.toast.classList.add("is-visible");
  toastTimeout = window.setTimeout(() => {
    elements.toast.classList.remove("is-visible");
  }, 3200);
}

function validateForm(formData) {
  const errors = {};
  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim().toUpperCase();
  const category = String(formData.get("category") ?? "").trim();
  const supplier = String(formData.get("supplier") ?? "").trim();
  const stockRaw = String(formData.get("stock") ?? "").trim();
  const minStockRaw = String(formData.get("minStock") ?? "").trim();
  const stock = Number(stockRaw);
  const minStock = Number(minStockRaw);

  if (!name) errors.name = "Ingresa el nombre del producto.";
  if (!sku) errors.sku = "Ingresa un código SKU.";
  else if (!/^[A-Z0-9][A-Z0-9._-]{1,19}$/.test(sku)) errors.sku = "Usa 2-20 caracteres: letras, números, punto o guion.";
  else if (products.some((product) => product.sku.toUpperCase() === sku)) errors.sku = "Este SKU ya está registrado.";
  if (!category) errors.category = "Selecciona una categoría.";
  if (!stockRaw || !Number.isInteger(stock) || stock < 0 || stock > 999999) {
    errors.stock = "Ingresa unidades enteras entre 0 y 999.999.";
  }
  if (!minStockRaw || !Number.isInteger(minStock) || minStock < 1 || minStock > 999999) {
    errors.minStock = "El mínimo debe ser un entero mayor que 0.";
  }
  if (!supplier) errors.supplier = "Ingresa el nombre del proveedor.";

  return {
    errors,
    product: { name, sku, category, stock, minStock, supplier },
  };
}

function displayValidationErrors(errors) {
  elements.form.querySelectorAll(".field-error").forEach((errorElement) => {
    errorElement.textContent = errors[errorElement.dataset.errorFor] ?? "";
  });
  elements.form.querySelectorAll("[name]").forEach((field) => {
    field.setAttribute("aria-invalid", String(Boolean(errors[field.name])));
  });
}

async function loadProducts() {
  try {
    const response = await fetch(PRODUCT_DATA_URL);
    if (!response.ok) {
      throw new Error(`No se pudo leer data.json (HTTP ${response.status}).`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("data.json debe contener una lista de productos.");
    }

    products = data.map((product) => {
      const validProduct = product
        && typeof product.name === "string"
        && typeof product.sku === "string"
        && typeof product.category === "string"
        && typeof product.supplier === "string"
        && Number.isInteger(product.stock)
        && product.stock >= 0
        && Number.isInteger(product.minStock)
        && product.minStock > 0;
      if (!validProduct) {
        throw new Error("data.json contiene un producto con datos no válidos.");
      }
      return { ...product };
    });

    renderDashboard();
  } catch (error) {
    elements.rows.innerHTML = '<tr><td class="empty-cell" colspan="5">No se pudo cargar data.json. Inicia un servidor local y revisa que el archivo esté disponible.</td></tr>';
    elements.tableSummary.textContent = "Error al cargar los datos";
    elements.aiSummary.textContent = "No se pudo generar el análisis porque faltan los datos locales.";
    elements.recommendations.innerHTML = `
      <div class="recommendation-empty">
        <span class="empty-check" aria-hidden="true">!</span>
        <p>Verifica data.json y recarga el panel para obtener recomendaciones.</p>
      </div>`;
    console.error("Error cargando el inventario local:", error);
    showToast("No se pudo cargar el inventario local. Revisa data.json.", true);
  }
}

elements.search.addEventListener("input", renderProducts);
elements.filter.addEventListener("change", renderProducts);

elements.form.addEventListener("input", (event) => {
  const field = event.target;
  if (field.name) {
    field.removeAttribute("aria-invalid");
    const errorElement = elements.form.querySelector(`[data-error-for="${field.name}"]`);
    if (errorElement) errorElement.textContent = "";
  }
});

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  elements.formFeedback.textContent = "";
  const { errors, product } = validateForm(new FormData(elements.form));
  displayValidationErrors(errors);

  if (Object.keys(errors).length > 0) {
    elements.formFeedback.style.color = "#cf6e7c";
    elements.formFeedback.textContent = "Revisa los campos marcados antes de continuar.";
    const firstInvalidField = elements.form.querySelector('[aria-invalid="true"]');
    firstInvalidField?.focus();
    return;
  }

  products = [product, ...products];
  renderDashboard();
  elements.form.reset();
  displayValidationErrors({});
  elements.formFeedback.style.color = "";
  elements.formFeedback.textContent = `${product.name} se añadió al inventario correctamente.`;
  showToast(`${product.name} se añadió correctamente.`);
});

document.querySelector("#register-shortcut").addEventListener("click", () => {
  document.querySelector("#registro").scrollIntoView({ behavior: "smooth", block: "start" });
  elements.form.elements.name.focus({ preventScroll: true });
});

document.querySelectorAll(".main-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".main-nav .nav-link").forEach((navLink) => {
      navLink.classList.toggle("is-active", navLink === link);
    });
  });
});

loadProducts();
