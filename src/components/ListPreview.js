import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListPreview = ({ list }) => {
  return (
    <div className="ListPreview">
      <Link to={`/list/${list.id}`} className="ListPreview__title">
        {list.title}
      </Link>
      <div className="ListPreview__items">
        {list.items.map(item => (
          <div className="ListPreview__item">{item.text}</div>
        ))}
      </div>
    </div>
  );
};

ListPreview.propTypes = {

};

export default ListPreview;