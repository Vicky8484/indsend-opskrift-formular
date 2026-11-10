import RecipeForm from "@/components/RecipeForm";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col w-full justify-center">
      <div className="w-full p-4">
        <Image
          src="https://img.magnific.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg?semt=ais_hybrid&w=740&q=80"
          width={740}
          height={300}
          alt="Lækker mad"
          className="w-full aspect-16/4 object-cover rounded-xl"
        />
      </div>
      <RecipeForm />
      <div className="w-full p-4">
        <Image
          src="https://images.pexels.com/photos/19141541/pexels-photo-19141541/free-photo-of-chopsticks-on-meat.jpeg?cs=tinysrgb&dpr=1&w=500"
          width={740}
          height={300}
          alt="Lækker mad"
          className="w-full aspect-16/4 object-cover rounded-xl"
        />
      </div>
    </div>
  );
}

// Ingen AI har skrevet koden i filerner, jeg er bare dårlig til at committe og bange for at pushe, når vi laver øvelser ud fra Troels' repo, så jeg udskyder det
