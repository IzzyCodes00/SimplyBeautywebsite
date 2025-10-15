// Add fade-in class to body on page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});
//Add fade

// Reusable function to update the image source
function updateImageSource(targetElementId, newSrc, colorID, button) {
  // Only update the image inside the same product as the button
  const productContainer = button.closest(".product");
  const targetElement = productContainer.querySelector(`#${targetElementId}`);
  if (targetElement && newSrc) {
    targetElement.src = newSrc;
  }

  // Only update .Color-displayedJs elements that are direct children of .product-name in this product
  const productName = productContainer.querySelector(".product-name");
  if (productName) {
    const colorDisplayA = productName.querySelector(".Color-displayedJs");
    if (colorDisplayA) {
      colorDisplayA.innerHTML = colorID;
    }
  }
  // Also update any .Color-displayedJs elements that are direct children of this product (for block color display)
  const directColorDisplays = Array.from(productContainer.children).filter(
    (el) => el.classList && el.classList.contains("Color-displayedJs")
  );
  directColorDisplays.forEach((el) => {
    el.innerHTML = colorID;
  });

  // Change the status to "In Stock"
  const statusElement = productContainer.querySelector(".status a");
  if (statusElement) {
    statusElement.textContent = "In Stock";
    statusElement.style.color = "rgb(28, 214, 28)"; // Change the color to green
  }
}

// Attach event listeners to all buttons with the 'action-button' class
const buttons = document.querySelectorAll(".action-button");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove selected-shade from all sibling shade buttons in the same product
    buttons.forEach((btn) => btn.classList.remove("selected-shade"));

    // Add it to the one that was clicked
    button.classList.add("selected-shade");
    // Add selected-shade to the clicked button

    const targetElementId = button.dataset.target; // Get the target element from the data attribute
    const newSrc = button.dataset.newSrc;
    const color = button.dataset.color; // Get the new source from the data attribute
    updateImageSource(targetElementId, newSrc, color, button); // Call the reusable function
  });
});

function filterItems(category) {
  let items = document.querySelectorAll(".product");
  let visibleItems = 0;
  let container = document.querySelector(".container-products");
  let message = document.getElementById("coming-soon");

  // Filter logic
  items.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.classList.remove("hidden");
      visibleItems++;
    } else {
      item.classList.add("hidden");
    }
  });

  // Show or hide "Coming Soon"
  if (visibleItems === 0) {
    message.classList.remove("hidden");
  } else {
    message.classList.add("hidden");
  }

  // Trigger fade animation
  container.classList.remove("fade-category");
  void container.offsetWidth; // Force reflow
  container.classList.add("fade-category");
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
["Elf Primer", "Saie Illuminator", "Saie Blush"].forEach(updateProductStatus);

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

const carouselSlide = document.querySelector(".carousel-slide");
const images = document.querySelectorAll(".carousel-slide img");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");

let counter = 0;

function updateCarousel() {
  const size = images[0].clientWidth;
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

nextBtn.addEventListener("click", () => {
  counter = (counter + 1) % images.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  counter = (counter - 1 + images.length) % images.length;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
