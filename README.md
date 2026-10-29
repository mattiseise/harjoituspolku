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


## Photocard-palkinnot ja buusterit

Kokoelmassa on 50 korttia: 10 TUIDE-, 10 ILLIT-, 10 TWICE-, 10 BLACKPINK- ja 10 aespa-korttia. Palkinnot-näkymä on jaettu bändeittäin, ja jokaisessa näkyy oma keräilylaskuri. Suora linkki: `sisalto/5/suomen-kieli/kpop/index.html?palkinnot=1&band=ILLIT` (band-arvoksi myös TUIDE, TWICE, BLACKPINK tai aespa).

Jokaisessa kortissa on oikea lisensoitu artistikuva ja lyhyt suomenkielinen knoppitieto. Kuvan lähde, kuvaaja, lisenssi sekä knoppitiedon lähde ovat käyttöliittymässä, SVG-latauksessa ja `kuvalahteet.json`-tiedostossa. TUIDEn live-kortit on poimittu SBS Radion Creative Commons -lisensoidusta SUN KISS -esiintymisestä. Näiden ruutujen jäseniä ei nimetä ilman lähteen omaa nimitietoa. Muut kuvat ovat Commons-lähteistä. Kuvat on pienennetty ja pakattu WebP-muotoon; kasvoja ei ole muokattu generatiivisesti. Kortit eivät ole virallisia fanituotteita. Kunkin johdannaiskortin lisenssi seuraa sen valokuvan CC BY- tai CC BY-SA-versiota.

### Palkinnon toiminta

1. Kokonaan vastattu ja tarkistettu harjoituskerta luo yhden buusterin, vaikka vastauksissa olisi virheitä.
2. Buusteriin arvotaan viisi eri korttitunnusta vain vielä keräämättömistä korteista. Jos jäljellä on alle viisi, mukana ovat kaikki jäljellä olevat.
3. Buusteri tallennetaan harjoituskerran tilaan ennen avaamista. Palaaminen, korjauskierros ja laitteelle muistamisen kanssa uudelleenlataus eivät arvo pakkausta uudelleen.
4. Avausanimaation jälkeen näkyvistä korteista voi valita yhden. Valittu kortti lisätään kokoelmaan; saman suorituksen muut kortit eivät ole lunastettavissa.
5. Uusi harjoituskerta (Tyhjennä tämä koe) mahdollistaa uuden buusterin. Kokoelma säilyy. Tyhjennä K-pop-tiedot poistaa myös kokoelman ja keskeneräiset buusterit.
6. Kun kaikki 50 korttia on kerätty, näytetään valmis kokoelma eikä tyhjää pakkausta.

Animaation voi ohittaa painikkeella tai poistaa käytöstä. Laitteen vähennetyn liikkeen asetus huomioidaan. Aiemmat 10 korttitunnusta ja version 3 vastaukset/tulokset säilyvät; tilaan lisätään harjoituskohtainen `booster: {ids, opened}`. Aiemmat kuvituskortit ovat Palkinnot-näkymän lisätiedoissa. Kortit ja kokoelma ovat oletuksena vain sivun muistissa; Muista tällä laitteella tallentaa myös avatun/pending buusterin paikallisesti. Lasten tietoja ei lähetetä palvelimelle.

Kortit ladataan SVG-kuvina (550 × 850), ja ne voi avata selaimessa tai tulostaa. Kuvan ja knoppitiedon lähteet kulkevat mukana. HTML-lataus sisältää kaikki kuvat ja toimii ilman verkkoyhteyttä.

Tarkistukset: `node tools/check.cjs` ja `node tools/check-photocards.cjs`. Jälkimmäinen tarkistaa myös buusterin pysyvyyden, kaksoislunastusten eston, loppukokoelman 0–4 vaihtoehdon tilanteet ja aiempien tallennusten siirtymisen.

## Espanjan pohja ja kertausarvio

`/sisalto/5/espanja/pohja.html` on julkinen odotussivu; `pohja.js` sisältää tyhjän luonnoksen. Koealue, vuosiluokka ja tehtävät vahvistetaan ennen avaamista. Muuta status pois draft-tilasta vasta, kun tehtävät on tarkistettu, luo koesivu perusteet.html-pohjasta ja lisää oikea tehtävämäärä luetteloon.

Yhteinen assets/review.js arvioi tämän tarkistuksen vastaukset tehtävien skill-tunnisteilla; ilman tunnistetta käytetään osiota. skills-olion title ja reviewTip määrittävät taitokohtaisen kertauksen. Osioissa voi määrittää reviewTip-varavinkin. Lisää jokaiseen tehtävään id, section, skill, prompt, answers, explanation ja tarvittaessa options. Älä päättele lapsen yleistä osaamista yhdestä kokeesta. Puuttuvat vastaukset raportoidaan erikseen, eivät osaamisvirheinä. Kertausjärjestys määräytyy vastattujen tehtävien virheosuuden ja virhemäärän perusteella. Täydet pisteet antavat ylläpitovinkin. K-pop-paketissa sama moottori on upotettu offline-käyttöä varten. Kun muokkaat sitä, päivitä upotettu kopio ja CSP-tiiviste.

Espanjan aksentteja tai ñ-kirjainta ei poisteta normalisoinnissa. Lisää vain kieliopillisesti hyväksytyt vastausvaihtoehdot. Sisältöpohja ei vielä sisällä kuuntelutehtäviä eikä vapaiden kirjoitelmien arviointia. Analyysi on sääntöpohjainen ja toimii kokonaan selaimessa.

## Kaikkien oppiaineiden yhteiset palkinnot

assets/rewards.js ylläpitää yhtä korttikokoelmaa. Standardimoottorin jokainen kokonainen tarkistus avaa saman yritystunnisteen buusterin palkintosivulla; korjaustarkistus ei tuota lisäbuusteria. Alusta aloittaminen luo uuden yrityksen. Espanjan pohja käyttää tätä ratkaisua, kun tehtävät avataan standardin quiz.js-moottorilla. Luonnos ei avaa palkintoa. K-pop-paketti sisältää samasta moduulista upotetun kopion ja siirtää vanhat kortit automaattisesti yhteiseen kokoelmaan.

Oletuksena sessionStorage säilyttää kokoelman saman välilehden sivusiirtymissä ja uudelleenlatauksissa. Muista tällä laitteella siirtää sen localStorageen tässä selaimessa. Eri laitteilla tai selaimilla ei ole synkronointia. Yhteiset palkinnot vaativat selaintallennuksen; estetty tallennus näytetään palautteessa. Tavallisen kokeen vastaukset ovat edelleen sivun muistissa.
