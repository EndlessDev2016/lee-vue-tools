<template>
  <div v-if="choiceNumber == 1 || choiceNumber == 2">
    <!-- PCIndex,SMP 条件枠 -->
    <md-layout md-align="end" md-gutter="16">
      <md-layout md-flex="40">
        <md-input-container>
          <label>削除日(YYYY/MM/DD)</label>
          <md-input v-model="deleteDate" required id="deleteDate"></md-input>
        </md-input-container>
      </md-layout>
      <md-layout md-flex="40">
        <md-input-container>
          <label>追加日(YYYY/MM/DD)</label>
          <md-input v-model="addDate" required id="addDate"></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
  </div>
  <div v-else>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      deleteDate: '',
      addDate: ''
    }
  },
  created: function () {
    /* this.$bus.$emit('con-value', {
      'deleteDate': this.deleteDate,
      'addDate': this.addDate
    }) */
  },
  props: ['choiceNumber'],
  methods: {
    testMethod: function () {
    }
  },
  computed: {
    testNum: function () {
      console.log(this.deleteDate)
    }
  }
}
</script>