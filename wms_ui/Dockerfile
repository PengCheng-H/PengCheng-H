# ========= 【第一阶段：使用node基础镜像打包前端项目】 =========
FROM node:18.16.0-alpine as builder-v1

WORKDIR /app

COPY . .

RUN rm -rf node_modules

RUN npm install --registry https://registry.npm.taobao.org -g pnpm typescript vite

RUN pnpm install --registry https://registry.npm.taobao.org

RUN pnpm run build

# ========= 【第二阶段：使用nginx镜像构建最终的生产镜像】 =========
FROM nginx:1.23.1-alpine as builder-v2

RUN mkdir /app2
COPY --from=builder-v1 /app/* /app2

COPY --from=builder-v1 /app/dist /usr/share/nginx/html

COPY --from=builder-v1 /app/nginx.conf /etc/nginx/nginx.conf

LABEL Version=1.2.0 \
    Maintainer=pengcheng.he@hcrobots.com \
    BuildTime=2023-06-01 \
    Description="WMS_UI"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
