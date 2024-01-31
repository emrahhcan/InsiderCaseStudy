# LC Waikiki Carousel Case Study

- This script represents a Responsive multilingual (English and Turkish) Carousel similar to the one visible on LC Waikiki's product page
- Product lists are retrievied from [this address](https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json) using GET request.
- This script only run on the product pages after the
  element with ".product-detail" class within the product page's structure using Developer Tools Console in browser.
- The carousel include a title with the text "You Might Also Like". Users are able to view six and a half products, and by clicking the arrow buttons, the carousel slide one product to the right or left according to the direction of the arrow.
- When a user clicks on a product, the respective product page gets open in a new tab. Clicking on the heart icon fill it with a blue color, and this preference is stored in the local storage.
- Upon running the code for the second time after refreshing the page, it retrieves the product list from the local storage instead of making another fetch request. Additionally, the code ensures that the favorited products with filled hearts are displayed.
