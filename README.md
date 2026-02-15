# 🌱 Tropi Web

Aplicação **front-end** do projeto **Tropi**, desenvolvida com **Next.js**, focada em uma experiência **mobile-first** para gerenciamento de **clientes** e **atendimentos**.

O projeto consome a **Tropi API** e utiliza **Supabase** para autenticação.

---

## 📌 Descrição do Projeto

O **Tropi Web** é a interface do sistema Tropi, responsável por:

* Exibir e gerenciar clientes
* Registrar e visualizar atendimentos
* Navegação mobile com Bottom Navigation
* Autenticação via **Supabase Auth**
* Integração com API REST (JWT automático)

---

## 🛠️ Tecnologias Utilizadas

* **Node.js 20+**
* **Next.js (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Supabase** (Auth)
* **Sentry** (monitoramento)
* **Docker**
* **Lucide Icons**
* **Class Variance Authority (CVA)**

---

## 🚀 Instruções de Instalação

### 🔹 Pré-requisitos

* **Node.js >= 20.9**
* **npm**
* **Docker** (opcional)

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/agatavelasco/tropi-web.git
cd tropi-web
```

---

### 2️⃣ Instalar as dependências

```bash
npm install
```

---

### 3️⃣ Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha o `.env.local` com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Chave pública anon
- `NEXT_PUBLIC_API_URL` — URL da Tropi API (padrão: `http://127.0.0.1:8000`)

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
  -e NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key \
  tropi-web
```

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

Todas as chamadas à API enviam automaticamente o **token JWT** do Supabase Auth via header `Authorization: Bearer <token>`.

O cliente HTTP está em `src/lib/api.ts` e o cliente Supabase em `src/lib/supabase.ts`.

---

## 📌 Estrutura do Projeto

```text
tropi-web/
├── .env.example
├── .github/workflows/ci.yml
├── src/
│   ├── app/
│   └── lib/
│       ├── api.ts
│       └── supabase.ts
├── package.json
├── dockerfile
└── README.md
```
