import { Injectable } from '@nestjs/common';
import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  DeepPartial,
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

  async saveTenant(
    entity: DeepPartial<T> | DeepPartial<T>[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    const tenantId = this.contextService.getTenantId();

    if (Array.isArray(entity)) {
      const entitiesWithTenant = entity.map((e) => ({
        ...e,
        tenantId: tenantId || e.tenantId,
      })) as DeepPartial<T>[];

      return super.save(entitiesWithTenant, options);
    } else {
      const entityWithTenant = {
        ...entity,
        tenantId: tenantId || entity.tenantId,
      } as DeepPartial<T>;

      return super.save(entityWithTenant, options);
    }
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
