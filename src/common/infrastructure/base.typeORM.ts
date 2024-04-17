import { ObjectLiteral } from 'typeorm';

export interface IEntity extends ObjectLiteral {
  id: string;
}

interface IModel<Properties> {
  properties: () => Properties;
}

interface IFactory<Properties, Model extends IModel<Properties>> {
  reconstitute(properties: Properties): Model;
}

export class BaseTypeORM<Entity extends IEntity, Model extends IModel<Entity>> {
  constructor(readonly factory: IFactory<Entity, Model>) {}
  modelToEntity(model: Model): Entity {
    return model.properties();
  }

  entityToModel(entity: Entity): Model {
    return this.factory.reconstitute(entity);
  }
}
