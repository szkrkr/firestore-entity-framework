import Entry from "./Entry";
import EntityState from "./EntityState";
import Guid from "../util/Guid";
export default class OperationEntries {
    constructor() {
        /**
         * @description
         * resume all entries to when get from DB
         */
        this.resume = (entries, id) => {
            var targetIndex = entries.findIndex(entry => entry.id === id);
            if (targetIndex >= 0) {
                if (entries[targetIndex].state === EntityState.Added) {
                    entries.splice(targetIndex, 1); // remove Entry self
                }
                else {
                    entries[targetIndex] = entries[targetIndex].resumeEntity();
                }
            }
            return entries;
        };
        /**
         * @description
         * resume all entries to when get from DB
         */
        this.resumeAll = (entries) => {
            for (var i = 0; i < entries.length; i++) {
                if (entries[i].state === EntityState.Added) {
                    entries.splice(i, 1); // remove Entry self
                }
                else {
                    entries[i] = entries[i].resumeEntity();
                }
            }
            return entries;
        };
    }
}
/**
 * @description
 * remove one entities
 * id is created by random
 * @param {TEntity} entity - entity to add
 * @returns {string} id added in this function
 */
OperationEntries.add = (entries, entity, id) => {
    if (!id) {
        id = Guid.create();
    }
    const newIEntry = new Entry(entity, id, EntityState.Added);
    entries.push(newIEntry);
    return entries;
};
/**
 * @description
 * remove one entities
 * if this entitiy is not saved yet (just added), it will be removed from entries
 * @param {string} id - specified id for modify
 * @returns {void}
 */
OperationEntries.remove = (entries, id) => {
    const index = entries.findIndex((entry => entry.id === id));
    if (index === -1) {
        throw new Error('there is no applicable data');
    }
    if (entries[index].state === EntityState.Added) {
        entries.splice(index, 1); // remove IEntry self
    }
    else {
        entries[index] = entries[index].removeEntity();
    }
    return entries;
};
/**
 * @description
 * modify one entities
 * @param {string} id - specified id for modify
 * @param {TEntity} entity - specified entity for modify
 * @returns {void}
 */
OperationEntries.modify = (entries, id, entity) => {
    const index = entries.findIndex((entry => entry.id === id));
    if (index === -1) {
        throw new Error('there is no applicable data');
    }
    entries[index] = entries[index].modifyEntity(entity);
    return entries;
};
/**
 * @description
 * update status after save of entries
 */
OperationEntries.saveChanges = (entries) => {
    for (var j = 0; j < entries.length; j++) {
        if (entries[j].state === EntityState.Deleted) {
            entries.splice(j, 1); // remove IEntry self
        }
        else {
            entries[j] = entries[j].saveEntity();
        }
    }
    return entries;
};
/**
 * @description
 * update status after save of a entry
 */
OperationEntries.saveChange = (entry) => {
    return entry.saveEntity();
};
