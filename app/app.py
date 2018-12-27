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
    """Return the MetaData for a given sample."""
    sel = [
        Accidents.EventDate,
        Accidents.start_lats,
        Accidents.start_lons,
        Accidents.Latitude,
        Accidents.Longitude
    ]

    # results = db.session.query(*sel).limit(25).all()
    results = db.session.query(*sel).filter(Accidents.EventDate.contains('2014')).all()

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

    # print(coordinates)
    return jsonify(coordinates)

# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]].\
#                     sort_values(by=sample, ascending=False)
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist()
#     }
#     return jsonify(data)

if __name__ == "__main__":
    app.run()