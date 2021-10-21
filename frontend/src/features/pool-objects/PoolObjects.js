import React, {useState} from 'react';
import {connect} from 'react-redux'
import {
  getAllPoolObjects,
  addPoolObject,
  freePoolObject,
  getPoolObject,
} from './poolObjectsAction';


class PoolObjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPoolObjectNumber: '',
      makeFreePoolObjectNumber: '',
      getPoolObjectNumber: '',
    };
  }

  componentDidMount() {
    this.props.getAllPoolObjects()
  }

  handleOnChangeNewPoolObject = (event) =>{
      const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({newPoolObjectNumber: event.target.value});
      }
  }

  handleOnClickAddNewPoolObject = () => {
    this.props.addPoolObject(this.state.newPoolObjectNumber)
    this.setState({newPoolObjectNumber: ''})
  }

  handleOnChangeFreePoolObject = (event) =>{
      const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({makeFreePoolObjectNumber: event.target.value});
      }
  }

  handleOnClickFreePoolObject = () => {
    this.props.freePoolObject(this.state.makeFreePoolObjectNumber)
    this.setState({makeFreePoolObjectNumber: ''})
  }

  handleOnChangeGetPoolObject = (event) =>{
      const re = /^[0-9\b]+$/;
      if (event.target.value === '' || re.test(event.target.value)) {
         this.setState({getPoolObjectNumber: event.target.value});
      }
  }

  handleOnClickGetPoolObject = () => {
    this.props.getPoolObject(this.state.getPoolObjectNumber)
    this.setState({getPoolObjectNumber: ''})
  }

  renderAddNewPoolObject() {
    return (
      <div style={{'padding': '20px 0'}}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Type number for new Poll Object</label>
          <input type="text" className="form-control" id="number"
                 value={this.state.newPoolObjectNumber}
                 onChange={this.handleOnChangeNewPoolObject}/>
        </div>
        <button className="btn btn-primary" onClick={this.handleOnClickAddNewPoolObject}>Add</button>

      </div>
    )
  }

  renderFreePoolObject() {
    return (
      <div style={{'padding': '20px 0'}}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Type number for Poll Object which you want to make FREE</label>
          <input type="text" className="form-control" id="number"
                 value={this.state.makeFreePoolObjectNumber}
                 onChange={this.handleOnChangeFreePoolObject}/>
        </div>
        <button className="btn btn-primary" onClick={this.handleOnClickFreePoolObject}>Free</button>
      </div>
    )
  }

  renderGetPoolObject() {
    return (
      <div style={{'padding': '20px 0'}}>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Type number for Poll Object which you want to GET</label>
          <input type="text" className="form-control" id="number"
                 value={this.state.getPoolObjectNumber}
                 onChange={this.handleOnChangeGetPoolObject}/>
        </div>
        <button className="btn btn-primary" onClick={this.handleOnClickGetPoolObject}>Get (make busy)</button>
      </div>
    )
  }

  renderAllPoolItems() {
    return (
      <>
        <h3>All items from pool:</h3>
        <table className="table">
          <thead>
          <tr>
            <th scope="col" key={'number'}>Number</th>
            <th scope="col" key={'is_free'}>Is Free</th>
          </tr>
          </thead>
          <tbody>
            {this.props.poolObjects.map((pollObject, x) => (
              <tr key={x}>
                <td>{pollObject.number}</td>
                <td>
                  {pollObject.is_free ? <span className="badge bg-success">Free</span> : <span className="badge bg-danger">Busy</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  render() {
    return (
      <>
        {this.renderAddNewPoolObject()}
        {this.renderFreePoolObject()}
        {this.renderGetPoolObject()}
        {this.renderAllPoolItems()}
      </>
    )

  }
}

const mapStateToProps = state => {
  return {
    poolObjects: state.pool.data,
  }
}

const mapDispatchToProps = {
  getAllPoolObjects,
  addPoolObject,
  freePoolObject,
  getPoolObject,
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolObjects)