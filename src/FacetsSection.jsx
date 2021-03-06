import React from 'react';

class FacetsSection extends React.Component {
  render() {
    let facets, itemClasses;

    if (!this.props.children) {
      return null;
    }

    facets = this._getFacetElements();

    itemClasses = ['rs-facet-clear-link'];
    if (!Object.keys(this.props.selectedCriteria).length) {
      itemClasses.push('rs-hidden');
    }

    return (
      <span className='rs-facets'>
        <div className='rs-inner'>
          <div className='rs-facet-header'>
            <div className={ itemClasses.join(' ') } onClick={ this._handleClearAll.bind(this) }>
              clear all
            </div>
            <div className='rs-facet-title'>{ this.props.sectionHeader }</div>
          </div>
          { facets }
        </div>
      </span>
    );
  }

  _getFacetElements() {
    return React.Children.map(this.props.children, (child) => {
      let selectedCriteria;

      selectedCriteria = this.props.selectedCriteria[child.props.id] || {};
      return React.cloneElement(child, {
        onSelectionChanged: this._handleSelectionChanged.bind(this),
        selectedCriteria: selectedCriteria,
        onFacetClear: this._handleFacetClear.bind(this)
      });
    }, this);
  }

  _handleSelectionChanged(isSelected, facetId, criteriaId) {
    if (isSelected) {
      this._handleCriteriaSelection(facetId, criteriaId);
    } else {
      this._handleCriteriaDeselection(facetId, criteriaId);
    }
  }

  _handleCriteriaSelection(facetId, criteriaId) {
    let selectedCriteria;

    selectedCriteria = this.props.selectedCriteria;

    selectedCriteria[facetId] = selectedCriteria[facetId] || {};
    selectedCriteria[facetId][criteriaId] = true;

    this.props.onCriteriaSelection(facetId, criteriaId);
    this.props.onSelectionChanged(selectedCriteria);
  }

  _handleCriteriaDeselection(facetId, criteriaId) {
    let selectedCriteria;

    selectedCriteria = this.props.selectedCriteria;

    if (selectedCriteria[facetId]) {
      delete selectedCriteria[facetId][criteriaId];
      if (!Object.keys(selectedCriteria[facetId]).length) {
        delete selectedCriteria[facetId];
      }
    }

    this.props.onCriteriaDeselection(facetId, criteriaId);
    this.props.onSelectionChanged(selectedCriteria);
  }

  _handleFacetClear(facetId) {
    let selectedCriteria;

    selectedCriteria = this.props.selectedCriteria;
    delete selectedCriteria[facetId];

    this.props.onFacetClear(facetId);
    this.props.onSelectionChanged(selectedCriteria);
  }

  _handleClearAll() {
    this.props.onClearAll();
    this.props.onSelectionChanged({});
  }
}

FacetsSection.defaultProps = {
  selectedCriteria: {},
  onCriteriaSelection: () => {},
  onCriteriaDeselection: () => {},
  onFacetClear: () => {},
  onClearAll: () => {}
};

FacetsSection.propTypes = {
  sectionHeader: React.PropTypes.string.isRequired,
  selectedCriteria: React.PropTypes.object,
  onSelectionChanged: React.PropTypes.func.isRequired,
  onCriteriaSelection: React.PropTypes.func,
  onCriteriaDeselection: React.PropTypes.func,
  onFacetClear: React.PropTypes.func,
  onClearAll: React.PropTypes.func
};

export default FacetsSection;
