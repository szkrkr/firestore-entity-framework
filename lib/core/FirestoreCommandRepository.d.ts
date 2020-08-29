import IEntry from "./IEntry";
import IEntity from "./IEntity";
import firebase from "firebase";
export default abstract class FirestoreCommandRepository<TEntity extends IEntity> {
    readonly reference: firebase.firestore.CollectionReference;
    constructor(reference: firebase.firestore.CollectionReference);
    /**
     * @description
     * save all changes in this data set
     */
    saveChanges: (entries: IEntry<TEntity>[]) => Promise<void>;
    /**
     * @description
     * save change of a entry
     */
    saveChange: (entry: IEntry<TEntity>) => Promise<void>;
}
