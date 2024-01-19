export const typeDefs = `#graphql
    type Contact {
        id: ID!
        name: String!
        phone: String!
        country: String!
        hour: String!
    }
    
    type Query {
        getContact(id: ID!): Contact!
        getContacts: [Contact!]!
    }
    
    type Mutation {
        addContact(name: String!, phone: String!): Contact!
        updateContact(id:ID!, name: String, phone:String): Contact!
        deleteContact(id:ID!): Contact!
    }
 `;