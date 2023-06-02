#!/bin/bash

 docker build -f Dockerfile -t wms_ui:v1.2.0 .
#  docker build --no-cache -f Dockerfile -t wms_ui:v1.2.0 .
#  docker build --progress=plain --no-cache -f Dockerfile -t wms_ui:v1.2.0 .