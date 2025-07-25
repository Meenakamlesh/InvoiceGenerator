import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface IInvoice extends Document {
  userId: mongoose.Types.ObjectId;
  products: IProduct[];
  subtotal: number;
  gst: number;
  totalAmount: number;
  invoiceNumber: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

const invoiceSchema = new Schema<IInvoice>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [productSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  gst: {
    type: Number,
    default: 18,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IInvoice>('Invoice', invoiceSchema);