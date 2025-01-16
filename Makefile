DOCKER_COMPOSE_FILE = "./docker/docker-compose.yml"

docker-up: docker-build
	docker compose  --force-recreate --build --file ${DOCKER_COMPOSE_FILE} up 

docker-build:
	docker compose --file ${DOCKER_COMPOSE_FILE} build
