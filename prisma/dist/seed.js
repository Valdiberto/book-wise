"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const books_1 = require("./constants/books");
const categories_1 = require("./constants/categories");
const ratings_1 = require("./constants/ratings");
const users_1 = require("./constants/users");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.rating.deleteMany();
    await prisma.user.deleteMany();
    await prisma.categoriesOnBooks.deleteMany();
    await prisma.category.deleteMany();
    await prisma.book.deleteMany();
    const usersSeed = users_1.users.map((user) => {
        return prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar_url: user.avatar_url,
            },
        });
    });
    const categoriesSeed = categories_1.categories.map((category) => {
        return prisma.category.create({
            data: {
                name: category.name,
                id: category.id,
            },
        });
    });
    const booksSeed = books_1.books.map((book) => {
        return prisma.book.create({
            data: {
                id: book.id,
                name: book.name,
                author: book.author,
                summary: book.summary,
                cover_url: book.cover_url,
                total_pages: book.total_pages,
                categories: {
                    create: [
                        ...book.categories.map((category) => {
                            return {
                                category: {
                                    connect: {
                                        id: category.id,
                                    },
                                },
                            };
                        }),
                    ],
                },
            },
        });
    });
    const ratingsSeed = ratings_1.ratings.map((rating) => {
        return prisma.rating.create({
            data: {
                id: rating.id,
                rate: rating.rate,
                description: rating.description,
                user: {
                    connect: { id: rating.user_id },
                },
                book: {
                    connect: { id: rating.book_id },
                },
            },
        });
    });
    await prisma.$transaction([
        ...categoriesSeed,
        ...booksSeed,
        ...usersSeed,
        ...ratingsSeed,
    ]);
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
