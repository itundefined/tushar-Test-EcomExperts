document.addEventListener("DOMContentLoaded", () => {
  // Get add to cart form
  const addToCartForm = document.querySelectorAll('form[action="/cart/add"]')[1];
  
  // Get the current URL
  const currentURL = window.location.href;
   
  // Logic for the add into the cart by itself
  
  if (addToCartForm) {
    let product_variant_id = document.querySelector("input.product-variant-id").value;

    if (product_variant_id === "46659061481772") {
      addToCartForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Submit the initial form
        try {
          let response = await fetch(addToCartForm.action, {
            method: addToCartForm.method,
            body: new URLSearchParams(new FormData(addToCartForm))
          });

          if (response.ok) {
            console.log("Initial form submitted successfully");

            // Now make the additional AJAX request
            try {
              let ajaxResponse = await fetch("/cart/add.js", {
                method: "POST",
                body: new URLSearchParams({
                  id: "46577592140076", // Replace with the actual variant ID
                  quantity: "1"         // Replace with the desired quantity
                })
              });

              if (ajaxResponse.ok) {
                console.log("Product added to cart");
                
            // Updating the Cart Value.
            let current_cart_value = document.querySelector("#cart-icon-bubble > div > span:nth-child(1)").innerText;
            document.querySelector("#cart-icon-bubble > div > span:nth-child(1)").innerText = parseInt(current_cart_value) + 1;
                
              } else {
                console.log("Error adding product to cart");
              }
            } catch (ajaxError) {
              console.log("Error making AJAX request", ajaxError);
            }
          } else {
            console.log("Initial form submission error");
          }
        } catch (error) {
          console.log("Error submitting initial form", error);
        }
      });
    }
  }

  // Logic for remove from the cart by itself

  // Check if the URL ends with "cart"
  if (currentURL.endsWith("cart")) {


    let url_product_will_be_removed = document.querySelectorAll(".button--tertiary");

    url_product_will_be_removed.forEach((remove_button)=>{
        remove_button.addEventListener("click", ()=>{
    
    let container = remove_button.href;
    
    let startIdx = container.indexOf("?") + 4;
    
    let endIdx = container.indexOf(":", startIdx);
    
    let extracted_id = container.substring(startIdx, endIdx);
    
    if(parseInt(extracted_id) === 46659061481772){
    
    setTimeout(()=>{
        let winter_jacket = document.querySelector('a[aria-label="Remove Soft Winter Jacket"]');
    
    winter_jacket.click();
        
    }, 2000);
        
    }
            
        })
        
    })


    }
  
});
