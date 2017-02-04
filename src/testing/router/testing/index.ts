// angular
import { ActivatedRoute, Router } from '@angular/router';

// mocks
import { MockActivatedRoute } from './mocks/activated-route.mock';
import { MockRouter } from './mocks/router.mock';

export const MOCK_ROUTER_PROVIDERS: Array<any> = [
  {
    provide: Router,
    useClass: MockRouter
  },
  {
    provide: ActivatedRoute,
    useClass: MockActivatedRoute
  }
];

export * from './mocks/activated-route.mock';
export * from './mocks/router.mock';
