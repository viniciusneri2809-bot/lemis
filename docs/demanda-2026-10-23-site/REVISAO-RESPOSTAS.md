# Site novo: respostas à revisão do Codex (`revisao-codex.md`)

| Achado | Resposta |
|---|---|
| 1. "R$ 4.820" não está na copy | É o valor de exemplo do cartão "Investimento" do celular, marcado "dados de exemplo" na tela. A copy troca o rótulo do protótipo ("Voltaram", 19) por "Investimento" sem dar número, e investimento pede valor em real. Fica como [PENDENTE DE VALIDAÇÃO] no RESUMO, para o Vinicius escolher antes de publicar. |
| 2. Provas sem saída | Aceito: `saidas.txt` (testes, verificador, detector, build, og:image, larguras, menu e contraste) e `lighthouse/notas.txt`. Os relatórios completos do Lighthouse ficaram fora do repositório: o JSON tem base64 grande e a trava de segredos da casa barrou o commit. |
| 3. og:image em localhost sem `NEXT_PUBLIC_SITE_URL` | Aceito e corrigido: sem a variável, o `metadataBase` é `https://lemiscompany.com.br`. Conferido no build: `og:image` = `https://lemiscompany.com.br/opengraph-image?…`. |
| 4. O verificador deixa passar hsl, nome de cor e Tailwind padrão | Aceito e corrigido, com teste: hsl/hwb/lab/lch/oklab/oklch/`color()` reprovam, as classes de cor padrão do Tailwind reprovam e nome de cor em CSS ou `style` reprova. Comparar o texto renderizado com a copy fica como próximo passo: pede tirar o texto da página montada, e a copy ainda tem notas internas no mesmo arquivo. |
| 5. Menu do celular aberto depois do link | Aceito e corrigido (`MenuCelular`): fecha ao escolher o link. Conferido no navegador (aberto: true; depois do link: false). |
