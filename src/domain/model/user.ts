import mongoose from 'mongoose';

export class UserM {
  _id: mongoose.Types.ObjectId;
  id: string;
  username: string;
  nonce: number;
  verified: boolean;
  walletAddress: boolean;
  bod: Date;
  address: string;
  coin: number;
  blocked: boolean;
  deviceTokens: string[];
  password: string;
  lat: string;
  long: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
}
