<template>
  <p>component2テスト</p>
</template>
<script>
/* import Vue from 'vue'
Vue.component('pc-index', {
  template: '<div ref="testPcindex">{{parentData}}</div>',
  props: ['parentData'],
  data: function () {
    return {
      childData: 'テスト子コンポーーーネント'
    }
  },
  created: function () {
    this.$emit('send-child-data', this.childData)
  }
})
*/
export default {
  props: ['els'],
  methods: {}
}
</script>
