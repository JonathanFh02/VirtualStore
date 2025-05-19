import { Schema, model } from 'dynamoose';

const CartSchema = new Schema({
  userId: {
    type: Number,
    hashKey: true,
    required: true,
  },
  items: {
    type: Array,
    schema: [{
      type: Object,
      schema: {
        productId: Number,
        name: String,
        price: Number,
        quantity: Number,
      },
    }],
    default: [],
  },
});

export const CartModel = model('Cart', CartSchema);
