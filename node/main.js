import 'ol/ol.css';
import KML from 'ol/format/KML';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {transform} from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Stroke, Style } from 'ol/style';

const attributions =
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const raster = new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileSize: 256,
    crossOrigin: null
  }),
});

const rasterAndKmls = [raster]
const colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#d35400','#e74c3c','#c0392b','#2c3e50','#fa8231','#eb3b5a','#0fb9b1']
var request = new XMLHttpRequest();
request.open("GET", "./kmlssimple/kml_list.json", false);
request.send(null);
const kmlList = JSON.parse(request.responseText);
console.log(kmlList);
kmlList.forEach(file => {
  console.log(file);

  var stroke = new Stroke({
    color: colors[Math.floor(Math.random()*colors.length)],
    width: 2.25
  });

  rasterAndKmls.push(new VectorLayer({
    style: new Style({
      stroke: stroke
    }),
    source: new VectorSource({
      url: 'kmlssimple/' + file,
      format: new KML({
        extractStyles: false
      })
    })
  }))
});


const map = new Map({
  layers: rasterAndKmls,
  target: document.getElementById('map'),
  view: new View({
    center: transform([9.993682, 53.551086], 'EPSG:4326', 'EPSG:3857'),
    projection: 'EPSG:3857',
    zoom: 4,
  }),
});

const displayFeatureInfo = function (pixel) {
  const features = [];
  map.forEachFeatureAtPixel(pixel, function (feature) {
    features.push(feature);
  });
  if (features.length > 0) {
    const info = [];
    let i, ii;
    for (i = 0, ii = features.length; i < ii; ++i) {
      info.push(features[i].get('name'));
    }
    document.getElementById('info').innerHTML = info.join(', ') || '(unknown)';
    map.getTarget().style.cursor = 'pointer';
  } else {
    document.getElementById('info').innerHTML = '&nbsp;';
    map.getTarget().style.cursor = '';
  }
};

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  const pixel = map.getEventPixel(evt.originalEvent);
  displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
  displayFeatureInfo(evt.pixel);
});