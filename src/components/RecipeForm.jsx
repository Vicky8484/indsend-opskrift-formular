"use client";
import postRecipe from "@/actions/action";
import {useActionState, useState, useEffect} from "react";
import {initialRecipe} from "@/recipeSchema";
import z, {success} from "zod";

const RecipeForm = () => {
  const [state, postRecipeAction, isPending] = useActionState(postRecipe, {
    success: null,
    message: "",
  });

  const [formFields, setFormFields] = useState(initialRecipe);

  useEffect(() => {
    if (state.success === true) {
      setFormFields(initialRecipe);
    }
  }, [state]);

  function handleChange(event) {
    const {name, value} = event.target;

    //currentFields bevarer den nyeste værdi af formFields og spreader dem inde i det nye objekt
    //vi tager name attributten, læser værdien af den og bruger den som nøgle [name], så hver gang der sker noget får vi det rette navn gemt som nøgle hver gang vi udfylder et felt. Vi opdaterer med et nyt object ved at tage en kopi af det eksisterende object (...curentFields) og sætte en ny nøgle+værdi til
    setFormFields((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));
  }

  function showFieldError(fieldName) {
    const error = state.fieldErrors?.[fieldName]?.[0];

    return error ? (
      <p role="alert" className="text-red-700 bg-red-50 p-2">
        {error}
      </p>
    ) : null;
  }

  return (
    <section className="w-full p-4">
      <h1 className="mb-5 text-4xl font-bold sticky top-0 bg-green-50 text-green-950 border-b-2 border-green-200 py-4">
        Tilføj en opskrift
      </h1>
      {state.message && (
        <p
          className={`mt-4 rounded border p-3 my-2 ${
            state.success === true
              ? "border-green-300 text-center bg-green-100 text-green-800"
              : "border-red-300 text-center bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </p>
      )}
      <form action={postRecipeAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Opskriftens navn</span>
            <input
              type="text"
              name="recipename"
              value={formFields.recipename}
              onChange={handleChange}
              className="rounded-xl border-2 border-green-200 bg-white p-2"
              maxLength={100}
            />
            {showFieldError("recipename")}
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold">Ingredienser</span>
            <input
              type="text"
              name="recipeingredients"
              value={formFields.recipeingredients}
              onChange={handleChange}
              className="rounded-xl border-2 border-green-200 bg-white p-2"
            />
            {showFieldError("recipeingredients")}
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-semibold">Fremgangsmåde</span>
            <textarea
              name="recipeinstructions"
              value={formFields.recipeinstructions}
              onChange={handleChange}
              rows="5"
              maxLength={1000}
              className="resize-y rounded-xl border-2 border-green-200 bg-white p-2"
            />
            {showFieldError("recipeinstructions")}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Forberedelsestid (min)</span>
              <input
                type="text"
                name="recipepreptime"
                value={formFields.recipepreptime}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={3}
                className="rounded-xl border-2 border-green-200 bg-white p-2"
              />
              {showFieldError("recipepreptime")}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Tilberedningstid (min)</span>
              <input
                type="text"
                name="recipecooktime"
                value={formFields.recipecooktime}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={3}
                className="rounded-xl border-2 border-green-200 bg-white p-2"
              />
              {showFieldError("recipecooktime")}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Portioner</span>
              <input
                type="text"
                name="recipeservings"
                value={formFields.recipeservings}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={3}
                className="rounded-xl border-2 border-green-200 bg-white p-2"
              />
              {showFieldError("recipeservings")}
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-semibold">Kalorier pr. portion</span>
              <input
                type="text"
                name="recipecalories"
                value={formFields.recipecalories}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={4}
                className="rounded-xl border-2 border-green-200 bg-white p-2"
              />
              {showFieldError("recipecalories")}
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded border border-gray-400 bg-green-900 text-white p-3 disabled:opacity-50"
        >
          {isPending ? "Opretter opskrift..." : "Opret opskrift"}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-4 rounded border p-3 ${
            state.success === true
              ? "border-green-300 text-center bg-green-100 text-green-800"
              : "border-red-300 text-center bg-red-50 text-red-800"
          }`}
        >
          {state.message}
        </p>
      )}
    </section>
  );
};

export default RecipeForm;

// const [formFields, setFormFields] = useState({recipename: ""}); forklaring:
// useState opretter client-side state. formFields indeholder den aktuelle værdi, og setFormFields er funktionen, der opdaterer den. I starten er recipename en tom tekst.

// function handleChange(event) { forklaring:
// Denne funktion kaldes, når brugeren ændrer inputfeltet. event indeholder oplysninger om ændringen.
// const {name, value} = event.target; forklaring:
// Her hentes inputfeltets name og aktuelle value. For dit input bliver de henholdsvis "recipename" og det, brugeren har skrevet.

// setFormFields((currentFields) => ({ ...currentFields, [name]: value,})); forklaring:
// state opdateres med den nye værdi. ...currentfields bevarer andre felter i objektet og [name]: value opdaterer feltet med det navn inputtet har
// value={formFields.recipename} og onChange={handleChange} på input forklaring:
// Nu er inputtet controlled: React-state bestemmer inputværdien via value, og onChange opdaterer state, når brugeren skriver. name="recipename" skal svare til nøglen recipename i state.

// Funktion showFieldError forklaring:
// Denne funktion kaldes når indholdet af inputfelterne ikke møder zod valideringens kriterier
// const error = state.fieldErrors?.[fieldName]?.[0]; henter den første fejlbesked for et bestemt formularfelt fra state.fieldErrors
// state.fieldErrors indeholder valideringsfejlene
// [fieldName] slår fejlen op for det felt, hvis navn fx er "recipename"
// [0] tager den første fejlbesked, hvis der er flere
// ?. er optional chaining: Hvis en del mangler, fx hvis der ingen fejl er, stopper udtrykket og giver undefined i stedet for at udløse en fejl
// Resultatet gemmes i variablen error, som funktionen derefter viser under feltet, hvis der findes en fejlbesked

// Ingen AI har skrevet koden i filerner, jeg er bare dårlig til at committe og bange for at pushe, når vi laver øvelser ud fra Troels' repo, så jeg udskyder det
