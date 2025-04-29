import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

interface ExecutionContext {
  tenantId: string;
}

@Injectable()
export class ContextService {
  private readonly storage = new AsyncLocalStorage<ExecutionContext>();

  setContext(context: ExecutionContext): void {
    this.storage.run(context, () => {});
  }

  getContext(): ExecutionContext | undefined {
    return this.storage.getStore();
  }

  getTenantId(): string | undefined {
    return this.getContext()?.tenantId;
  }
}
