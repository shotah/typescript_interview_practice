.SILENT: # Disable echo of commands
.DEFAULT_GOAL := list
# Makefile for the performance_and_accessibility_api project
ifneq ("$(wildcard .env)","")
    include .env
endif

SHELL:=/bin/bash
export


# Insert a comment starting with '##' after a target, and it will be printed by 'make' and 'make list'
.PHONY: list
list: ## list Makefile targets
	@echo "The most used targets: \n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'


# ###########################
# Install, Test and Lint (CI)
# ###########################
.PHONY : install
install :
	npm install

.PHONY: lint
lint:
	npm run lint

.PHONY: fix
lint-fix:
	npm run fix

# ###########################
# Other Commands (Misc)
# ###########################
.PHONY: upgrade-all
upgrade-all:
	npm i -g npm-check-updates
	npx ncu -u
	npm update