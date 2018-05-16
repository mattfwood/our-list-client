import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListPreview = ({ list }) => {
  return (
    <Link to={`/list/${list.id}`}>
      <div className="ListPreview">
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
