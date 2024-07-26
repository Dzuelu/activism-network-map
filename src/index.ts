let map;

interface ResultsType {
  coordinates: [number, number];
  name: string;
}

// Appends some script text to head element after page load
function runScriptText(text: string) {
  const script = document.createElement('script');
  script.appendChild(document.createTextNode(text));
  document.getElementsByTagName('head')[0].appendChild(script);
}

// on google map init, it calls this function
function initMap() {
  map = new google.maps.Map(document.getElementById('map')!, {
    center: new google.maps.LatLng(2.8, -187.3),
    mapId: '4dt2yj64tyj64dt7y',
    mapTypeId: 'terrain',
    zoom: 2
  });

  // Load our data, static for now
  const data: ResultsType[] = [
    { coordinates: [-94.854, 17.5693], name: 'test 1' },
    { coordinates: [126.977, 10.6573], name: 'test 2' },
    { coordinates: [-72.226, -34.271], name: 'test 3' },
    { coordinates: [-91.017, 13.9813], name: 'test 4' },
    { coordinates: [-32.042, 52.5855], name: 'test 5' }
  ];
  runScriptText(`eqfeed_callback(${JSON.stringify(data)})`);
}

// Add markers to map
async function eqfeed_callback(results: ResultsType[]) {
  const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;
  const infoWindow = new google.maps.InfoWindow();

  for (let i = 0; i < results.length; i++) {
    const coords = results[i].coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    const marker = new AdvancedMarkerElement({
      gmpClickable: true,
      map,
      position: latLng,
      title: results[i].name
    });
    marker.addEventListener('gmp-click', (/* { domEvent, latLng } */) => {
      // const { target } = domEvent;
      infoWindow.close();
      infoWindow.setHeaderContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  }
}

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
