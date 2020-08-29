import EntityState from "./EntityState";
import IEntity from "./IEntity";

export default interface IEntry<TEntity extends IEntity> {
  id: string;
  entity: TEntity;
  original: TEntity | null;
  state: EntityState;
  modifyEntity: (value: TEntity) => IEntry<TEntity>;
  removeEntity: () => IEntry<TEntity>;
  saveEntity: () => IEntry<TEntity>;
  resumeEntity: () => IEntry<TEntity>;
}
