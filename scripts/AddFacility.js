import 'ol/ol.css';
import Draw from 'ol/interaction/Draw';
import Map from 'ol/Map';
import View from 'ol/View';
import {toLonLat} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {LineString, Polygon} from 'ol/geom';
import {getArea, getLength} from 'ol/sphere';
import {unByKey} from 'ol/Observable';
import Overlay from 'ol/Overlay';
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

$('#add-facility-btn').click(function(){
  addInteraction();

  //Enable click function
  map.on('click', callback);
  
})

function confirmWindow() {
  Swal.fire({
    position: 'top',
    title: 'Input facility name',
    input: 'text',
    inputPlaceholder: 'Enter facility name',
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
            maxZoom:19,
            padding:[100,100,100,100]
          });
          // vector.getSource().clear(true);
          map.removeLayer(vector);
          map.getInteractions().pop();
          var getFacilityName = value;
          Measure(getFacilityName);
  
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
        title: 'Facility Canceled'
      });
      vector.getSource().clear(true);
      map.removeLayer(vector);
      map.getInteractions().pop();

      //Enable click function
      map.un('click', callback);
    }
  })
}

function Measure(getFacilityName){
  /**
   * Currently drawn feature.
   * @type {import("../src/ol/Feature.js").default}
   */
  let sketch;

  /**
   * The help tooltip element.
   * @type {HTMLElement}
   */
  let helpTooltipElement;

  /**
   * Overlay to show the help messages.
   * @type {Overlay}
   */
  let helpTooltip;

  /**
   * The measure tooltip element.
   * @type {HTMLElement}
   */
  let measureTooltipElement;

  /**
   * Overlay to show the measurement.
   * @type {Overlay}
   */
  let measureTooltip;

  /**
   * Message to show when the user is drawing a polygon.
   * @type {string}
   */
  const continuePolygonMsg = 'Click to continue drawing the polygon';

  /**
   * Handle pointer move.
   * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
   */
  const pointerMoveHandler = function (evt) {
  if (evt.dragging) {
      return;
  }
  /** @type {string} */
  let helpMsg = 'Click to start drawing';

  if (sketch) {
      const geom = sketch.getGeometry();
      if (geom instanceof Polygon) {
      helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
      helpMsg = continueLineMsg;
      }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
  };

  map.addLayer(vector);

  map.on('pointermove', pointerMoveHandler);

  map.getViewport().addEventListener('mouseout', function () {
  helpTooltipElement.classList.add('hidden');
  });

  const typeSelect = document.getElementById('type');

  let draw; // global so we can remove it later

  /**
   * Format area output.
   * @param {Polygon} polygon The polygon.
   * @return {string} Formatted area.
   */
  const formatArea = function (polygon) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
  } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
  }
  return output;
  };

  function addInteraction() {
  const type = 'Polygon';
  draw = new Draw({
      source: vectorSource,
      type: type,
      style: new Style({
      fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
          color: 'blue',
          lineDash: [10, 10], //delete this to get perfect line
          width: 2,
      }),
      image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
          }),
      }),
      }),
  });
  map.addInteraction(draw);

  createMeasureTooltip();
  createHelpTooltip();

  let listener;
  draw.on('drawstart', function (evt) {
      // set sketch
      sketch = evt.feature;

      /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
      let tooltipCoord = evt.coordinate;

      listener = sketch.getGeometry().on('change', function (evt) {
      const geom = evt.target;
      let output;
      output = formatArea(geom);
      tooltipCoord = geom.getInteriorPoint().getCoordinates();
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
      });
  });

  draw.on('drawend', function () {
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      // unset sketch
      sketch = null;
      // unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);

      Swal.fire({
        title: 'Save this facility?',
        text: getFacilityName,
        position: 'top',
        // icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top',
            title: 'Saved!',
            text: 'Your file has been saved.',
            icon: 'success'
          }) 
          map.getInteractions().pop();
          map.un('pointermove', pointerMoveHandler);
        }else if (result.dismiss == Swal.DismissReason.cancel) {
          Swal.fire({
            position: 'top',
            icon: 'info',
            title: 'Facility Canceled'
          });
          $('.ol-tooltip').remove();
          vector.getSource().clear(true);
          map.removeLayer(vector);
          map.getInteractions().pop();
    
          //Enable click function
          map.un('click', callback);
        }
      })
  });
  }

  /**
   * Creates a new help tooltip
   */
  function createHelpTooltip() {
  if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
  });
  map.addOverlay(helpTooltip);
  }

  /**
   * Creates a new measure tooltip
   */
  function createMeasureTooltip() {
  if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false,
  });
  map.addOverlay(measureTooltip);
  }

  /**
   * Let user change the geometry type.
   */
  // typeSelect.onchange = function () {
  // map.removeInteraction(draw);
  // addInteraction();
  // };

  addInteraction();
}

