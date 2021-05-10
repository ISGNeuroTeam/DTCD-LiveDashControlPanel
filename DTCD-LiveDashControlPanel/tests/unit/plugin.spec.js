import {mount} from '@vue/test-utils';
import {Plugin} from './../../src/Plugin';
import LiveDashControlPanel from './../../src/components/LiveDashControlPanel.vue';

import {
  EventSystemAdapter,
  StorageSystemAdapter,
  InteractionSystemAdapter,
} from './../../../DTCD-SDK';

jest.mock('./../../../DTCD-SDK/Adapters/EventSystemAdapter', () => {
  return {
    EventSystemAdapter: jest.fn().mockImplementation(() => {
      return {
        subscribeByNames: jest.fn(),
        createActionByCallback: jest.fn(),
        createEvent: jest.fn(),
        registerEvent: jest.fn(),
        createAndPublish: jest.fn(),
      };
    }),
  };
});

jest.mock('./../../../DTCD-SDK/Adapters/StorageSystemAdapter');
jest.mock('./../../../DTCD-SDK/Adapters/InteractionSystemAdapter');

const Vue = {
  default: jest.fn().mockImplementation(() => {
    return {
      $mount: jest.fn(),
    };
  }),
};

const getDependence = jest.fn().mockImplementation(depName => {
  switch (depName) {
    case 'Vue':
      return Vue;
  }
});

Object.assign(Plugin.prototype, {getDependence});

// ----TESTS----

describe('Utils tests', () => {
  describe('Testing LiveDashControlPanel class', () => {
    describe('AbstractPlugin methods', () => {
      it('getDependence', () => {
        expect(Plugin.prototype.getDependence).toBeDefined();
      });
    });

    describe('Creating adapters instances', () => {
      afterAll(() => {
        jest.clearAllMocks();
      });

      describe('EventSystem', () => {
        beforeAll(() => {
          new Plugin('guid1', '#test-plugin-selector', 'guid2');
        });

        it('constructor to have been called', () => {
          expect(EventSystemAdapter).toHaveBeenCalled();
        });

        // it('should be executed registerEvent method 4 times', () => {
        //   expect(EventSystemAdapter.mock.results[0].value.registerEvent).toBeCalledTimes(4);
        // });

        // it('should be executed createEvent method 4 times', () => {
        //   expect(EventSystemAdapter.mock.results[0].value.createEvent).toBeCalledTimes(4);
        // });

        // it('should be executed createEvent method with all events', () => {
        //   const events = [
        //     'ClearGraph',
        //     'DeleteCurrentGraph',
        //     'OpenFromText',
        //     'SaveToServer',
        //     'SaveToFile',
        //     'SaveToStorage',
        //     'CalculateGraph',
        //     'FitContent',
        //     'ZoomIn',
        //     'ZoomOut',
        //     'ZoomOriginal',
        //     'CutItems',
        //     'CopyItems',
        //     'PasteItems',
        //     'DeleteItems',
        //     'UndoGraph',
        //     'RedoGraph',
        //   ];
        // events.forEach(evtName => {
        //   expect(EventSystemAdapter.mock.results[0].value.createEvent).toHaveBeenCalledWith(
        //     'guid1',
        //     evtName
        //   );
        // });
      });

      it('StorageSystem constructor', () => {
        expect(StorageSystemAdapter).toHaveBeenCalled();
      });
    });

    describe('LiveDashControlPanel Vue component', () => {
      let eventSystem, storageSystem, interactionSystem, guid, wrapper;
      beforeAll(() => {
        guid = 'guid1';
        eventSystem = new EventSystemAdapter();
        storageSystem = new StorageSystemAdapter();
        interactionSystem = new InteractionSystemAdapter();
        const Parent = {
          data() {
            return {
              guid,
              eventSystem,
              storageSystem,
              interactionSystem,
            };
          },
        };
        wrapper = mount(LiveDashControlPanel, {parentComponent: Parent});
      });
    });
  });
});
