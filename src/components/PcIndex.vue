<template>
<p>Pcindeコンポーネントテスト。</p>
<!--   <li :v-for="(value, key) in els">
    <a class="icon-arrow_right blockLink" href="{{key.リンク先URL}}">
      <dl class="table2clm">
        <dt><img src="{{key.リンク先URL}}" alt=""></dt>
        <dd>
          <h3>{{key.リンク先URL}}</h3>
          <p>{{key.特集名}}</p>
        </dd>
      </dl>
    </a>
  </li> -->
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