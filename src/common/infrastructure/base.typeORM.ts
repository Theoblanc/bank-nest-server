import { ObjectLiteral } from 'typeorm';
import { IBaseRepository } from '@common/domain/base.repository';
import { v4 as uuidv4 } from 'uuid';

export interface IEntity extends ObjectLiteral {
  id: string;
}

interface IModel<Properties> {
  properties: () => Properties;
}

interface IFactory<Properties, Model extends IModel<Properties>> {
  reconstitute(properties: Properties): Model;
}

export class BaseTypeORM<Entity extends IEntity, Model extends IModel<Entity>>
  implements IBaseRepository<Entity, Model>
{
  constructor(readonly factory: IFactory<Entity, Model>) {}

  newId() {
    return uuidv4();
  }

  modelToEntity(model: Model): Entity {
    return model.properties();
  }

  entityToModel(entity: Entity): Model {
    return this.factory.reconstitute(entity);
  }
}
