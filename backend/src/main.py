from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.router.auth import auth_router


app = FastAPI()

# Set up CORS
origins = ["http://localhost:3000"]  # Update this with your frontend URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the authentication router
app.include_router(auth_router)