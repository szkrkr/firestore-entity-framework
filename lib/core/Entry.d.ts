import EntityState from "./EntityState";
import IEntity from "./IEntity";
import IEntry from "./IEntry";
export default class Entry<TEntity extends IEntity> implements IEntry<TEntity> {
    id: string;
    entity: TEntity;
    original: TEntity | null;
    state: EntityState;
    constructor(entity: TEntity, id: string, state?: EntityState);
    /**
     * @description
     * remove entity
     *
     * Unchanged -> Modified: OK
     * Modified -> Modified: OK
     * Added -> Modified: NG (but should be change the value)
     * Deleted -> Modified: NG (and should not be change the value)
     */
    modifyEntity: (value: TEntity) => IEntry<TEntity>;
    /**
     * @description
     * remove entity
     *
     * Unchanged -> Deleted: OK
     * Modified -> Deleted: OK
     * Added -> Deleted: NG (Should Remove from entries)
     * Deleted -> Deleted: NG
     */
    removeEntity: () => IEntry<TEntity>;
    /**
     * @description
     * save entity
     *
     * Unchanged -> Unchanged: Do nothing
     * Modified -> Unchanged: OK
     * Added -> Unchanged: OK
     * Deleted -> Unchanged: OK
     */
    saveEntity: () => IEntry<TEntity>;
    /**
     * @description
     * resume entity
     */
    resumeEntity: () => IEntry<TEntity>;
}
