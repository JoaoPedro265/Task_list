<img style="100%" src="https://capsule-render.vercel.app/api?type=waving&height=120&section=header&fontColor=FFFFFF&theme=cobalt" />

<h1 align="left">✅ Task Manager Full Stack (Django + React)</h1>

<p align="left">
Uma aplicação completa de gerenciamento de tarefas que separa estritamente o <strong>Frontend (React SPA)</strong> do <strong>Backend (Django REST API)</strong>.
O projeto implementa autenticação segura via <strong>JWT</strong>, persistência de dados em <strong>PostgreSQL</strong> e uma interface moderna construída com <strong>Material UI</strong>.
</p>

<h2 align="left">🛠️ Stack Tecnológica</h2>

<table align="left">
<tr>
<td><strong>Frontend</strong></td>
<td>React 19, Vite, Material UI (MUI), Axios, React Router Dom 7</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>Python, Django, Django REST Framework (DRF)</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>PostgreSQL</td>
</tr>
<tr>
<td><strong>Auth</strong></td>
<td>JSON Web Tokens (JWT) com <code>js-cookie</code> e <code>jwt-decode</code></td>
</tr>
</table>


<h2 align="left">🚀 Funcionalidades Avançadas</h2>

<ul>
<li><strong>Autenticação Completa:</strong> Fluxo de Login e Registro com tokens JWT armazenados de forma segura.</li>
<li><strong>CRUD de Tarefas:</strong> Criar, Listar, Atualizar e Deletar tarefas integradas ao banco PostgreSQL.</li>
<li><strong>Filtros e Datas:</strong> Organização de prazos utilizando <code>dayjs</code>.</li>
<li><strong>Interface Responsiva:</strong> Componentização profissional com <strong>Styled Components</strong> e <strong>MUI</strong>.</li>
<li><strong>Consumo de API Assíncrono:</strong> Gerenciamento de requisições e estados globais com Axios.</li>
</ul>

<h2 align="left">📐 Arquitetura do Sistema</h2>

<p align="left">
A aplicação utiliza o modelo de desacoplamento total:
</p>

O Frontend (Vite) envia credenciais para o Django.

O Backend valida e retorna um par de tokens (Access/Refresh).

O Frontend armazena o token e o utiliza no Header de cada requisição para o banco de dados.

![Capturar](https://github.com/user-attachments/assets/fe1622be-2385-4e7c-ba6a-612eb29eaeec)
