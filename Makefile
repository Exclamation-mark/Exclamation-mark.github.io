.DEFAULT_GOAL := help
SHELL := /bin/bash
UNAME_S := $(shell uname -s)

build:
	pnpm run build

doc:
	pnpm run dev
