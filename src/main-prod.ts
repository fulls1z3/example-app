// angular
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

// libs
import { bootloader } from '@angularclass/bootloader';

// app
import { AppModuleNgFactory } from './app/app.module.ngfactory';

export function main(): any {
  enableProdMode();

  return platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
}

bootloader(main);
