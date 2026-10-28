# Harjoituspolku

Lapsille itsenäisiä harjoituskokeita. Sivusto: https://mattiseise.github.io/harjoituspolku/

## Sisältö ja sen alkuperä

- Julkaistu: 5. luokan suomen kielen **Kielen taitaja**, 44 tehtävää.
- Lähtöaineisto: keskustelun ”Harjoituskokeen tekeminen” alkuperäinen `harjoituskoe_suomi_5lk.html`. Korjattu kirjoitusvastausten selitysvirhe, hyväksytty oikeat persoonapronominit ja täsmennetty paikallissijojen kysymykset.
- **Odottaa siirtoa:** myöhempi `kpop_suomen_harjoituskokeet.html` / `kpop_harjoituskokeet_paketti.zip`. Alkuperäisen kolmen kokeen 108 tehtävää tai kuvia ei saatu mukaan keskusteluviitteestä. Tätä julkaisua ei esitetä niiden kopiona. Älä lisää niitä valikkoon ennen kuin tiedosto on saatu ja tarkistettu.
- Sivujen oppikirjakuvia ei julkaista. Palkintokuvitus on tämän sivuston oma SVG.

## Rakenne

```
index.html                         # luokka- ja ainevalinnat sekä haku
tietoa.html                        # käyttöohjeet ja yksityisyys
sisalto/kokeet.js                   # harjoituskirjasto / metatiedot
sisalto/5/suomen-kieli/perusteet.html
sisalto/5/suomen-kieli/perusteet.js  # tehtävät, vastausavain, selitykset
assets/                            # yhteinen tyyli, tarkistus ja kuvapalkinto
tools/check.cjs                    # vastausavaimen ja linkkien tarkistukset
```

Suora jaettava valikko: `?luokka=5&aine=Suomen+kieli#kokeet`. Muut luokat toimivat suodattimina ja ilmoittavat rehellisesti, jos sisältöä ei vielä ole. Oppiainevalikko muodostuu julkaistuista kokeista.

## Lisää harjoitus

1. Tee kansio `sisalto/<luokka>/<aine>/`. Kopioi nykyisen kokeen HTML- ja JS-tiedosto uusiksi tiedostoiksi tai lisää tarkistettu itsenäinen HTML-koe omaan kansioonsa.
2. Muokkaa sivun otsikko, murupolku ja tehtävädata. Yhteisen kokeen data asettaa `window.QUIZ`: `id`, `title`, `grade`, `subject`, `sections` ja `questions`. Kysymyksessä: yksilöllinen `id`, nollasta alkava `section`, `prompt`, `options` (taulukko tai null), `answers` (hyväksytyt vastaukset) ja `explanation`. Monivalinnan vastausavain sisältää vaihtoehdon tekstin.
3. Lisää merkintä `sisalto/kokeet.js`-taulukkoon: yksilöllinen `id`, `grade` (1–9), `subject`, `title`, `description`, `count`, `minutes`, `href` (suhteessa etusivuun) ja `tags`.
4. Uuden data- tai HTML-tiedoston tulee olla tarkistettu aikuisen toimesta. Tarkista myös, että kirjoitustehtävässä on riittävän täsmällinen pyyntö ja kaikki hyväksyttävät vastaukset. Älä korvaa ä/ö-kirjaimia a/o-kirjaimilla.
5. Suorita `node tools/check.cjs`. Käynnistä esikatselu `python -m http.server 4173` ja avaa `http://localhost:4173`. Testaa puhelinleveys, näppäimistö, tyhjät/oikeat/väärät vastaukset, korjauskierros ja palkinto.
6. Tallenna muutokset `main`-haaraan. Pages julkaisee ne automaattisesti. Varmista onnistunut `pages build and deployment` ja kokeile julkista osoitetta.

### Alkuperäisen K-pop-paketin tuonti

Kun tiedosto saadaan, sijoita se esimerkiksi `sisalto/5/suomen-kieli/kpop/index.html`-polkuun. Tarkista ensin ulkoiset verkkopyynnöt, henkilötiedot, mahdollinen selaintallennus sekä kaikki kolme tarkistusta ja palkintoa. Lisää paluulinkki `../../../../index.html?luokka=5&aine=Suomen+kieli#kokeet`. Lisää sitten kirjastoon yksi pakettikortti tai kolme erillistä korttia, jos alkuperäinen sivu tukee suoria koekohtaisia linkkejä. Älä keksi toimimattomia ankkureita. Säilytä paketin oma sisältö ja kuvat, kunnes niiden käyttöoikeudet ja oikeellisuus on tarkistettu.

## Pages-asetukset

Settings → Pages → Build and deployment:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**
- HTTPS: päällä (GitHubin oletusosoite)

Tämä on staattinen sivusto: ei asennusta, palvelinta, ulkoisia kirjastoja, maksullisia palveluita tai salaisuuksia. `.nojekyll` ohittaa Jekyllin käsittelyn. GitHubin oma Pages-työnkulku hoitaa julkaisun.

## Lasten yksityisyys ja saavutettavuus

Ei kirjautumista, nimiä, seurantaa, analytiikkaa, evästeitä tai pysyvää selaintallennusta. Vastaukset ovat sivun muistissa ja tyhjenevät uudelleenlatauksessa. Lapsi voi itse ladata tulokset paikallisesti; mitään ei lähetetä ylläpitäjälle. GitHub käsittelee sivulatausten teknisiä tietoja omien käytäntöjensä mukaisesti.

Semanttinen HTML, näkyvä näppäimistökohdistus, ohituslinkki, nimilaput ja fieldset/legend-kysymykset. Palaute sisältää tekstin ja selityksen värin lisäksi. Vapaaehtoinen animaatio huomioi `prefers-reduced-motion`-asetuksen. Ei välkettä tai ääniä. Tämä ei ole riippumaton WCAG-vaatimustenmukaisuusauditointi.

Älä lisää julkiseen repositorioon lasten tietoja, vastaustiedostoja, tunnuksia, oppikirjan sivukuvia tai luvattomia kuvia. Harjoitus on oppimisen apuväline, ei valvottu koe: vastausavain on julkisessa selainkoodissa.
