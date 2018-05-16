import React from 'react';
import PropTypes from 'prop-types';

const ListPreview = ({ list }) => {
  return (
    <div className="ListPreview">
      <div className="ListPreview__title">
        {list.title}
      </div>
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