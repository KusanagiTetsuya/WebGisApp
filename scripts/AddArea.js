import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {toLonLat} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {fromLonLat} from 'ol/proj';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const map=$('#map').data('map');

const raster = new TileLayer({
  source: new OSM(),
});

const vectorSource = new VectorSource();
const vector = new VectorLayer({
  source: vectorSource,
});

var vectorLayer = new VectorLayer({
  source: new VectorSource(),
});
map.addLayer(vectorLayer);

let draw; // global so we can remove it later
function addInteraction() {
  map.addLayer(vector);
  draw = new Draw({
    source: vectorSource,
    type: "Point",
  });
  map.addInteraction(draw);
}

var callback = function(evt) {
  confirmWindow();
};

$('#add-area-btn').click(function(){
  addInteraction();

  //Enable click function
  map.on('click', callback);
  
})

function confirmWindow() {
  Swal.fire({
    position: 'top',
    // icon: 'info',
    title: 'Input area name',
    input: 'text',
    // inputLabel: 'Area name',
    // inputValue: 'Input Area Name',
    inputPlaceholder: 'Enter area name',
    showCancelButton: true,
    allowOutsideClick: false,
    // closeOnEsc: false,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      }
      else {
        map.getView().fit(vectorSource.getExtent(),  
          {
            size: map.getSize,
            maxZoom:17,
            padding:[100,100,100,100]
          });
          vector.getSource().clear(true);
          map.removeLayer(vector);
          map.getInteractions().pop();
  
          //Enable click function
          map.un('click', callback);
      }
    }
  }).then((result) => {
    //Cancel button clicked
    
    if (result.dismiss == Swal.DismissReason.cancel) {
      Swal.fire({
        position: 'top',
        icon: 'info',
        title: 'Area Canceled'
      });
      vector.getSource().clear(true);
      map.removeLayer(vector);
      map.getInteractions().pop();

      //Enable click function
      map.un('click', callback);
    }
  })
}