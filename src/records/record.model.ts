import * as mongoose from 'mongoose';

export const RecordSchema = new mongoose.Schema({
  title: {type: String, required: true},
  artist: {type: String, required: true},
  year: {type: Number, required: true},
  cover: {type: String, required: true},
});

export interface Record extends mongoose.Document {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;
}
