<template>
  <div>
    <div class="toolbar">
      <input placeholder="Untitled" ref="graphNameField" type="text" v-model="currentGraphName" />
      <div class="file-operations">
        <button @click="publishEvent('ClearGraph')" title="Create new graph">
          <i class="far fa-file"></i>
        </button>
        <button
          @click="deleteFromServer"
          :disabled="currentGraphID === null"
          title="Delete current graph"
        >
          <i class="fas fa-trash"></i>
        </button>

        <span class="toolbar-separator"></span>

        <button
          @click="publishEvent('OpenFromFile')"
          title="Open a file using the HTML 5 FileReader API"
        >
          <i class="fas fa-folder-open"></i>
        </button>
        <button
          v-if="!graphListIsActive"
          @click="toSelectNewGraph"
          title="Open a file using a server round-trip"
        >
          <i class="fas fa-cloud-download-alt"></i>
        </button>
        <button v-else @click="graphListIsActive = false" title="Close server round-trip observer">
          <i class="fas fa-close"></i>
        </button>
        <graph-list-select
          v-show="graphListIsActive"
          ref="graphListDropDown"
          @updateOption="openFromServer"
          :currentGraphName="currentGraphName"
          :graphList="graphList"
        ></graph-list-select>

        <button
          @click="openFromStorage"
          disabled
          title='Open the graph that was saved to the "Storage"'
        >
          <i class="fas fa-inbox"></i>
        </button>

        <span class="toolbar-separator"></span>

        <button @click="saveToServer" title="Save to the server">
          <i class="fas fa-save"></i>
        </button>
        <button
          @click="publishEvent('SaveToFile', currentGraphName)"
          title="Download using the HTML5 File API"
        >
          <i class="fas fa-download"></i>
        </button>
        <button @click="publishEvent('SaveToStorage')" disabled title='Save to the "Storage"'>
          <i class="fas fa-database"></i>
        </button>
      </div>
      <div class="graph-operations">
        <button @click="publishEvent('StartCalculatingGraph')" title="Calculate graph">
          <i class="fas fa-play"></i>
        </button>

        <span class="toolbar-separator"></span>

        <button @click="publishEvent('FitContent')" title="Fit Content">
          <i class="fas fa-cubes"></i>
        </button>
        <button @click="publishEvent('ZoomIn')" title="Zoom In">
          <i class="fas fa-search-plus"></i>
        </button>
        <button @click="publishEvent('ZoomOut')" title="Zoom Out">
          <i class="fas fa-search-minus" />
        </button>
        <button @click="publishEvent('ZoomOriginal')" title="Zoom to original size">1:1</button>

        <span class="toolbar-separator"></span>

        <button @click="publishEvent('CutItems')" title="Cut"><i class="fas fa-cut"></i></button>
        <button @click="publishEvent('CopyItems')" title="Copy"><i class="fas fa-copy"></i></button>
        <button @click="publishEvent('PasteItems')" title="Paste">
          <i class="fas fa-paste"></i>
        </button>
        <button @click="publishEvent('DeleteItems')" title="Delete">
          <i class="fas fa-trash"></i>
        </button>

        <span class="toolbar-separator"></span>

        <button @click="publishEvent('UndoGraph')" title="Undo"><i class="fas fa-undo"></i></button>
        <button @click="publishEvent('RedoGraph')" title="Redo"><i class="fas fa-redo"></i></button>
      </div>
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
      } else {
        alert('Params without graphID');
      }
    },

    deleteFromServer() {
      this.publishEvent('DeleteFromServer', { id: this.currentGraphID });
    },

    toSelectNewGraph() {
      this.$root.interactionSystem.GETRequest('/v2/graph/list').then(resp => {
        this.graphList = resp.data;
        this.graphListIsActive = true;
      });
    },
    openFromServer(graph) {
      this.publishEvent('OpenFromServer', graph.id);
      this.graphListIsActive = false;
      this.currentGraphID = graph.id;
      this.currentGraphName = graph.name;
    },

    openFromStorage() {
      console.log('storageSystem not supported');
    },

    saveToServer() {
      if (!this.currentGraphName) alert('Please, enter name of new graph or select saved graph!');
      else
        this.publishEvent('SaveToServer', { name: this.currentGraphName, id: this.currentGraphID });
    },
  },
};
</script>
<style lang="scss" scoped>
.toolbar {
  z-index: 1;
  background-color: white;
  position: absolute;
  width: 100%;
  height: auto;
  padding: 10px;
  justify-content: space-between;
  display: flex;
  border-bottom: 1px solid black;
  input {
    display: block;
    width: 10%;
    font-size: 15px;
    padding-left: 10px;
    font-family: monospace;
    border: none;
    outline: none;
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
    &:focus {
      cursor: text;
      opacity: 1;
    }
  }
  button {
    width: 30px;
    height: 30px;
    padding: 4px;
  }
  .toolbar-separator {
    height: 20px;
    width: 1px;
    background: #999;
    display: inline-block;
    vertical-align: middle;
    margin: 0 2px;
  }
}
</style>
