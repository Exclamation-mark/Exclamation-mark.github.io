.DEFAULT_GOAL := help
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

build:
	pnpm run build

docs:
	pnpm run dev
