import IEntry from "./IEntry";
import IEntity from "./IEntity";
import EntityState from "./EntityState";
import firebase from "firebase";

export default abstract class FirestoreCommandRepository<
  TEntity extends IEntity
> {
  readonly reference: firebase.firestore.CollectionReference;

  constructor(reference: firebase.firestore.CollectionReference) {
    this.reference = reference;
  }

  /**
   * @description
   * save all changes in this data set
   */
  saveChanges = async (entries: IEntry<TEntity>[]): Promise<void> => {
    if (!this.reference) {
      throw new ReferenceError("reference is not decided. ");
    }
    const batch = this.reference.firestore.batch();

    for (let i = 0; i < entries.length; i++) {
      switch (entries[i].state) {
        case EntityState.Unchanged:
          break;
        case EntityState.Added:
        case EntityState.Modified:
          batch.set(this.reference.doc(entries[i].id), {
            ...entries[i].entity,
          });
          break;
        case EntityState.Deleted:
          batch.delete(this.reference.doc(entries[i].id));
          break;
      }
    }

    return await batch.commit().catch((err: string | undefined) => {
      return Promise.reject(new Error(err));
    });
  };

  /**
   * @description
   * save change of a entry
   */
  saveChange = async (entry: IEntry<TEntity>): Promise<void> => {
    if (entry.state === EntityState.Unchanged) {
      return;
    }
    if (entry.state === EntityState.Deleted) {
      return;
    }
    return await this.reference.doc(entry.id).set({ ...entry.entity });
  };
}
