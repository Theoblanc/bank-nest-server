export abstract class IBaseRepository<TEntity, TModel> {
  newId: () => string;
  modelToEntity: (model: TModel) => TEntity;
  entityToModel: (entity: TEntity) => TModel;
}
