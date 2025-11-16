document.addEventListener("DOMContentLoaded", () => {
  // 1. Redirect to login page if not logged in
  if(!state.user){
    alert("Please login or register to access the site.");
    location.href = "login.html";
    return; // stop further initialization
  }

  // 2. Existing initialization
  updateHeaderUI();
  renderFeatured(); // show featured products
});

const PRODUCTS = [
  {id:1,title:"Adjustable Dumbbell Set (2x20 kg)",price:5999,weight:20,category:"Dumbbells",img:"./images/Dumbell.jpg",desc:"High-quality adjustable dumbbells for home training."},
  {id:2,title:"Hex Rubber Dumbbell 10 kg",price:1999,weight:10,category:"Dumbbells",img:"images/hex-dumbbell.jpg",desc:"Durable hex dumbbell for home gym sessions."},
  {id:3,title:"Olympic Barbell 20 kg + Plates",price:14999,weight:20,category:"Barbell",img:"images/barbell.jpg",desc:"Standard Olympic bar with quality plates."},
  {id:4,title:"Adjustable Kettlebell 24 kg",price:8999,weight:24,category:"Kettlebells",img:"images/kettlebell.jpg",desc:"Adjustable kettlebell for swings and conditioning."},
  {id:5,title:"Power Rack with Pull-up Bar",price:49999,weight:80,category:"Racks",img:"images/power-rack.jpg",desc:"Heavy duty power rack for squats and bench."},
  {id:6,title:"Treadmill Pro 2.0",price:79999,weight:90,category:"Cardio",img:"images/treadmill.jpg",desc:"Motorized treadmill with incline and foldable design."},
  {id:7,title:"Yoga Mat Pro 6mm",price:899,weight:1,category:"Accessories",img:"images/yogamat.jpg",desc:"Grip-enhanced mat for studio and home practice."},
  {id:8,title:"Resistance Bands Set (5 levels)",price:699,weight:0.5,category:"Accessories",img:"images/resistance-bands.jpg",desc:"Portable bands for full-body resistance training."},
  {id:9,title:"Rowing Machine (Compact)",price:24999,weight:35,category:"Cardio",img:"images/rowing-machine.jpg",desc:"Smooth magnetic rowing machine for cardio."},
  {id:10,title:"Adjustable Weight Bench",price:6999,weight:25,category:"Benches",img:"images/weight-bench.jpg",desc:"Sturdy bench for flat, incline, and decline exercises."},
  {id:11,title:"Spin Bike Pro",price:25999,weight:40,category:"Cardio",img:"images/spin-bike.jpg",desc:"Indoor spin bike with adjustable resistance."},
  {id:12,title:"Pull-Up Assist Bands",price:499,weight:0.3,category:"Accessories",img:"images/assist-bands.jpg",desc:"Bands to assist pull-ups and other exercises."},
  {id:13,title:"Medicine Ball 5 kg",price:1499,weight:5,category:"Accessories",img:"images/medicine-ball.jpg",desc:"Durable medicine ball for strength and core training."},
  {id:14,title:"Foam Roller 45cm",price:799,weight:2,category:"Accessories",img:"images/foam-roller.jpg",desc:"High-density foam roller for muscle recovery."},
  {id:15,title:"Sandbag Training Set",price:3999,weight:15,category:"Strength",img:"images/sandbag.jpg",desc:"Adjustable sandbag for functional strength workouts."},
  {id:16,title:"Battle Rope 12m",price:2499,weight:10,category:"Strength",img:"images/battle-rope.jpg",desc:"High-quality rope for conditioning and full-body training."},
  {id:17,title:"Ab Wheel Roller",price:699,weight:1,category:"Accessories",img:"images/ab-wheel.jpg",desc:"Compact ab wheel for core strengthening exercises."},
  {id:18,title:"Power Tower Station",price:19999,weight:45,category:"Racks",img:"images/power-tower.jpg",desc:"Multi-function tower for pull-ups, dips, and push-ups."},
  {id:19,title:"Jump Rope Speed Pro",price:499,weight:0.2,category:"Accessories",img:"images/jump-rope.jpg",desc:"Adjustable speed rope for cardio and conditioning."},
  {id:20,title:"Elliptical Trainer",price:55999,weight:70,category:"Cardio",img:"images/elliptical.jpg",desc:"Smooth elliptical trainer for low-impact cardio."},
  {id:21,title:"Weightlifting Gloves",price:799,weight:0.3,category:"Accessories",img:"images/gloves.jpg",desc:"Protective gloves for lifting and gym workouts."},
  {id:22,title:"Adjustable Dumbbell Set (2x30 kg)",price:8999,weight:30,category:"Dumbbells",img:"images/dumbbell-30kg.jpg",desc:"Extended weight dumbbells for advanced training."}
];


