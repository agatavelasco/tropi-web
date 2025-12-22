# 🌱 Tropi Web

Aplicação **front-end** do projeto **Tropi**, desenvolvida com **Next.js**, focada em uma experiência **mobile-first** para gerenciamento de **clientes** e **atendimentos**.

O projeto consome a **Tropi API** e foi estruturado para ser simples de executar localmente, além de estar preparado para uso com **Docker**.

---

## 📌 Descrição do Projeto

O **Tropi Web** é a interface do sistema Tropi, responsável por:

* Exibir e gerenciar clientes
* Registrar e visualizar atendimentos
* Navegação mobile com Bottom Navigation
* Integração com API REST

---

## 🛠️ Tecnologias Utilizadas

* **Node.js 20+**
* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Docker**
* **Docker Compose**
* **Lucide Icons**
* **Class Variance Authority (CVA)**

---


## 🚀 Instruções de Instalação

### 🔹 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

* **Node.js >= 20.9**
* **npm**
* **Docker** (opcional, mas recomendado)

---

## ▶️ Executando o projeto localmente (sem Docker)

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/tropi-web.git
cd tropi-web
```

---

### 2️⃣ Instalar as dependências

```bash
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> A URL deve apontar para a **Tropi API** em execução.

---

### 4️⃣ Executar o projeto

```bash
npm run dev
```

A aplicação ficará disponível em:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Executando com Docker

### 🔹 Build da imagem

```bash
docker build -t tropi-web .
```

---

### 🔹 Executar o container

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:8000 \
  tropi-web
```

Acesse:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Docker Compose (Front + API)

Para subir **front-end e back-end juntos**, utilize um `docker-compose.yml` no diretório raiz do projeto:

```yaml
services:
  api:
    build: ./tropi-api
    container_name: tropi_api
    ports:
      - "8000:8000"

  web:
    build: ./tropi-web
    container_name: tropi_web
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://api:8000
    depends_on:
      - api
```

Executar:

```bash
docker compose up --build
```

---


## 🔗 Integração com a API

A aplicação consome a **Tropi API** através da variável:

```ts
NEXT_PUBLIC_API_URL
```

Exemplo de chamada:

```ts
fetch(`${process.env.NEXT_PUBLIC_API_URL}/clientes`)
```
