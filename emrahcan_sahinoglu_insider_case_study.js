"use strict";

function insiderCaseStudy() {
  const styles = {
    applyAll: {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
    },
    container: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#faf9f7",
    },
    wrapper: {
      width: "88%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
    },
    title: {
      fontSize: "32px",
      lineHeight: "50px",
      color: "#29323b",
      fontWeight: "lighter",
      paddingLeft: "55px",
    },
    productContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "20px",
      padding: "10px 0",
    },
    buttons: {
      width: "50px",
      height: "50px",
      border: "none",
      outline: "none",
      background: "none",
      borderRadius: "5px",
      color: "#29323b",
      fontSize: "4rem",
      fontWeight: "600",
      cursor: "pointer",
    },
    productWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "20px",
      flexWrap: "nowrap",
      overflow: "hidden",
    },
    product: {
      width: "210px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      backgroundColor: "#ffffff",
      position: "relative",
    },
    favorite: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      top: "10px",
      right: "20px",
      width: "auto",
      height: "auto",
      padding: "5px",
      backgroundColor: "#ffffff",
      border: "none",
      outline: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.4)",
    },
    productImage: {
      width: "210px",
      height: "280px",
      backgroundColor: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    productName: {
      width: "100%",
      height: "50px",
      fontSize: "15px",
      color: "#4d4d4d",
      marginBottom: "10px",
      textAlign: "left",
      padding: "10px 10px 0 10px",
    },
    productPrice: {
      width: "100%",
      fontSize: "1.5rem",
      fontWeight: "800",
      color: "#002db4",
      textAlign: "left",
      padding: "0 10px 10px 10px",
    },
  };

  function applyStyles(element, styleObject) {
    for (const property in styleObject) {
      element.style[property] = styleObject[property];
    }
  }

  function stringSlicer(string, length) {
    if (string.length > length) {
      return string.substr(0, length) + "...";
    }
    return string;
  }

  function languageLogic() {
    const language = window.location.pathname.split("/")[1];
    return language === "tr-TR" ? "tr" : "en";
  }

  async function fetchProducts() {
    const response = await fetch(
      "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const products = await response.json();
    localStorage.setItem("cachedProducts", JSON.stringify(products));
    return products;
  }

  async function fetchingLogic() {
    const cachedProducts = localStorage.getItem("cachedProducts");

    if (cachedProducts) {
      // I left it by purpose to show on console as well that it is working
      console.log("Cache from localStorage: " + cachedProducts);
      return JSON.parse(cachedProducts);
    }

    const products = await fetchProducts();
    // I left it by purpose to show on console as well that it is working
    console.log("Fetched from server: " + products);
    return products;
  }

  function sliderLogic(wrapper, previous, next) {
    let scrollAmount = 0;
    let isScrolling = false;
    let scrollMax = wrapper.scrollWidth - wrapper.clientWidth;

    function scroll(scrollAmount) {
      if (!isScrolling) {
        isScrolling = true;
        wrapper.scrollTo({
          top: 0,
          left: scrollAmount,
          behavior: "smooth",
        });
        setTimeout(() => {
          isScrolling = false;
        }, 200);
      }
    }

    previous.addEventListener("click", () => {
      if (scrollAmount > 0) {
        scrollAmount -= 240;
        scroll(scrollAmount);
      } else {
        scrollAmount = scrollMax;
        scroll(scrollAmount);
      }
    });

    next.addEventListener("click", () => {
      if (scrollAmount < scrollMax) {
        scrollAmount += 240;
        scroll(scrollAmount);
      } else {
        scrollAmount = 0;
        scroll(scrollAmount);
      }
    });
  }

  function isLiked(favorite, favoriteIcon, favoriteIconPath, itemId) {
    favorite.addEventListener("click", () => {
      const favoritesArray = localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [];
      if (favoritesArray.includes(itemId)) {
        const index = favoritesArray.indexOf(itemId);
        favoritesArray.splice(index, 1);
        favoriteIcon.setAttribute("stroke", "black");
        favoriteIconPath.style.fill = "#ffffff";
      } else {
        favoritesArray.push(itemId);
        favoriteIcon.setAttribute("stroke", "none");
        favoriteIconPath.style.fill = "#ff0000";
      }

      localStorage.setItem("favorites", JSON.stringify(favoritesArray));
    });

    document.addEventListener("DOMContentLoaded", () => {
      const favoritesArray = localStorage.getItem("favorites")
        ? JSON.parse(localStorage.getItem("favorites"))
        : [];

      if (favoritesArray.includes(itemId)) {
        favoriteIconPath.style.fill = "#ff0000";
      }
    });
  }

  async function initializeDocument() {
    const productDetails = document.querySelector(".product-detail");

    if (!productDetails) {
      console.log("You cannot run this script on this page");
      return;
    }

    const container = document.createElement("div");
    applyStyles(container, styles.container);

    const wrapper = document.createElement("div");
    applyStyles(wrapper, styles.wrapper);

    container.appendChild(wrapper);

    const title = document.createElement("p");
    title.textContent =
      languageLogic() === "tr"
        ? "Bunlarda Hoşunuza Gidebilir"
        : "You Might Also Like";
    applyStyles(title, styles.title);

    wrapper.appendChild(title);

    const productContainer = document.createElement("div");
    applyStyles(productContainer, styles.productContainer);

    const buttonPrev = document.createElement("button");
    applyStyles(buttonPrev, styles.buttons);
    buttonPrev.id = "prevButton";
    buttonPrev.textContent = "<";

    productContainer.appendChild(buttonPrev);

    const productWrapper = document.createElement("div");
    applyStyles(productWrapper, styles.productWrapper);
    productWrapper.id = "productWrapper";

    productContainer.appendChild(productWrapper);

    const products = await fetchingLogic();

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.innerHTML = `
      <div class="product">
          <button class="favorite" data-product-id="${product.id}">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="favorite-icon"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
              />
            </svg>
          </button>
          <div class="product-image">
              <img src="${product.img}" alt="${
        product.name
      }" width="210" height="280" />
          </div>
          <div class="product-name">
              <span>${stringSlicer(product.name, 40)}</span>
          </div>
          <div class="product-price">
              <span>${product.price}</span>
          </div>
      </div>
    `;
      applyStyles(productElement.querySelector(".product"), styles.product);
      applyStyles(productElement.querySelector(".favorite"), styles.favorite);
      applyStyles(
        productElement.querySelector(".product-image"),
        styles.productImage
      );
      applyStyles(
        productElement.querySelector(".product-name"),
        styles.productName
      );
      applyStyles(
        productElement.querySelector(".product-price"),
        styles.productPrice
      );

      productWrapper.appendChild(productElement);
      const favorite = productElement.querySelector(".favorite");
      const favoriteIcon = productElement.querySelector("svg");
      const favoriteIconPath = favoriteIcon.querySelector("path");
      isLiked(favorite, favoriteIcon, favoriteIconPath, product.id);
    });

    const buttonNext = document.createElement("button");
    applyStyles(buttonNext, styles.buttons);
    buttonNext.id = "nextButton";
    buttonNext.textContent = ">";

    productContainer.appendChild(buttonNext);
    wrapper.appendChild(productContainer);
    container.appendChild(wrapper);

    productDetails.insertAdjacentElement("afterend", container);

    sliderLogic(
      document.getElementById("productWrapper"),
      document.getElementById("prevButton"),
      document.getElementById("nextButton")
    );
  }

  initializeDocument();
}

insiderCaseStudy();
