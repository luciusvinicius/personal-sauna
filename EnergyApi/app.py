from flask import Flask
import pandas as pd
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

df = pd.read_excel("PrecoMerc.xlsx")

@app.route("/bydate/<date>")
def date(date):
    rows = df.loc[(df['Data'] == date) & (df["Sessão"] == 0), "Preço - PT [€/MWh]"]
    return rows.tolist()
