"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const embeddingHelper_1 = require("../helpers/embeddingHelper");
const categories_json_1 = __importDefault(require("../data/categories.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🌱 Seeding database...");
        // Create Institutes
        const institutes = yield Promise.all(Array.from({ length: 3 }, () => __awaiter(this, void 0, void 0, function* () {
            return prisma.institute.create({
                data: {
                    name: faker_1.faker.company.name(),
                    email: faker_1.faker.internet.email(),
                    phone: faker_1.faker.phone.number(),
                    instituteType: faker_1.faker.helpers.arrayElement(["INT", "EXT"]),
                },
            });
        })));
        // Create Users
        const users = yield Promise.all(Array.from({ length: 5 }, () => __awaiter(this, void 0, void 0, function* () {
            return prisma.user.create({
                data: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    phone: faker_1.faker.phone.number(),
                    password: faker_1.faker.internet.password(),
                    role: faker_1.faker.helpers.arrayElement(["ADMIN", "EXCECUTIVE", "STAFF"]),
                    instituteId: faker_1.faker.helpers.arrayElement(institutes).id,
                },
            });
        })));
        // Flatten all categories into a single array
        const allTitles = Object.values(categories_json_1.default).flat();
        const shuffledTitles = faker_1.faker.helpers
            .shuffle(allTitles)
            .slice(0, users.length);
        // Create Projects with unique titles and Vector Embeddings
        const projects = yield Promise.all(shuffledTitles.map((title, index) => __awaiter(this, void 0, void 0, function* () {
            const content = faker_1.faker.lorem.paragraphs(2);
            const published = faker_1.faker.datatype.boolean();
            const embedding = yield (0, embeddingHelper_1.createEmbedding)(title);
            return prisma.$executeRawUnsafe(`INSERT INTO "Projects" (id, title, content, published, "authorId", embedding, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6::vector, NOW(), NOW())`, faker_1.faker.string.uuid(), title, content, published, users[index % users.length].id, embedding);
        })));
        console.log(`✅ Seeded ${institutes.length} institutes, ${users.length} users, and ${projects.length} projects.`);
    });
}
main()
    .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
