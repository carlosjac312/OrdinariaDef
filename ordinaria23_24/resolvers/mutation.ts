import {GraphQLError} from "graphql";
import ContactModel, {ContactModelType} from "../db/contact.ts";
import getCountry from "../lib/getCountry.ts";
import getHour from "../lib/getHour.ts";
import mongoose from "mongoose"

export const Mutation = {
    addContact: async (_:unknown, args:{name:string, phone:string}): Promise<ContactModelType> => {
        const newcountry=await getCountry(args.phone);
        const newhour = await getHour(newcountry.country);
        const contacto = {
            name: args.name,
            phone: args.phone,
            country: newcountry.country,
            hour: newhour.hour
        }
        const newContact = await ContactModel.create(contacto);
        return newContact;
    },
    updateContact: async (_:unknown, args:{id:string,name:string, phone:string}): Promise<ContactModelType> => {
        const pais= await getCountry(args.phone);
        const hora = await getHour(pais.country);
        const contacto = await ContactModel.findByIdAndUpdate(
            args.id,
            {name: args.name, phone: args.phone, country: pais.country, hour: hora.hour},
            {new: true, runValidators: true}
        )
        return contacto;
    },
    deleteContact: async (_:unknown, args:{id:string}): Promise<ContactModelType> => {
        const contacto = await ContactModel.findByIdAndDelete(args.id);
        if(!contacto){
            throw new GraphQLError(`No se encontro un contacto con id ${args.id}`, {
                extensions: {code: "NOT_FOUND"},
            });
        }
        return contacto;
    },
}