FROM node:16

RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get clean

WORKDIR /app

COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org

RUN npm cache clean -f

RUN npm ci

COPY . .

RUN npm run test

EXPOSE 3123

CMD ["npm", "run", "start"]