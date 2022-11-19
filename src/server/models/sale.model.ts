import { Schema, model } from 'mongoose';
import { Client } from './client.model';
import { Product } from './product.model';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface OrderedProduct {
  item: Product;
  discount: number;
  quantity: number;
  rowTotal: number;
}

export interface Discount {
  id: number;
  concept: string;
  value: number;
}

export interface Sale {
  _id: string;
  clientId: Client;
  deliveryCity: string;
  orderedProducts: OrderedProduct[];
  paymentTerm: number;
  subtotal: number;
  tax: number;
  total: number;
  withholdingTax?: number;
  invoiceRef?: string;
  saleRequestRef: string;
  status:
    | 'producción'
    | 'alistamiento'
    | 'despachado'
    | 'entregado'
    | 'facturado'
    | 'en cartera'
    | 'pagado'
    | 'anulado'
    | '';
  discounts?: Discount[];
  creditNotes?: Discount[];
}

const orderedProductsSchema = new Schema<OrderedProduct>({
  item: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    autopopulate: { select: '-image' },
  },
  discount: { type: Number, required: true },
  quantity: { type: Number, required: true },
  rowTotal: { type: Number, required: true },
});

const discountsSchema = new Schema<Discount>({
  concept: { type: String, required: true },
  value: { type: Number, required: true },
});

orderedProductsSchema.plugin(mongooseAutoPopulate);
discountsSchema.plugin(mongooseAutoPopulate);

const saleSchema = new Schema<Sale>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: true,
      autopopulate: { select: 'name' },
    },
    deliveryCity: {
      type: String,
      required: true,
    },
    orderedProducts: {
      type: [orderedProductsSchema],
      required: true,
    },
    paymentTerm: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    withholdingTax: {
      type: Number,
    },
    invoiceRef: { type: String },
    saleRequestRef: { type: String, required: true, unique: true },
    status: { type: String, required: true },
    discounts: { type: [discountsSchema] },
    creditNotes: { type: [discountsSchema] },
  },
  {
    timestamps: true,
  }
);

saleSchema.plugin(mongooseAutoPopulate);

export const SaleModel = model<Sale>('Sale', saleSchema);
