import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
export default function FoodDetails({ foodId }) {
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
  const API_KEY = "7458d7728c0a468d8c3e9b2007b7d067";
  // const API_KEY = import.meta.env.REACT_APP_API_KEY;

  const [food, setFood] = useState();

  useEffect(() => {
    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setFood(data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    }

    fetchFood();
  }, [foodId]); // Adding foodId as a dependency to rerun the effect when foodId changes

  return (
    <div>
      {food ? (
        <div>
          <div className={styles.receipeCard}>
            <h1 className={styles.receipeName}>{food.title}</h1>
            <img
              className={styles.receipeImage}
              src={food.image}
              alt="Image is not available."
            />
            <div className={styles.receipeDetails}>
              <span>
                <strong> ⏰ {food.readyInMinutes} Minutes</strong>
              </span>
              <span>
                <strong> 👪 Serves : {food.servings}</strong>
              </span>
              <span>
                <strong>
                  {food.vegetarian ? " 🥕 Vegetarian" : " 🍖 Non-Vegetarian"}
                </strong>
              </span>
              <span>
                <span>{food.vegan ? " 🐄 Vegan" : ""}</span>
              </span>
            </div>
            <div>
              <span> 💲 {food.pricePerServing / 100} Per Serving</span>
            </div>

            <h2>Instructions</h2>
            <div className={styles.receipeInstructions}>
              <ol>
                {food.analyzedInstructions[0].steps.map((step) => (
                  <li>{step.step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
