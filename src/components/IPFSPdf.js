import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import PropTypes from 'prop-types';

import '../css/IPFSPdf.css';
class IPFSPdf extends Component {
  constructor (props) {
    super(props);
    // hide extra documents of the same category
    this.state = {
      numPages: null,
      pageNumber: this.props.pageNumber,
      showImage: true
    }
    this.toggleDocument = this.toggleDocument.bind(this)
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  handlePrevious = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  toggleDocument() {
    this.setState({
      showImage: !this.state.showImage
    })
  }

  handleNext = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  renderPagination = (pageNumber, numPages) => {
    let previousButton = <div className="pdf-pagination-left" onClick={this.handlePrevious}><a href="#/"><i className="fa fa-arrow-left"></i> Previous</a></div>;
    if (pageNumber === 1) {
      previousButton = <div className="pdf-pagination-left disabled"><a href="#/"><i className="fa fa-arrow-left"></i> Previous</a></div>;
    }
    let nextButton = <div className="pdf-pagination-right" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></div>;
    if (pageNumber === numPages) {
      nextButton = <div className="pdf-pagination-right disabled"><a href="#/">Next <i className="fa fa-arrow-right"></i></a></div>;
    }
    return (
      <div className='pdf-pagination'>
          {previousButton}
          <div className='pdf-pagination-content'>
            <span>
              Page <b>{pageNumber}</b> of {numPages}
              </span>
            <button
              className='doc-toogle-button'
              onClick={this.toggleDocument}>
              Hide Doc
            </button>
          </div>
          {nextButton}
        <br /> 
        <br />
      </div>
      );
  }

  render () {
    console.log(this.props)
    const { pageNumber, numPages, showImage } = this.state;
    let pagination = null;
    if (numPages) {
      pagination = this.renderPagination(pageNumber, numPages);
    }

    if (showImage) {
      return (
        <div>
          <Document
            file={this.props.fileURL}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page
              pageNumber={pageNumber}
              scale={this.props.scale}
            />
          </Document>
          {pagination}
        </div>
      )
    } else {
      return (
        <button
          className='doc-toogle-button'
          onClick={this.toggleDocument}>Show Doc
        </button>
      )
    }
  }
}

// specified props
IPFSPdf.propTypes = {
  fileURL: PropTypes.string,
  error: PropTypes.string,
  pageNumber: PropTypes.number,
  scale: PropTypes.number,
  documentIndex: PropTypes.number
}

// Specifies the default values for props:
// since we didn't have any good non cors pdf files, I used one of my own.
IPFSPdf.defaultProps = {
  fileURL: 'https://friendlyuser.github.io/files/testing.pdf', // delete this prop later, or make fileURL required and this blank
  error: 'Failed to Display Preview of Document',
  pageNumber: 1,
  scale: 0.5,
  documentIndex: 1
}

export default IPFSPdf
