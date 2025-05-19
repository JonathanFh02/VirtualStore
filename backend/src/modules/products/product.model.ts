import * as dynamoose from 'dynamoose';

export const ProductSchema = new dynamoose.Schema({
    id: {
        type: Number,
        hashKey: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    imageUrl: { 
        type: String,
        required: false,
    },
});

export const ProductModel = dynamoose.model('Product', ProductSchema);

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
}

