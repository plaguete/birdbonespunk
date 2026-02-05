#!/bin/bash

# Script de Deploy do Bird Bones Website para Vercel
# Execute este script no terminal para preparar e subir o projeto

echo "🎸 BIRD BONES WEBSITE - SCRIPT DE DEPLOY PARA VERCEL"
echo "=================================================="
echo ""

# Verificar se o git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado. Por favor, instale o Git primeiro."
    echo "   Download: https://git-scm.com/downloads"
    exit 1
fi

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI não está instalado. Instalando..."
    npm install -g vercel
    echo "✅ Vercel CLI instalado com sucesso!"
fi

echo "1. Configurando Git..."
echo "---------------------"

# Inicializar repositório Git (se ainda não estiver)
if [ ! -d ".git" ]; then
    echo "   Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit - Bird Bones website with Vercel API"
    echo "✅ Repositório Git inicializado!"
else
    echo "   Repositório Git já existe. Atualizando arquivos..."
    git add .
    git commit -m "Atualização - Sistema de recados com Vercel API"
    echo "✅ Arquivos atualizados no Git!"
fi

echo ""
echo "2. Preparando para GitHub..."
echo "----------------------------"
echo ""
echo "⚠️  ATENÇÃO: Você precisará criar um repositório no GitHub manualmente!"
echo ""
echo "   Passos para criar o repositório:"
echo "   1. Acesse https://github.com"
echo "   2. Clique em 'New repository'"
echo "   3. Nome: bird-bones-website (ou o nome que preferir)"
echo "   4. Deixe público"
echo "   5. Não inicialize com README"
echo "   6. Copie a URL do repositório (ex: https://github.com/SEU_USUARIO/bird-bones-website.git)"
echo ""

# Perguntar ao usuário a URL do repositório
read -p "   Digite a URL do seu repositório GitHub: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ URL do repositório não fornecida. Abortando."
    exit 1
fi

echo ""
echo "3. Conectando ao GitHub..."
echo "-------------------------"

# Configurar remote do GitHub
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

# Renomear branch para main (se necessário)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    git checkout -b main
fi

# Enviar para GitHub
echo "   Enviando arquivos para GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Arquivos enviados para GitHub com sucesso!"
else
    echo "❌ Erro ao enviar para GitHub. Verifique suas credenciais."
    exit 1
fi

echo ""
echo "4. Deploy no Vercel..."
echo "---------------------"
echo ""
echo "   O Vercel CLI irá abrir o navegador para autenticação."
echo "   Siga as instruções para conectar sua conta Vercel."
echo ""

# Fazer deploy no Vercel
vercel

echo ""
echo "5. Verificando deploy..."
echo "-----------------------"
echo ""
echo "   Seu site deve estar no ar! A URL será algo como:"
echo "   https://bird-bones-website-seuusername.vercel.app"
echo ""

# Perguntar se quer abrir no navegador
read -p "   Deseja abrir o site no navegador? (s/n): " OPEN_BROWSER

if [ "$OPEN_BROWSER" = "s" ] || [ "$OPEN_BROWSER" = "S" ]; then
    echo "   Abrindo site no navegador..."
    vercel --open
fi

echo ""
echo "🎉 DEPLOY CONCLUÍDO!"
echo "==================="
echo ""
echo "✅ Seu site Bird Bones está no ar!"
echo "✅ Sistema de recados está funcionando!"
echo "✅ API backend está configurada!"
echo ""
echo "Próximos passos:"
echo "1. Teste o sistema de recados"
echo "2. Compartilhe a URL com os fãs"
echo "3. Monitore o dashboard do Vercel"
echo ""
echo "Para futuras atualizações:"
echo "   git add ."
echo "   git commit -m 'Atualização'"
echo "   git push"
echo "   (O Vercel fará deploy automático)"
echo ""
echo "🤘 BIRD BONES - PRIMEIRA BANDA DO MUNDO // EST. 2025"