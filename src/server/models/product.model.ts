import { Schema, model, models } from 'mongoose';
import { Category } from './category.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface Product {
  _id: string;
  category: Category;
  name: string;
  price: number;
  stockAvailable: number;
  stockReserved: number;
  image?: string;
}

const productSchema = new Schema<Product>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      autopopulate: { select: 'name' },
    },
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
    stockAvailable: { type: Number, required: true },
    stockReserved: { type: Number, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseAutoPopulate);

export const ProductModel = models.Product || model<Product>('Product', productSchema);
