import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { YMaps, Map, Polygon, ListBox, ListBoxItem } from '@pbe/react-yandex-maps';
import data from '../asserts/ao.json';
import { nanoid } from 'nanoid';

const DistrictsMap = () => {

  const districtsColors = {
    'Центральный': '#FF0000',
    'Северный': '#00FF00',
    'Северо-Восточный': '#0000FF',
    'Восточный': '#FFFF00',
    'Юго-Восточный': '#00FFFF',
    'Южный': '#FF00FF',
    'Юго-Западный': '#FFFFFF',
    'Западный': '#000000',
    'Северо-Западный': '#FFA500',
    'Зеленоградский': '#A52A2A',
    'Троицкий': '#800000',
    'Новомосковский': '#808000',
  }

  const [districtsColorsState, setDistrictsColorsState] = useState(districtsColors);
  const [clickedCoords, setClickedCoords] = useState(null);
  const [choosenDistrict, setChoosenDistrict] = useState(null);

  function transformData(jsonData) {
    const result = [];

    if (jsonData && jsonData.features) {
      jsonData.features.forEach((feature) => {
        const { NAME } = feature.properties;
        const { geometry } = feature;
        const { coordinates } = geometry;

        let polygons = [];

        if (geometry.type === 'MultiPolygon') {
          polygons = coordinates.map((polygon) =>
            polygon[0].map((coord) => [coord[1], coord[0]])
          );
        } else if (geometry.type === 'Polygon') {
          polygons = [coordinates[0].map((coord) => [coord[1], coord[0]])];
        }
        result.push({ name: NAME, polygons });
      });
    }

    return result;
  }

  const coordinates = transformData(data);
  const names = coordinates.map((coord) => coord.name);

  const handleMapClick = (e) => {
    const fillCoor = e.get('target')['options']['_options']['fillColor']
    // find district by color
    const district = Object.keys(districtsColors).find(key => districtsColors[key] === fillCoor);
    // change color of clicked district
    handleMapColorChange({ district });
    const RNcoordinates = e.get('coords');
    setClickedCoords(RNcoordinates);

  };

  const handleMapColorChange = (e) => {
    if (e.district && e.district in districtsColors) {
      setDistrictsColorsState({ ...districtsColors, [e.district]: '#F24900' });
      setChoosenDistrict(e.district);
    } else if (e.originalEvent.target.data['_data']['content']) {
      const districtName = e.originalEvent.target.data['_data']['content'];
      setDistrictsColorsState({ ...districtsColors, [districtName]: '#F24900' });
      setChoosenDistrict(districtName);
    }
  }

  const _getPolygons = () => {
    return coordinates.map((coord) =>
      <Polygon
        onClick={handleMapClick}
        key={nanoid()}
        geometry={coord.polygons}
        openBalloonOnClick={true}
        openEmptyBalloon={true}
        openHintOnHover={true}
        options={{
          strokeColor: '#0000FF',
          opacity: coord.name === choosenDistrict ? 0.7 : 0.4,
          fillColor: districtsColorsState[coord.name],
          strokeOpacity: 0.5,
          strokeWidth: 2,
          cursor: 'pointer',
        }}
      />



    )
  }
  const getPolygons = useMemo(() => _getPolygons(), [choosenDistrict, districtsColorsState]);


  return (
    <div className='container'>
      <YMaps
        query={{
          lang: 'ru_RU', apikey: 'd3821b8c-9c4f-4885-9c54-6feda085a943'
        }}
      >

        <Map
          defaultState={{ center: [55.8, 37.7], zoom: 9 }}
          width="100%"
          height="500px"

        >
          {/* <ListBox data={{ content: "Выбрать AO " }}>
            {names.map((name) => (
              <ListBoxItem
                key={nanoid()}
                onClick={handleMapColorChange}
                data={{ content: name }}
                options={{
                  float: 'left',
                  contentLayout: 'my#itemLayout',

                }}

              />
            ))}
          </ListBox> */}

          {getPolygons}
        </Map>
      </YMaps>
    </div>
  );
};

export default DistrictsMap;
