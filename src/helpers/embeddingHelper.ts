import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID, // Set this in your .env file
  project: process.env.OPENAI_PROJECT_ID, // Set this in your .env file
});

export async function createEmbedding(text: string): Promise<number[]> {
  try {
    console.log("Requesting embedding for:", text);

    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    console.log("Embedding response:", response);
    return response.data[0].embedding;
  } catch (error: any) {
    console.error("Error generating embedding:", error.response?.data || error);
    throw error;
  }
}
