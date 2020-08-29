import IEntry from "./IEntry";
import IEntity from "./IEntity";
export default abstract class FirestoreQueryRepository<TEntity extends IEntity> {
    readonly reference: firebase.firestore.CollectionReference;
    constructor(reference: firebase.firestore.CollectionReference);
    /**
     * @description
     * find one entities
     * @param {string} id - specified id for search
     * @returns {Promise<Error | IEntry<TEntity>>} promise for result
     */
    find: (id: string) => Promise<IEntry<TEntity>>;
    /**
     * @description
     * find all entities
     * @returns {Promise<Error | IEntry<TEntity>[]>} promise for result
     */
    findAll: () => Promise<IEntry<TEntity>[]>;
    /**
     * @description
     * search entities by query
     * @param {(query: firebase.firestore.CollectionReference) => firebase.firestore.Query)} predicate - function to put the firestore operateion (where/orderBy etc)
     * @returns {Promise<IEntry<TEntity>[]>} promise for result
     */
    search: (predicate: (query: firebase.firestore.CollectionReference) => firebase.firestore.Query) => Promise<IEntry<TEntity>[]>;
}
