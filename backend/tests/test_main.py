from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_health_check():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_home_endpoint():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["status"] == "running"


def test_get_all_beds():
    response = client.get("/beds")

    assert response.status_code == 200

    data = response.json()

    assert data["total_beds"] == 5
    assert len(data["beds"]) == 5


def test_get_available_beds():
    response = client.get("/beds/available")

    assert response.status_code == 200

    data = response.json()

    assert data["available_count"] == 3
    assert len(data["beds"]) == 3