import 'ol/ol.css';
import KML from 'ol/format/KML';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { transform, fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Stroke, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { circular } from 'ol/geom/Polygon';
import Control from 'ol/control/Control';

const attributions =
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const raster = new TileLayer({
  source: new XYZ({
    attributions: attributions,
    url: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    tileSize: 256,
    crossOrigin: null,
  }),
});


const rasterAndKmls = [raster];
const colors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#d35400',
  '#e74c3c',
  '#c0392b',
  '#2c3e50',
  '#fa8231',
  '#eb3b5a',
  '#0fb9b1',
];
var request = new XMLHttpRequest();
request.open('GET', './kmlssimple/kml_list.json', false);
request.send(null);
const kmlList = JSON.parse(request.responseText);
console.log(kmlList);
kmlList.forEach((file) => {
  //console.log(file);

  var stroke = new Stroke({
    color: colors[Math.floor(Math.random() * colors.length)],
    width: 2.25,
  });

  rasterAndKmls.push(
    new VectorLayer({
      style: new Style({
        stroke: stroke,
      }),
      source: new VectorSource({
        url: 'kmlssimple/' + file,
        format: new KML({
          extractStyles: false,
        }),
      }),
    })
  );
});

const source = new VectorSource();
const layer = new VectorLayer({
  source: source,
});

rasterAndKmls.push(layer);
//console.log(rasterAndKmls);
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
      info.push(features[i].get('name').replace(/\$URL(\d*)\$URL/, '<a href="https://www.komoot.de/tour/$1" target="_blank">Link</a>'));
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




***REMOVED***(
  function (pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    const accuracy = circular(coords, pos.coords.accuracy);
    source.clear(true);
    source.addFeatures([
      new Feature(
        accuracy.transform('EPSG:4326', map.getView().getProjection())
      ),
      new Feature(new Point(fromLonLat(coords))),
    ]);
  },
  function (error) {
    alert(`ERROR: ${error.message}`);
  },
  {
    enableHighAccuracy: true,
  }
);

const locate = document.createElement('div');
locate.className = 'ol-control ol-unselectable locate';
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener('click', function () {
  if (!source.isEmpty()) {
    map.getView().fit(source.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  }
});
map.addControl(
  new Control({
    element: locate,
  })
);
