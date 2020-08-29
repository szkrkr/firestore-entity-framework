import IEntry from "./IEntry";
import IEntity from "./IEntity";
import EntityState from "./EntityState";
import Entry from "./Entry";

export default abstract class FirestoreQueryRepository<
  TEntity extends IEntity
> {
  readonly reference: firebase.firestore.CollectionReference;

  constructor(reference: firebase.firestore.CollectionReference) {
    this.reference = reference;
  }

  /**
   * @description
   * find one entities
   * @param {string} id - specified id for search
   * @returns {Promise<Error | IEntry<TEntity>>} promise for result
   */
  find = async (id: string): Promise<IEntry<TEntity>> => {
    if (!this.reference) {
      throw new Error("reference is not decided. ");
    }
    const queryDocumentSnapshot = await this.reference
      .doc(id)
      .get()
      .catch((err) => Promise.reject(new Error(err)));
    if (!queryDocumentSnapshot.exists) {
      throw new Error("there is no applicable data");
    }

    const entity = { ...(queryDocumentSnapshot.data() as TEntity) };

    return new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged);
  };

  /**
   * @description
   * find all entities
   * @returns {Promise<Error | IEntry<TEntity>[]>} promise for result
   */
  findAll = async (): Promise<IEntry<TEntity>[]> => {
    console.log("findAll is ignited");
    if (!this.reference) {
      throw new ReferenceError("reference is not decided. ");
    }
    const entries = [] as IEntry<TEntity>[],
      querySnapshot: firebase.firestore.QuerySnapshot = await this.reference
        .get()
        .catch((err) => Promise.reject(new Error(err)));

    querySnapshot.docs.forEach(
      (queryDocumentSnapshot: firebase.firestore.QueryDocumentSnapshot) => {
        const entity: TEntity = {
          ...(queryDocumentSnapshot.data() as TEntity),
        };
        entries.push(
          new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged)
        );
      }
    );

    return entries;
  };

  /**
   * @description
   * search entities by query
   * @param {(query: firebase.firestore.CollectionReference) => firebase.firestore.Query)} predicate - function to put the firestore operateion (where/orderBy etc)
   * @returns {Promise<IEntry<TEntity>[]>} promise for result
   */
  search = async (
    predicate: (
      query: firebase.firestore.CollectionReference
    ) => firebase.firestore.Query
  ): Promise<IEntry<TEntity>[]> => {
    const query = predicate(this.reference),
      entries = [] as IEntry<TEntity>[],
      querySnapshot = await query
        .get()
        .catch((err) => Promise.reject(new Error(err)));
    querySnapshot.docs.forEach(
      (queryDocumentSnapshot: firebase.firestore.QueryDocumentSnapshot) => {
        const entity: TEntity = {
          ...(queryDocumentSnapshot.data() as TEntity),
        };
        entries.push(
          new Entry(entity, queryDocumentSnapshot.id, EntityState.Unchanged)
        );
      }
    );

    return entries;
  };
}
