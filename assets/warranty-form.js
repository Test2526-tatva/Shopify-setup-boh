document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("warranty-form");
  const submitBtn = document.getElementById("submit-btn");
  const initialQ = document.getElementById("initial-question");
  const scenarioA = document.getElementById("scenario-a");
  const scenarioB = document.getElementById("scenario-b");

  const res = await fetch('/apps/your-app/unregistered-orders');
  const { isAuthenticated, unregisteredShopifyOrders } = await res.json();
  if (!isAuthenticated) return window.location.href = '/account/login';

  let state = {
    scenario: unregisteredShopifyOrders.length ? null : 'B',
    scenarioAData: null,
    scenarioBData: [{ productName: '', productId: '', purchaseDate: '', retailerName: '', serialNumber: '' }]
  };

  if (unregisteredShopifyOrders.length) {
    initialQ.innerHTML = `
      <label><input type="radio" name="scenario" value="A"> I purchased from Sennheiser</label>
      <label><input type="radio" name="scenario" value="B"> Gift / External Purchase</label>
    `;
    initialQ.querySelectorAll('input[name="scenario"]').forEach(inp =>
      inp.addEventListener('change', e => {
        state.scenario = e.target.value;
        renderScenarios();
      })
    );
  } else {
    renderScenarios();
  }

  function createAutocomplete(inputEl, index) {
    let currentReq = 0;
    inputEl.addEventListener('input', async () => {
      const val = inputEl.value.trim();
      if (!val) return;

      const reqNum = ++currentReq;
      const r = await fetch(`/apps/your-app/product-autocomplete?query=${encodeURIComponent(val)}`);
      const { products } = await r.json();
      if (reqNum !== currentReq) return; // ignore stale

      let list = document.createElement('div');
      list.className = 'autocomplete-list';
      products.slice(0,5).forEach(p => {
        let opt = document.createElement('div');
        opt.textContent = p.title;
        opt.addEventListener('click', () => {
          inputEl.value = p.title;
          state.scenarioBData[index].productId = p.id;
          list.remove();
        });
        list.appendChild(opt);
      });
      inputEl.parentNode.appendChild(list);
    });
  }

  function renderScenarios() {
    scenarioA.style.display = (state.scenario === 'A') ? 'block' : 'none';
    scenarioB.style.display = (state.scenario === 'B') ? 'block' : 'none';

    if (state.scenario === 'A' && !state.scenarioAData) {
      state.scenarioAData = unregisteredShopifyOrders;
      scenarioA.innerHTML = state.scenarioAData.map((order, oi) => `
        <fieldset>
          <legend>Order #${order.orderId} (${order.purchaseDate})</legend>
          ${order.products.map((p, pi) => `
            <div>
              <label>${p.productName} (SKU: ${p.SKU})</label>
              <input type="text" name="A_${oi}_${pi}_serial" placeholder="Serial Number" required>
              <input type="checkbox" name="A_${oi}_${pi}_pending"> Serial not available
            </div>
          `).join('')}
        </fieldset>
      `).join('');
    }

    if (state.scenario === 'B') {
      scenarioB.innerHTML = state.scenarioBData.map((prod, i) => `
        <fieldset>
          <legend>Product ${i+1}</legend>
          <label>Name: <input type="text" name="B_${i}_productName" data-index="${i}" required></label>
          <input type="hidden" name="B_${i}_productId">
          <label>Date: <input type="date" name="B_${i}_purchaseDate" required></label>
          <label>Retailer: <input type="text" name="B_${i}_retailerName" required></label>
          <label>Serial: <input type="text" name="B_${i}_serialNumber" required></label>
        </fieldset>
      `).join('') +
      (state.scenarioBData.length < 5 ? `<button type="button" id="addB">Add Another Product</button>` : '');

      scenarioB.querySelectorAll('input[name^="B_"][name$="_productName"]').forEach(inputEl => {
        const idx = parseInt(inputEl.dataset.index);
        createAutocomplete(inputEl, idx);
      });
      document.getElementById("addB")?.addEventListener('click', () => {
        state.scenarioBData.push({ productName: '', productId: '', purchaseDate: '', retailerName: '', serialNumber: '' });
        renderScenarios();
      });
    }

    validateForm();
  }

  function validateForm() {
    let valid = state.scenario && form.checkValidity();
    submitBtn.disabled = !valid;
  }

  form.addEventListener('input', validateForm);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = {
      registrationType: state.scenario === 'A' ? 'WebshopPurchase' : 'ExternalPurchase',
      customerName: form.customerName.value.trim(),
      customerEmail: form.customerEmail.value.trim(),
      products: []
    };

    if (state.scenario === 'A') {
      state.scenarioAData.forEach((order, oi) => {
        order.products.forEach((p, pi) => {
          payload.products.push({
            shopifyProductId: p.productId || p.SKU,
            orderId: order.orderId,
            serialNumber: form[`A_${oi}_${pi}_serial`].value.trim(),
            isPending: form[`A_${oi}_${pi}_pending`].checked
          });
        });
      });
    } else {
      state.scenarioBData.forEach((_, i) => {
        payload.products.push({
          productId: form[`B_${i}_productId`].value,
          productName: form[`B_${i}_productName`].value.trim(),
          purchaseDate: form[`B_${i}_purchaseDate`].value,
          retailerName: form[`B_${i}_retailerName`].value.trim(),
          serialNumber: form[`B_${i}_serialNumber`].value.trim()
        });
      });
    }

    const res2 = await fetch('/apps/your-app/register-warranty', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res2.ok) window.location.href = '/apps/your-app/confirmation';
    else alert('Error: ' + (await res2.text()));
  });
});
