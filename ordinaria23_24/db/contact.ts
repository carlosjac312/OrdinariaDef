import mongoose from "mongoose";
import {Contact} from "../types.ts";

const Schema = mongoose.Schema;
const ContactSchema = new Schema(
    {
        name: { type: String,required: true},
        phone: { type: String,required: true},
        country: { type: String,required: true},
        hour: { type: String,required: true},
    }
);
export type ContactModelType = mongoose.Document & Omit<Contact, "id">;
export default mongoose.model<ContactModelType>("Contact", ContactSchema);