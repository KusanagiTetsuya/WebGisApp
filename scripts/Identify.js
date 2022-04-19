import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import {toLonLat} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';
import {getLayerByName} from './CustomFunction'
import { transform } from 'ol/proj';

const map=$('#map').data('map');
/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation:{
      duration:250
  }
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

/**
 * Create the map.
 */
map.addOverlay(overlay);

/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  if($('#draggable-title').text() !== "Measure"){
    const coordinate = evt.coordinate;
  
    //Get the layer by it's name
    const parcelLayer=getLayerByName('Parcels');
    const parcelSource=parcelLayer.getSource();
    const buildingLayer=getLayerByName('Buildings');
    const buildingSource=buildingLayer.getSource();
    const view=map.getView();
    const resolution=view.getResolution();
    const projection=view.getProjection();
  
    const parcelInfo=$('#parcel-info');
    parcelInfo.html('');
    const buildingInfo=$('#building-info');
    buildingInfo.html('');
    const coordinateInfo=$('#select-coordinate');
    coordinateInfo.html('');
    const noFeatures=$('#no-features');
    noFeatures.html('<p>No Features</p>')
  
  
    const parcelUrl=parcelSource.getFeatureInfoUrl(coordinate,resolution,projection,
      {'INFO_FORMAT':'application/json'});
    const buildingUrl=buildingSource.getFeatureInfoUrl(coordinate,resolution,projection,
      {'INFO_FORMAT':'application/json'});

      const checkStatus = 0
      $('.form-check-input').click(function(){
        if((this).prop("checked")== true){
          checkStatus = 1
        }
    })
  
    if(parcelUrl && checkStatus==1){
        $.ajax({
            url:parcelUrl,
            method:'GET',
            success:function(result){
              const parcel=result.features[0];
              if(parcel){
                  const parcelNumber=parcel.properties.parcel_n;
                  const blockNumber=parcel.properties.block_n;
                  const parcelArea=parcel.properties.shape_area;
                  parcelInfo.html(`<h5>Parcel Info</h5> <p>Parcel Number: ${parcelNumber}</p>
                      <p>Block Number: ${blockNumber}</p>
                      <p>Area(sqm): ${parcelArea.toFixed(2)}</p>`)
                  noFeatures.html('');
              }
              
            }
        })
    }
    
    if(buildingUrl){
      $.ajax({
          url:buildingUrl,
          method:'GET',
          success:function(result){
            const building=result.features[0];
            if(building){
              const buildingNumber=building.properties.building_n;
              const buildingArea=building.properties.shape_area;
              buildingInfo.html(`<h5>Building Info</h5> <p>Building Number: ${buildingNumber}</p>
                  <p>Area(sqm): ${buildingArea.toFixed(2)}</p>`)
              noFeatures.html('');
            }
            
          }
      })
    }

    const selectedCoordinate= toStringXY(transform(coordinate, 'EPSG:3857', 'EPSG:4326'), 14)
    coordinateInfo.html(`<p>Coordinate: ${selectedCoordinate}</p>`)
    overlay.setPosition(coordinate);
  }
  
});