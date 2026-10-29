# Yhteinen koemoottori: uuden harjoituksen tekeminen

Kaikille aineille ja luokille käytetään samoja moduuleja, teemoja, palautteita ja
korttipalkintoja. Uusi koe on ensisijaisesti uutta tehtävädataa.

## Aloita valmiista pohjasta

1. Kopioi `templates/koe.json` omaksi lähdetiedostoksi, esimerkiksi
   `work/englanti-matka.json`. Pohjan kahdeksan tehtävää näyttävät kaikki tuetut
   tyypit. Ne ovat mallisisältöä, eivät automaattisesti uuden kokeen koealue.
2. Muuta metatiedot, koealue/lähdekuvaus, taitojen kertausvinkit, osiot ja tehtävät.
   `grade` on 1–9. `subjectSlug` ja `slug` ovat pieniä a–z-kirjaimia, numeroita ja
   väliviivoja. `language` on esimerkiksi `fi`, `en` tai `es`.
3. Valitse `theme`: `neon`, `pastel` tai `galaxy`. Tarkista lähteet, kieli,
   vastausvaihtoehdot ja selitykset. Aseta `status` arvoon `ready`, kun haluat
   harjoituksesta suoritettavan paikalliseen tarkistukseen.
4. Luo sivu ja tehtävät:

   ```text
   node tools/create-exam.cjs --input work/englanti-matka.json
   ```

   Kohde on aina `sisalto/<grade>/<subjectSlug>/<slug>.html` ja saman niminen `.js`.
   Työkalu ei oletuksena muuta kirjastoa tai korvaa olemassa olevia tiedostoja.
   `--replace` sallii nimetyn kohteen HTML/JS-tiedostojen uudelleenluonnin. Muokkaa
   jatkossa omaa JSON-lähdettä ja generoi siitä; älä muokkaa johdettua HTML:ää käsin.
5. Suorita alla olevat tarkistukset ja kokeile sivua selaimessa. Rekisteröi valmis
   koe vasta tämän jälkeen:

   ```text
   node tools/create-exam.cjs --input work/englanti-matka.json --replace --register
   ```

   `--register` lisää tai päivittää kirjastomerkinnän tehtävämäärineen. Olemassa
   olevan merkinnän päivitys tarvitsee myös `--replace`-valinnan. Työkalu hylkää
   `draft`-tilan sekä toisen kokeen kanssa ristiriitaisen tunnisteen tai polun ennen
   tiedostojen kirjoittamista. `ready` on tekijän asettama tila, ei työkalun antama
   todistus sisällön oikeellisuudesta.

Luonnoksella (`status: "draft"`) näkyvät otsikko ja luonnosilmoitus, mutta sen
tehtäviä ei voi suorittaa eikä sitä voi rekisteröidä. Mallipohjaa ei lisätä julkiseen
harjoituskirjastoon. Säilytä oman kokeen JSON-lähde repossa sen sisältökansiossa,
kun siinä ei ole yksityistä lähdeaineistoa.

## Mikä tulee valmiina

| Moduuli | Vastuu |
| --- | --- |
| `templates/koe.html.tpl` | Kaikkien aineiden yhteinen sivurunko ja saavutettavat ohjaimet |
| `assets/rhythm.css`, `assets/rhythm.js` | Äidinkielen K-pop-esikuvan teemat, osiot, eteneminen ja tulos-/korjausnäkymä |
| `assets/quiz.js` | Kysymykset, tarkistus, ensimmäinen kokonainen tulos, nollaus ja tulosten vienti |
| `assets/grading.js` | Valmistumisen, hyväksyttyjen vastausten ja mallivastausten käsittely |
| `assets/interactions.js` | Yhdistäminen, sanapalikat ja kirjoitettavat aukot |
| `assets/wordhunt.js` | Maalattava, napautettava ja näppäimistöllä käytettävä kirjainkäärme |
| `assets/review.js` | Omiin vastauksiin perustuva taitokohtainen kertaus |
| `assets/rewards.js` | Kaikkien aineiden yhteinen korttikokoelma ja harjoituskerran palkintotunniste |

