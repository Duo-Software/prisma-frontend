# React + TypeScript + Vite

Este template fornece uma configuração mínima para rodar React com Vite, HMR e algumas regras de ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) utiliza [Babel](https://babeljs.io/) para Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh

---

## Como preparar o ambiente

1. **Pré-requisitos**

   - **Node.js:** Versão recomendada 18.x ou superior (compatível desde a 18.x até a 20.x).
   - **npm:** Versão recomendada 9.x ou superior.
   - [Node.js download](https://nodejs.org/) já inclui o npm.
   - Editor de código, como [VS Code](https://code.visualstudio.com/) ou [IntelliJ IDEA](https://www.jetbrains.com/pt-br/idea/)

2. **Clonando o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DA_PASTA_DO_PROJETO>
   ```

3. **Instalando as dependências**

   ```bash
   npm install
   ```

---

## Rodando o projeto localmente

Após instalar as dependências, basta executar:


```bash 
  npm run dev --debug 
```
- O Vite irá iniciar um servidor local. Por padrão, acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Outras tarefas úteis

- **Build para produção:**
  ```bash
  npm run build
  ```

- **Pré-visualizar o build (depois de executar o build):**
  ```bash
  npm run preview
  ```

---
