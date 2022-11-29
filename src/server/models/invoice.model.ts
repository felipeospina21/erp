import { Schema, model, models } from 'mongoose';

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

export const InvoiceModel = models.Invoice || model<Invoice>('Invoice', invoiceSchema);
