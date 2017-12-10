<template>
  <div>
    <md-layout md-gutter>
      <md-layout md-column md-gutter>
        <input v-if="isFile" type="file" @change="importHtmlFile" value="読み込み">
        <button v-else @click="fileClear"></button>
        <md-layout>
          <textarea v-text="htmlData"></textarea>
        </md-layout>
      </md-layout>
      <md-layout md-column md-gutter>
        <md-layout><input type="file" value="読み込み"></md-layout>
        <md-layout md-flex="50">
          <input type="file" @change="importExcelFile" id="input" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></input>
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
export default {
  data () {
    return {
      htmlData: '',
      isFile: true,
      htmlObj: {}
    }
  },
  methods: {
    importHtmlFile: function (e) {
      var files = e.target.files || e.dataTransfer.files
      this.htmlToString(files[0])
    },
    importExcelFile: function (e) {
      var files = e.target.files || e.dataTransfer.files
      this.excelToObject(files[0])
    },
    htmlToString (files) {
      var vm = this // Reference Vue Instansce
      var reader = new FileReader()
      reader.onload = function (e) {
        vm.htmlData = String(e.target.result)
        console.log(vm.htmlData)
      }
      reader.readAsText(files, 'shift_jis')
    },
    excelToObject (files) {
      /* var vm = this */
      var reader = new FileReader()
      var buffer = new Uint8Array(reader.result)

      reader.onload = function (e) {
        $.ig.excel.Workbook.load(buffer, function (workbook) {
          var column, row, newRow, cellValue, columnIndex, i
          var worksheet = workbook.worksheets(0)
          var columnsNumber = 0
          var gridColumns = []
          var data = []
          var worksheetRowsCount

          // Both the columns and rows in the worksheet are lazily created and because of this most of the time worksheet.columns().count() will return 0
          // So to get the number of columns we read the values in the first row and count. When value is null we stop counting columns:
          while (worksheet.rows(0).getCellValue(columnsNumber)) {
            columnsNumber++
          }

          // Iterating through cells in first row and use the cell text as key and header text for the grid columns
          for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
            column = worksheet.rows(0).getCellText(columnIndex)
            gridColumns.push({ headerText: column, key: column })
          }

          // We start iterating from 1, because we already read the first row to build the gridColumns array above
          // We use each cell value and add it to json array, which will be used as dataSource for the grid
          for (i = 1, worksheetRowsCount = worksheet.rows().count(); i < worksheetRowsCount; i++) {
            newRow = {}
            row = worksheet.rows(i)

            for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
              cellValue = row.getCellText(columnIndex)
              newRow[gridColumns[columnIndex].key] = cellValue
            }

            data.push(newRow)
          }
          // we can also skip passing the gridColumns use autoGenerateColumns = true, or modify the gridColumns array
          /* createGrid(data, gridColumns) */
        }, function (error) {
          alert('Excel ファイルは破損しています。', error)
        })
      }
      if (files.type === 'application/vnd.ms-excel' || files.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || (files.type === '' && (files.name.endsWith('xls') || files.name.endsWith('xlsx')))) {
        reader.readAsArrayBuffer(files)
      } else {
        alert('選択のファイル形式がサポートされていません。有効な Excel ファイルを選択してください')
      }
    },
    fileClear () {
      this.isFile = false
    }

  }
}
</script>