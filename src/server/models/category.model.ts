import { Schema, model } from 'mongoose';

export interface Category {
  _id: string;
  name: string;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true, unique: true, lowercase: true },
});

export const CategoryModel = model<Category>('Category', categorySchema);
