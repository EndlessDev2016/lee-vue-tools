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
  created: function () {
    // this.testJson()
  },
  methods: {
    changeHtml: function (obj) {
      /* var vm = this */
      var addText = document.getElementById('addDate')
      var delText = document.getElementById('deleteDate')
      var prependText = ''
      obj.forEach(function (el) {
        var tempDate = el['追加日']
        var tmepDeleteDate = el['削除日']
        if (tmepDeleteDate === delText) {
          var catchLength = $('#temp ul li:contains(' + el['キャッチ'] + ')').length
          var featureLength = $('#temp ul li:contains(' + el['特集名'] + ')').length
          var linkText = $('#temp ul li:contains(' + el['特集名'] + ')').contents().filter('a')
          var imgText = $('#temp ul li:contains(' + el['特集名'] + ')').contents().filter('img')
          console.log(linkText)
          console.log(imgText)
          if (catchLength & featureLength) {
            $('#temp ul li:contains(' + el['キャッチ'] + ')').remove()
          }
        }
        if (tempDate === addText) {
          prependText += `
      <li>
        <a class="icon-arrow_right" href="${el['リンク先URL']}">
          <dl class="table2clm">
            <dt><img src="${el['画像URL']}" alt=""></dt>
            <dd>
              <h3>${el['キャッチ']}</h3>
              <p>${el['特集名']}</p>
            </dd>
          </dl>
        </a>
      </li>`
        }
      })
      $('#temp ul:eq(0)').prepend(prependText)
      var afterText = $('#temp').html().replace(/^\s*\n/gm, '')
      this.$emit('result-afterText', afterText)
    }
  },
  mounted: function () {
    var vm = this
    this.$bus.$on('smp-feature-json-obj', function (jsonObj) {
      console.log('smp-feature-json-obj :: ', jsonObj)
      Object.keys(jsonObj).forEach(function (key) {
        if (jsonObj[key]['更新予定日'] === '' &&
          jsonObj[key]['追加日'] === '' &&
          jsonObj[key]['削除日'] === '' &&
          jsonObj[key]['特集期限'] === '') {
          delete jsonObj[key]
        }
      })
      vm.jsonObj = jsonObj
      console.log(vm)
      vm.changeHtml(jsonObj)
    })
    /* this.$bus.$on('con-value', function (obj) {
      console.log('con-value :: ', obj)
    }) */
  }
}
</script>
