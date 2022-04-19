import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import webgisData from '../assets/db_itabashi.json';

const map=$('#map').data('map');

var vectorLayer = new VectorLayer({
    source: new VectorSource(),
    // style: new Style({
    //     image: new Icon({
    //         anchor: [0.5, 1],
    //         anchorXUnits: "fraction",
    //         anchorYUnits: "fraction",
    //         src: "pin.png"
    //     })
    // })
});
map.addLayer(vectorLayer);


// Get data from JSON file
// webgisData.forEach(function(elem){
//     var dataLat = parseFloat(JSON.parse(elem.lat));
//     var dataLon = parseFloat(JSON.parse(elem.lon));
//     vectorLayer.getSource().addFeature(createMarker(dataLon, dataLat));
// })

// function createMarker(dataLon, dataLat) {
//     return new Feature({
//         geometry: new Point(fromLonLat([dataLon, dataLat]))
//     });
// }