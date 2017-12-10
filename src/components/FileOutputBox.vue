<template>
  <md-layout md-align="end" md-gutter="16">
    <md-layout md-flex="20">
      <md-button class="md-fab" @click="ouputFile" :disabled="isDisabled" v-bind="checkValue">
        <md-icon>save</md-icon>
      </md-button>
    </md-layout>
  </md-layout>
</template>
<style>

</style>
<script>
// import $ from 'jquery'
import Encoding from 'encoding-japanese'
export default {
  data () {
    return {
      fileName: '',
      outputString: '',
      isDisabled: true
    }
  },
  mounted: function () {
    var vm = this
    this.$bus.$on('resultString', function (arrs) {
      vm.fileName = arrs[0]
      vm.outputString = arrs[1]
    })
    this.$bus.$on('initText', function () {
      vm.fileName = ''
      vm.outputString = ''
    })
  },
  methods: {
    ouputFile: function () {
      var strArray = Encoding.stringToCode(this.outputString)
      var sjisArray = Encoding.convert(strArray, 'SJIS')
      var uint8Array = new Uint8Array(sjisArray)
      var detected = Encoding.detect(uint8Array)
      var fileDownload = document.createElement('a')
      if (detected === 'UTF8') {
        console.log('Encoding is UTF8')
        return
      }
      fileDownload.download = this.fileName
      var blob = new Blob([uint8Array], { 'type': 'text/html; charset=shift_jis' })
      if (window.navigator.msSaveBlob) {
        debugger
        fileDownload.href = window.navigator.msSaveBlob(blob, this.fileName)
        fileDownload.click()
      } else {
        debugger
        fileDownload.href = window.URL.createObjectURL(blob)
        fileDownload.click()
      }
    }
  },
  computed: {
    checkValue: function () {
      this.outputString === '' ? this.isDisabled = true : this.isDisabled = false
    }
  }
}
</script>