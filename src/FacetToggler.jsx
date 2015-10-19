import React from 'react';

class FacetToggler extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let moreOrLess;

    moreOrLess = this.props.criteriaTruncated ? 'more' : 'less';

    return (
      <li className="rs-facet-section-toggle" onClick={ this._handleToggleChange.bind(this) }>
        <i className="rs-facet-toggle-arrow" />{ moreOrLess }
      </li>
    );
  };

  _handleToggleChange() {
    this.props.onToggleChange(!this.props.criteriaTruncated);
  };
}

FacetToggler.propTypes = {
  criteriaTruncated: React.PropTypes.bool.isRequired,
  onToggleChange: React.PropTypes.func.isRequired
};

export default FacetToggler;