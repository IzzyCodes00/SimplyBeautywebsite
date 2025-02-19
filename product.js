// Get the image element

// Reusable function to update the image source
function updateImageSource(targetElementId, newSrc, colorID, button) {
  const targetElement = document.getElementById(targetElementId); // Get the target element
  targetElement.src = newSrc; // Set the new source

  const productContainer = button.closest(".product");

  // Display the color name
  displayedColorElement = productContainer.querySelector(".Color-displayedJs");
  displayedColorElement.innerHTML = colorID;

  // Change the status to "In Stock"
  const statusElement = productContainer.querySelector(".status a");
  if (statusElement) {
    statusElement.textContent = "In Stock";
    statusElement.style.color = "green"; // Change the color to green
  }
}

// Attach event listeners to all buttons with the 'action-button' class
const buttons = document.querySelectorAll(".action-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetElementId = button.dataset.target; // Get the target element from the data attribute
    const newSrc = button.dataset.newSrc;
    const color = button.dataset.color; // Get the new source from the data attribute
    updateImageSource(targetElementId, newSrc, color, button); // Call the reusable function
  });
});

function filterItems(category) {
  let items = document.querySelectorAll(".product");
  let visibleItems = 0; // Counter for visible items

  items.forEach((item) => {
    // If the category is 'all', show all items or if the category matches the item, show the item.
    if (category === "all" || item.classList.contains(category)) {
      item.classList.remove("hidden");
      visibleItems++; // Increment the counter
    } else {
      item.classList.add("hidden");
    }
  });
  //check if no items were found
  let message = document.getElementById("coming-soon");
  if (visibleItems === 0) {
    message.classList.remove("hidden");
  } else {
    message.classList.add("hidden");
  }
}

function updateProductStatus(productName) {
  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const nameElement = product.querySelector(".product-name");
    if (nameElement && nameElement.textContent.trim() === productName) {
      const statusElement = product.querySelector(".status a");
      if (statusElement) {
        statusElement.textContent = "Out of Stock";
        statusElement.style.color = "red"; // Change the color to red
      }
    }
  });
}

// Example usage:
updateProductStatus(Tower28 SOS Spray);
updateProductStatus(Elf Primer);
// Ensure the product name matches exactly with the text content of the .product-name element

function updateColorStatusToOutOfStock(targetElementId, colorID, button) {
  const targetElement = document.getElementById(targetElementId);
  if (targetElement) {
    const productContainer = targetElement.closest(".product");
    const displayedColorElement =
      productContainer.querySelector(".Color-displayedJs");
    if (
      displayedColorElement &&
      displayedColorElement.textContent.trim() === colorID
    ) {
      const statusElement = productContainer.querySelector(".status a");
      if (statusElement) {
        statusElement.textContent = "Out of Stock";
        statusElement.style.color = "red"; // Change the color to red
      }
    }
  }
}

// Attach event listeners to all buttons with the 'out-of-stock-button' class
const outOfStockButtons = document.querySelectorAll(".out-of-stock-button");
outOfStockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetElementId = button.dataset.target; // Get the target element from the data attribute
    const color = button.dataset.color; // Get the color from the data attribute
    updateColorStatusToOutOfStock(targetElementId, color, button); // Call the function
  });
});

// Example usage:
// updateColorStatusToOutOfStock('product-image-1', 'Cherry');
//updateColorStatusToOutOfStock("product-image-gisou", "Watermelon");
