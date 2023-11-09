UID=$$(id -u)
GID=$$(id -g)

# Repository name and commit hash, will be overwritten by GitHub actions during build.
REPO_NAME ?= cheer-your-title
COMMIT ?= local

APP_IMAGE := $(REPO_NAME):$(COMMIT)

# A small id that should be unique for every build. It allows us to create
# containers with unique names easily.
ID := $(REPO_NAME)-$(COMMIT)

# Will be used when we want to run any of the app images.
RUN := docker run --user=${UID}:${GID} --rm -it \
	--volume $(PWD):/usr/src/app

# Command to check if the docker image is already built.
DOCKER_IMAGE_EXISTS := docker inspect $(APP_IMAGE) > /dev/null 2>&1

.PHONY: help
help:
	@echo "Cheer your title Development. Available commands:"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: container
container: ## builds the container image for performing the commands
	@ docker build -t $(APP_IMAGE) \
	-f Dockerfile .

.PHONY: build
build: ## builds an container image for performing the commands
	@ $(DOCKER_IMAGE_EXISTS) || make container
	@ $(RUN) --name=$(ID)-shell $(APP_IMAGE) npm run build

.PHONY: shell
shell: ## shell is for convenience while debugging inside the container.
	@ $(DOCKER_IMAGE_EXISTS) || make container
	@ $(RUN) --name=$(ID)-shell $(APP_IMAGE) sh

.PHONY: test
test: ## run the tests inside the container
	@ $(DOCKER_IMAGE_EXISTS) || make container
	@ $(RUN) --name=$(ID)-shell $(APP_IMAGE) npm test