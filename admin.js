const form = document.getElementById('food-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('food-name').value;
  const price = parseInt(document.getElementById('food-price').value);
  const file = document.getElementById('food-image').files[0];

  if (!name || !price || !file) {
    alert("Please fill all fields");
    return;
  }

  const storageRef = storage.ref(`food-images/${Date.now()}_${file.name}`);
  try {
    const snapshot = await storageRef.put(file);
    const imageUrl = await snapshot.ref.getDownloadURL();

    await db.collection("foods").add({
      name,
      price,
      imageUrl
    });

    alert("Food added!");
    form.reset();
  } catch (error) {
    alert("Error uploading!");
    console.error(error);
  }
});
