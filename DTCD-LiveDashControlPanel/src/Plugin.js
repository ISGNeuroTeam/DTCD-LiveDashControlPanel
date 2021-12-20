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

  constructor(guid, selector) {
    super();

    const eventSystem = new EventSystemAdapter(guid);
    const storageSystem = new StorageSystemAdapter();
    const interactionSystem = new InteractionSystemAdapter();

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, storageSystem, interactionSystem };

    this.vue = new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }

  setNewGraphInfo(graphData) {
    const component = this.vue.$children[0].$children[0];
    return component.setNewGraphInfo(graphData);
  }
}
