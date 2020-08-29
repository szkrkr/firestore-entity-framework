import IEntity from "./IEntity";
import IEntry from "./IEntry";
export default class OperationEntries {
    /**
     * @description
     * remove one entities
     * id is created by random
     * @param {TEntity} entity - entity to add
     * @returns {string} id added in this function
     */
    static add: <T extends IEntity>(entries: IEntry<T>[], entity: T, id?: string | undefined) => IEntry<T>[];
    /**
     * @description
     * remove one entities
     * if this entitiy is not saved yet (just added), it will be removed from entries
     * @param {string} id - specified id for modify
     * @returns {void}
     */
    static remove: <T extends IEntity>(entries: IEntry<T>[], id: string) => IEntry<T>[];
    /**
     * @description
     * modify one entities
     * @param {string} id - specified id for modify
     * @param {TEntity} entity - specified entity for modify
     * @returns {void}
     */
    static modify: <T extends IEntity>(entries: IEntry<T>[], id: string, entity: T) => IEntry<T>[];
    /**
     * @description
     * update status after save of entries
     */
    static saveChanges: <T extends IEntity>(entries: IEntry<T>[]) => IEntry<T>[];
    /**
     * @description
     * update status after save of a entry
     */
    static saveChange: <T extends IEntity>(entry: IEntry<T>) => IEntry<T>;
    /**
     * @description
     * resume all entries to when get from DB
     */
    resume: <T extends IEntity>(entries: IEntry<T>[], id: string) => IEntry<T>[];
    /**
     * @description
     * resume all entries to when get from DB
     */
    resumeAll: <T extends IEntity>(entries: IEntry<T>[]) => IEntry<T>[];
}
