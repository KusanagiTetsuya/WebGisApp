import 'ol/ol.css';
import {Map, View} from 'ol/';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer, Vector as VectorLayer } from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import TileWMS from 'ol/source/TileWMS';
import Projection from 'ol/proj/Projection';
import {OSM, Vector as VectorSource} from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON';
import Geolocation from 'ol/Geolocation';
import Draw from 'ol/interaction/Draw';
// import CountryLayer from '../scripts/map.geojson'

const serverUrl="http://localhost:8080/geoserver/wms"
// const serverUrl="http://192.168.1.125:8080/geoserver/wms"

// const mapProjection=new Projection({
//     code:"EPSG:28191",
//     units:"m",
//     axisOrientation:"new",
//     global:false
// });

// const orthophotoSource=new TileWMS({
//     url:serverUrl,
//     params:{"LAYERS":"Training:orthophoto","VERSION":"1.1.1","FORMAT":"image/jpeg"}
// })

// const orthophotoLayer=new TileLayer({
//     source:orthophotoSource,
//     // @ts-ignore
//     name:"Orthophoto"
// })

const parcelSource=new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Training:Parcels","VERSION":"1.1.1","FORMAT":"image/png"}
})

const parcelLayer=new ImageLayer({
    source:parcelSource,
    // @ts-ignore
    name:"Parcels"
})

const buildingsSource=new ImageWMS({
    url:serverUrl,
    params:{"LAYERS":"Training:Buildings","VERSION":"1.1.1","FORMAT":"image/png"}
})

const buildingsLayer=new ImageLayer({
    source:buildingsSource,
    // @ts-ignore
    name:"Buildings"
})

const view=new View({
    // extent:[165217.233,151185.7259,172973.3239,155713.6059],
    // center:[168540,153370],
    center:[0,0],
    zoom:0,
    // projection:mapProjection
});
// const map=new Map({
//     target:"map",
//     layers:[orthophotoLayer,parcelLayer,buildingsLayer],
//     view:view
// });

var geolocation = new Geolocation({
    // take the projection to use from the map's view
    projection: view.getProjection()
});

// listen to changes in position
geolocation.on('change', function(evt) {
    window.console.log(geolocation.getPosition());
});

const osmLayer=new TileLayer({
    source:new OSM()
})

const map=new Map({
    target:"map",
    // layers:[orthophotoLayer,parcelLayer,buildingsLayer],
    layers:[osmLayer,parcelLayer,buildingsLayer,
        new VectorLayer({
            source: new VectorSource({
              format: new GeoJSON(),
            //   url:'https://openlayers.org/en/latest/examples/data/geojson/countries.geojson'
              url: 'https://aitext.asiaresearchinstitute.com/upload/geojson/itabashi.geojson'
            //   url:'./assets/map.geojson' 
            }),
          })
    ],
    view:view,
    //controls: [] //Hide and show default zoom button
});

$('#map').data('map',map);