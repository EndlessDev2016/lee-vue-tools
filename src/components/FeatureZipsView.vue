<template>
  <div>
    <md-layout md-gutter>
      <md-layout>
        <md-button class="md-raised md-button-size" @click="initValue">初期化</md-button>
      </md-layout>
      <md-layout md-flex="33" md-flex-offset="33">
        <md-input-container>
          <label for="choiceNumber">ワクチン種類</label>
          <md-select name="choiceNumber" id="choiceNumber" v-model="choiceNumber" @change="changeNumber">
            <md-option value="1">PC - TOP特集</md-option>
            <md-option value="2">SP - TOP特集</md-option>
            <md-option value="3">PC - TOP特集バナー</md-option>
            <md-option value="4">PC - TOP特集バナー</md-option>
          </md-select>
        </md-input-container>
      </md-layout>
    </md-layout>
    <!-- BeforeToAfterBox -->
    <before-after-box :choice-number="choiceNumber"></before-after-box>
    <!-- file output -->
    <file-output-box v-show="choiceNumber > 0"></file-output-box>
  </div>
</template>
<style lang="scss">
</style>
<script>
export default {
  data () {
    return {
      deleteDate: '',
      choiceNumber: '',
      addDate: '',
      isFile: true,
      fileId: 0,
      htmlObject: Object,
      isActive: false
    }
  },
  methods: {
    initValue: function () {
      this.choiceNumber = '0'
    },
    changeNumber: function () {
      this.$bus.$emit('initText')
    }
  }
}
</script>