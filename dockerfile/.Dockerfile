FROM node:16.18-alpine as builder

LABEL Version=1.0.1 \
    Maintainer=pengcheng.peng@hcrobots.com \
    BuildTime=2023-03-02 \
    Description="WMS UI"

ARG WORKSPACE=/opt/wms_ui

COPY ./wms_ui ${WORKSPACE}/

WORKDIR ${WORKSPACE}
RUN npm --registry https://registry.npm.taobao.org install

CMD ["npm", "start"]