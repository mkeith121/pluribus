import React from 'react';

// material-ui components
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Pin from 'material-ui/svg-icons/maps/pin-drop';

// map utils
import { rePosition } from '../../Map/map_utils.jsx';

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this._reLoc = this._reLoc.bind(this);
  }
  _reLoc() {
    // "snap" center of map to plurb location
    rePosition(this.props.plurb);
  }
  render() {
    let image = this.props.plurb.picture;
    return (
      <ListItem
        leftAvatar={<Avatar 
          onMouseEnter={ () => {console.log('switch to plus!')}} 
          onClick={ () => {console.log('clicked my face!')} } src={image} />}
        primaryText={ this.props.plurb.text }
        rightIcon={<Pin onClick={ this._reLoc } />}
        style={{width: '96%'}}
      />
    )
  }
}
