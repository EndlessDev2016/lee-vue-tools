<template>

</template>
<script>
import $ from 'jquery'
export default {
  data: function () {
    return {
      jsonObj: ''
    }
  },
  props: ['htmlObj'],
  methods: {
    changeHtml: function (obj) {
      var appendText = ''
      var bufferEl = $('#temp ul.cmnInner.listStyleType01')
      bufferEl.empty()
      obj.forEach(function (el) {
        appendText += `
        <li>
          <a href="${el['リンク先ＵＲＬ']}" class="icon-arrow_right">
            <dl class="table2clm">
              <dt><img src="${el['画像ＵＲＬ']}"></dt>
              <dd>
                <h3>${el['バナー名']}</h3>
                <p>${el['キャッチ']}</p>
              </dd>
            </dl>
          </a>
        </li>`
      })
      // console.log(jsTest)
      bufferEl.append(appendText)
      var afterText = $('#temp').html().replace(/^\s*\n/gm, '')
      this.$emit('result-afterText', afterText)
    }
  },
  mounted: function () {
    var vm = this
    this.$bus.$on('smp-top-banner-json-obj', function (jsonObj) {
      console.log('smp-top-banner-json-obj :: ', jsonObj)
      var tempObj = jsonObj
      var tempDate = ''
      Object.keys(jsonObj).forEach(function (value, index, array) {
        var updateDate = tempObj[index]['更新日']
        if (updateDate === '') {
          tempObj[index]['更新日'] = tempDate
        } else {
          tempDate = tempObj[index]['更新日']
        }
      })
      vm.jsonObj = tempObj
      console.log(vm)
      vm.changeHtml(jsonObj)
    })
  }
}
</script>