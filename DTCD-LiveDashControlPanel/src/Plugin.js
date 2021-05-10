import pluginMeta from './Plugin.Meta';
import PluginComponent from './PluginComponent.vue';

import {
  PanelPlugin,
  EventSystemAdapter,
  StorageSystemAdapter,
  InteractionSystemAdapter,
} from './../../DTCD-SDK/index';

export class Plugin extends PanelPlugin {
  static getRegistrationMeta() {
    return pluginMeta;
  }

  constructor(guid, selector, liveDashGUID) {
    super();

    const eventSystem = new EventSystemAdapter();
    const storageSystem = new StorageSystemAdapter();
    const interactionSystem = new InteractionSystemAdapter();

    const VueJS = this.getDependence('Vue');
    const data = {guid, liveDashGUID, eventSystem, storageSystem, interactionSystem};

    new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }
}