Sivupohja lataa moduulit oikeassa järjestyksessä, valitsee teemakuvitukset ja
sisältää yhteisen buusteripaneelin. Palkintosivu sijaitsee historiallisesti polussa
`sisalto/5/suomen-kieli/kpop/index.html`, mutta kokoelma kuuluu kaikille aineille ja
vuosiluokille. Uudet sivut linkittävät sinne sivuston juuren kautta, joten esimerkiksi
6. luokan englannin koe ei vahingossa etsi 6. luokan suomen kielen palkintosivua.

Älä kopioi vanhaa `perusteet.html`-näkymää tai itsenäisen K-pop-HTML:n sisäistä
sovellusta uuden kokeen pohjaksi. Ne säilyvät vanhojen kokeiden yhteensopivuutta
varten. Espanjan kokeet ovat valmiita käyttöesimerkkejä, mutta niiden oppiaine- ja
lähdetekstejä ei pidä jättää uuteen kokeeseen. Sivupohjan muutokset koskevat seuraavia
generointeja; yhteisten moduulien muutokset tulevat niitä lataaviin kokeisiin.

## Tehtävädata

Kokeessa ovat `id`, `title`, `grade`, `subject`, `subjectSlug`, `slug`, `theme`,
`language`, `status`, `description`, `minutes`, `tags`, `sourceNote`, `skills`,
`sections` ja `questions`. `writingNote` on valinnainen kielikohtainen kirjoitusohje.
Osioissa ovat `title` ja `intro`. Tehtävän `section` alkaa nollasta.

Jokaisessa tehtävässä ovat yksilöllinen `id`, `section`, `skill`, `prompt`,
`answers` ja `explanation`. `skills[skill]` sisältää `title`- ja `reviewTip`-tekstit.
Tehtäväkohtainen `language` ohittaa kokeen oletuskielen; käännöksessä se on vastauksen
kieli. Mallit kaikista tyypeistä löytyvät `templates/koe.json`-tiedostosta.

| Tyyppi | Tehtäväkohtaiset kentät | Valmis vastaus |
| --- | --- | --- |
| Monivalinta (`choice`, tai `options` ilman tyyppiä) | `options`, `answers` sisältää vaihtoehdon tekstin | Yksi vaihtoehto valittu |
| Kirjoittaminen (`text`, tai ilman tyyppiä/vaihtoehtoja) | `answers`: hyväksytyt kokonaiset kirjoitusasut | Ei-tyhjä teksti |
| Yhdistäminen (`match`) | `pairs: [{left,right}]`, valinnainen yksilöllinen `choices` | Kaikki kohteet yhdistetty |
| Sanapalikat (`order`) | `tokens`, `answers`: hyväksytyt koko virkkeet | Kaikki palikat käytetty |
| Sananvalinta (`select`) | `sentence`, `options`, `answers` | Muu kuin tyhjä aloitusvalinta |
| Kirjoitettavat aukot (`gap`) | `sentence` käyttää `___`-aukkoja; `gaps: [{clue,answers}]` | Kaikki aukot täytetty |
| Virkekäännös (`translate`) | `source`, `sourceLanguage`, vastauksen `language`, `answers` | Ei-tyhjä koko virke |
| Sanasukka (`wordhunt`) | `strip`, `words`, `clues`, `answers` | Kaikki etsittävät sanat löydetty |

`match`-mallivastaus on `vasen → oikea; vasen → oikea`. `gap`-mallivastaus on
kokonainen täydennetty virke. `wordhunt`-mallivastaus on sanojen luettelo pilkulla ja
välilyönnillä erotettuna. Sanakäärmeen `strip` kirjoitetaan isoilla kirjaimilla
NFC-muodossa; pituus on jaollinen viidellä. Jokainen etsittävä sana esiintyy siinä
kerran. `words` ja suomenkieliset `clues` ovat samassa järjestyksessä.

