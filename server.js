const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');
require('moment/locale/fr');
const app = express();
app.use(cors());

dotenv.config();

app.use(bodyParser.json());
const port =5000;
// Middleware pour gérer les requêtes OPTIONS
  //Cross Origin Handle Middleware



app.get('/links', async (req, res) => {
    
const links = [

    {
        "link": "https://webmail.adapei65.fr",
        "id": 6,
    },
    {
        "link": "https://webmail.francebrevets.com",
        "id": 7,
    },
    {
        "link": "https://sts.lixir.fr",
        "id": 8,
    },
    {
        "link": "https://mail.nidek.fr/owa",
        "id": 9,
    },
    {
        "link": "https://webmail.bredinprat.com/lm_auth_proxy?DoLMLogin?curl=L2fowa&curlid=1831998750-2022892364&curlmode=0",
        "id": 10,
    },
    {
        "link": "https://www.lycra.com/en/coolmax-business",
        "id": 11,
    },
    {
        "link": "https://www.fo-rothschild.fr",
        "id": 12,
    },
    {
        "link": "https://francemutuelle.neocles.com",
        "id": 13,
    },
    {
        "link": "https://adapei65.neocles.com",
        "id": 14,
    },
    {
        "link": "https://gieccifinance.neocles.com",
        "id": 15,
    },
    {
        "link": "https://eri.neocles.com/vpn/index_2auth.html",
        "id": 17,
    },
    {
        "link": "https://proudreed.neocles.com/vpn/index.html",
        "id": 18,
    },
    {
        "link": "https://procie.neocles.com/vpn/index.html",
        "id": 19,
    },
    {
        "link": "https://sfcdc65.neocles.com",
        "id": 20,
    },
    {
        "link": "https://sagess-ctx.neocles.com",
        "id": 21,
    },
    {
        "link": "https://envoludia.neocles.com",
        "id": 16,
    },

    {
        "link": "https://mail.francemutuelle.fr/lm_auth_proxy?DoLMLogin?curl=L2fowa&curlid=1799196252-2774585649",
        "id": 22,
    },
];
    const linkStatuses = await Promise.all(links.map(async (link) => {
        try {
            const response = await fetch(link.link, {
                method: 'HEAD',
              });
              if (response.status === 200)
            return {
                id: link.id,
                link: link.link,
                status: 'success'
            };
            if (response.status === 302)
            {
                const response2 = await fetch(link.link, {
                  method: 'HEAD',
                  redirect: 'follow',
                });        
                if (response2.status === 200) {
                return {
                    id: link.id,
                    link: link.link,
                    status: 'success'
                };
              } else {
                return {
                    id: link.id,
                    link: link.link,
                    status: "Une erreur est survenue lors du check",
                };
              }
            } else {
              return {
                id: link.id,
                    link: link.link,
                    status: "Une erreur est survenue lors du check",
              };
            }

        } catch (err) {
          
                return {
                    id: link.id,
                    link: link.link,
                    status: "Cliquez sur le lien"
                };
            }
        
    }));
    res.send(linkStatuses);
});


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
