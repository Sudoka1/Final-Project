import { Schema, model } from 'mongoose';
// definiere ein mongoose-Schema
const personSchema = new Schema({
  vorname: {
    type: String,
    required: true,
  },
  nachname: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
// definiere ein entsprechendes mongoose-Model
const Person = model('Person', personSchema, 'personen');

export default Person;
