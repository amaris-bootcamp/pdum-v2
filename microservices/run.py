import uvicorn
from flights import main as flights
from booking import main as booking

uvicorn.run("flights/main:app", reload=True, port=8000)
# uvicorn.run("booking/main:app", reload=True, port=8001)
