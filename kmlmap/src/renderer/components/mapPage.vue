
<template>
  <div>
    
    <div class="toolbar">
      <button @click="openPage"> Abrir kml </button>
    </div>
    <!-- <router-link to="/">voltar</router-link> -->
    <mapcomp :kmlfile="kmlfile"> </mapcomp>
    
  </div>
</template>

<script>
import mapcomp from './map'
const { dialog } = require('electron').remote
export default {
  name:"map-page",
  components: { mapcomp },
  data(){
    return {
      kmlfile:""
    }

  },
  methods:{
  
    openPage(){
      var self = this;
     // console.log("open file")
      dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] },
      function (files) {
        if (files !== undefined) {
          console.log(files)
          self.kmlfile = "file://"+files[0]
          //self.kmlfile = files[0]
        }
    })
    }
  }
};
</script>

<style lang="less" scoped>
.toolbar{
  position: fixed;
  top: 10px;
 //padding: 10px;
  left: 40px;
  z-index: 2;
  //background-color: #eee;
  //box-shadow: 10px 10px 5px rgba(0, 0, 0,0.6);
  //border-radius: 5px;
  //width: 200px;

  button{
    background-color: rgb(55, 151, 175);
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 2px 1px;
    cursor: pointer;
     box-shadow: 10px 10px 5px rgba(0, 0, 0,0.6);
     border-radius: 5px;
  }

}
</style>