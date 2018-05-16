import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListPreview = ({ list, index }) => {
  const colors = [
    'rgba(97, 189, 79, 0.5)',
    'rgba(242,214,0, 0.5)',
    'rgba(255,171,74,0.5)',
    'rgba(235,90,70,0.5)',
    'rgba(195,119,224,0.5)',
    'rgba(0,121,191,0.5)'
  ];

  let colorIndex = index;

  while (colorIndex > 6) {
    colorIndex -= 6;
  }

  const cardColor = [colors[colorIndex]];

  return (
    <Link to={`/list/${list.id}`}>
      <div className="ListPreview" style={{ backgroundColor: cardColor }}>
        <div className="ListPreview__title">{list.title}</div>
        <div className="ListPreview__items">
          {list.items.map(item => (
            <div className="ListPreview__item">{item.text}</div>
          ))}
        </div>
      </div>
    </Link>
  );
};

ListPreview.propTypes = {};

export default ListPreview;
