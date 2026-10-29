# Harjoituspolku – handoff seuraavalle agentille

## Aloita tästä

Työ jatkuu olemassa olevassa repossa **mattiseise/harjoituspolku**:
https://github.com/mattiseise/harjoituspolku

Julkinen sivusto: https://mattiseise.github.io/harjoituspolku/
Julkaisuhaara on `main`, Pages julkaisee juurikansiosta. Sivusto on staattinen,
nimetön ja ilman kirjautumista. Älä perusta uutta repoa tai erillistä palkintojärjestelmää.

Lue ensin juuren `AGENTS.md`, sitten `docs/koemoottori.md`. Tämä handoff on
aloitusopas; yksityiskohtaiset skeemat ja hyväksymiskriteerit ovat moottorin ohjeessa.
Tarkista aina nykyinen Git-tila ja etähaaran muutokset ennen muokkausta. Älä poista
muiden keskeneräisiä muutoksia. Paikallinen checkout-polku vaihtelee agentin mukaan.

## Valmis yhteinen toteutus

Uudet kokeet käyttävät Kieli & rytmi -ilmettä: neon-, pastelli- tai tähtiteema,
osioittainen eteneminen, sama tehtäväkorttien tyyli, erillinen tulosnäkymä,
korjauslinkit ja taitokohtainen kertaus. Uusia harjoituksia ei tehdä vanhan
`perusteet.html`-sivun ulkoasulla. Vanha itsenäinen suomen K-pop-paketti säilyy
käytössä, mutta sen sisäistä sovellusta ei kopioida uuden kokeen pohjaksi.

Moottori tukee monivalintaa, tekstivastausta, yhdistämistä/raahaamista,
sanapalikoista järjestämistä, sananvalintaa, kirjoitettavia aukkoja,
virkekäännöstä sekä Sanasukkaa eli maalattavaa kirjainkäärmettä.
Napautus- ja näppäimistövaihtoehdot ovat mukana. Käärmeellä on tyylitelty,
animoitu hahmo, pysäytyspainike ja vähennetyn liikkeen tuki. Kirjainalue pysyy paikallaan.

Kokonainen tehtävä on yksi piste. Keskeneräinen vastaus erotetaan väärästä eikä
sitä käsitellä osaamisvirheenä kertauksessa. Kaikkiin tehtäviin vastaaminen ja
tarkistus avaa yhden buusterin, vaikka olisi virheitä. Korjauskierros säilyttää
saman palkinnon; alusta aloittaminen luo uuden harjoituskerran. Kaikki aineet ja
vuosiluokat kerryttävät samaa 50 K-pop-kortin kokoelmaa. Palkintosivun historiallinen
polku on `sisalto/5/suomen-kieli/kpop/index.html?palkinnot=1` myös muille luokille.
Vastaukset ovat sivun muistissa. Yhteinen kokoelma kulkee välilehden sessionStorage-
muistissa; pysyvä laitteelle muistaminen valitaan erikseen. Ei lasten tietoja palvelimelle.

## Tiedostokartta

- `index.html`, `sisalto/kokeet.js`: kirjasto ja suodatus luokan/aineen mukaan.
- `templates/koe.json`: kaikkien kahdeksan tehtävätyypin muokattava esimerkki.
- `templates/koe.html.tpl`: yhteinen sivurunko ja moduulien latausjärjestys.
- `tools/create-exam.cjs`: datan validointi, HTML/JS-generointi ja valinnainen kirjastoon lisääminen.
- `assets/quiz.js`, `grading.js`: tehtävien näyttö, tarkistus ja mallivastaukset.
- `assets/interactions.js`, `wordhunt.js`: raahaus, napautus, näppäimistö, aukot ja Sanasukka.
- `assets/rhythm.css`, `rhythm.js`, `rhythm-*.svg`: yhteinen ilme ja osio-/tulosnäkymät.
- `assets/review.js`, `rewards.js`: kertaus ja yhteinen korttikokoelma.
- `sisalto/5/espanja/`: valmiit yhteisen moottorin käyttöesimerkit.
- `sisalto/5/suomen-kieli/kpop/index.html`: alkuperäinen sovellus ja yhteinen palkintosivu.

## Seuraavan kokeen tekeminen

1. Kopioi `templates/koe.json` omaksi lähdetiedostoksi. Vaihda tunnisteet, luokka,
   aine, polku, teema, kieli, koealue, taidot, osiot ja tehtävät. Valitse sopiva
   tehtävätyyppien yhdistelmä; kaikkia ei tarvitse käyttää joka kokeessa.
