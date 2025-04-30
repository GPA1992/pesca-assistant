import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ContextService } from '../../contexts/context.service';
import { TenantBaseEntity } from './entities/tenant-base.entity';

@Injectable()
export class TenantAwareRepository<
  T extends TenantBaseEntity,
> extends Repository<T> {
  constructor(
    entity: EntityTarget<T>,
    manager: EntityManager,
    private readonly contextService: ContextService,
  ) {
    super(entity, manager);
  }

  async saveTenant(entity: T, options?: SaveOptions): Promise<T> {
    const tenantId = this.contextService.getTenantId();

    entity.tenantId = tenantId || entity.tenantId;

    return super.save(entity, options);
  }

  async saveAllTenant(entities: T[], options?: SaveOptions): Promise<T[]> {
    const tenantId = this.contextService.getTenantId();

    const entitiesWithTenant = entities.map((entity) => ({
      ...entity,
      tenantId: tenantId || entity.tenantId,
    }));

    return super.save(entitiesWithTenant, options);
  }

  async find(options?: FindOneOptions<T>): Promise<T[]> {
    const tenantId = this.contextService.getTenantId();

    return super.find({
      ...options,
      where: {
        ...options?.where,
        tenantId,
      } as FindOptionsWhere<T>,
    });
  }

  async findOne(options?: FindOneOptions<T>): Promise<T | null> {
    const tenantId = this.contextService.getTenantId();

    return super.findOne({
      ...options,
      where: {
        ...options?.where,
        tenantId,
      } as FindOptionsWhere<T>,
    });
  }

  async update(
    criteria: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<any> {
    const tenantId = this.contextService.getTenantId();

    const finalCriteria = {
      ...criteria,
      tenantId,
    };

    return super.update(finalCriteria, partialEntity);
  }
}
