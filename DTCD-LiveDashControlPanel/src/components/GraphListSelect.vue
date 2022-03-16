<template>
  <div class="Select">
    <ul class="Menu">
      <li class="Item"
      v-for="(option, index) in this.graphList" 
      :key="index"
      :style="option.name === currentGraphName?{'background-color':'rgb(153, 204, 255, .2)'}:{}"
      >
        <div 
        @click="$emit('updateOption', option)"
        >
          {{ option.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"GraphListSelect",
  data() {
    return {}
  },
  props:["graphList", "currentGraphName"],
}
</script>

<style lang="scss"scoped>
.Select {
  min-width: 160px;
  width: 249px;
  position: absolute;
  margin: 20px -131px ;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;

  .Menu{
    border: 1px solid var(--border);
    background-color: var(--background_main);
    list-style-type: none;
    padding-left: 0;
    border-radius: 4.44px;
  }

  .Item { 
    font-weight: 400;
    font-size: 11px;
    color: var(--text_secondary);
    padding: 4.5px 0 4.5px 12px;
    border-bottom: 1px solid var(--border);
    &:last-child {
      border-bottom: 0;
    }
    &:hover {
      border: 3px solid var(--button_primary); 
      color: var(--text_main);
      border-radius: 4.44px;
      cursor: pointer;
      margin: 0 -3px;
    }
  }
}
</style>