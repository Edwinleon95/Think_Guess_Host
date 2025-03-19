import { Category } from "./category.interface";

export interface Question {
    id: number;
    name: string; // This is the answer
    image: string; // This is the image URL
    description: string; // This is the question text
    category: Category
};