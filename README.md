# ✨ Papelaria BW - Flashshop

Uma plataforma E-commerce completa desenvolvida para a **Papelaria BW**, focada na venda de itens personalizados, papelaria criativa e artesanais feitos à mão. O projeto conta com um sistema de catálogo dinâmico alimentado por um banco de dados na nuvem.

---

## 🚀 Funcionalidades

* **Vitrine Interativa**: Listagem de produtos em tempo real consumindo API própria.
* **Upload de Imagens**: Gerenciamento de fotos de produtos via Multer.
* **Carrinho de Compras**: Sistema integrado com Context API do React e notificações via `react-hot-toast`.
* **Backend Escalável**: API REST estruturada com Node.js e Express.
* **Banco de Dados na Nuvem**: Persistência de dados utilizando MongoDB Atlas.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
* **React.js** + **Vite** (Interface rápida e moderna)
* **Tailwind CSS** (Estilização responsiva e elegante)
* **Heroicons** (Ícones minimalistas)
* **Axios** (Consumo de API)

### Backend
* **Node.js** & **Express** (Servidor e Rotas)
* **MongoDB Atlas** (Banco de dados NoSQL)
* **Mongoose** (Modelagem de dados)
* **Multer** (Upload de arquivos)
* **CORS** (Segurança e acesso entre portas)

---

## 📦 Como rodar o projeto

### 1. Pré-requisitos
* Node.js instalado
* Conta no MongoDB Atlas (String de conexão)

### 2. Clonar o Repositório
```bash
git clone [https://github.com/SeuUsuario/landingpagePaper.git](https://github.com/SeuUsuario/landingpagePaper.git)
cd landingpagePaper
```

Configurar o Backend
Bash

cd backend
npm install
Crie um arquivo .env na pasta /backend e adicione:

Snippet de código

MONGO_URI=sua_string_de_conexao_do_atlas
PORT=5000
Bash

npm start
4. Configurar o Frontend
Bash

cd ../frontend
npm install
npm run dev
🎨 Layout
O design foi pensado para transmitir a delicadeza do trabalho manual, utilizando uma paleta de cores baseada em tons de rosa (#DB2777) e branco neve, garantindo uma experiência de usuário (UX) suave e acolhedora.

📝 Autor
Desenvolvido com ❤️ por [Seu Nome/Javax092].


---

### Como adicionar ao seu projeto:
1.  Na pasta raiz (`Flashshop`), crie um arquivo chamado `README.md`.
2.  Cole o conteúdo acima dentro dele.
3.  Salve e envie para o GitHub:
    ```bash
    git add README.md
    git commit -m "docs: adicionando README profissional"
    git push origin main
    ```
