<template>
  <div class="btn-group">
    <ul class="select-menu">
      <li 
      v-for="(option, index) in this.graphList" 
      :key="index"
      :style="option.name === currentGraphName?{'background-color':'rgb(153, 204, 255, .2)'}:{}"
      >
        <div 
        class="select-option" 
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

<style scoped>
.btn-group {
  min-width: 160px;
  position: absolute;
  margin: 20px -20px ;
  display: inline-block;
  vertical-align: middle;
}

.select-menu{
  border: 1px solid black;
  background-color: white;
  list-style-type: none;
}

.btn-group li{
  padding: 10px;
}

.btn-group .select-option:hover  {
  border-bottom: 1px solid black;
  cursor:pointer;
}

</style>