Luontityökalu tarkistaa muun muassa tunnisteet, osiot, taitovinkit, vaihtoehdot,
palikoista muodostettavat vastaukset, aukkojen määrän ja käärmeen sanat. Se ei
tarkista, onko käännös, oppikirjan tulkinta tai pedagoginen selitys oikein.

## Palaute ja palkitseminen ovat yhteinen sopimus

- Kokonainen tehtävä on yksi piste. Yhdistämisen ja aukkojen kaikkien osien pitää
  olla oikein. Osapisteitä ei käytetä.
- Keskeneräinen tehtävä ei täytä etenemismittaria eikä ole osaamisvirhe
  kertaussuunnitelmassa. Kokeesta näytetään puuttuvien tehtävien määrä.
- Väärä kokonainen vastaus antaa mallin, selityksen ja kyseisen taidon kertausvinkin.
  Jos tehtävä mittaa useita taitoja, kertausvinkin tulee kattaa ne kaikki.
- Muutos piilottaa vanhan tuloksen; osionvaihto säilyttää vastaukset. Tuloksesta
  pääsee suoraan puuttuvaan tai korjattavaan tehtävään.
- Kaikkiin tehtäviin vastaaminen ja tarkistus avaa yhden yhteisen buusterin, vaikka
  vastauksissa olisi virheitä. Korjaus ja uudelleentarkistus säilyttävät saman
  harjoituskerran palkinnon. Vain aloittaminen alusta luo uuden harjoituskerran.
- Käyttäjä valitsee yhden viidestä vielä keräämättömästä kortista. Loppukokoelman
  poikkeustilanteet hoitaa nykyinen palkintomoottori; niitä ei toteuteta koekohtaisesti.
- Älä muuta aksenttien tai merkityksen erottelua helpomman hyväksynnän vuoksi.
  Käännösvarianssi ratkaistaan tehtävän vastauslistalla, ei aksentit poistamalla.
- Älä tulkitse harjoitustulosta oppilaan yleisen osaamisen arvioksi. Tekstistä
  tunnistaminen ei ole kuuntelun tai oman ääntämisen arviointia.

## Tarkistus ennen kirjastoon lisäämistä ja julkaisua

```text
node tools/check-exam-template.cjs
node tools/check.cjs
node tools/check-review.cjs
node tools/check-shared-rewards.cjs
node tools/check-boosters.cjs
node tools/check-spanish.cjs
node tools/check-spanish-content.cjs
```

Viimeiset kaksi ovat olemassa olevien Espanjan kokeiden regressiotarkistuksia.
Tee uudelle sisältökokonaisuudelle omat riippumattomat oikeiden ja väärien vastausten
tarkistukset: pelkkä vastausavaimen vertaaminen itseensä ei todista sen oikeellisuutta.

Testaa selaimessa vähintään 320/390 pikselin mobiilinäkymä ja työpöytä: kaikki
tehtävätyypit, tyhjät/keskeneräiset/oikeat/väärät vastaukset, välimerkit ja olennaiset
aksentit, näppäimistö ja napautus, raahaus/maalaus, osionvaihto, korjaus, nollauksen
peruminen/vahvistus, liikkeen pysäytys ja yhteinen buusteri. Tarkista myös, että
palkintokokoelma siirtyy eri aineen kokeeseen. Kerro, onko testattu fyysisellä
puhelimella vai vain selaimen mobiilikoossa.

Julkaise käyttäjän pyytämään nykyiseen repositorioon. Varmista `origin/main`,
onnistunut Pages-työnkulku ja julkisten HTML/JS/CSS/SVG-tiedostojen vastaavuus
testattuun versioon rivinvaihdot normalisoiden. Luonnos, paikallinen esikatselu ja
vahvistettu julkinen julkaisu ovat eri tiloja.
