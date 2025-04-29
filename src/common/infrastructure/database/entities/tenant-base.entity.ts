import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export class TenantBaseEntity extends BaseEntity {
  @Column({ name: 'tenant_id' })
  tenantId: string;
}
