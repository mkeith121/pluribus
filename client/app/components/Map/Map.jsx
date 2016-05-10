import React from "react";

import { connect } from 'react-redux';
import { updateMapBounds, getPlurbs } from '../../ACTIONS.jsx';

class GoogleMap extends React.Component {

  constructor(props) {
    super(props);
  }
  
  // Once DOM node has rendered
  componentDidMount(rootNode) {
    // initialize map
    let map = initMap();

    // When user pauses map movement, updates new bounds
    map.addListener('idle', () => {
      let newBounds = map.getBounds();
      
      // pull map bounds off view port
      let Lats = newBounds.H;
      let Lngs = newBounds.j;
            
      let query = {
        mapBounds: {
          maxLat: +Lats.j.toFixed(2),
          maxLng: +Lngs.H.toFixed(2),
          minLat: +Lats.H.toFixed(2),
          minLng: +Lngs.j.toFixed(2)   
        },
        topicId: this.props.currentTopicId
      }
      
      // update bounds on store, then re-fetch plurbs
      this.props.dispatch(updateMapBounds(query.mapBounds))
      this.props.dispatch(getPlurbs(query))
      
      // populate plurbs on map
      this.props.plurbs.map((plurb) => {
        new google.maps.Marker({
          position: {lat: plurb.lat, lng: plurb.long},
          map: map,
          icon: "http://map.karaliki.ru/css/markbig.png"
        });
      });
    });
  }

  render() {
    return (
      <div id='map' className='map-gic' style={{ width: '50%', height:'600px', "opacity":'.90' }}></div>
    );
  }
}

// map the portion of the state tree desired
const mapStateToProps = (store) => {
  return {
    mapBounds: store.pluribusReducer.mapBounds,
    plurbs: store.pluribusReducer.plurbs,
    currentTopicId: store.pluribusReducer.currentTopicId
  };
};

// export map;

// connect the desired state to the relevant component
export default connect(mapStateToProps)(GoogleMap);
