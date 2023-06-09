import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { YMaps, Map, Polygon, ListBox, ListBoxItem } from '@pbe/react-yandex-maps';
import data from '../asserts/ao.json';
import { nanoid } from 'nanoid';

const DistrictsMap = ({ choosenDistrict, setChoosenDistrict }) => {


  const districtsColors = {
    'ЦАО': '#B5DEFF',
    'САО': '#D8B9FF',
    'СВАО': '#FBBCFF',
    'ВАО': '#FFC6E5',
    'ЮВАО': '#FFC1C4',
    'ЮАО': '#FFE0C7',
    'ЮЗАО': '#FFFCC1',
    'ЗАО': '#DBFFB0',
    'СЗАО': '#D1FFCF',
    'ЗелАО': '#D1FFE6',
    'ТАО': '#DFFFFF',
    'НАО': '#B7BAFF',
  }

  const [districtsColorsState, setDistrictsColorsState] = useState(districtsColors);
  const [clickedCoords, setClickedCoords] = useState(null);

  function transformData(jsonData) {
    const result = [];

    if (jsonData && jsonData.features) {
      jsonData.features.forEach((feature) => {
        const { ABBREV } = feature.properties;
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
        result.push({ name: ABBREV, polygons });
      });
    }

    return result;
  }

  const coordinates = transformData(data);
  const names = coordinates.map((coord) => coord.name);

  const handleMapClick = (e) => {
    const fillCoor = e.get('target')['options']['_options']['fillColor']
    if (fillCoor !== '#5E55DF') {
      // find district by color
      const district = Object.keys(districtsColors).find(key => districtsColors[key] === fillCoor);
      // change color of clicked district
      handleMapColorChange({ district });
      const RNcoordinates = e.get('coords');
      setClickedCoords(RNcoordinates);
      console.log(coordinates)
    } else {
      setClickedCoords(null);
      setChoosenDistrict(null);
      setDistrictsColorsState(districtsColors);
    }

  };

  const handleMapColorChange = (e) => {
    if (e.district && e.district in districtsColors) {
      setDistrictsColorsState({ ...districtsColors, [e.district]: '#5E55DF' });
      setChoosenDistrict(e.district);
    } else if (e.originalEvent.target.data['_data']['content']) {
      const districtName = e.originalEvent.target.data['_data']['content'];
      setDistrictsColorsState({ ...districtsColors, [districtName]: '#5E55DF' });
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
          strokeColor: '#000',
          opacity: coord.name === choosenDistrict ? 0.8 : 0.4,
          fillColor: districtsColorsState[coord.name],
          strokeOpacity: coord.name === choosenDistrict ? 0.8 : 0.4,
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


          {getPolygons}
        </Map>
      </YMaps>
    </div>
  );
};

export default DistrictsMap;
