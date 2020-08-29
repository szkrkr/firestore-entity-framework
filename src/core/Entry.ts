import EntityState from "./EntityState";
import IEntity from "./IEntity";
import IEntry from "./IEntry";

export default class Entry<TEntity extends IEntity> implements IEntry<TEntity> {
  id: string;

  entity: TEntity;

  original: TEntity | null;

  state: EntityState;

  constructor(
    entity: TEntity,
    id: string,
    state: EntityState = EntityState.Unchanged
  ) {
    this.id = id;
    this.entity = entity;
    this.original = null;
    this.state = state;
  }

  /**
   * @description
   * remove entity
   *
   * Unchanged -> Modified: OK
   * Modified -> Modified: OK
   * Added -> Modified: NG (but should be change the value)
   * Deleted -> Modified: NG (and should not be change the value)
   */
  modifyEntity = (value: TEntity): IEntry<TEntity> => {
    const _entry = { ...this };

    // Should throw the error "already delete"
    if (_entry.state === EntityState.Deleted) {
      return _entry;
    }

    this.original = this.original || this.entity;
    this.entity = value;
    if (_entry.state === EntityState.Added) {
      return _entry;
    }
    _entry.state = EntityState.Mofified;

    return _entry;
  };

  /**
   * @description
   * remove entity
   *
   * Unchanged -> Deleted: OK
   * Modified -> Deleted: OK
   * Added -> Deleted: NG (Should Remove from entries)
   * Deleted -> Deleted: NG
   */
  removeEntity = (): IEntry<TEntity> => {
    const _entry = { ...this };
    if (_entry.state === EntityState.Added) {
      return _entry;
    } // Should throw as internal error
    if (_entry.state === EntityState.Deleted) {
      return _entry;
    } // Should throw the error "already deleted"
    _entry.state = EntityState.Deleted;
    return _entry;
  };

  /**
   * @description
   * save entity
   *
   * Unchanged -> Unchanged: Do nothing
   * Modified -> Unchanged: OK
   * Added -> Unchanged: OK
   * Deleted -> Unchanged: OK
   */
  saveEntity = (): IEntry<TEntity> => {
    const _entry = { ...this };
    if (_entry.state === EntityState.Unchanged) {
      return _entry;
    }
    _entry.original = null;
    _entry.state = EntityState.Unchanged;
    return _entry;
  };

  /**
   * @description
   * resume entity
   */
  resumeEntity = (): IEntry<TEntity> => {
    const _entry = { ...this };
    if (_entry.state === EntityState.Unchanged) {
      return _entry;
    }
    if (
      _entry.state === EntityState.Deleted ||
      _entry.state === EntityState.Mofified
    ) {
      _entry.state = EntityState.Unchanged;
      if (_entry.original) {
        _entry.entity = _entry.original;
        _entry.original = null;
      }
    }
    return _entry;
  };
}
