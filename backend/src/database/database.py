
import psycopg2
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database connection string
SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost/industry_app"

# Create the engine and session
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base for defining models
Base = declarative_base()