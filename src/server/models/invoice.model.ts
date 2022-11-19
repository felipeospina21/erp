import { Schema, model } from 'mongoose';

export interface Invoice {
  count: number;
}

const invoiceSchema = new Schema<Invoice>(
  {
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export const InvoiceModel = model<Invoice>('Invoice', invoiceSchema);
