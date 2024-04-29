import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'profile-page',
  exposes: {
    './Routes': 'apps/ctc-admin/remotes/profile-page/src/app/remote-entry/entry.routes.ts',
    './Component': 'apps/ctc-admin/remotes/profile-page/src/app/remote-entry/entry.component.ts'
  },
  remotes: ['header', 'sidebar']
};

export default config;
