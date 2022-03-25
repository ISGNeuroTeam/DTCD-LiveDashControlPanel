<template>
  <div class="Select">
    <ul class="Menu">
      <li class="Item"
        @click="$emit('updateOption', option)"
        v-for="(option, index) in this.graphList" 
        :key="index"
        :class="option.name === currentGraphName ? 'selected' : ''"
      >
        {{ option.name }}
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
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  min-width: 160px;
  width: 249px;
  display: inline-block;
  vertical-align: middle;
  z-index: 1;

  .Menu{
    border: 1px solid var(--border);
    background-color: var(--background_main);
    list-style-type: none;
    padding-left: 0;
    border-radius: 4.44px;
    margin: 0;
  }

  .Item { 
    font-weight: 400;
    font-size: 14px;
    color: var(--text_secondary);
    padding: 7px 10px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;

    &:last-child {
      border-bottom: 0;
    }

    &.selected {
      background-color: var(--button_primary_12);
    }

    &:hover {
      box-shadow: 0 0 0 3px var(--button_primary);
      color: var(--text_main);
      border-radius: 4.44px;
    }
  }
}
</style>