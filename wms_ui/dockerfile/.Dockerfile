FROM node:18.16-alpine as builder

LABEL Version=1.2.0 \
    Maintainer=pengcheng.he@hcrobots.com \
    BuildTime=2023-05-30 \
    Description="WMS_UI"

ARG WORKSPACE=/opt/wms_ui


WORKDIR ${WORKSPACE}

RUN pnpm --registry https://registry.npm.taobao.org install

CMD ["pnpm", "start"]
