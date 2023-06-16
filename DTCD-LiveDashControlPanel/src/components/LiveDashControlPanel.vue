<template>
  <div class="LiveDashControlPanel">
    <div
      class="Overlay"
      v-if="graphListIsActive"
      @click="graphListIsActive = false"
    ></div>
    <!-- <button class="DragButton">
      <span class="FontIcon name_drag size_lg"></span>
    </button> -->

    <div class="InputWrapper">
      <base-input
        placeholder="Graph name..."
        :value="inputGraphNameValue"
        @input="event => (inputGraphNameValue = event.target.value)"
        @focus="doEditGraphName = true"
        @blur="handleInputGraphNameBlur"
      ></base-input>

      <!-- <span
        v-if="doEditGraphName == false"
        class="FontIcon name_edit InputIcon type_edit size_xs">
      </span> -->

      <button
        v-if="doEditGraphName"
        class="InputIcon type_close"
        @click="cancelEditGraphInfo"
      >
        <span class="FontIcon name_closeBig size_sm"></span>
      </button>
    </div>
    <div class="Buttons">
      <base-tooltip content="Create new graph" placement="bottom">
        <base-icon-button
          :disabled="!isAllowToCreateGraph"
          @click="publishEvent('ClearGraph')"
        >
          <span class="FontIcon name_fileBlankOutline size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete current graph" placement="bottom">
        <base-icon-button
          @click="deleteFromServer"
          :disabled="!isAllowToDeleteGraph"
        >
          <span class="FontIcon name_trashFull size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Open from file" placement="bottom">
        <base-icon-button @click="publishEvent('OpenFromFile')">
          <span class="FontIcon name_folder size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-dropdown class="GraphListDropDownWrapper">
        <div slot="toggle-btn">
          <base-tooltip content="Open from server" placement="bottom">
            <base-icon-button
              v-if="!graphListIsActive"
              @click="toSelectNewGraph"
            >
              <span class="FontIcon size_md" :class="arrowIcon" />
            </base-icon-button>

            <base-icon-button v-else @click="graphListIsActive = false">
              <span class="FontIcon size_md" :class="arrowIcon" />
            </base-icon-button>
          </base-tooltip>

          <GraphListSelect
            v-show="graphListIsActive"
            ref="graphListDropDown"
            @updateOption="openFromServer"
            :currentGraphID="currentGraphID"
            :graphList="graphList"
            :showPreloader="showGraphListPreloader"
            :errorMessage="graphListErrorMsg"
          ></GraphListSelect>
        </div>
        <span slot="icon-arrow" />
      </base-dropdown>

      <!-- <base-tooltip content="Open the graph that was saved to the 'Storage'" placement="bottom">
        <base-icon-button @click="openFromStorage">
          <span class="FontIcon name_open size_md"></span>
        </base-icon-button>
      </base-tooltip> -->

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Save to the server" placement="bottom">
        <base-icon-button @click="saveToServer" :disabled="!isAllowToSaveGraph">
          <span class="FontIcon name_save size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Download file " placement="bottom">
        <base-icon-button @click="publishEvent('SaveToFile', currentGraphName)">
          <span class="FontIcon name_download size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <!-- <base-tooltip content="Save to the 'Storage'" placement="bottom">
        <base-icon-button @click="publishEvent('SaveToStorage')">
          <span class="FontIcon name_data size_md"></span>
        </base-icon-button>
      </base-tooltip> -->

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Calculate graph" placement="bottom">
        <base-icon-button @click="publishEvent('StartCalculatingGraph')">
          <span class="FontIcon name_playArrow size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Fit Content" placement="bottom">
        <base-icon-button @click="publishEvent('FitContent')">
          <span class="FontIcon name_gridHexagon size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom In" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomIn')">
          <span class="FontIcon name_searchSmallPlus size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom Out" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOut')">
          <span class="FontIcon name_searchSmallMinus size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom to original size" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOriginal')">
          <span class="FontIcon name_scale size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Cut" placement="bottom">
        <base-icon-button @click="publishEvent('CutItems')">
          <span class="FontIcon name_cut size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Copy" placement="bottom">
        <base-icon-button @click="publishEvent('CopyItems')">
          <span class="FontIcon name_fileBlankDoubleOutline size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Paste" placement="bottom">
        <base-icon-button @click="publishEvent('PasteItems')">
          <span class="FontIcon name_fileBlankDoubleFill size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete" placement="bottom">
        <base-icon-button @click="publishEvent('DeleteItems')">
          <span class="FontIcon name_trashFilled size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Undo" placement="bottom">
        <base-icon-button @click="publishEvent('UndoGraph')">
          <span class="FontIcon name_redo flip_horizontal size_md"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Redo" placement="bottom">
        <base-icon-button @click="publishEvent('RedoGraph')">
          <span class="FontIcon name_redo size_md"></span>
        </base-icon-button>
      </base-tooltip>
    </div>
  </div>
</template>

<script>
import GraphListSelect from './GraphListSelect.vue';

