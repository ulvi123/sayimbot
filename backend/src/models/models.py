from .database import Base
from datetime import datetime
from sqlalchemy import Column,Integer,String,Boolean,DateTime,ForeignKey # type: ignore
from sqlalchemy.ext.declarative import declarative_base # type: ignore
from sqlalchemy.dialects.postgresql import ARRAY # type: ignore
from sqlalchemy.orm import relationship


Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    # Optional: Add other fields as needed for the user (e.g., username, role, active status, etc.)
    items = relationship("Item", back_populates="owner")

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")