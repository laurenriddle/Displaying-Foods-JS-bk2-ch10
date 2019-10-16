// const foodFactory = (food) => {
//    return `<div class="foodListItems"> 
//    <h1>${food.name}</h1>
//     <section">${food.ethnicity} ${food.category}</section>
//     </div>`
// }

// fetch("http://localhost:8088/food")


// .then(foods => foods.json())

// .then(parsedFoods => {
//     parsedFoods.forEach(food => {
//     console.log(foodFactory(food))
//     const foodContainer = document.querySelector(".foodList")
//     foodContainer.innerHTML += foodFactory(food)
//     })
// })


const foodFactory = (food) => {
    return `<div class="foodListItems"> 
       <h1>${food.name}</h1>
        <section">${food.ethnicity} ${food.category}</section>
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

                    // // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // // Add representaiton to DOM
                    // addFoodToDom(foodAsHTML)
                    const foodContainer = document.querySelector(".foodList")
                    foodContainer.innerHTML += foodAsHTML
                })

        })

    })
    