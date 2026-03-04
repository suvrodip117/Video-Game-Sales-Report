from dotenv import load_dotenv
import os
from sqlalchemy import create_engine
import pandas as pd

load_dotenv()
URL=os.getenv("DB_URL")

engine = create_engine(URL, pool_pre_ping=True, pool_recycle=1800)

def loadDatabase():
    try:
        with engine.connect() as connection:
            df= pd.read_sql("select * from tbl_games",connection)
        return df
    except Exception as e:
        print("Error occured while fetching records from database->", e)
        raise