const state = {
  cart: JSON.parse(localStorage.getItem("fg_cart")||"[]"),
  wish: JSON.parse(localStorage.getItem("fg_wish")||"[]"),
  orders: JSON.parse(localStorage.getItem("fg_orders")||"[]"),
  reviews: JSON.parse(localStorage.getItem("fg_reviews")||"[]"),
  user: JSON.parse(localStorage.getItem("fg_user")||"null"),
  theme: localStorage.getItem("fg_theme") || "dark"
};

function persist(){
  localStorage.setItem("fg_cart", JSON.stringify(state.cart));
  localStorage.setItem("fg_wish", JSON.stringify(state.wish));
  localStorage.setItem("fg_orders", JSON.stringify(state.orders));
  localStorage.setItem("fg_reviews", JSON.stringify(state.reviews));
  localStorage.setItem("fg_user", JSON.stringify(state.user));
  localStorage.setItem("fg_theme", state.theme);
  updateHeaderUI();
}

function applyTheme(){
  if(state.theme === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
}

function toggleTheme(){
  state.theme = state.theme === "dark" ? "light" : "dark";
  persist();
}

// ---- THEME PERSISTENCE & TOGGLE ----
function applyTheme(){
  if(state.theme === "light") document.body.classList.add("light");
  else document.body.classList.remove("light");
}

function toggleTheme(){
  state.theme = state.theme === "dark" ? "light" : "dark";
  persist(); // calls applyTheme inside
}

function updateThemeToggleButton(){
  const btn = document.getElementById("themeBtn") || document.getElementById("themeBtn2");
  if(!btn) return;
  btn.textContent = document.body.classList.contains("light") ? "🌙 Dark" : "🌞 Light";
}

// Apply theme and attach buttons on page load
document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("fg_theme") || "dark";
  state.theme = savedTheme;
  applyTheme();
  updateThemeToggleButton();

  // Attach theme toggle to all buttons starting with 'themeBtn'
  document.querySelectorAll("[id^='themeBtn']").forEach(btn => btn.addEventListener("click", toggleTheme));
});

function updateHeaderUI(){
  document.querySelectorAll("#cartCountBadge, #cartCountBadgeP, #cartCountBadgePD, #cartCountBadgeCart, #cartCountBadgeW, #cartCountBadgePC").forEach(el=>{
    if(el) el.textContent = state.cart.reduce((s,i)=>s+i.qty,0);
  });
  document.querySelectorAll("#wishCountBadge, #wishCountBadgeP, #wishCountBadgePD, #wishCountBadgeCart, #wishCountBadgeW").forEach(el=>{
    if(el) el.textContent = state.wish.length;
  });
  const authBtns = document.querySelectorAll("#authBtn, #authBtn2, #authBtnPD, #authBtnCart, #authBtnWish");
  authBtns.forEach(b=>{
    if(!b) return;
    b.textContent = state.user ? (state.user.name || state.user.email || "Account") : "Login";
    b.href = state.user ? "orders.html" : "login.html";
  });
  applyTheme();
}

