import { Schema, model, models } from 'mongoose';

export interface Client {
  _id: string;
  addres1: string;
  addres2?: string;
  city: string;
  department: string;
  discount: number;
  email?: string;
  idNumber: string;
  idType: string;
  name: string;
  paymentTerm: 'contado' | '15' | '30' | '60';
  retailer: boolean;
  phone?: number;
}

const clientSchema = new Schema<Client>(
  {
    addres1: { type: String, required: true },
    addres2: { type: String },
    city: { type: String, required: true },
    department: { type: String, required: true },
    discount: { type: Number, required: true },
    email: { type: String },
    idNumber: { type: String, required: true, unique: true },
    idType: { type: String, required: true },
    name: { type: String, required: true },
    paymentTerm: { type: String, required: true, enum: ['contado', '15', '30', '60'] },
    retailer: { type: Boolean, required: true },
    phone: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const ClientModel = models.Client || model<Client>('Client', clientSchema);
