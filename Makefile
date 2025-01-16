DOCKER_COMPOSE_FILE = "./docker/docker-compose.yml"

docker-up: docker-build
	docker compose --file ${DOCKER_COMPOSE_FILE} up --build --force-recreate

docker-build:
	docker compose --file ${DOCKER_COMPOSE_FILE} build

web:
	python3 -m http.server 8000 -d ./app/dist