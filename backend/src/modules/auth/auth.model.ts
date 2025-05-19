import * as dynamoose from 'dynamoose';


export const AuthSchema = new dynamoose.Schema({
    userId: String,
    password: String,
});

export const AuthModel = dynamoose.model('User', AuthSchema);

export interface Auth{
    userId: string;
    password: string;
}