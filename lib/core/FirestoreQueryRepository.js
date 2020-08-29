var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EntityState from "./EntityState";
import Entry from "./Entry";
export default class FirestoreQueryRepository {
    constructor(reference) {
        /**
         * @description
         * find one entities
         * @param {string} id - specified id for search
         * @returns {Promise<Error | IEntry<TEntity>>} promise for result
         */
        this.find = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log('find is ignited');
            if (!this.reference) {
                throw new Error('reference is not decided. ');
            }
            const queryDocumentSnapshot = yield this.reference.doc(id).get().catch(err => { return Promise.reject(new Error(err)); });
            if (!queryDocumentSnapshot.exists) {
                throw new Error('there is no applicable data');
            }
            const entity = Object.assign({}, queryDocumentSnapshot.data());
            return new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged);
        });
        /**
         * @description
         * find all entities
         * @returns {Promise<Error | IEntry<TEntity>[]>} promise for result
         */
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            console.log('findAll is ignited');
            if (!this.reference) {
                throw new ReferenceError('reference is not decided. ');
            }
            const entries = [];
            const querySnapshot = yield this.reference.get().catch(err => { return Promise.reject(new Error(err)); });
            querySnapshot.docs.forEach((queryDocumentSnapshot) => {
                const entity = Object.assign({}, queryDocumentSnapshot.data());
                entries.push(new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged));
            });
            return entries;
        });
        /**
         * @description
         * search entities by query
         * @param {(query: firebase.firestore.CollectionReference) => firebase.firestore.Query)} predicate - function to put the firestore operateion (where/orderBy etc)
         * @returns {Promise<IEntry<TEntity>[]>} promise for result
         */
        this.search = (predicate) => __awaiter(this, void 0, void 0, function* () {
            console.log('search is ignited');
            const query = predicate(this.reference);
            const entries = [];
            const querySnapshot = yield query.get().catch(err => { return Promise.reject(new Error(err)); });
            querySnapshot.docs.forEach((queryDocumentSnapshot) => {
                const entity = Object.assign({}, queryDocumentSnapshot.data());
                entries.push(new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged));
            });
            return entries;
        });
        this.reference = reference;
    }
}
