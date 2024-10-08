import { Schema, model, Model, Document, VirtualType } from 'mongoose';
import { randomUUID } from 'crypto';

export interface UserAttributes {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  password: string;
  confirmPassword?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UserDocument extends Document, UserAttributes {}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>( 
  {
    userId: {
      type: Schema.Types.UUID,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true
    },
    confirmPassword: {
      type: String,
      get(this: UserDocument) {
        return this.password
      }
    }
  },
  {
    timestamps: true,
  }
)

// userSchema.virtual('confirmPassword').get(function (this: UserDocument) {
//   return this.password;
// });

const User: UserModel = model<UserDocument, UserModel>('User', userSchema);

export default User;