// ---- FEATURED PRODUCTS ----
function renderFeatured(){
  const row = document.getElementById("featuredRow");
  if(!row) return;
  const featured = PRODUCTS.slice(0,4);
  row.innerHTML = featured.map(p=>`
    <div class="col-md-3">
      <div class="card bg-dark text-light product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="small text-muted">${p.category} • ${p.weight} kg</p>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="fw-bold">₹ ${p.price.toLocaleString('en-IN')}</div>
            <div>
              <a class="btn btn-sm btn-primary" href="product-details.html?id=${p.id}">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ---- PRODUCTS PAGE ----
function initProductsPage(){
  populateCategory();
  attachProductEvents();
  applyProductsFilters();
}

function populateCategory(){
  const sel = document.getElementById("catSelect");
  if(!sel) return;
  const cats = Array.from(new Set(PRODUCTS.map(p=>p.category)));
  sel.innerHTML = `<option value="">All</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join("");
}

function attachProductEvents(){
  document.getElementById("wRange")?.addEventListener("input", e=>document.getElementById("wLabel").textContent=e.target.value);
  document.getElementById("pRange")?.addEventListener("input", e=>document.getElementById("pLabel").textContent=e.target.value);
  document.getElementById("searchProducts")?.addEventListener("input", applyProductsFilters);
  document.getElementById("catSelect")?.addEventListener("change", applyProductsFilters);
  document.getElementById("wRange")?.addEventListener("change", applyProductsFilters);
  document.getElementById("pRange")?.addEventListener("change", applyProductsFilters);
  document.getElementById("sortSelectP")?.addEventListener("change", applyProductsFilters);
  document.getElementById("resetBtn")?.addEventListener("click", ()=> {
    document.getElementById("catSelect").value="";
    document.getElementById("wRange").value=200; document.getElementById("wLabel").textContent=200;
    document.getElementById("pRange").value=90000; document.getElementById("pLabel").textContent=90000;
    applyProductsFilters();
  });
}

function applyProductsFilters(){
  const q = (document.getElementById("searchProducts")?.value||"").toLowerCase();
  const cat = document.getElementById("catSelect")?.value||"";
  const maxW = Number(document.getElementById("wRange")?.value||200);
  const maxP = Number(document.getElementById("pRange")?.value||90000);
  const sort = document.getElementById("sortSelectP")?.value||"relevance";
  let res = PRODUCTS.filter(p=>{
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    const matchCat = !cat || p.category===cat;
    return matchQ && matchCat && p.weight<=maxW && p.price<=maxP;
  });
  if(sort==="price-asc") res.sort((a,b)=>a.price-b.price);
  if(sort==="price-desc") res.sort((a,b)=>b.price-a.price);
  if(sort==="weight-asc") res.sort((a,b)=>a.weight-b.weight);
  renderProductsGrid(res);
  document.getElementById("resCount") && (document.getElementById("resCount").textContent=res.length);
}

function renderProductsGrid(list){
  const grid = document.getElementById("productsGrid");
  if(!grid) return;
  if(!list.length){ document.getElementById("noMatch")?.classList.remove("d-none"); grid.innerHTML=""; return; }
  document.getElementById("noMatch")?.classList.add("d-none");
  grid.innerHTML = list.map(p=>`
    <div class="col-md-4">
      <div class="card bg-dark text-light product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <p class="small text-muted">${p.category} • ${p.weight} kg</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div class="fw-bold">₹ ${p.price.toLocaleString('en-IN')}</div>
            <div class="btn-group">
              <a class="btn btn-sm btn-primary" href="product-details.html?id=${p.id}">View</a>
              <button class="btn btn-sm btn-outline-light" onclick="addToCart(${p.id})">Add</button>
              <button class="btn btn-sm btn-outline-light" onclick="toggleWish(${p.id})">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// ---- PRODUCT DETAILS PAGE ----
function initProductDetails(){
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const p = PRODUCTS.find(x=>x.id===id);
  const root = document.getElementById("detailRoot");
  if(!root) return;
  if(!p){ root.innerHTML="<div class='alert alert-secondary'>Product not found</div>"; return; }
  root.innerHTML = `
    <div class="row">
      <div class="col-md-5">
        <img src="${p.img}" class="img-fluid rounded mb-3 product-card" alt="${p.title}">
      </div>
      <div class="col-md-7">
        <h2>${p.title}</h2>
        <p class="small text-muted">${p.category} • ${p.weight} kg</p>
        <h3 class="text-warning">₹ ${p.price.toLocaleString('en-IN')}</h3>
        <p class="text-muted">${p.desc}</p>
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-warning" id="pdAdd">Add to Cart</button>
          <button class="btn btn-outline-light" id="pdWish">Add to Wishlist</button>
        </div>
        <hr>
        <h5>Customer Reviews</h5>
        <div id="pdReviews"></div>
        <form id="pdRevForm" class="mt-3">
          <input id="pdRevName" class="form-control mb-2" placeholder="Your name" required>
          <textarea id="pdRevText" class="form-control mb-2" placeholder="Your review" required></textarea>
          <input id="pdRevImage" type="file" accept="image/*" class="form-control mb-2">
          <div><button class="btn btn-success">Submit Review</button> <span id="pdRevMsg" class="text-warning small"></span></div>
        </form>
      </div>
    </div>
  `;
  document.getElementById("pdAdd").addEventListener("click", ()=> addToCart(p.id));
  document.getElementById("pdWish").addEventListener("click", ()=> toggleWish(p.id));
  document.getElementById("pdRevForm").addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("pdRevName").value.trim();
    const text = document.getElementById("pdRevText").value.trim();
    const file = document.getElementById("pdRevImage").files[0];
    if(!name||!text){ document.getElementById("pdRevMsg").textContent="Fill fields"; return; }
    if(file){
      const r = new FileReader();
      r.onload = function(ev){ 
        state.reviews.push({productId:p.id,name,text,img:ev.target.result,date:new Date().toISOString()});
        persist(); 
        renderProductReviews(p.id,"pdReviews"); 
        document.getElementById("pdRevMsg").textContent="Submitted"; 
        setTimeout(()=>document.getElementById("pdRevMsg").textContent="",2000); 
      };
      r.readAsDataURL(file);
    } else {
      state.reviews.push({productId:p.id,name,text,img:null,date:new Date().toISOString()});
      persist();
      renderProductReviews(p.id,"pdReviews");
      document.getElementById("pdRevMsg").textContent="Submitted";
      setTimeout(()=>document.getElementById("pdRevMsg").textContent="",2000);
    }
  });
  renderProductReviews(p.id,"pdReviews");
}

function renderProductReviews(pid, containerId){
  const c = document.getElementById(containerId);
  if(!c) return;
  const list = state.reviews.filter(r=>r.productId===pid).slice().reverse();
  c.innerHTML = list.length ? list.map(r=>`<div class="mb-2"><strong>${r.name}</strong> <small class="text-muted">${new Date(r.date).toLocaleString()}</small><div>${r.text}</div>${r.img?`<img src="${r.img}" style="max-width:160px;border-radius:6px;margin-top:6px">`:""}</div>`).join("") : `<p class="text-muted small">No reviews yet.</p>`;
}

// ---- CART FUNCTIONS ----
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if(!p) return;
  const ex = state.cart.find(i=>i.id===id);
  if(ex) ex.qty++;
  else state.cart.push({id:p.id,title:p.title,price:p.price,qty:1,img:p.img});
  persist();
  alert(p.title + " added to cart");
}

function toggleWish(id){
  if(state.wish.includes(id)) state.wish = state.wish.filter(x=>x!==id);
  else state.wish.push(id);
  persist();
}

function initCartPage(){
  renderCart();
  document.getElementById("checkout")?.addEventListener("click", ()=>{
    if(!state.user){ alert("Please login to checkout"); location.href="login.html"; return; }
    if(!state.cart.length){ alert("Cart empty"); return; }
    const order = {id:'ORD'+Math.floor(Math.random()*900000+10000),items:state.cart.slice(),total:state.cart.reduce((s,i)=>s+i.qty*i.price,0),date:new Date().toISOString(),status:"Processing"};
    state.orders.push(order);
    state.cart = [];
    persist();
    alert("Order placed: " + order.id);
    location.href = "orders.html";
  });
}

function renderCart(){
  const root = document.getElementById("cartList");
  if(!root) return;
  if(!state.cart.length){ root.innerHTML = `<p class="text-muted">Your cart is empty.</p>`; document.getElementById("cartTotal") && (document.getElementById("cartTotal").textContent="0"); return; }
  root.innerHTML = state.cart.map(it=>`
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-3 align-items-center">
        <img src="${it.img}" style="width:80px;height:60px;object-fit:cover;border-radius:6px">
        <div>
          <strong>${it.title}</strong>
          <div class="small text-muted">Qty: <button class="btn btn-sm btn-outline-light" onclick="decreaseQty(${it.id})">-</button> ${it.qty} <button class="btn btn-sm btn-outline-light" onclick="increaseQty(${it.id})">+</button></div>
        </div>
      </div>
      <div>₹ ${(it.price*it.qty).toLocaleString('en-IN')}</div>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${it.id})">×</button>
    </div>
  `).join("");
  document.getElementById("cartTotal") && (document.getElementById("cartTotal").textContent = state.cart.reduce((s,i)=>s+i.price*i.qty,0).toLocaleString('en-IN'));
}

function increaseQty(id){ const it=state.cart.find(i=>i.id===id); if(it){it.qty++; persist(); renderCart();} }
function decreaseQty(id){ const it=state.cart.find(i=>i.id===id); if(it){it.qty--; if(it.qty<1) removeFromCart(id); else{persist(); renderCart();}} }
function removeFromCart(id){ state.cart = state.cart.filter(i=>i.id!==id); persist(); renderCart(); }

// ---- WISHLIST ----
function initWishPage(){
  renderWish();
}
function renderWish(){
  const root = document.getElementById("wishList");
  if(!root) return;
  if(!state.wish.length){ root.innerHTML=`<p class="text-muted">Your wishlist is empty.</p>`; return; }
  const list = state.wish.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  root.innerHTML = list.map(p=>`
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex gap-3 align-items-center">
        <img src="${p.img}" style="width:80px;height:60px;object-fit:cover;border-radius:6px">
        <div>${p.title}</div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
        <button class="btn btn-sm btn-danger" onclick="toggleWish(${p.id}); renderWish();">×</button>
      </div>
    </div>
  `).join("");
}

// ---- ORDERS PAGE ----
function initOrdersPage(){
  const root = document.getElementById("orderList");
  if(!root) return;
  if(!state.orders.length){ root.innerHTML=`<p class="text-muted">No orders yet.</p>`; return; }
  root.innerHTML = state.orders.map(o=>`
    <div class="card mb-3 bg-dark text-light p-3">
      <div class="d-flex justify-content-between">
        <strong>${o.id}</strong>
        <span>${new Date(o.date).toLocaleString()}</span>
        <span>${o.status}</span>
      </div>
      <div class="mt-2">${o.items.map(it=>`<div>${it.qty} x ${it.title} = ₹ ${(it.qty*it.price).toLocaleString('en-IN')}</div>`).join("")}</div>
      <div class="mt-2 fw-bold">Total: ₹ ${o.total.toLocaleString('en-IN')}</div>
    </div>
  `).join("");
}

// ---- INIT CALLS ----
document.addEventListener("DOMContentLoaded", ()=>{
  updateHeaderUI();
  renderFeatured();
  renderCart();
  renderMyReviews();
  initFaqPage();
  initEmiPage();
  initProductsPage();
});
