# Guia de Deploy no Vercel

Este guia passo-a-passo irá ajudá-lo a conectar seu projeto Bird Bones ao Vercel e colocar o site no ar.

## 🚀 Passo 1: Preparar o Repositório

### Opção A: GitHub (Recomendado)
1. **Crie um repositório no GitHub**
   - Acesse [github.com](https://github.com)
   - Clique em "New repository"
   - Nome: `bird-bones-website` (ou o nome que preferir)
   - Deixe público (recomendado para sites estáticos)
   - Não inicialize com README (já temos um)

2. **Envie seu projeto para o GitHub**
   ```bash
   # No terminal, na pasta do projeto
   git init
   git add .
   git commit -m "Initial commit - Bird Bones website with Vercel API"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/bird-bones-website.git
   git push -u origin main
   ```

### Opção B: GitLab ou Bitbucket
- Siga o mesmo processo, mas use a plataforma de sua preferência

## 🌐 Passo 2: Conectar ao Vercel

1. **Crie conta no Vercel** (se ainda não tiver)
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "Sign Up"
   - Use sua conta GitHub para login (mais fácil)

2. **Conecte seu repositório**
   - No dashboard do Vercel, clique em "New Project"
   - Clique em "Import Git Repository"
   - Selecione seu repositório `bird-bones-website`
   - Clique em "Import"

3. **Configurações do Projeto**
   - **Framework Preset**: Deixe em branco (não é um framework)
   - **Build Command**: Deixe vazio
   - **Output Directory**: Deixe vazio
   - **Install Command**: Deixe vazio
   - Clique em "Create Project"

## ⚙️ Passo 3: Configurações Adicionais

### Variáveis de Ambiente (Opcional)
Para este projeto, não são necessárias variáveis de ambiente, mas se precisar no futuro:
- Settings → Environment Variables
- Adicione as variáveis necessárias

### Domínio Personalizado (Opcional)
- Settings → Domains
- Adicione seu domínio personalizado
- Siga as instruções de DNS

## 🚀 Passo 4: Deploy Automático

1. **Deploy Inicial**
   - O Vercel fará o deploy automático após a configuração
   - Aguarde alguns minutos

2. **Verifique o Deploy**
   - No dashboard, clique em "Visit" para ver seu site no ar
   - A URL será algo como: `https://bird-bones-website-seuusername.vercel.app`

3. **Teste a API**
   - Acesse: `https://seusite.vercel.app/api/comments`
   - Deve retornar os comentários de teste em JSON

## 🧪 Passo 5: Testar o Sistema de Recados

1. **Acesse seu site**
   - Vá para a seção "RECADOS"

2. **Teste o envio**
   - Preencha nome e mensagem
   - Clique em "ENVIAR"
   - O comentário deve aparecer na lista

3. **Teste a persistência**
   - Recarregue a página
   - O comentário deve continuar lá

## 🔧 Troubleshooting

### Problemas Comuns:

**❌ API não responde:**
- Verifique se o arquivo `api/comments.js` está na pasta correta
- Confira o `vercel.json` para garantir as rotas estão corretas

**❌ Erro 404 na API:**
- Verifique se o projeto foi deployado corretamente
- Confira se a URL da API está correta: `/api/comments`

**❌ Comentários não persistem:**
- Isso é normal! Os dados são armazenados na memória do serverless function
- Para persistência permanente, seria necessário conectar a um banco de dados

**❌ Erros de CORS:**
- O `vercel.json` já configura CORS, mas se houver problemas:
  - Verifique se está acessando pelo domínio correto
  - Não use `file://` protocolo localmente

## 📊 Monitoramento

### Métricas no Vercel
- **Usage**: Verifique o uso de funções serverless
- **Logs**: Acompanhe erros e solicitações
- **Performance**: Monitore tempo de resposta da API

### Limites do Plano Gratuito
- **Funções Serverless**: 125.000 requisições/mês
- **Largura de Banda**: 100GB/mês
- **Build Time**: 600s por deploy

## 🔄 Atualizações Futuras

### Para atualizar o site:
1. Faça as alterações no código
2. Dê commit e push para o GitHub
3. O Vercel fará deploy automático

### Para mudar para banco de dados permanente:
1. Escolha um banco (Vercel Postgres, PlanetScale, etc.)
2. Atualize a API para usar o banco
3. Configure variáveis de ambiente
4. Redeploy

## 📞 Suporte

### Documentação Vercel:
- [Getting Started](https://vercel.com/docs/getting-started)
- [API Routes](https://vercel.com/docs/functions/api-routes)
- [Deploy Guide](https://vercel.com/docs/deployments/overview)

### Suporte Bird Bones:
- Este projeto está pronto para produção
- Qualquer dúvida, consulte o README.md

---

🎉 **Seu site Bird Bones está pronto para o mundo!**

Lembre-se: "PRIMEIRA BANDA DO MUNDO // EST. 2025" 🤘