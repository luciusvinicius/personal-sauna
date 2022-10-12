from flask import Flask
import pandas as pd


app = Flask(__name__)

df = pd.read_excel("PrecoMerc.xlsx")

@app.route("/bydate/<date>")
def date(date):
    rows = df.loc[(df['Data'] == date) & (df["Sessão"] == 0), "Preço - PT [€/MWh]"]
    return rows.tolist()
