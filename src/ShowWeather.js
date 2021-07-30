import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Cities from './Cities';

class ShowWeather extends React.Component{
	constructor(props) {
		super(props);
		this.state = {weather:'',cityNum:'601020101'};
		this.cities = Cities.cities;

		this.handleChange = this.handleChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}
  
	handleChange(event) {
		this.setState({
			cityNum: event.target.value
		});
	}
	
	handleSearch(event) {
		let it = this;
		let url = "http://localhost:8081/weather/getInfo?cityId=";
		url += this.state.cityNum;
	    fetch(url, {
			mode: 'cors',
			headers: {'Content-Type':'application/json'},
	        method: 'GET'
	    }).then(
	        function (res) {
	        console.log(res);
	        res.json().then(function (data) {
	            console.log(data);
				if(data != null){
					it.setState({
						weather: data
					});
				}
	        })
	    });
	}
	
	render() {
		return (
			<div class="container" style={{marginTop: 20 + 'px'}}>
				<div class="form-group row">
					<div class="col-auto">
						<div class="input-group">
							<div class="input-group-prepend">
								<div class="input-group-text"></div>
							</div>
							<div class="row" style={{marginLeft: -1 + 'px'}}>
								<div class="col-md-5">
									<select style={{width: 70 + 'px', height: 35 + 'px'}} onChange={this.handleChange}>
										{this.cities.map((item, i) => <option value={item.value}>{item.city}</option>)}
									</select>
								</div>
								<div class="col-md-2">
									<button className="btn btn-primary" onClick={this.handleSearch}>查询</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Weather weather={this.state.weather}/>
			</div>
		);
	}
}

class Weather extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<table class="table table-bordered" style={{width: 30 + '%'}}>
				<tbody>
					<tr>
						<th scope="row" width="10%">City</th>
						<td>{this.props.weather.city}</td>
					</tr>
					<tr>
						<th scope="row">Update time</th>
						<td>{this.props.weather.date}</td>
					</tr>
					<tr>
						<th scope="row">Weather</th>
						<td>{this.props.weather.wtNm}</td>
					</tr>
					<tr>
						<th scope="row">Temperature</th>
						<td>{this.props.weather.wtTemp}</td>
					</tr>
					<tr>
						<th scope="row">Wind</th>
						<td>{this.props.weather.wtWindId}</td>
					</tr>
				</tbody>
			</table>
		);
	}
}

export default ShowWeather;