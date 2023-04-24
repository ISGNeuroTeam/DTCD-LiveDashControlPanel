<template>
  <div class="Select">
    <ul class="Menu">

      <li 
        v-if="showPreloader"
        class="Item"
      >
        <span class="FontIcon name_loader size_lg"></span>
        Загрузка данных...
      </li>

      <li
        v-else
        class="Item"
        @click="$emit('updateOption', fragment)"
        v-for="(fragment, index) in this.graphList"
        :key="fragment.id+index"
        :class="fragment.id === currentGraphID ? 'selected' : ''"
      >
        {{ fragment.name }}
      </li>

      <li 
        v-if="errorMessage"
        class="Item type_error"
      >
        <span class="FontIcon name_error size_md"></span>
        {{errorMessage}}
      </li>

      <li 
        v-else-if="this.graphList.length === 0 && showPreloader == false"
        class="Item"
      >
        Нет данных
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'GraphListSelect',
  data() {
    return {};
  },
  props: { 
    graphList: { 
      type: Array, 
      default: [],
    }, 
    currentGraphID: { 
      type: String 
    },
    showPreloader: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String
    }
  },
};
</script>

<style lang="scss" scoped>
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

  .Menu {
    border: 1px solid var(--border);
    background-color: var(--background_main);
    list-style-type: none;
    border-radius: 4.44px;
    margin: 0;
    max-height: 251px;
    overflow-y: scroll;
    padding: 3px;
    margin-top: -1px;
  }

  .Item {
    font-weight: 400;
    font-size: 14px;
    color: var(--text_secondary);
    padding: 7px 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;

    & + .Item::after {
      content: '';
      position: absolute;
      top: -0.5px;
      left: 0;
      width: calc(100% + 6px);
      margin-left: -3px;
      height: 1px;
      background-color: var(--border);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: 0 0 0 3px var(--button_primary);
      border-radius: 1px;
      pointer-events: none;
      opacity: 0;
      transition: opacity .1s ease;
      z-index: 1;
    }

    &.selected {
      background-color: var(--button_primary_12);
    }

    &:hover {
      color: var(--text_main);
      z-index: 5;

      &::before {
        opacity: 1;
      }
    }

    &.type_error {
      color: var(--danger);

      .FontIcon {

        &.name_error {
          color: var(--danger);
          margin-right: 5px;
        }
      }
    }
  }
  .FontIcon {

    &.name_loader {
      color: var(--border);
      animation-name: loader;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      transform-origin: 50% 50%;
      will-change: transform;
      margin-right: 10px;
    }
  }

  @keyframes loader {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
