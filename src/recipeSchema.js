import * as z from "zod";

export const Recipe = z.object({
  recipename: z
    .string()
    .trim()
    .min(3, "Opskriften skal have et navn")
    .regex(/^[^0-9]*$/, "Navnet må ikke indeholde tal"),

  /*dette kaldes method chaining!!!*/

  recipeingredients: z
    .string()
    .trim()
    .min(1, "Skriv mindst én ingrediens")
    .refine(
      (value) =>
        value.split(",").every((ingredient) => ingredient.trim().length > 0),
      "Skriv en ingrediens mellem hvert komma",
    ),

  recipeinstructions: z.string().trim().min(1, "Skriv en fremgangsmåde"),

  recipepreptime: z
    .string()
    .trim()
    .min(1, "Angiv forberedelsestid")
    .pipe(
      z.coerce
        .number()
        .min(0, "Tiden må ikke være negativ.")
        .max(999, "Tiden må højst være 999 minutter"),
    ),

  recipecooktime: z
    .string()
    .trim()
    .min(1, "Angiv tilberedningstid")
    .pipe(
      z.coerce
        .number()
        .min(0, "Tiden må ikke være negativ")
        .max(999, "Tiden må højst være 999 minutter"),
    ),

  recipeservings: z
    .string()
    .trim()
    .min(1, "Angiv antal portioner")
    .pipe(
      z.coerce
        .number()
        .min(1, "Der skal være mindst én portion")
        .max(100, "Der må højst være 100 serveringer"),
    ),

  recipecalories: z
    .string()
    .trim()
    .min(1, "Angiv kalorier pr. portion")
    .pipe(
      z.coerce
        .number()
        .min(0, "Kalorier må ikke være negative")
        .max(4000, "Der må højst være 4000 kalorier"),
    ),
});

export const initialRecipe = {
  recipename: "",
  recipeingredients: "",
  recipeinstructions: "",
  recipepreptime: "",
  recipecooktime: "",
  recipeservings: "",
  recipecalories: "",
};

// Ingen AI har skrevet koden i filerner, jeg er bare dårlig til at committe og bange for at pushe, når vi laver øvelser ud fra Troels' repo, så jeg udskyder det
