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

## User Interface
<img width="1710" alt="Screenshot 2025-03-24 at 3 03 06 PM" src="https://github.com/user-attachments/assets/db93c561-8024-4827-abeb-1718294aa09e" />

## Technical Architecture Diagram
<img width="1184" alt="architecture" src="https://github.com/user-attachments/assets/116e5035-9f06-4b8c-b5a0-a25f9349c016" />

## Kubernetes Architecture Diagram
<img width="850" alt="Screenshot 2025-03-22 at 2 42 52 PM" src="https://github.com/user-attachments/assets/d19e1e4f-a735-435c-9b26-bd1894535bfb" />

## Frameworks and Databases Utilised

<p align="center"><strong>UI Stack</strong></p>
<p align="center">
<a href="https://vitejs.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite" height="40"/></a>&nbsp;&nbsp;
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="TypeScript" height="40"/></a>&nbsp;&nbsp;
<a href="https://react.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="40"/></a>&nbsp;&nbsp;
<a href="https://tailwindcss.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" height="30"/></a>&nbsp;&nbsp;
<a href="https://ui.shadcn.com/"><img src="https://github.com/user-attachments/assets/dd2eb75e-28c6-46e5-bb11-734e9e9a04f3" alt="ShadCN" height="30"/></a>&nbsp;&nbsp;
<a href="https://supabase.com/auth"><img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="Supabase" height="40"/></a>&nbsp;&nbsp;
<br>
<i>Vite · JavaScript · TypeScript · React · Tailwind CSS · ShadCN · Supabase Auth</i>
</p>
<br>

<p align="center"><strong>Microservices Languages</strong></p>
<p align="center">
<a href="https://go.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" alt="Golang" width="80"/></a>&nbsp;&nbsp;
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="TypeScript" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.python.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1024px-Python-logo-notext.svg.png" alt="Python" height="40"/></a>&nbsp;&nbsp;
<br>
<i>Golang · JavaScript · TypeScript · Python</i>
</p>
<br>

<p align="center"><strong>Microservices Frameworks</strong></p>
<p align="center">
<a href="https://gin-gonic.com/"><img src="https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" alt="Gin" width="40"/></a>&nbsp;&nbsp;
<a href="https://expressjs.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" alt="ExpressJS" width="100"/></a>&nbsp;&nbsp;
<a href="https://hono.dev/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Hono-logo.svg" alt="Hono" width="50"/></a>&nbsp;&nbsp;
<a href="https://fastapi.tiangolo.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/FastAPI_logo.svg" alt="FastAPI" width="120"/></a>&nbsp;&nbsp;
<a href="https://flask.palletsprojects.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg" alt="Flask" width="100"/></a>&nbsp;&nbsp;
<br>
<i>Gin · Express · Hono · FastAPI · Flask</i>
</p>
<br>

<p align="center"><strong>Runtimes</strong></p>
<p align="center">
<a href="https://nodejs.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" width="70"/></a>&nbsp;&nbsp;
<a href="https://deno.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg" alt="Deno" width="50"/></a>&nbsp;&nbsp;
<a href="https://bun.sh/"><img src="https://bun.sh/logo.svg" alt="Bun" width="55"/></a>&nbsp;&nbsp;
<br>
<i>Node.js · Deno · Bun</i>
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
<a href="https://firebase.google.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg" alt="Firebase" height="40"/></a>&nbsp;&nbsp;
<a href="https://cloud.google.com/storage/"><img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud Storage" height="30"/></a>&nbsp;&nbsp;
<a href="https://supabase.com/"><img src="https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg" alt="Supabase" height="55" /></a>&nbsp;&nbsp;
<br>
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
<br>
<i>gRPC · REST API</i>
</p> 
<br>

<p align="center"><strong>DevOps and Site Reliability</strong></p>
<p align="center">
<a href="https://github.com/features/actions"><img src="https://github.com/user-attachments/assets/84046b86-7745-4ddd-8c36-b39b6a9ead91" alt="GitHub Actions" height="60"/></a>&nbsp;&nbsp;
<a href="https://grafana.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Grafana_logo.svg" alt="Grafana" height="60"/></a>&nbsp;&nbsp;
<a href="https://prometheus.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Prometheus_software_logo.svg" alt="Prometheus" height="60"/></a>&nbsp;&nbsp;
<br>
<i>Github Actions · Grafana · Prometheus</i>
</p> 
<br>

<p align="center"><strong>Other Technologies</strong></p>
<p align="center">
<a href="https://stripe.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe Payment API" height="40"/></a>&nbsp;&nbsp;
<a href="https://www.docker.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" alt="Docker" height="30"/></a>&nbsp;&nbsp;
<a href="https://kubernetes.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Kubernetes_logo.svg" alt="Kubernetes" height="40"/></a>&nbsp;&nbsp;
<a href="https://openai.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" alt="OpenAI" height="40"/></a>&nbsp;&nbsp;
<a href="https://socket.io/"><img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Socket-io.svg" alt="Socket.io" height="40"/></a>&nbsp;&nbsp;
</p>
<p align="center">
<i>StripeAPI · Docker Compose · Docker Hub · Kubernetes · OpenAI · Socket.io</i>
</p>
<br> 
