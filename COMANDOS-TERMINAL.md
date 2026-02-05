# Comandos para Deploy no Vercel

Copie e cole estes comandos no seu terminal para subir o site Bird Bones para o Vercel.

## 🚀 Comandos Básicos (Recomendado)

### 1. Preparar o Git
```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Bird Bones website com Vercel API"

# Criar branch main
git checkout -b main
```

### 2. Enviar para GitHub
```bash
# ⚠️ CRIE O REPOSITÓRIO NO GITHUB PRIMEIRO!
# Acesse: https://github.com/new
# Nome: bird-bones-website
# Deixe público, não inicialize com README

# Substitua ESTA_URL pelo URL do seu repositório
git remote add origin https://github.com/SEU_USUARIO/bird-bones-website.git

# Enviar para GitHub
git push -u origin main
```

### 3. Instalar Vercel CLI (se ainda não tiver)
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel
```

### 4. Fazer Deploy no Vercel
```bash
# Fazer deploy (será solicitado login)
vercel

# Para abrir no navegador após deploy
vercel --open
```

## 🔄 Comandos para Atualizações Futuras

```bash
# Sempre que fizer alterações
git add .
git commit -m "Descrição da alteração"
git push

# O Vercel faz deploy automático!
```

## 🧪 Testar Localmente (Opcional)

```bash
# Instalar servidor HTTP simples
npm install -g http-server

# Iniciar servidor na pasta do projeto
http-server

# Acesse: http://localhost:8080
# Teste o arquivo test-api.html
```

## 📋 Resumo dos Comandos

```bash
# 1. Git
git init
git add .
git commit -m "Initial commit"
git checkout -b main

# 2. GitHub (depois de criar repositório)
git remote add origin https://github.com/SEU_USUARIO/bird-bones-website.git
git push -u origin main

# 3. Vercel
npm install -g vercel
vercel
vercel --open
```

## ✅ Verificação

Após o deploy, seu site estará disponível em:
```
https://bird-bones-website-seuusername.vercel.app
```

Teste o sistema de recados:
1. Acesse a seção "RECADOS"
2. Deixe um comentário
3. Recarregue a página - o comentário deve permanecer

## 🎸 Dicas

- **Sempre faça commit antes de push**
- **Use mensagens de commit descritivas**
- **O Vercel faz deploy automático a cada push**
- **Monitore o dashboard do Vercel para métricas**

## 🤘 Resultado Final

Seu site Bird Bones estará no ar com:
- ✅ Sistema de recados funcional
- ✅ Backend em Vercel (sem Firebase)
- ✅ Design punk/underground
- ✅ Totalmente responsivo
- ✅ Deploy automático via GitHub

**PRIMEIRA BANDA DO MUNDO // EST. 2025** 🎸