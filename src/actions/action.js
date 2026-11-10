"use server";

import {Recipe} from "@/recipeSchema";
import * as z from "zod";

const postRecipe = async (prevState, formData) => {
  //   console.log(formData);

  // const recipeName = formData.get("recipename");
  // console.log(recipeName);

  try {
    const {
      recipename: recipeName,
      recipeingredients: recipeIngredients,
      recipeinstructions: recipeInstructions,
      recipepreptime: prepTimeMinutes,
      recipecooktime: cookTimeMinutes,
      recipeservings: servings,
      recipecalories: caloriesPerServing,
    } = Recipe.parse({
      recipename: formData.get("recipename"),
      recipeingredients: formData.get("recipeingredients"),
      recipeinstructions: formData.get("recipeinstructions"),
      recipepreptime: formData.get("recipepreptime"),
      recipecooktime: formData.get("recipecooktime"),
      recipeservings: formData.get("recipeservings"),
      recipecalories: formData.get("recipecalories"),
    });

    const response = await fetch("https://dummyjson.com/recipes/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: recipeName,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        caloriesPerServing,
      }),
    });

    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    return {
      success: true,
      message: "Opskriften blev oprettet",
      fieldErrors: {},
    };

    console.log(`Response status: ${response.status}`);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "",
        fieldErrors: z.flattenError(error).fieldErrors,
      };
    }
    return {success: false, message: "Der skete en fejl", fieldErrors: {}};
  }
};

export default postRecipe;

// Ingen AI har skrevet koden i filerner, jeg er bare dårlig til at committe og bange for at pushe, når vi laver øvelser ud fra Troels' repo, så jeg udskyder det
