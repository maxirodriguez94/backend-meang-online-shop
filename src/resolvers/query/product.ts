import { IResolvers } from "graphql-tools";

const resolversProductQuery: IResolvers = {
    Query: {
        products(): boolean {
            return true;
        },
    },
};

export default resolversProductQuery;
resolversProductQuery
