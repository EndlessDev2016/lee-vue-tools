<template>
  <div>
    <md-layout md-gutter>
      <md-layout md-column md-gutter>
        <input v-if="isFile" type="file" @change="importHtmlFile" value="読み込み" :key="fileId">
        <button v-else @click="clearFile"></button>
        <md-layout>
          <textarea v-text="bindHtml"></textarea>
          <div style="display: none">{{htmlObj}}</div>
        </md-layout>
      </md-layout>
      <md-layout md-column md-gutter>
        <md-layout md-flex="50">
          <input type="file" @change="importExcelFile" id="input" accept="application/json"></input>
          <!-- <md-button class="md-raised" @change="inputExcelFile">Read</md-button> -->
        </md-layout>
        <!-- <button v-else @click="fileClear"></button> -->
        <md-layout>
          <textarea></textarea>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>
<script>
/* import axios from 'axios' */
import $ from 'jquery'
/* import xlsx from 'xlsx' */
export default {
  data () {
    return {
      htmlData: '',
      isFile: true,
      htmlObj: {},
      fileId: 0
    }
  },
  computed: {
    bindHtml: function () {
      return this.htmlData
    }
  },
  methods: {
    importHtmlFile: function (e) {
      e.preventDefault()
      var files = e.target.files || e.dataTransfer.files
      this.htmlToString(files[0])
    },
    htmlToString (files) {
      var vm = this // Reference Vue Instansce
      var reader = new FileReader()
      reader.readAsText(files, 'shift_jis')
      reader.onload = function (e) {
        vm.htmlData = String(e.target.result)
        debugger
        vm.htmlObj = e.target.result
        console.log($(vm.htmlData))
      }
    },
    importExcelFile: function (e) {
      e.preventDefault()
      var files = e.target.files || e.dataTransfer.files
      this.jsonToObject(files[0])
    },
    jsonToObject (files) {
      var vm = this
      var reader = new FileReader()
      reader.readAsText(files)
      reader.onload = function (e) {
        var obj = JSON.parse(e.target.result)
        Object.keys(obj).forEach(function (key) {
          if (obj[key]['更新予定日'] === '' && obj[key]['追加日'] === '' && obj[key]['削除日'] === '' && obj[key]['特集期限'] === '') { delete obj[key] }
        })
        vm.changeHtml(obj)
      }
    },
    changeHtml: function (obj) {
      /* var vm = this
      var addText = '2017/09/12'
      var delText = '削除希望'
       obj.Array.forEach(function (key) {
        var tempDate = obj[key]['追加日']
        var tmepDeleteDate = obj[key]['削除日']
        if (tempDate === addText) {

        }
        if (tmepDeleteDate === delText) {
          var tempObj = vm.htmlObj.find('li').children().find('p')
        }
      }) */
    },
    clearFile () {
      this.isFile = false
    }
  }
}
</script>