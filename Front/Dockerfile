# STEP 1 BUILD OF REACT PROJECT
FROM node:18.15.0 AS dist
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# STEP 2 CREATE NGINEX SERVER
FROM nginx:latest AS prod-stage
COPY --from=dist /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]