# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from datetime import date
from datetime import time
from datetime import datetime

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///aviation_accidents.sqlite"
db = SQLAlchemy(app)

engine = create_engine("sqlite:///aviation_accidents.sqlite")
session = Session(engine)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

Accidents = Base.classes.accident_coords

@app.route("/")
def home():
    return (render_template("index.html"))

@app.route("/json")
def json():
    """Return a list of accidents"""
    jAccidents = session.query(Accidents).all()

    # Create a dictionary from the row data and append to a list of all accidents
    accidents = []
    for accident in jAccidents:
        accident_dict = {}
        accident_dict["date"] = accident.EventDate
        accident_dict["apc"] = accident.AirportCode
        accident_dict["apn"] = accident.AirportName
        accident_dict["loc"] = accident.Location
        accident_dict["con"] = accident.Country
        accident_dict["bpf"] = accident.BroadPhaseOfFlight
        accident_dict["inj"] = accident.InjurySeverity
        accident_dict["cat"] = accident.AircraftCategory
        accident_dict["wec"] = accident.WeatherCondition
        accident_dict["slat"] = accident.start_lats
        accident_dict["slon"] = accident.start_lons
        accident_dict["flat"] = accident.Latitude
        accident_dict["flon"] = accident.Longitude
        accidents.append(accident_dict)

    return jsonify(accidents)

@app.route("/user_filter/<selYear>/<selBPF>/<selACC>/<selIS>")
def user_filter(selYear, selBPF, selACC, selIS):
    """Return a list of accidents filtered by variables"""
    queries = []

    if selYear != "":
        queries.append(Accidents.EventDate.contains(selYear))
    if selBPF != "All":
        queries.append(Accidents.BroadPhaseOfFlight == selBPF)
    if selACC != "All":
        queries.append(Accidents.AircraftCategory == selACC)
    if selIS != "All":
        queries.append(Accidents.InjurySeverity.contains(selIS))

    jAccidents = session.query(Accidents).filter(*queries).all()

    # Create a dictionary from the row data and append to a list of all accidents
    accidents = []
    for accident in jAccidents:
        accident_dict = {}
        accident_dict["date"] = accident.EventDate
        accident_dict["apc"] = accident.AirportCode
        accident_dict["apn"] = accident.AirportName
        accident_dict["loc"] = accident.Location
        accident_dict["con"] = accident.Country
        accident_dict["bpf"] = accident.BroadPhaseOfFlight
        accident_dict["inj"] = accident.InjurySeverity
        accident_dict["cat"] = accident.AircraftCategory
        accident_dict["wec"] = accident.WeatherCondition
        accident_dict["slat"] = accident.start_lats
        accident_dict["slon"] = accident.start_lons
        accident_dict["flat"] = accident.Latitude
        accident_dict["flon"] = accident.Longitude
        accidents.append(accident_dict)

    return jsonify(accidents)

@app.route("/coords")
def coords():
    """Return the MetaData for a given sample."""
    sel = [
        Accidents.EventDate,
        Accidents.start_lats,
        Accidents.start_lons,
        Accidents.Latitude,
        Accidents.Longitude
    ]

    results = session.query(*sel).filter(Accidents.EventDate.contains('2014')).all()

    # Create a dictionary entry for each row of metadata information
    coordinates = []
    for result in results:
        coord = {}
        coord["date"] = result[0]
        coord["lat1"] = float(result[1])
        coord["lon1"] = float(result[2])
        coord["lat2"] = float(result[3])
        coord["lon2"] = float(result[4])
        coordinates.append(coord)

    return jsonify(coordinates)

@app.route('/help', methods = ['GET'])
def help():
    """Print available functions."""
    func_list = {}
    for rule in app.url_map.iter_rules():
        if rule.endpoint != 'static':
            func_list[rule.rule] = app.view_functions[rule.endpoint].__doc__
    return jsonify(func_list)



if __name__ == "__main__":
    app.run()
