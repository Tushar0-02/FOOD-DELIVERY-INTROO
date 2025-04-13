let user = null;
let cart = [];

auth.onAuthStateChanged(u => {
  user = u;
  document.getElementById('user').innerText = user ? `Logged in as: ${user.displayName}` : '';
  document.getElementById('login').style.display = user ? 'none' : 'inline';
  document.getElementById('logout').style.display = user ? 'inline' : 'none';
});

document.getElementById('login').onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

document.getElementById('logout').onclick = () => auth.signOut();

async function loadFoods() {
  const list = document.getElementById('food-list');
  list.innerHTML = '';
  const snapshot = await db.collection("foods").get();
  snapshot.forEach(doc => {
    const food = doc.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <img src="${food.imageUrl}" width="150"><br>
      <b>${food.name}</b><br>
      ₹${food.price}<br>
      <button onclick='addToCart(${JSON.stringify(food)})'>Add to Cart</button><hr>
    `;
    list.appendChild(div);
  });
}

function addToCart(food) {
  cart.push(food);
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  cart.forEach((item, i) => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
}

document.getElementById('place-order').onclick = async () => {
  if (!user) return alert("Please login first");
  if (cart.length === 0) return alert("Cart is empty");

  await db.collection("orders").add({
    user: user.email,
    items: cart,
    timestamp: new Date()
  });

  alert("Order placed!");
  cart = [];
  renderCart();
};

loadFoods();
