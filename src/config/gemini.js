//AIzaSyAK6K870PS7q9bmpdbs2LtHpyIriYq5kA4
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAK6K870PS7q9bmpdbs2LtHpyIriYq5kA4");

export const getGeminiModal = async () => {
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

export const getRecommendedMovies = async (watchList) => {
  try {
    const model = await getGeminiModal();
    const prompt = `Based on these movies in the user's watchlist: 
    ${watchList.map((movie) => `- ${movie.title}`)}
    
    Act as a movie recommendation engine. Based on the user's watchlist, recommend 6 similar movies. For each movie, provide:
1. Title
2. A brief reason why it's recommended (1-2 sentences)
3. A confidence score (0-100) indicating how closely it matches the user's preferences
4. A valid poster image URL hosted on internet (ensure the URL is accessible and returns a 200 status code)

Return the response in this exact JSON format:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "reason": "Reason for recommendation",
      "confidence": 85,
      "poster": "URL"
    }
  ]
}

Rules:
1. Only include movies with valid  poster URLs om internet. Verify the URLs before including them.
2. Ensure the confidence score is realistic and reflects the similarity to the user's watchlist.
3. The reason should be specific and highlight similarities in genre, theme, or style.
4. If you cannot find a valid poster URL for a movie, exclude it and recommend another movie instead.
5. Do not include any additional text or explanations outside the JSON format.`;
    const data = await model.generateContent(prompt);
    // console.log(data.response.text());
    return data;
  } catch (error) {
    console.log("Error in getRecommendedMovies", error);
  }
};
