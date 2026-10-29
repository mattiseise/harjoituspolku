# Harjoituspolun yhteinen koemoottori

Aloitus ja jatkajalle luovutus: [handoff](docs/HANDOFF.md).

Lue ennen uuden harjoituskokeen tekemistä [moottorin ohje](docs/koemoottori.md).
Tämä on kaikkien aineiden ja vuosiluokkien oletus, ei vain Espanjan toteutus.

## Uuden kokeen oletus

- Muokkaa tehtävädataa pohjasta `templates/koe.json`. Luo sivu työkalulla
  `node tools/create-exam.cjs --input <koe.json>`.
- Käytä yhteisiä `quiz`, `grading`, `interactions`, `wordhunt`, `rhythm`, `review`
  ja `rewards`-moduuleja. Älä rakenna uutta tarkistus-, tyyli- tai palkintomoottoria
  äläkä kopioi alkuperäisen suomen K-pop-HTML:n sisäistä sovellusta uudelle kokeelle.
- Käytä neon-, pastel- tai galaxy-teemaa ja nykyistä Kieli & rytmi -näkymää:
  osioittainen eteneminen, tehtäväkortit, oma tulossivu, korjauslinkit ja kertaus.
- Tuetut tehtävät: monivalinta, kirjoittaminen, yhdistäminen/raahaaminen,
  sanapalikat, sananvalinta, kirjoitettavat aukot, virkekäännös ja Sanasukka.
  Valitse koealueeseen sopiva yhdistelmä; kaikkia tyyppejä ei tarvitse käyttää.
- Kaikki aineet käyttävät samaa 50 kortin kokoelmaa. Kokonainen tarkistus avaa
  yhden buusterin per harjoituskerta; korjaus ei luo uutta. Älä vaadi täysiä pisteitä.
- Säilytä napautus- ja näppäimistövaihtoehdot, selitteet, näkyvä kohdistus,
  mobiiliasettelu ja vähennetyn liikkeen tuki. Kirjaimet eivät liiku maalauksen alta.
- Säilytä nimetön käyttö. Vastauksia ei lähetetä palvelimelle; kokoelman pysyvä
  muistaminen on käyttäjän oma valinta. Älä lisää kirjautumista tai seurantaa.

## Sisällön ja julkaisun hyväksymiskriteerit

- Tarkista koealue alkuperäisistä lähteistä, älä pelkästä aiemmasta yhteenvedosta.
  Kirjoita uusia tehtäviä; älä julkaise oppikirjakuvia tai lasten tietoja.
- Jokaisessa tehtävässä ovat oikea vastausavain, perusteltu selitys ja sopiva
  taitotunniste/kertausvinkki. Hyväksy luontevat oikeat vaihtoehdot, hylkää väärä
  merkitys ja persoonamuoto. Älä poista olennaisia aksentteja tai ä/ö/ñ-kirjaimia.
- Keskeneräinen yhdistämis-, palikka-, aukko- tai Sanasukka-tehtävä ei ole valmis
  vastaus eikä osaamisvirhe kertauspalautteessa. Kokonainen tehtävä on yksi piste.
- Rakenteellinen validointi ei todista kielen, sisällön tai lähdevastaavuuden
  oikeellisuutta. Vapaiden käännösten vastauslista ei tunnista kaikkia mahdollisia
  oikeita muotoiluja. Älä väitä tekstitehtävän mittaavan kuuntelua tai omaa ääntämistä.
- Testaa myös oikea, väärä ja keskeneräinen vastaus, korjaaminen, osionvaihdossa
  säilyvät vastaukset, mobiili/näppäimistö ja yhteinen buusteri. Tarkat ajettavat
  tarkistukset ovat moottorin ohjeessa.
- Lisää valmis koe nykyiseen `sisalto/kokeet.js`-kirjastoon työkalun `--register`
  -valinnalla. Luonnosta ei voi rekisteröidä. Älä perusta uutta repoa.
- Noudata käyttäjän julkaisurajausta. Pages-julkaisun jälkeen varmista onnistunut
  työnkulku ja julkiset tiedostot; paikallinen testi ei yksin todista julkaisua.
