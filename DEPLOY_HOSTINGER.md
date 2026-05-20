# Deploy na Hostinger - Site Estático

## Instruções para Deploy

### 1. Build do Projeto
```bash
npm run build
```

### 2. Upload dos Arquivos
1. Acesse o painel da Hostinger
2. Vá para **File Manager** ou use **FTP**
3. Navegue até a pasta `public_html`
4. Faça upload de **TODOS** os arquivos da pasta `dist/` para `public_html/`

### 3. Estrutura de Arquivos no Servidor
```
public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [outros assets]
├── img/
│   └── [imagens do projeto]
├── .htaccess
└── [outros arquivos estáticos]
```

### 4. Configurações Importantes

#### .htaccess
O arquivo `.htaccess` já está configurado para:
- Redirecionar todas as rotas para `index.html` (SPA)
- Configurar cache para melhor performance
- Compressão GZIP
- Headers de segurança

#### Domínio
- Configure o domínio principal para apontar para `public_html`
- Certifique-se de que o SSL está ativado

### 5. Verificações Pós-Deploy

1. **Teste todas as rotas:**
   - `/` (página inicial)
   - `/sobre-nos`
   - `/nossas-solucoes`
   - `/metodologia`
   - `/cases`
   - `/politica-privacidade`
   - `/termos-uso`

2. **Verifique funcionalidades:**
   - Formulário de contato
   - Navegação entre páginas
   - Responsividade mobile
   - Carregamento de imagens

3. **Performance:**
   - Teste de velocidade (PageSpeed Insights)
   - Verificação de cache
   - Compressão GZIP

### 6. Configurações Adicionais (Opcional)

#### Google Analytics
- Atualize o ID do Google Analytics no `index.html`
- Substitua `GA_MEASUREMENT_ID` pelo ID real

#### Meta Tags
- Verifique se todas as meta tags estão corretas
- Atualize URLs e imagens conforme necessário

### 7. Troubleshooting

#### Problema: Página 404 em rotas
**Solução:** Verifique se o arquivo `.htaccess` foi enviado corretamente

#### Problema: Imagens não carregam
**Solução:** Verifique se a pasta `img/` foi enviada com todas as imagens

#### Problema: CSS/JS não carregam
**Solução:** Verifique se a pasta `assets/` foi enviada completamente

### 8. Manutenção

#### Atualizações
1. Faça as alterações no código
2. Execute `npm run build`
3. Faça upload apenas dos arquivos alterados
4. Limpe o cache do navegador para testar

#### Backup
- Sempre mantenha backup dos arquivos atuais
- Documente as alterações feitas

## Notas Importantes

- ✅ **Compatível com hospedagem estática**
- ✅ **PWA removido** (não compatível com estático)
- ✅ **Service Workers removidos**
- ✅ **Roteamento configurado** com HashRouter
- ✅ **Cache e performance otimizados**
- ✅ **Segurança configurada**

## Suporte

Para dúvidas sobre o deploy, consulte:
- Documentação da Hostinger
- Suporte técnico da Hostinger
- Documentação do Vite para builds estáticos



