window.QUIZ = {
  "id": "espanja-5-jaatelobaari",
  "title": "Jäätelöbaari",
  "grade": 5,
  "subject": "Espanja",
  "language": "es",
  "description": "12 jäätelömakua, tilaaminen ja pienet jäätelökeskustelut.",
  "skills": {
    "maut": {
      "title": "Jäätelömaut",
      "reviewTip": "Peitä käännökset ja sano kaikki 12 makua espanjaksi. Kirjoita erityisesti limón, sandía, melocotón ja melón aksentteineen."
    },
    "puhe": {
      "title": "Tilaaminen ja lauseet",
      "reviewTip": "Harjoittele ääneen: Quiero un helado de fresa. ¿Te gusta el helado? Sí, me gusta. Vaihda makua joka kerralla."
    },
    "saa": {
      "title": "Vuodenajat ja sää",
      "reviewTip": "Piirrä neljä vuodenaikaa ja sääsymbolit. Kerro niistä espanjaksi: hace sol, llueve, nieva, está nublado ja hay tormenta."
    },
    "querer": {
      "title": "Querer – haluta",
      "reviewTip": "Kirjoita muistista: quiero, quieres, quiere, queremos, queréis, quieren. Huomaa, että nosotros- ja vosotros-muodoissa vartalo on quer-."
    },
    "ir": {
      "title": "Ir – mennä",
      "reviewTip": "Kirjoita muistista: voy, vas, va, vamos, vais, van. Keksi lauseet a casa, a la heladería ja al parque. Muista a + el = al."
    },
    "sanasto": {
      "title": "Kappaleiden sanasto",
      "reviewTip": "Tee omat sanakortit: una sorpresa, pronto, viajar, una aventura, además, donde, sin ja perdón. Keksi kahdesta sanasta oma lause."
    }
  },
  "sections": [
    {
      "title": "Makutarjottimet",
      "intro": "Yhdistä kaikki neljä paria jokaisessa tarjottimessa."
    },
    {
      "title": "Tilaus tiskiin",
      "intro": "Rakenna lauseet ja valitse oikeat sanat."
    },
    {
      "title": "Oma tilaus",
      "intro": "Palauta sanat mieleen ilman vaihtoehtoja."
    }
  ],
  "questions": [
    {
      "skill": "maut",
      "prompt": "Ensimmäinen makutarjotin: yhdistä maut.",
      "answers": [
        "🍓 mansikka → fresa; vadelma → frambuesa; 🍋 sitruuna → limón; 🍫 suklaa → chocolate"
      ],
      "explanation": "Parit: 🍓 mansikka = fresa; vadelma = frambuesa; 🍋 sitruuna = limón; 🍫 suklaa = chocolate.",
      "language": "es",
      "type": "match",
      "pairs": [
        {
          "left": "🍓 mansikka",
          "right": "fresa"
        },
        {
          "left": "vadelma",
          "right": "frambuesa"
        },
        {
          "left": "🍋 sitruuna",
          "right": "limón"
        },
        {
          "left": "🍫 suklaa",
          "right": "chocolate"
        }
      ],
      "id": "jaatelobaari-1",
      "section": 0
    },
    {
      "skill": "maut",
      "prompt": "Toinen makutarjotin: löydä oikeat parit.",
      "answers": [
        "minttu → menta; vanilja → vainilla; 🍉 vesimeloni → sandía; 🍐 päärynä → pera"
      ],
      "explanation": "Parit: minttu = menta; vanilja = vainilla; 🍉 vesimeloni = sandía; 🍐 päärynä = pera.",
      "language": "es",
      "type": "match",
      "pairs": [
        {
          "left": "minttu",
          "right": "menta"
        },
        {
          "left": "vanilja",
          "right": "vainilla"
        },
        {
          "left": "🍉 vesimeloni",
          "right": "sandía"
        },
        {
          "left": "🍐 päärynä",
          "right": "pera"
        }
      ],
      "id": "jaatelobaari-2",
      "section": 0
    },
    {
      "skill": "maut",
      "prompt": "Kolmas makutarjotin: yhdistä loput maut.",
      "answers": [
        "🍑 persikka → melocotón; meloni → melón; pistaasi → pistacho; 🍒 kirsikka → cereza"
      ],
      "explanation": "Parit: 🍑 persikka = melocotón; meloni = melón; pistaasi = pistacho; 🍒 kirsikka = cereza.",
      "language": "es",
      "type": "match",
      "pairs": [
        {
          "left": "🍑 persikka",
          "right": "melocotón"
        },
        {
          "left": "meloni",
          "right": "melón"
        },
        {
          "left": "pistaasi",
          "right": "pistacho"
        },
        {
          "left": "🍒 kirsikka",
          "right": "cereza"
        }
      ],
      "id": "jaatelobaari-3",
      "section": 0
    },
    {
      "skill": "puhe",
      "prompt": "Tilaa mansikkajäätelö: ”Haluan mansikkajäätelön.”",
      "answers": [
        "Quiero un helado de fresa"
      ],
      "explanation": "Quiero = haluan. Maku tulee ilmauksen un helado de jälkeen.",
      "language": "es",
      "type": "order",
      "tokens": [
        "de",
        "fresa",
        "un",
        "Quiero",
        "helado"
      ],
      "id": "jaatelobaari-4",
      "section": 1
    },
    {
      "skill": "puhe",
      "prompt": "Kerro: ”En halua jäätelöä.”",
      "answers": [
        "No quiero un helado"
      ],
      "explanation": "Kielto no sijoittuu ennen verbiä quiero.",
      "language": "es",
      "type": "order",
      "tokens": [
        "helado",
        "quiero",
        "un",
        "No"
      ],
      "id": "jaatelobaari-5",
      "section": 1
    },
    {
      "skill": "puhe",
      "prompt": "Kysy: ”Pidätkö suklaajäätelöstä?”",
      "answers": [
        "¿Te gusta el helado de chocolate?"
      ],
      "explanation": "Te gusta = pidätkö. Kysymys kirjoitetaan ¿- ja ?-merkkien väliin.",
      "language": "es",
      "type": "order",
      "tokens": [
        "el",
        "chocolate?",
        "gusta",
        "de",
        "¿Te",
        "helado"
      ],
      "id": "jaatelobaari-6",
      "section": 1
    },
    {
      "skill": "puhe",
      "prompt": "Täydennä tilaus: ”Haluan vaniljajäätelön.”",
      "answers": [
        "de"
      ],
      "explanation": "Maku ilmaistaan rakenteella un helado de vainilla.",
      "language": "es",
      "type": "select",
      "sentence": "Quiero un helado ___ vainilla.",
      "options": [
        "a",
        "de",
        "en"
      ],
      "id": "jaatelobaari-7",
      "section": 1
    },
    {
      "skill": "querer",
      "prompt": "Asiakas sanoo: ”Me haluamme kaksi palloa.”",
      "answers": [
        "queremos"
      ],
      "explanation": "Nosotros = me, joten querer taipuu queremos.",
      "language": "es",
      "type": "select",
      "sentence": "Nosotros ___ dos bolas.",
      "options": [
        "quieren",
        "queremos",
        "quiero"
      ],
      "id": "jaatelobaari-8",
      "section": 1
    },
    {
      "skill": "puhe",
      "prompt": "Vastaa myöntävästi: ”Kyllä, pidän.”",
      "answers": [
        "Sí"
      ],
      "explanation": "Sí aksentin kanssa tarkoittaa kyllä. Si ilman aksenttia tarkoittaa jos.",
      "language": "es",
      "type": "select",
      "sentence": "¿Te gusta el helado? — ___, me gusta.",
      "options": [
        "No",
        "Si",
        "Sí"
      ],
      "id": "jaatelobaari-9",
      "section": 1
    },
    {
      "skill": "maut",
      "prompt": "Kirjoita sitruuna espanjaksi (pelkkä maku).",
      "answers": [
        "limón"
      ],
      "explanation": "Sitruuna = limón. Muista ó.",
      "language": "es",
      "id": "jaatelobaari-10",
      "section": 2
    },
    {
      "skill": "maut",
      "prompt": "Kirjoita vesimeloni espanjaksi.",
      "answers": [
        "sandía"
      ],
      "explanation": "Vesimeloni = sandía, meloni = melón. Ne ovat eri sanoja.",
      "language": "es",
      "id": "jaatelobaari-11",
      "section": 2
    },
    {
      "skill": "maut",
      "prompt": "Kirjoita persikka espanjaksi (kirjan sana).",
      "answers": [
        "melocotón"
      ],
      "explanation": "Kirjan sana on melocotón. Muista viimeisen tavun aksentti.",
      "language": "es",
      "id": "jaatelobaari-12",
      "section": 2
    },
    {
      "skill": "puhe",
      "prompt": "Kirjoita ”kaksi palloa” espanjaksi.",
      "answers": [
        "dos bolas"
      ],
      "explanation": "Dos bolas = kaksi palloa. Monikossa bola saa s-päätteen.",
      "language": "es",
      "id": "jaatelobaari-13",
      "section": 2
    },
    {
      "skill": "puhe",
      "prompt": "Kokoa oma tilaus: ”Haluan minttujäätelön.”",
      "answers": [
        "Quiero un helado de menta",
        "Yo quiero un helado de menta"
      ],
      "explanation": "Quiero un helado de menta. Persoonapronominin yo voi jättää pois.",
      "language": "es",
      "id": "jaatelobaari-14",
      "section": 2
    },
    {
      "skill": "puhe",
      "prompt": "Vastaa kysymykseen ¿Quieres un helado? sanomalla ”En, en halua.”",
      "answers": [
        "No, no quiero",
        "No no quiero"
      ],
      "explanation": "Ensimmäinen no vastaa kysymykseen, toinen kieltää verbin: No, no quiero.",
      "language": "es",
      "id": "jaatelobaari-15",
      "section": 2
    },
    {
      "id": "jaatelobaari-16",
      "section": 2,
      "skill": "maut",
      "type": "wordhunt",
      "language": "es",
      "prompt": "Sanasukka: löydä käärmeeseen piilotetut kolme sanaa.",
      "strip": "LUFRESAXOMENTARAPERAZUXXX",
      "words": [
        "fresa",
        "menta",
        "pera"
      ],
      "clues": [
        "mansikka",
        "minttu",
        "päärynä"
      ],
      "answers": [
        "fresa, menta, pera"
      ],
      "explanation": "Löydettävät sanat: fresa = mansikka; menta = minttu; pera = päärynä. Sanat kulkevat käärmeen suuntaisesti, myös rivin mutkan yli."
    }
  ]
};
