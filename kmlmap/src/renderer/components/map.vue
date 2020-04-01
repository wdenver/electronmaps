<template>
  
  <div>
  <div class="map-div" :style="{ 'height': `${mapHeight}px` }">
       <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
               data-projection="EPSG:4326"
               ref="map"
               @singleclick="onMapSingleClick"
               @dblclick="onMapSingleClick"
               @mounted="onMapMounted"
               @postcompose="onMapPostCompose"> 

        <vl-view  ref="view"
       :zoom.sync="zoom"
       :center.sync="center"
       :rotation.sync="rotation"
       ></vl-view>



       <!-- TILE LAYERS -->
       <vl-layer-tile :z-index="1" v-for="layer in baseLayers" :key="layer.name" :id="layer.name" :visible="layer.visible">
        <component :is="'vl-source-' + layer.name" v-bind="layer"></component>
      </vl-layer-tile>



      <!-- KML -->
      <vl-layer-vector :z-index="2">
        <vl-source-vector   ref="objSource"
          :url="kmlfile" :format-factory="loadingFormatFactory"></vl-source-vector>
      </vl-layer-vector> 

      </vl-map>



     <!-- base layers switch -->
       <div class="base-layers-panel ol-unselectable ol-control">
            <button v-for="layer in baseLayers"
                    :key="layer.name" :class="{ 'is-info': layer.visible }"
                    @click="showBaseLayer(layer.name)">
              {{layer.title}}
            </button>
        </div>

        <div class="ol-control button-fit-panel ol-unselectable">
          <button type="button" @click="fit(300)">fit</button>
        </div>


       <div class="info">
        Zoom: {{ zoom }}<br>
        Rotação: {{ rotation }}<br>
        <!-- My geolocation: {{ geolocPosition }}<br> -->
     </div> 

   </div>
    <div class="footer" >
      <div class="left">
        Centro: {{ center }}<br>
      </div>
      <div class="right">
        File: {{kmlfile}}
      </div>
    </div>
    </div>
</template>

<script>


import ScaleLine from 'ol/control/ScaleLine'
import FullScreen from 'ol/control/FullScreen'
import KML from 'ol/format/KML';
import DragRotateAndZoom from 'ol/interaction/DragRotateAndZoom';

import defaultmap from './defaultmap.js'
export default {
  extends:defaultmap,
  name:"mapcomp",
    data () {
      return {
        compSelectedId: undefined,
        showFieldColor:true,
        showFields:true,
        showSensors:true,
        mousePosClick :null,
        mapHeight:600
      }
    },

    watch: {
      kmlfile: function(v){
        console.log("chnged",v)
        setTimeout(() => {
               this.fit(0);
             }, 100)
       
      }
    },
    props:{
      kmlfile:String
    },
    methods: {

      mapConfig(){
        console.log("mapconfig")
          this.myEventHandler();
      },

       myEventHandler(e) {
       this.mapHeight = window.innerHeight-25;
      },

      loadingFormatFactory(){
        return new KML()

      },
        mapConfig(){
          // now ol.Map instance is ready and we can work with it directly
          this.$refs.map.$map.getControls().extend([
              new ScaleLine(),
              new FullScreen(),
            //   new OverviewMap({
            //     collapsed: false,
            //     collapsible: true,
            //   }),
            //   new ZoomSlider(),
            ])

            this.$refs.map.$map.getInteractions().extend([
               new DragRotateAndZoom()
              ]

            )
        },
       onMapSingleClick (evt) {
        //  this.mousePosClick = evt.coordinate
        //   	let features = this.$refs.map.$map.getFeaturesAtPixel(evt.pixel)
        //     if (!features) {
        //       if(this.compSelectedId)
        //         this.compSelectedId = undefined
        //       return
        //     }

        //     for(var i = 0; i < features.length; i++) {

        //       if(features[i].values_.sensor != undefined){
        //         this.$store.dispatch('select/setSensor',features[i].values_.sensor)
        //         break;
        //       }

        //       this.compSelectedId = features[i].values_.compId
        //       if(this.compSelectedId!== undefined)
        //         break
        //     }
     },



      onMapPostCompose ({ vectorContext, frameState }) {

      },
     },
     created() {
        window.addEventListener("resize", this.myEventHandler);
      },
      destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
      },
}
</script>

<style lang="less" scoped>

.footer{
  background-color: rgb(91, 168, 199);
  color: white;
  padding: 2px;
  font-size: 14px;
  height: 25px;
  .lef{
    float:left;
  }

  .right{
    float: right;
  }
}

.info{
    position: fixed;
        bottom: 30px;
        padding: 10px;
        right: 10px;
        z-index: 2;
        background-color: #eee;
        box-shadow: 10px 10px 5px rgba(0, 0, 0,0.6);
        border-radius: 5px;
        width: 200px;
}

.map-div{
  position: relative;
  //height:400px;
  //height: 50%;
  width:100%;

  .map{
      height: 100%;
      width: 100%;
  }

  .button-fit-panel{
    left: .5em;
    top: 4.15em;
    position: absolute;
  }

  .button-color-panel{
    left: .5em;
    top: 11.15em;
    position: absolute;
    button{
       font-size: 12px;
       width: 25px;
       height: 25px;
    }
  }

  .button-components-panel{
    right: .5em;
    top: 4.15em;
    position: absolute;
    button{
       font-size: 12px;
       width: 25px;
       height: 25px;
    }
  }

  .field-legend-panel{
    background-color: rgba(0,0,0,0.3);
    position: absolute;
    top: .2em;
    left: 50%;
    border-radius: 8px;
    transform: translate(-50%);

    .legend{
      display: inline-block;
      padding: 0px 10px;
      text-align: center;
      .text{
        line-height: 0px;
        font-size: 12px;
        font-weight: bold;
        color: white;
      }
      .color{
        display: inline-block;
        height: 10px;
        width: 20px;
      //  background-color: #f00;
        margin: 1px;
      }
    }
  }

  .base-layers-panel{
    position: absolute;
    left:.5em;
    top: 6.75em;
    button{
       font-size: 12px;
       width: 25px;
       height: 25px;
    }
  }
}

</style>