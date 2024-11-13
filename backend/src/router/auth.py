from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from src.database.database import get_db
from models.models import User
from schemas.schemas import UserRegistration, UserLogin
from passlib.hash import bcrypt


auth_router=APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@auth_router.post("/register",status_code=status.HTTP_201_CREATED)
async def registerUser(user_data:UserRegistration,db:Session=Depends(get_db)):
    #checking if the user exists in the database
    existing_user = await db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The user with this email already exists"
        )
    
    hashed_password= bcrypt.hash(user_data.password)

    new_user= User(
        email=user_data.email,
        hashed_password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
    

@auth_router.post("/login",status_code=status.HTTP_200_OK)
async def loginUser(user_data:UserLogin,db:Session=Depends(get_db)):
    user = await db.query(User).filter(User.email == user_data.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not bcrypt.verify(user_data.password,user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    return user


  
