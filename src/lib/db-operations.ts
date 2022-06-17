import { Db } from "mongodb";

/**
 * Obteber el Id que vamos a utilizar en el nuevo usuario
 * @param database Base de datos con la que estamos trabajando
 * @param collection Collecion donde queremos buscar el ultimo elemento
 * @param sort Como queremos ordenarlo {<propiedad>: -1}
 */
export const asignDocumentId = async (
    dataBase: Db,
    collection: string,
    sort: object = { registerDate: -1 }
) => {
    const lastElement = await dataBase
        .collection(collection)
        .find()
        .limit(1)
        .sort(sort)
        .toArray();

    if (lastElement.length === 0) {
        return 1;
    }
    return lastElement[0].id + 1;
};

export const findOneElement = async (
    dataBase: Db,
    collection: string,
    filter: object
) => {
    return dataBase.collection(collection).findOne(filter);
};

export const insertOneElement = async (
    dataBase: Db,
    collection: string,
    document: object
) => {
    return await dataBase.collection(collection).insertOne(document);
};

export const insertManyElements = async (
    dataBase: Db,
    collection: string,
    documents: Array<object>
) => {
    return await dataBase.collection(collection).insertMany(documents);
};

export const findElements = async (
    dataBase: Db,
    collection: string,
    filter: object = {}
) => {
    return await dataBase.collection(collection).find(filter).toArray();
};
