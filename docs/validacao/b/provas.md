# Provas da home v2 na direção B

## Larguras (sem rolagem horizontal)

| Janela | scrollWidth | innerWidth | rolagem |
|---|---|---|---|
| 320 | 320 | 320 | não |
| 390 | 390 | 390 | não |
| 768 | 768 | 768 | não |
| 1024 | 1024 | 1024 | não |
| 1440 | 1440 | 1440 | não |
| 1920 | 1920 | 1920 | não |

## Movimento reduzido (`prefers-reduced-motion: reduce`)

| Item | Medido |
|---|---|
| Lenis instanciado | `false` |
| Texto em opacidade 0 | nenhum |
| Filete do feixe | `color(srgb 0.188235 0.298039 1 / 0.7)` (estático) |
| Pulso do feixe | `display: none` |
| Elementos com `transform` em main | 0 |

## Teclado

Elementos focáveis alcançados por Tab no desktop: **24**.
Sem indicador de foco visível: **nenhum**.

Ordem: 1. Pular para o conteúdo → 2. Lemis, início da página → 3. Como funciona → 4. Aquisição → 5. Retenção → 6. Como começa → 7. Perguntas → 8. Vamos conversar(abre em nova aba) → 9. Vamos conversar(abre em nova aba) → 10. Ver como funciona → 11. Vamos conversar(abre em nova aba) → 12. 01Já tenho CRM. Vocês usam o meu? → 13. 02Vocês assumem as vendas? → 14. 03Já investi em anúncio e não deu certo. Por q → 15. 04Preciso contratar tudo? → 16. 05Vocês garantem uma quantidade de clientes po → 17. Vamos conversar(abre em nova aba) → 18. Lemis, voltar ao início → 19. Como funciona → 20. Aquisição → 21. Retenção → 22. Como começa → 23. Perguntas → 24. WhatsApp(abre em nova aba)

Menu do celular: abre com `aria-expanded="true"`; depois do Escape, `aria-expanded="false"`, painel `hidden=true`, foco de volta no botão: **true**.

## Contraste


### Texto real

| Exemplo | Corpo | Peso | Texto | Fundo | Razão | Mínimo | |
|---|---|---|---|---|---|---|---|
| Quem chama tem próximo passo registrado. | 20px | 400 | #666a73 | #f4f1ea | 4.81:1 | 4.5:1 | ok |
| Vamos conversar | 16px | 600 | #ffffff | #304cff | 5.83:1 | 4.5:1 | ok |
| Vamos conversar | 16px | 600 | #304cff | #ffffff | 5.83:1 | 4.5:1 | ok |
| Funil de aquisição e de retenção | 12px | 600 | #adb2bd | #17191d | 8.28:1 | 4.5:1 | ok |
| Quem chega | 12px | 600 | #adb2bd | #131518 | 8.61:1 | 4.5:1 | ok |
| Anúncio | 15px | 600 | #ffffff | #232428 | 15.45:1 | 4.5:1 | ok |
| A Lemis implanta o caminho que o contato | 23px | 600 | #17191d | #f4f1ea | 15.60:1 | 4.5:1 | ok |
| Como funciona | 16px | 600 | #ffffff | #17191d | 17.60:1 | 4.5:1 | ok |
| Já tenho CRM. Vocês usam o meu? | 26px | 600 | #ffffff | #17191d | 17.60:1 | 3:1 | ok |

### Interface desenhada (`aria-hidden`, fora do escopo da norma — medida mesmo assim)

| Exemplo | Corpo | Peso | Texto | Fundo | Razão | Mínimo | |
|---|---|---|---|---|---|---|---|
| 05 | 374px | 400 | #1d244f | #17191d | 1.19:1 | 3:1 | **REPROVA** |
| 02 | 216px | 400 | #1f2861 | #17191d | 1.29:1 | 3:1 | **REPROVA** |
| voltando | 104px | 400 | #304cff | #17191d | 3.02:1 | 3:1 | ok |
| Entraram | 12px | 600 | #666a73 | #f4f1ea | 4.81:1 | 4.5:1 | ok |
| 11:48 | 11px | 400 | #eaedff | #304cff | 5.02:1 | 4.5:1 | ok |
| 01 | 48px | 400 | #304cff | #f4f1ea | 5.17:1 | 3:1 | ok |
| Última compra | 14px | 400 | #adb2bd | #232428 | 7.27:1 | 4.5:1 | ok |
| Oferta | 12px | 600 | #adb2bd | #17191d | 8.28:1 | 4.5:1 | ok |
| Aquisição | 12px | 600 | #adb2bd | #131518 | 8.61:1 | 4.5:1 | ok |
| 09:12 | 11px | 400 | #e9e9ea | #26282a | 12.27:1 | 4.5:1 | ok |
| Atualizado em tempo real | 14px | 400 | #17191d | #d9daed | 12.72:1 | 4.5:1 | ok |
| Vi o anúncio, quanto fica? | 14px | 400 | #ffffff | #2a2b2f | 14.10:1 | 4.5:1 | ok |
| Origem registrada | 14px | 400 | #17191d | #e2e6ff | 14.24:1 | 4.5:1 | ok |
| Vi o anúncio, quanto fica? | 17px | 400 | #ffffff | #26282a | 14.83:1 | 4.5:1 | ok |
| Sem data de volta | 14px | 400 | #ffffff | #232428 | 15.45:1 | 4.5:1 | ok |
| Fale no WhatsApp | 14px | 400 | #ffffff | #1a203d | 15.91:1 | 4.5:1 | ok |
| Cliente | 104px | 900 | #ffffff | #17191d | 17.60:1 | 3:1 | ok |
| Cliente novo | 14px | 400 | #17191d | #ffffff | 17.60:1 | 4.5:1 | ok |
| Sem próximo passo | 14px | 400 | #ffffff | #131518 | 18.29:1 | 4.5:1 | ok |

Pares medidos: 28. **Reprovados em texto real: 0.**
