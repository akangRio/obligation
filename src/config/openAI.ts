import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

async function test() {
  const openai = new OpenAI({
    organization: process.env.OPENAI_ORG_ID,
    project: process.env.OPENAI_PROJECT_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "i want to make breakfast, help me makes menu",
      },
    ],
    store: true,
  });

  console.log(completion.choices[0].message);
}
test();
