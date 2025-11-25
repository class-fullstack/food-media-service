# Folder constants
DOCKER_COMPOSE := docker-compose.yaml

############# BUILD #############
run-build:
	docker-compose -f $(DOCKER_COMPOSE) up -d --build

run-down:
	docker-compose -f $(DOCKER_COMPOSE) down