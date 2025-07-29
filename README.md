# 🍱 MarmitaFacil

Uma plataforma para conectar cozinheiros(as) locais e consumidores, facilitando a gestão de marmitas caseiras com um sistema intuitivo e eficiente.

---

## 🚀 Funcionalidades principais

- Criação e edição de restaurantes e marmitas
- Conexão local entre cozinheiro(a) e cliente
- Simplicidade na administração de pedidos
- Plataforma responsiva, pronta para web e mobile

---

## 🛠 Tecnologias utilizadas

- **Frontend**: React com Material‑UI  
- **Backend**: Django + Django REST Framework + SimpleJWT  
- **Banco de dados**: PostgreSQL ou SQLite (teste)

---

## ⚙️ Como rodar localmente

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate       # ou `venv\Scripts\activate` no Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm start
