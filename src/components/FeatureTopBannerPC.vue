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
      var bufferEl = $('#temp ul')
      bufferEl.empty()
      obj.forEach(function (el) {
        appendText += `
        <li>
          <a href="${el['リンク先ＵＲＬ']}" title="${el['バナー名']}">
            <img class="lazy" src="https://tokuhodai.jp/contents/pctkh/img/tkh2/thumb_img_340_162.png" data-original="${el['画像ＵＲＬ']}" alt="${el['バナー名']}">
          </a>
        </li>`
      })
      bufferEl.append(appendText)
      var afterText = $('#temp').html().replace(/^\s*\n/gm, '')
      this.$emit('result-afterText', afterText)
    }
  },
  mounted: function () {
    var vm = this
    this.$bus.$on('pc-top-banner-json-obj', function (jsonObj) {
      console.log('pc-top-banner-json-obj :: ', jsonObj)
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