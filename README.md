# Harjoituspolku

Lapsille itsenäisiä harjoituskokeita. Sivusto: https://mattiseise.github.io/harjoituspolku/

## Sisältö ja sen alkuperä

- Julkaistu: 5. luokan suomen kielen **Kielen taitaja**, 44 tehtävää.
- Lähtöaineisto: keskustelun ”Harjoituskokeen tekeminen” alkuperäinen `harjoituskoe_suomi_5lk.html`. Korjattu kirjoitusvastausten selitysvirhe, hyväksytty oikeat persoonapronominit ja täsmennetty paikallissijojen kysymykset.
- Julkaistu myös alkuperäinen **Kieli & rytmi** -paketti: Neonlava, Pastellistudio ja Tähtikonsertti, 36 tehtävää kussakin, yhteensä 108. Kaikki alkuperäiset kuvitukset ja kuvapalkinnot ovat mukana. Jokaisella kokeella on oma suora linkki etusivulla.
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

Paketti on polussa `sisalto/5/suomen-kieli/kpop/index.html`. Koekohtaiset linkit: `?koe=neon`, `?koe=pastel`, `?koe=galaxy`. Alkuperäinen sisältö ja kuvat säilytettiin samassa HTML-tiedostossa. Lisätty paluulinkki, koekohtainen aloitus sekä valinnainen laitteelle muistaminen ja kaikkien K-pop-tietojen tyhjennys. Sivun CSP estää verkkoyhteydet ja suorittaa vain oman skriptin SHA-256-tiivisteellä; päivitä tiiviste aina skriptiä muuttaessasi.

K-pop-kokeissa vastaukset ja palkinnot säilyvät oletuksena vain avoimella sivulla. ”Muista tällä laitteella” tallentaa ne haluttaessa tämän selaimen `localStorage`-muistiin avaimella `kieli-rytmi-5lk-v3`. Asetuksen poistaminen poistaa pysyvän kopion, mutta avoimen sivun vastaukset säilyvät. ”Tyhjennä K-pop-tiedot” poistaa myös sivun nykyiset tulokset ja palkinnot. Toiminto ei koske muita sivustoja tai laitteita.

## Pages-asetukset

Settings → Pages → Build and deployment:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**
- HTTPS: päällä (GitHubin oletusosoite)

Tämä on staattinen sivusto: ei asennusta, palvelinta, ulkoisia kirjastoja, maksullisia palveluita tai salaisuuksia. `.nojekyll` ohittaa Jekyllin käsittelyn. GitHubin oma Pages-työnkulku hoitaa julkaisun.

## Lasten yksityisyys ja saavutettavuus

Ei kirjautumista, nimiä, seurantaa, analytiikkaa tai evästeitä. Vastaukset ovat oletuksena sivun muistissa ja tyhjenevät uudelleenlatauksessa. K-pop-paketissa pysyvän selaintallennuksen voi ottaa erikseen käyttöön yllä kuvatulla asetuksella. Lapsi voi itse ladata tulokset paikallisesti; mitään ei lähetetä ylläpitäjälle. GitHub käsittelee sivulatausten teknisiä tietoja omien käytäntöjensä mukaisesti.

Semanttinen HTML, näkyvä näppäimistökohdistus, ohituslinkki, nimilaput ja fieldset/legend-kysymykset. Palaute sisältää tekstin ja selityksen värin lisäksi. Vapaaehtoinen animaatio huomioi `prefers-reduced-motion`-asetuksen. Ei välkettä tai ääniä. Tämä ei ole riippumaton WCAG-vaatimustenmukaisuusauditointi.

Älä lisää julkiseen repositorioon lasten tietoja, vastaustiedostoja, tunnuksia, oppikirjan sivukuvia tai luvattomia kuvia. Harjoitus on oppimisen apuväline, ei valvottu koe: vastausavain on julkisessa selainkoodissa.


## Photocard-palkinnot

K-pop-kokeissa on 10 photocard-palkintoa: TUIDE, ILLIT, TWICE, BLACKPINK ja aespa, yksi jäsenkortti ja yksi ryhmäkortti kustakin. Jäsenkortit: Elena, Wonhee, Sana, Jennie ja Winter. Valokuvat ovat Creative Commons -lisensoituja. Kortit eivät ole virallisia fanituotteita. Lähteet, kuvaajat ja lisenssit ovat `sisalto/5/suomen-kieli/kpop/kuvalahteet.json`-tiedostossa, käyttöliittymässä ja ladattavien SVG-korttien sisällä. Korttiasettelu ja valokuvan pienennys on ilmoitettu muutoksena. BLACKPINK-ryhmäkortti ja sen kuva ovat CC BY-SA 4.0 -lisensoituja; muut kortit on lisensoitu valokuvansa CC BY -version mukaisesti. Kuvat on upotettu pakettiin, eikä lapsen selain ota yhteyttä kuvapalveluihin.

Yksi kokonaan vastattu ja tarkistettu harjoituskerta antaa valita yhden uuden kortin. Täysiä pisteitä ei vaadita. Korjauskierros säilyttää kortin; lisäkortti vaatii uuden harjoituskerran. Kokoelmaan ei tule kaksoiskappaleita. Kymmenen kortin sarjan täytyttyä kokoelmaa voi katsella ja ladata edelleen. ”Tyhjennä tämä koe” säilyttää kokoelman mutta aloittaa uuden harjoituskerran. ”Tyhjennä K-pop-tiedot” tyhjentää myös kokoelman. Aiemmat kuvituskortit ovat edelleen Palkinnot-näkymän lisätiedoissa. Aiemmin tallennetut vastaukset ja tulokset säilyvät; uusi `cards`-lista lisätään samaan version 3 tallennusmuotoon.

Kortit ladataan SVG-kuvina (550 × 850): ne avautuvat selaimessa ja ne voi tulostaa. Lähde- ja lisenssitiedot kulkevat mukana. Sivun HTML-lataus sisältää myös kaikki kuvat ja toimii ilman verkkoyhteyttä.
