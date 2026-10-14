from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="HospitalFlow AI",
    description="Hospital workflow management API",
    version="1.0.0",
)

# Allow the React frontend to communicate with the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Sample hospital bed data for learning.
beds = [
    {"id": 1, "department": "Emergency", "available": True},
    {"id": 2, "department": "Emergency", "available": False},
    {"id": 3, "department": "General", "available": True},
    {"id": 4, "department": "General", "available": True},
    {"id": 5, "department": "ICU", "available": False},
]


@app.get("/")
def home():
    return {
        "message": "Welcome to HospitalFlow AI",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.get("/beds")
def get_beds():
    return {
        "total_beds": len(beds),
        "beds": beds,
    }


@app.get("/beds/available")
def get_available_beds():
    available_beds = [
        bed for bed in beds if bed["available"]
    ]

    return {
        "available_count": len(available_beds),
        "beds": available_beds,
    }