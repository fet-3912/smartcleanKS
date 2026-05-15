FROM node:14.18.1-alpine

RUN mkdir -p /app/dist

COPY dist /app/dist/frontend/smartcleanks

RUN  tar cvf app.tar /app/

WORKDIR /app


# Set proxy for npm
# Upgrade for vulneribility vulnerability CVE-2019-14697
RUN apk upgrade musl
# Timezone package
RUN apk --update add tzdata

RUN npm install -g http-server-spa

#  ingress 的請求路徑 /frontend/smartcleanks/* 就會正確對應到容器內的 /dist/frontend/smartcleanks/index 目錄
CMD http-server-spa dist frontend/smartcleanks/index.html 8092



