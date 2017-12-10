<template>
  <div>
    <!-- 条件付きコンポーネント -->
    <condition-ally :choice-number="choiceNumber"></condition-ally>
    <!-- BeforeToAfterBox -->
    <md-layout md-gutter="16">
      <template v-if="choiceNumber > 0">
        <md-layout md-flex="50">
          <md-input-container>
            <md-file v-model="htmlFile" placeholder="HTML FILE" 
            @selected="importFile($event, 'html')" 
            accept="text/html" ></md-file>
            <!-- <button v-else @click="clearFile"></button> -->
          </md-input-container>
        </md-layout>
        <md-layout md-flex="50">
          <md-input-container>
            <md-file v-model="jsonFile" 
            placeholder="JSON FILE" 
            @selected="importFile($event, 'json')" 
            accept="application/json"
            :disabled="isInputedFile" v-bind="checkFile"></md-file>
          </md-input-container>
        </md-layout>
      </template>
    </md-layout>
    <md-layout md-gutter="16">
      <md-layout md-flex="50">
        <template v-if="choiceNumber > 0">
          <md-input-container>
            <label>Before</label>
            <md-textarea v-model="beforeText" readonly></md-textarea>
          </md-input-container>
        </template>
        <div style="display: none;" v-html="htmlObj" id="temp"></div>
        <!--choise components -->
        <keep-alive>
          <pc-index v-if="choiceNumber === '1'" :html-obj="htmlObj" :json-obj="jsonObj" @result-afterText="setAfterText"></pc-index>
          <smp-index v-else-if="choiceNumber === '2'" :html-obj="htmlObj" :json-obj="jsonObj" @result-afterText="setAfterText"></smp-index>
          <pc-top v-else-if="choiceNumber === '3'" :html-obj="htmlObj" :json-obj="jsonObj" @result-afterText="setAfterText"></pc-top>
          <smp-top v-else-if="choiceNumber === '4'" :html-obj="htmlObj" :json-obj="jsonObj" @result-afterText="setAfterText"></smp-top>
        </keep-alive>
      </md-layout>
      <md-layout md-flex="50">
        <template v-if="choiceNumber > 0">
          <md-input-container>
            <label>After</label>
            <md-textarea v-model="afterText" id="afterArea" readonly></md-textarea>
          </md-input-container>
        </template>
      </md-layout>
    </md-layout>
  </div>
</template>
<style>
.md-input-container textarea {
  max-height: 500px;
}
</style>
<script>
import FeaturePcIndex from './FeaturePcIndex'
import FeatureSmpIndex from './FeatureSmpIndex'
import Conditionally from './Conditionally'
import FeatureTopBannerPC from './FeatureTopBannerPC'
import FeatureTopBannerSMP from './FeatureTopBannerSMP'
// import $ from 'jquery'
// import 'highlight-within-textarea' 保留

// const jsdiff = require('diff')
const htmlIndent = require('js-beautify').html
// require('colors')

export default {
  props: ['choiceNumber', 'isActive'],
  data: function () {
    return {
      htmlFile: '',
      jsonFile: '',
      beforeText: '',
      afterText: '',
      htmlObj: '',
      jsonObj: '',
      isInputedFile: true,
      conditionValue: '',
      color: '',
      span: null
    }
  },
  components: {
    'pc-index': FeaturePcIndex,
    'smp-index': FeatureSmpIndex,
    'pc-top': FeatureTopBannerPC,
    'smp-top': FeatureTopBannerSMP,
    'condition-ally': Conditionally
  },
  created () {
  },
  computed: {
    checkFile: function () {
      this.htmlFile !== '' ? this.isInputedFile = false : this.isInputedFile = true
    }
  },
  mounted: function () {
    var vm = this
    this.$bus.$on('initText', function () {
      vm.beforeText = ''
      vm.afterText = ''
      vm.htmlFile = ''
      vm.jsonFile = ''
    })
  },
  methods: {
    setAfterText: function (text) {
      // var vm = this
      this.afterText = htmlIndent(text, { indent_size: 2 })
      this.$bus.$emit('resultString', [this.htmlFile, this.afterText])
      debugger
      // var fragment = document.createDocumentFragment()
/*       var diff = jsdiff.diffChars(this.beforeText, this.afterText)
      console.log(diff)
      debugger
      diff.forEach(function (part) {
        if (part.added) {
          $('#afterArea').highlightWithinTextarea({
            highlight: [
              {
                highlight: part.added,
                className: 'red'
              }
            ]
          })
        } */
        /* var color = part.added ? 'green' : part.removed ? 'red' : 'grey'
           var spanEl = document.createElement('span')
           spanEl.style.color = color
           spanEl.appendChild(document.createTextNode(part.value))
           fragment.appendChild(spanEl) */
      // })
      // var temp = document.getElementById('temp')
      // temp.appendChild(fragment)
      // console.log(fragment)
      // this.afterText = temp.innerHTML
    },
    importFile: function (e, type) {
      // e.replaceWith(e.vla('').clone(true))
      if (type === 'html') {
        this.htmlToString(e[0])
      } else {
        this.jsonToObject(e[0])
      }
    },
    htmlToString: function (file) {
      var vm = this
      var reader = new FileReader()
      reader.readAsText(file, 'shift_jis')
      reader.onload = function (e) {
        vm.beforeText = String(e.target.result)
        vm.htmlObj = e.target.result
        // this.$emit('send-html-object', )
      }
    },
    jsonToObject: function (file) {
      var vm = this
      var reader = new FileReader()
      reader.readAsText(file)
      reader.onload = function (e) {
        var obj = JSON.parse(e.target.result)
        if (vm.choiceNumber === '1') {
          vm.$bus.$emit('pc-feature-json-obj', obj)
        } else if (vm.choiceNumber === '2') {
          vm.$bus.$emit('smp-feature-json-obj', obj)
        } else if (vm.choiceNumber === '3') {
          vm.$bus.$emit('pc-top-banner-json-obj', obj)
        } else if (vm.choiceNumber === '4') {
          vm.$bus.$emit('smp-top-banner-json-obj', obj)
        }
      }
    }
  }
}
</script>