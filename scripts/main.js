    const foodFactory = (food) => {
       return `<div class="foodListItems"> 
       <h1>${food.name}</h1>
        <section">${food.category}</section>
        <aside>${food.ethnicity}</aside>
        </div>`
    }

    fetch("http://localhost:8088/food")
    

    .then(foods => foods.json())

    .then(parsedFoods => {
        parsedFoods.forEach(food => {
        console.log(foodFactory(food))
        const foodContainer = document.querySelector(".foodList")
        foodContainer.innerHTML += foodFactory(food)
        })
    })

