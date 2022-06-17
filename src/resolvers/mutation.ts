import { IResolvers } from "graphql-tools";
import { COLLECTIONS } from "../config/constants";
import bcrypt from "bcrypt";

const resolversMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
            //Compprobar que el usuario no exista
            const userCheck = await db
                .collection(COLLECTIONS.USERS)
                .findOne({ email: user.email });

            if (userCheck !== null) {
                return {
                    status: false,
                    message: `El email ${user.email} esta registrado y no puedes registrarte con este email`,
                    user: null,
                };
            }
            //Comprobar el ultimo usuario registrado para asignar id
            const lastUser = await db
                .collection(COLLECTIONS.USERS)
                .find()
                .limit(1)
                .sort({ registerDate: -1 })
                .toArray();

            if (lastUser.length === 0) {
                user.id = 1;
            } else {
                user.id = lastUser[0].id + 1;
            }
            //Asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();
            //Encriptar password
            user.password = bcrypt.hashSync(user.password, 10);
            //Guardar el documento (registro) en la collection
            return await db
                .collection(COLLECTIONS.USERS)
                .insertOne(user)
                .then(async () => {
                    return {
                        status: true,
                        message: `El usuario con el ${user.email} esta registrado correctamente`,
                        user,
                    };
                })
                .catch((err: Error) => {
                    console.log(err.message);
                    return {
                        status: false,
                        message: `Error inesperado, prueba de nuevo`,
                        user: null,
                    };
                });
        },
    },
};

export default resolversMutation;