2. Tarkista sisältö alkuperäisistä lähteistä. Tee alkuperäisiä tehtäviä ja riittävän
   täsmälliset pyynnöt. Tarkista kieli, hyväksyttävät vaihtoehdot, väärän merkityksen
   hylkäys, selitykset ja kertausvinkit. Älä julkaise oppikirjakuvia.
3. Luo sivut: `node tools/create-exam.cjs --input <koe.json>`. Kohde syntyy polkuun
   `sisalto/<grade>/<subjectSlug>/<slug>.html` ja `.js`. Olemassa oleva kohde
   tarvitsee `--replace`-valinnan. Muokkaa lähde-JSON:ia, generoi siitä uudelleen.
4. `draft` näyttää vain luonnosilmoituksen. Aseta `ready` paikallista suorittamista
   varten, kun sisältö on tarkistettu. Tämä on tekijän ilmoitus, ei automaattinen
   sisällön oikeellisuuden takuu. Säilytä JSON-lähde repossa sisältökansiossa.
5. Testaa alla. Lisää vasta valmis koe kirjastoon samalla komennolla ja valinnoilla
   `--replace --register`. Työkalu ei oletuksena muuta kirjastoa.
6. Julkaise käyttäjän valtuutuksen mukaan nykyiseen repoon. Varmista etähaaran
   versio, onnistunut Pages-työnkulku ja julkisen sisällön vastaavuus.

## Tarkistukset ja rajat

Aja `node tools/check-exam-template.cjs`, `node tools/check.cjs`,
`node tools/check-review.cjs`, `node tools/check-shared-rewards.cjs`,
`node tools/check-boosters.cjs` sekä Espanjan regressiot
`node tools/check-spanish.cjs` ja `node tools/check-spanish-content.cjs`.

Uusi sisältö tarvitsee myös riippumattomat hyväksyntä-/hylkäysesimerkit.
Skeemavalidointi tai vastausavaimen vertailu itseensä ei todista sisältöä oikeaksi.
Aksentteja tai ä/ö/ñ-kirjaimia ei poisteta. Käännöksissä hyväksytään listatut
muotoilut; vapaata semanttista arviointia ei ole. Tekstitehtävä ei mittaa kuullun
ymmärtämistä tai lapsen omaa ääntämistä.

Selaintarkistus: 320 ja 390 pikselin leveys sekä työpöytä; oikea/väärä/tyhjä/
osittainen vastaus, osionvaihdossa säilyminen, napautus, näppäimistö, raahaus ja
maalaus, palaute, korjaus, nollauksen peruminen/vahvistus, liikkeen pysäytys,
sama buusteri korjauksen jälkeen ja kokoelman siirtyminen toiseen aineeseen.
Ilmoita erikseen, jos testattu vain selaimen mobiilikoossa eikä fyysisellä puhelimella.

K-pop-HTML sisältää yhteisten moduulien upotettuja offline-kopioita ja skriptin
CSP-tiivisteen. Jos muutat niitä, synkronoi kopiot ja päivitä tiiviste; nykyiset
regressiot tarkistavat vastaavuuden. Älä muuta korttikuvien lisenssejä tai lähdetietoja.

## Espanjan lähteiden erityisrajaus

Kolme valmista harjoitusta: Jäätelöbaari 20, Sääseikkailu 20 ja K-pop-finaali 26
tehtävää. `pohja.html` on niiden valintasivu. Koealueen otsikko on s. 186–210,
mutta toimitetuissa kuvissa näkyivät vain sivut 186–189, 192–195, 202–207 ja 210.
Älä väitä kaikkia väliin jääviä sivuja tarkastetuiksi. Alkuperäisiä kuvia ei ole
julkisessa repossa: jos uusi muutos vaatii niitä, hae saatavilla olevat alkuperäiset
liitteet tai pyydä puuttuva aineisto; älä arvaa sisältöä pelkän sivunumeron perusteella.
Espanjan sisällön riippumaton tarkistin sisältää 334 hyväksyntä-/hylkäystapausta.

## Valmistumisen raportointi

Kerro mitä muuttui, mitä oikeasti tarkistettiin ja onko muutos julkaistu.
Paikallinen testi, etärepon päivitys ja valmis julkinen Pages-julkaisu ovat eri
vaiheita. Älä ilmoita julkaisua valmiiksi ennen sen varmistamista.
