FROM node:18.16-alpine as builder

LABEL Version=1.0.2 \
    Maintainer=pengcheng.peng@hcrobots.com \
    BuildTime=2023-04-26 \
    Description="WMS UI"

ARG WORKSPACE=/opt/wms_ui

COPY ./wms_ui ${WORKSPACE}/

WORKDIR ${WORKSPACE}
RUN yarn --registry https://registry.npm.taobao.org install
# RUN npm --registry https://registry.npm.taobao.org install

CMD ["yarn", "start"]