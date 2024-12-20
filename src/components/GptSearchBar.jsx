// import { useRef } from "react";
// import language from "../utils/language";
// import { useDispatch, useSelector } from "react-redux";
// import { TMDB_OPTIONS, OPEN_AI_KEY } from "../utils/constants";
// import { setMovieName, setMovieSearch } from "../utils/gptSlice";
// // import Loader from "./Loader";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const GptSearchBar = () => {
//   const langkey = useSelector((store) => store?.config?.lang);
//   const searchval = useRef(null);
//   const dispatch = useDispatch();

//   const tmdbmoviesearch = async (movie) => {
//     const data = await fetch(
//       "https://api.themoviedb.org/3/search/movie?query=" +
//         movie +
//         "&include_adult=false&language=en-US&page=1",
//       TMDB_OPTIONS
//     );
//     const json = await data.json();
//     return json.results;
//   };

//   const handleclick = async () => {
//     let query = "";
//     try {
//       query =
//         "assume you are a movie recommendation system. Suggest me a movie for the query: " +
//         searchval?.current?.value +
//         ". Only give me 5 movie names, comma-separated.";

//       const genAI = new GoogleGenerativeAI(OPEN_AI_KEY);

//       const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//       const result = await model.generateContent(query);
//       const response = result.response;
//       const gptresult = response.text();

//       const content = gptresult.split(",");
//       dispatch(setMovieName(content));

//       const searchdata = content.map((movie) => tmdbmoviesearch(movie));

//       const searchresult = await Promise.all(searchdata);
//       dispatch(setMovieSearch(searchresult));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="pt-[40%] md:pt-[10%] flex p-2 md:p-0 justify-center">
//       <form
//         className="bg-black w-full md:w-1/2 grid grid-cols-12"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         <input
//           ref={searchval}
//           className="col-span-9 m-4 p-2 rounded"
//           type="text"
//           placeholder={language[langkey].placeholder}
//         />
//         <button
//           onClick={handleclick}
//           className="col-span-3 m-4 p-2 rounded text-white bg-red-700"
//         >
//           {language[langkey].search}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;


import { useRef } from "react";
import language from "../utils/language";
import { useDispatch, useSelector } from "react-redux";
import { TMDB_OPTIONS, OPEN_AI_KEY } from "../utils/constants";
import { setMovieName, setMovieSearch } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store?.config?.lang);
  const searchval = useRef(null);
  const dispatch = useDispatch();

  const tmdbmoviesearch = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      TMDB_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleclick = async () => {
    let query = "";
    try {
      query =
        "Assume you are a movie recommendation system. Suggest me 5 movies based on the query: " +
        searchval?.current?.value +
        ". Only give me the movie names, comma-separated.";

      const openAIResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: query },
          ],
        }),
      });

      if (!openAIResponse.ok) {
        const errorData = await openAIResponse.json();
        console.error("OpenAI API error:", errorData);
        return;
      }

      const result = await openAIResponse.json();
      const gptresult = result?.choices?.[0]?.message?.content;

      if (!gptresult) {
        throw new Error("No valid response from OpenAI.");
      }

      const content = gptresult.split(",").map((movie) => movie.trim());
      dispatch(setMovieName(content));

      const searchdata = content.map((movie) => tmdbmoviesearch(movie));

      const searchresult = await Promise.all(searchdata);
      dispatch(setMovieSearch(searchresult));
    } catch (error) {
      if (error.message === "No valid response from OpenAI.") {
        console.error("Error: OpenAI did not return the expected response.");
      } else if (error.message.includes("429")) {
        console.error("Too many requests. Please try again later.");
      } else {
        console.error("Error with OpenAI API:", error);
      }
    }
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex p-2 md:p-0 justify-center">
      <form
        className="bg-black w-full md:w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchval}
          className="col-span-9 m-4 p-2 rounded"
          type="text"
          placeholder={language[langkey].placeholder}
        />
        <button
          onClick={handleclick}
          className="col-span-3 m-4 p-2 rounded text-white bg-red-700"
        >
          {language[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;



