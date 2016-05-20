<template>
  <div class="select_dropdown">
      <div class="dropdown pull-left "  :class="{'open':list.length}">
          <input type="text" :placeholder="placeholder"  v-model='value' autocomplete="off" :style="{width:width}"  class="dropdown-toggle dropdown_toggle form-control " id='txtsku' >
          <ul class="dropdown-menu " :style="{width:width}"  role="menu" aria-labelledby="dropdownMenu1">
              <li role="presentation" v-for="item in list" @click='value=item'>
                  <a role="menuitem" tabindex="-1" href="javascript:void(0)">{{item}}</a>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
  components: {  },
  props: {
      list: {
          type: Array
      },
      placeholder: {
          type: String
      },
      value: {
          type: String
      },
      width:{
        type: String
      }
  },
  data(){
     return {
       param:{}
     }
  },
  methods: {

  }
}
</script>
