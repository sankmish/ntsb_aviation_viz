import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.sql import func

from datetime import datetime

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/aviation_accidents.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Accidents = Base.classes.accident_coords

#################################################
# Create Routes
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/coords")
def coords():

    sel = [
        Accidents.EventDate,
        Accidents.start_lats,
        Accidents.start_lons,
        Accidents.Latitude,
        Accidents.Longitude,
        Accidents.BroadPhaseOfFlight
    ]

    results = db.session.query(*sel).filter(Accidents.EventDate.contains('2014')).all()

    coordinates = []
    for result in results:
        coord = {}
        coord["date"] = result[0]
        coord["lat1"] = float(result[1])
        coord["lon1"] = float(result[2])
        coord["lat2"] = float(result[3])
        coord["lon2"] = float(result[4])
        coord["phase"] = result[5]
        coordinates.append(coord)

    return jsonify(coordinates)

# try visiting "/metadata/2014/maneuvering/airplane/fatal"
@app.route("/metadata/<year>/<broadPhase>/<atype>/<severity>")
def metadata(year,broadPhase,atype,severity):

    stmt = db.session.query(Accidents).statement
    df = pd.read_sql_query(stmt, db.session.bind)

    phase_bool = (df['BroadPhaseOfFlight'].str.lower() == broadPhase)
    atype_bool = (df['AircraftCategory'].str.lower() == atype)
    sever_bool = (df['InjurySeverity'].str.lower().str.startswith(severity))

    if broadPhase.lower() == 'all':
        phase_bool = (1 == 1)

    if atype.lower() == 'all':
        atype_bool = (1 == 1)

    if severity.lower() == 'all':
        sever_bool = (1 == 1)

    df2 = df[(df['EventDate'].str.contains(year)) & \
            phase_bool & \
            atype_bool & \
            sever_bool]

    data = {
        "weather": df2.WeatherCondition.values.tolist(),
        "fatal": df2.TotalFatalInjuries.values.tolist(),
        "serious": df2.TotalSeriousInjuries.values.tolist(),
        "minor": df2.TotalMinorInjuries.values.tolist(),
        "uninjured": df2.TotalUninjured.values.tolist(),
        "damage": df2.AircraftDamage.values.tolist(),
        "amateur": df2.AmateurBuilt.values.tolist(),
        "purpose": df2.PurposeOfFlight.values.tolist(),
    }

    return jsonify(data)

if __name__ == "__main__":
    app.run()