// libs
import { ConfigService } from '@ngx-config/core';

// mocks
import { MockConfigService } from './mocks/config-service.mock';

function getProviders(): Array<any> {
  return [
    {
      provide: ConfigService,
      useClass: MockConfigService
    }
  ];
}

/*
 * For testing core services
 * @returns `Array<any>`
 */
export const MOCK_CORE_PROVIDERS = getProviders();

export * from './mocks/config-service.mock';