export default {
  name: 'ControlPanel',
  components: { GraphListSelect },
  data() {
    return {
      graphListIsActive: false,
      showGraphListPreloader: false,
      graphListErrorMsg: '',
      graphList: [],
      currentGraphName: '',
      currentGraphID: null,
      inWait: false,
      doEditGraphName: false,
      inputGraphNameValue: '',
      isAllowToCreateGraph: true,
      isAllowToUpdateGraph: true,
      permissions: [],
    };
  },
  computed: {
    isAllowToSaveGraph() {
      return (
        (!this.currentGraphID && this.isAllowToCreateGraph) ||
        (this.currentGraphID && this.isAllowToUpdateGraph)
      );
    },
    isAllowToDeleteGraph() {
      const isAllowToDelete = !this.permissions
        .filter(item => item.name.includes('graph.'))
        .filter(item => item.name.includes('.delete'))
        .find(item => item.name.split('.')[1] === this.currentGraphName);
      return isAllowToDelete;
    },
    arrowIcon() {
      if (this.graphListIsActive) {
        return 'FontIcon name_chevronDown rotate_180';
      } else {
        return 'FontIcon name_cloudDown';
      }
    },
    readPermissions() {
      return this.permissions
        .filter(item => item.name.includes('graph.'))
        .filter(item => item.name.includes('.read'))
        .map(item => item.name.split('.')[1]);
    },
  },
  mounted() {
    document.addEventListener('click', this.graphListIsActiveHandler);
    this.$root.interactionSystem
      .GETRequest('dtcd_utils/v1/user?photo_quality=low')
      .then(response => {
        this.permissions = response.data.groups;
        if (!this.permissions.length) return;
        this.isAllowToCreateGraph = !this.permissions.find(item =>
          item.name.includes('graphs.create')
        );

        return;
      });
  },
  beforeDestroy() {
    document.removeEventListener('click', this.graphListIsActiveHandler);
  },
  methods: {
    publishEvent(eventName, args) {
      this.$root.eventSystem.publishEvent(eventName, args);
    },
    graphListIsActiveHandler(evt) {
      if (
        !this.$refs.graphListDropDown &&
        !this.$refs.graphListDropDown.$el.contains(evt.target)
      )
        this.graphListIsActive = false;
    },
    closeSelectNewGraph() {
      this.graphListIsActive = false;
    },
    setNewGraphInfo(graphInfo) {
      if (graphInfo) {
        const { id = null, name = '' } = graphInfo;
        if (name) {
          const isAllowToUpdate = !this.permissions
            .filter(item => item.name.includes('graph.'))
            .filter(item => item.name.includes('.update'))
            .find(item => item.name.split('.')[1] === name);
          this.isAllowToUpdateGraph = isAllowToUpdate;
        } else {
          this.isAllowToCreateGraph = !this.permissions.find(item =>
            item.name.includes('graphs.create')
          );
        }
        this.currentGraphID = id;
        this.currentGraphName = name;
        this.inputGraphNameValue = name;
      } else {
        alert('Params without graphID');
      }
    },

    deleteFromServer() {
      if (
        confirm(
          `Вы действительно хотите удалить граф '${this.currentGraphName}'?`
        )
      ) {
        this.publishEvent('DeleteFromServer', { id: this.currentGraphID });
      }
    },
    async toSelectNewGraph() {
      this.graphListIsActive = true;
      this.showGraphListPreloader = true;
      this.graphListErrorMsg = '';

      try {
        await this.getGraphList();
      } catch (er) {
        this.graphListErrorMsg = 'Не удалось получить данные';
        this.graphList = [];
      } finally {
        this.showGraphListPreloader = false;
      }
    },
    async getGraphList() {
      const { data } = await this.$root.interactionSystem.GETRequest(
        '/supergraph/v1/fragments'
      );
      this.graphList = data.fragments.filter(
        graph => !this.readPermissions.includes(graph.name)
      );
      this.graphListErrorMsg = '';
    },
    openFromServer(fragment) {
      this.publishEvent('OpenFromServer', fragment);
      this.graphListIsActive = false;
      this.currentGraphID = fragment.id;
      this.currentGraphName = fragment.name;
      this.inputGraphNameValue = fragment.name;
    },

    openFromStorage() {
      console.log('storageSystem not supported');
    },

    async saveToServer() {
      if (!this.inputGraphNameValue) {
        return alert('Пожалуйтса, задайте имя для нового графа!');
      }

      if (this.graphList.length === 0) {
        await this.getGraphList();
      }

      const alreadyExists = this.graphList.find(
        graph =>
          graph.name === this.inputGraphNameValue &&
          graph.id !== this.currentGraphID
      );

      if (
        alreadyExists &&
        confirm(
          `Граф с именем '${this.inputGraphNameValue}' уже существует! Нажмите 'OK' чтобы перетереть, 'Cancel' чтобы отменить.`
        )
      ) {
        this.publishEvent('SaveToServer', {
          name: this.inputGraphNameValue.trim(),
          id: alreadyExists.id,
        });
        return;
      } else if (!alreadyExists) {
        this.publishEvent('SaveToServer', {
          name: this.inputGraphNameValue.trim(),
          id: this.currentGraphID,
        });

        this.doEditGraphName = false;
      }
    },

    handleInputGraphNameBlur() {
      if (!this.inputGraphNameValue) {
        this.inputGraphNameValue = this.currentGraphName;
      }

      if (this.inputGraphNameValue === this.currentGraphName) {
        this.doEditGraphName = false;
      }
    },

    cancelEditGraphInfo() {
      this.doEditGraphName = false;
      this.inputGraphNameValue = this.currentGraphName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './LiveDashControlPanel.scss';
</style>
