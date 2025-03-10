
# ESD_Team8

## Prerequisite
IDE (Any) <br>
Node Package Manager (npm) <br>
Github Desktop (If you prefer else CLI) <br>
Docker <br>

## Instructions

Switch to your branch before starting to code <br>

1. Open a terminal and run the following command <b>(Leave this out first)</b>:
```bash
  cd backend
  docker-compose up -d --build
  docker-compose down
```
2. Open another terminal and run the following command:
```bash
  cd frontend
  npm i
  npm run dev
```

## Technical Architecture Diagram
<img width="1059" alt="Screenshot 2025-03-07 at 12 30 03 AM" src="https://github.com/user-attachments/assets/c180b970-8cb3-4753-bc5d-1ca13eee99c6" />

## Frameworks and Databases Utilised

<p align="center"><strong>UI Stack</strong></p>
<p align="center">
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="Typescript" height="40"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40"/></a>&nbsp;&nbsp;
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" height="30"/></a>&nbsp;&nbsp;
<a href="https://www.postgresql.org/"><img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="Supabase" height="40"/></a>&nbsp;&nbsp;
<br>
<i>Vite · Javascript · Typescript · React · Tailwind CSS · Supabase Auth</i>
</p>
<br>

<p align="center"><strong>Microservices Languages</strong></p>
<p align="center">
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" alt="Golang" width="80"/></a>&nbsp;&nbsp;
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="Javascript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="Typescript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png" alt="Python" height="40"/></a>&nbsp;&nbsp;
<br>
<i>Golang · Javascript · Typescript · Python</i>
</p>
<br>

<p align="center"><strong>Microservices Frameworks</strong></p>
<p align="center">
<a href="https://go.dev/"><img src="https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" alt="Golang" width="40"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Golang" width="70"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="Golang" width="100"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg" alt="Golang" width="50"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Hono-logo.svg" alt="Golang" width="50"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/FastAPI_logo.svg" alt="Golang" width="120"/></a>&nbsp;&nbsp;
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" alt="Golang" width="100"/></a>&nbsp;&nbsp;
<br>
<i>Gin · Node.js · Express · Deno · Hono · FastAPI · Flask</i>
</p>
<br>

<p align="center"><strong>API Gateway</strong></p>
<p align="center">
<a href="https://konghq.com/"><img src="https://konghq.com/wp-content/uploads/2018/08/kong-combination-mark-color-256px.png" alt="Kong API Gateway" width="88"/></a>
<br>
<i>CORS · Rate Limit Plugin · Custom Authentication Plugin · Prometheus</i>
</p>
<br>  

<p align="center"><strong>Storage Solutions</strong></p>  
<p align="center">
<!-- <a href="https://www.postgresql.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" alt="PostgreSQL" height="50"/></a>&nbsp;&nbsp;
<a href="https://redis.com/"><img src="https://redis.com/wp-content/themes/wpx/assets/images/logo-redis.svg?auto=webp&quality=85,75&width=120" alt="Redis" width="88"/></a>&nbsp;&nbsp;
<a href="https://aws.amazon.com/s3/"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/AmazonWebservices_Logo.svg" alt="S3" height="40"/></a>&nbsp;&nbsp; -->
<a href="https://www.postgresql.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" alt="Firebase" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.postgresql.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Firebase" height="30"/></a>&nbsp;&nbsp;
<a href="https://www.postgresql.org/"><img src="https://www.vectorlogo.zone/logos/supabase/supabase-ar21~bgwhite.svg" alt="Supabase" height="65"/></a>&nbsp;&nbsp;
<br>
<!-- <i>postgreSQL · Redis · S3</i> -->
<i>Firebase · Google Cloud Storage · Supabase</i>
</p>
<br> 

<p align="center"><strong>Message Brokers</strong></p>
<p align="center">
<a href="https://www.rabbitmq.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/RabbitMQ_logo.svg/2560px-RabbitMQ_logo.svg.png" alt="RabbitMQ" width="100"/></a>
<br>
<i>rabbitMQ</i>
</p>
<br> 

<p align="center"><strong>Inter-service Communications</strong></p>
<p align="center">
<a href="https://grpc.io/"><img src="https://grpc.io/img/logos/grpc-icon-color.png" alt="gRPC" height="60"/></a>&nbsp;&nbsp;
<a href="https://restfulapi.net/"><img src="https://keenethics.com/wp-content/uploads/2022/01/rest-api-1.svg" alt="REST API" height="40"/></a>
</p> 
<br>

<p align="center"><strong>DevOps and Site Reliability</strong></p>
<p align="center">
<a href="https://grpc.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Grafana_logo.svg" alt="Grafana" height="60"/></a>&nbsp;&nbsp;
<a href="https://grpc.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg" alt="Prometheus" height="60"/></a>&nbsp;&nbsp;
</p> 
<br>

<p align="center"><strong>Other Technologies</strong></p>
<p align="center">
<a href="https://stripe.com/en-gb-sg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe Payment API" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.docker.com/"><img src="https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png" alt="Docker" height="30"/></a>&nbsp;&nbsp;
<a href="https://kubernetes.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Kubernetes_logo.svg" alt="Kubernetes" height="40"/></a>&nbsp;&nbsp;
<a href="https://kubernetes.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="Kubernetes" height="40"/></a>&nbsp;&nbsp;
<a href="https://kubernetes.io/"><img src="http://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg" alt="Socketio" height="40"/></a>&nbsp;&nbsp;
</p>
<p align="center">
<i>Docker Compose · Docker Hub · Kubernetes · OpenAI · Socket.io</i>
</p>
<br>  
