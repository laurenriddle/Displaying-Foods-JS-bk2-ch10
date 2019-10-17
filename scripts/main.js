const foodFactory = (food) => {
    return `<div class="foodListItems"> 
       <h1>${food.name}</h1>
        <section>${food.ethnicity} ${food.category}</section>
       <section>Ingredients: ${food.ingredients}</section>  
       <section>Countries: ${food.countries}</section>
       <section>Calories Per Serving: ${food.calories}</section>
       <section>Fat Per Serving: ${food.fat}g</section>
       <section>Sugar Per Serving: ${food.sugar}g</section>
        </div>`
}


fetch("http://localhost:8088/food")
    .then(response => response.json())

    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property
            let barcode = food.barcode
            // Now fetch the food from the Food API
           fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                    } else {
                        food.countries = "no countries listed"
                    }

                    if (productInfo.product.calories) {
                        food.calories = productInfo.product.calories
                    } else {
                        food.calories = "no calories listed"
                    }

                    if (productInfo.product.nutriments.sugars) {
                        food.sugar = productInfo.product.nutriments.sugars
                    } else {
                        food.sugar = "no sugars listed"
                    }

                    if (productInfo.product.nutriments.fat) {
                        food.fat = productInfo.product.nutriments.fat
                    } else {
                        food.fat = "no fats listed"
                    }
                    
                    // // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // // Add representaiton to DOM
                    const foodContainer = document.querySelector(".foodList")
                    foodContainer.innerHTML += foodAsHTML
                })

        })

    })
    