import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createEmbedding } from "../helpers/embeddingHelper";
import categories from "../data/categories.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Institutes
  const institutes = await Promise.all(
    Array.from({ length: 3 }, async () => {
      return prisma.institute.create({
        data: {
          name: faker.company.name(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          instituteType: faker.helpers.arrayElement(["INT", "EXT"]),
        },
      });
    }),
  );

  // Create Users
  const users = await Promise.all(
    Array.from({ length: 5 }, async () => {
      return prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          password: faker.internet.password(),
          role: faker.helpers.arrayElement(["ADMIN", "EXCECUTIVE", "STAFF"]),
          instituteId: faker.helpers.arrayElement(institutes).id,
        },
      });
    }),
  );

  // Flatten all categories into a single array
  const allTitles = Object.values(categories).flat();
  const shuffledTitles = faker.helpers
    .shuffle(allTitles)
    .slice(0, users.length);

  // Create Projects with unique titles and Vector Embeddings
  const projects = await Promise.all(
    shuffledTitles.map(async (title, index) => {
      const content = faker.lorem.paragraphs(2);
      const published = faker.datatype.boolean();
      const embedding = await createEmbedding(title);

      return prisma.$executeRawUnsafe(
        `INSERT INTO "Projects" (id, title, content, published, "authorId", embedding, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6::vector, NOW(), NOW())`,
        faker.string.uuid(),
        title,
        content,
        published,
        users[index % users.length].id,
        embedding,
      );
    }),
  );

  console.log(
    `✅ Seeded ${institutes.length} institutes, ${users.length} users, and ${projects.length} projects.`,
  );
}

main()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
