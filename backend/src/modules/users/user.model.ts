import * as dynamoose from 'dynamoose';

export const UserSchema = new dynamoose.Schema({
  id: {
    type: Number,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
},
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  password:{
    type: String,
    required: true
  },
});

export const UserModel = dynamoose.model('User', UserSchema);

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: number;
  password: string;
}

