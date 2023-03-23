import { Map } from 'ol';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { GeoJSON } from 'ol/format';
import { useComputedRef } from '@zdzz/hooks';
import axios from 'axios';
import RBush from 'rbush';
import 'ol/ol.css';
const bounds = [97.470703125, 21.09375, 106.259765625, 29.267578125];
const [minLon, minLat, maxLon, maxLat] = bounds;
export function init(el: MaybeComputedRef<Nullable<HTMLElement>>) {
  const elRef = useComputedRef(el);
  const map = new Map();
  addGeoJsonLayer(map);

  initDataTree();

  onMounted(() => {
    map.setTarget(elRef.value!);
  });
}

function addGeoJsonLayer(map: Map) {
  const view = new View({
    projection: new Projection({
      code: 'EPSG:4326',
      units: 'degrees',
    }),
  });
  const vectorLayer = new VectorLayer();
  const source = new VectorSource();
  vectorLayer.setSource(source);
  map.addLayer(vectorLayer);

  axios.get('/map/county.json').then((res) => {
    const features = new GeoJSON().readFeatures(res.data);
    source.addFeatures(features);
    map.setView(view);
    view.fit(bounds);
    view.setMinZoom(view.getZoom()!);
  });
}

// const v
interface Item {
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
  // lon: number; // x
  // lat: number; // y
}

class MyRBush extends RBush<Item> {
  toBBox(data: Item) {
    return {
      minX: data.minLon,
      minY: data.minLat,
      maxX: data.maxLon,
      maxY: data.maxLat,
    };
  }

  compareMinX(a: Item, b: Item) {
    return a.minLon - b.minLon;
  }

  compareMinY(a: Item, b: Item) {
    return a.minLat - b.minLat;
  }
}
function initDataTree() {
  axios.get('/tree.json').then((res) => {
    const tree = new MyRBush(3);
    tree.load(res.data);
    const t = { minX: minLon, minY: minLat, maxX: maxLon, maxY: maxLat };
    console.log(t);
    const d = tree.search(t);
    console.log(d);
  });
}

