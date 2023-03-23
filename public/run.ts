import { writeFileSync } from 'fs';
import { join } from 'path';
const bounds = [97.470703125, 21.09375, 106.259765625, 29.267578125];
const [minLon, minLat, maxLon, maxLat] = bounds;
const data: {
  lat: number;
  lon: number;
  minLon: number;
  minLat: number;
  maxLon: number;
  maxLat: number;
}[] = [];
maxLat;
const diff = maxLon - minLon;
// 316 * 316 = 10000
// const size = 316;
const size = 316;
const step = diff / size;

for (let lonIndex = 0; lonIndex < size; lonIndex++) {
  for (let lanIndex = 0; lanIndex < size; lanIndex++) {
    const lat = minLat + lanIndex * step;
    const lon = minLon + lonIndex * step;
    const diff = step * 1;
    data.push({
      minLat: lat - diff,
      maxLat: lat + diff,
      lat,
      minLon: lon - diff,
      maxLon: lon + diff,
      lon,
    });
  }
}
writeFileSync(join(__dirname, './tree.json'), JSON.stringify(data));
console.log(data.length);
