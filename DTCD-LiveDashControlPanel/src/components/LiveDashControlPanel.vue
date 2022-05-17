<template>
  <div class="LiveDashControlPanel">
    <!-- <button class="DragButton">
      <span class="FontIcon name_drag"></span>
    </button> -->

    <div class="InputWrapper">
      <base-input
        placeholder="Graph name..."
        :value="inputGraphNameValue"
        @input="event => inputGraphNameValue = event.target.value"
        @focus="doEditGraphName = true"
        @blur="handleInputGraphNameBlur"
      ></base-input>
      
      <!-- <span 
        v-if="doEditGraphName == false"
        class="FontIcon name_edit InputIcon type_edit">
      </span> -->
       
      <button
        v-if="doEditGraphName"
        class="InputIcon type_close"
        @click="cancelEditGraphInfo"
      >
        <span class="FontIcon name_closeBig"></span>
      </button>
    </div>

    <div class="Buttons">
      <base-tooltip content="Create new graph" placement="bottom">
        <base-icon-button @click="publishEvent('ClearGraph')">
          <span class="FontIcon name_fileBlankOutline"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete current graph" placement="bottom">
        <base-icon-button @click="deleteFromServer">
          <span class="FontIcon name_trashFull"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Open from file" placement="bottom">
        <base-icon-button @click="publishEvent('OpenFromFile')">
          <span class="FontIcon name_folder"></span>
        </base-icon-button>
      </base-tooltip>

      <div class="GraphListDropDownWrapper">
        <base-tooltip content="Open from server" placement="bottom">
          <base-icon-button>
            <span 
              v-if="!graphListIsActive"
              @click="toSelectNewGraph" 
              class="FontIcon name_cloudDown">
            </span>
            <span 
              v-else
              @click="graphListIsActive = false" 
              class="FontIcon name_chevronDown rotate_180">
            </span>
          </base-icon-button>
        </base-tooltip>
        <graph-list-select
          v-show="graphListIsActive"
          ref="graphListDropDown"
          @updateOption="openFromServer"
          :currentGraphName="currentGraphName"
          :graphList="graphList"
        ></graph-list-select>
      </div>

      <!-- <base-tooltip content="Open the graph that was saved to the 'Storage'" placement="bottom">
        <base-icon-button @click="openFromStorage">
          <span class="FontIcon name_open"></span>
        </base-icon-button>
      </base-tooltip> -->

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Save to the server" placement="bottom">
        <base-icon-button @click="saveToServer">
          <span class="FontIcon name_save"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Download file " placement="bottom">
        <base-icon-button @click="publishEvent('SaveToFile', currentGraphName)">
          <span class="FontIcon name_download"></span>
        </base-icon-button>
      </base-tooltip>

      <!-- <base-tooltip content="Save to the 'Storage'" placement="bottom">
        <base-icon-button @click="publishEvent('SaveToStorage')">
          <span class="FontIcon name_saveState"></span>
        </base-icon-button>
      </base-tooltip> -->
      
      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Calculate graph" placement="bottom">
        <base-icon-button @click="publishEvent('StartCalculatingGraph')">
          <span class="FontIcon name_playArrow"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Fit Content" placement="bottom">
        <base-icon-button @click="publishEvent('FitContent')">
          <span class="FontIcon name_gridHexagon"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom In" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomIn')">
          <span class="FontIcon name_searchSmallPlus"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom Out" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOut')">
          <span class="FontIcon name_searchSmallMinus"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Zoom to original size" placement="bottom">
        <base-icon-button @click="publishEvent('ZoomOriginal')">
          <span class="FontIcon name_scale"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Cut" placement="bottom">
        <base-icon-button @click="publishEvent('CutItems')">
          <span class="FontIcon name_cut"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Copy" placement="bottom">
        <base-icon-button @click="publishEvent('CopyItems')">
          <span class="FontIcon name_fileBlankDoubleOutline"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Paste" placement="bottom">
        <base-icon-button @click="publishEvent('PasteItems')">
          <span class="FontIcon name_fileBlankDoubleFill"></span>
        </base-icon-button>
      </base-tooltip>

      <base-tooltip content="Delete" placement="bottom">
        <base-icon-button @click="publishEvent('DeleteItems')">
          <span class="FontIcon name_trashFilled"></span>
        </base-icon-button>
      </base-tooltip>

      <span class="ButtonsSeparator"></span>

      <base-tooltip content="Undo" placement="bottom">
        <base-icon-button @click="publishEvent('UndoGraph')">
          <span class="FontIcon name_redo flip_horizontal"></span>
        </base-icon-button>
      </base-tooltip>
      
      <base-tooltip content="Redo" placement="bottom">
        <base-icon-button @click="publishEvent('RedoGraph')">
          <span class="FontIcon name_redo"></span>
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
      graphList: [],
      currentGraphName: '',
      currentGraphID: null,
      inWait: false,
      doEditGraphName: false,
      inputGraphNameValue: '',
    };
  },
  mounted() {
    document.addEventListener('click', this.graphListIsActiveHandler);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.graphListIsActiveHandler);
  },
  methods: {
    publishEvent(eventName, args) {
      this.$root.eventSystem.publishEvent(eventName, args);
    },
    graphListIsActiveHandler(evt) {
      if (this.$refs.graphListDropDown && !this.$refs.graphListDropDown.$el.contains(evt.target))
        this.graphListIsActive = false;
    },
    closeSelectNewGraph() {
      this.graphListIsActive = false;
    },
    setNewGraphInfo(graphInfo) {
      if (graphInfo) {
        const { id = null, name = '' } = graphInfo;
        this.currentGraphID = id;
        this.currentGraphName = name;
        this.inputGraphNameValue = name;
      } else {
        alert('Params without graphID');
      }
    },

    deleteFromServer() {
      this.publishEvent('DeleteFromServer', { id: this.currentGraphID });
    },

    toSelectNewGraph() {
      this.$root.interactionSystem.GETRequest('/mock_server/v1/graphContent/object').then(resp => {
        this.graphList = resp.data;
        this.graphListIsActive = true;
      });
    },
    openFromServer(graph) {
      this.publishEvent('OpenFromServer', graph.id);
      this.graphListIsActive = false;
      this.currentGraphID = graph.id;
      this.currentGraphName = graph.name;
      this.inputGraphNameValue = graph.name;
    },

    openFromStorage() {
      console.log('storageSystem not supported');
    },

    saveToServer() {
      if (!this.inputGraphNameValue) {
        alert('Please, enter name of new graph or select saved graph!');
      } else {
        this.publishEvent('SaveToServer', {
          name: this.inputGraphNameValue.trim(),
          id: this.currentGraphID,
        });

        this.doEditGraphName = false;
      }
    },

    handleInputGraphNameBlur() {
      if ( ! this.inputGraphNameValue) {
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