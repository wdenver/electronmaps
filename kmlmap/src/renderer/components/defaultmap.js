import Vue from 'vue'

/***********************************************************
*  Map
*/
// import 'vuelayers/lib/style.css' // needs css-loader
// import VueLayers from 'vuelayers'
// Vue.use(VueLayers, {dataProjection: 'EPSG:4326'})



import { Map, TileLayer,VectorSource,LineStringGeom,Overlay,
  Feature,StyleBox,CircleStyle,StrokeStyle, FillStyle,IconStyle, OsmSource,
  PolygonGeom,PointGeom, BingmapsSource,SelectInteraction,
  VectorLayer} from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
Vue.use(Map,{dataProjection: 'EPSG:4326'})
Vue.use(TileLayer)
Vue.use(OsmSource)
Vue.use(BingmapsSource )
Vue.use(PolygonGeom)
Vue.use(VectorLayer)
Vue.use(VectorSource)
Vue.use(Feature)
Vue.use(StyleBox)
Vue.use(CircleStyle)
Vue.use(StrokeStyle)
Vue.use(FillStyle)
Vue.use(PointGeom)
Vue.use(IconStyle)
Vue.use(SelectInteraction)
Vue.use(LineStringGeom)
Vue.use(Overlay)


export default {

  data () {
    return {
      started:false,
      zoom: 2,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      baseLayers: [
       { name: 'osm',title: 'vec',visible: false},
       { name: 'bingmaps',  title: 'sat', apiKey: 'Am6S4E1CnAABn9rKMtprpwtI-DQZH3a5vERaNEOwL3MSzTlU4QYblJySdHbX6ph2',
         imagerySet: 'AerialWithLabels', visible: true}
     ],
    }
  },

  methods:{
    fit (duration) {
      this.$refs.view.$mountPromise.then(() => {
         let area = this.$refs.objSource.$source.getExtent();
         return this.$refs.view.fit(area,{padding: [50, 50, 10, 50], duration:duration, constrainResolution: false, maxZoom:16})
      })
    },

    geometryTypeToCmpName (type) {
        return 'vl-geom-' + kebabCase(type)
    },

     mapConfig(){
      
     },

    onMapMounted () {
         this.mapConfig();
         if(this.started === false){
           this.started = true
           setTimeout(() => {
               this.fit(0);
             }, 100)
         }
      },
      // base layers
      showBaseLayer (name) {
        let layer = this.baseLayers.find(layer => layer.visible)
        if (layer != null) {
          layer.visible = false
        }
        layer = this.baseLayers.find(layer => layer.name === name)
        if (layer != null) {
          layer.visible = true
        }
      },
  },

  computed:{
    mapSensors:function(){
       if(this.sensors!= null)
        return this.sensors.filter(ele => ['SensorWaterWay','SensorPivot','WeatherStation','SensorSoil','Pluviometer'].indexOf(ele.sensorType)!= -1 );

        return [];
    },
  }

}
