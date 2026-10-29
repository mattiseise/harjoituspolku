window.QUIZ = {
  "id": "espanja-5-saaseikkailu",
  "title": "Sääseikkailu",
  "grade": 5,
  "subject": "Espanja",
  "language": "es",
  "description": "Vuodenajat, sääsymbolit ja oma espanjankielinen säätiedotus.",
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
      "title": "Sääkartta",
      "intro": "Yhdistä sanat ja niiden merkitykset."
    },
    {
      "title": "Sääaseman valinnat",
      "intro": "Valitse jokaiseen lauseeseen oikea sana."
    },
    {
      "title": "Oma säätiedotus",
      "intro": "Rakenna ja kirjoita sääilmauksia."
    }
  ],
  "questions": [
    {
      "skill": "saa",
      "prompt": "Vuodenaikapolku: yhdistä neljä vuodenaikaa.",
      "answers": [
        "🌱 kevät → la primavera; ☀️ kesä → el verano; 🍂 syksy → el otoño; ❄️ talvi → el invierno"
      ],
      "explanation": "Parit: 🌱 kevät = la primavera; ☀️ kesä = el verano; 🍂 syksy = el otoño; ❄️ talvi = el invierno.",
      "language": "es",
      "type": "match",
      "pairs": [
        {
          "left": "🌱 kevät",
          "right": "la primavera"
        },
        {
          "left": "☀️ kesä",
          "right": "el verano"
        },
        {
          "left": "🍂 syksy",
          "right": "el otoño"
        },
        {
          "left": "❄️ talvi",
          "right": "el invierno"
        }
      ],
      "id": "saaseikkailu-1",
      "section": 0
    },
    {
      "skill": "saa",
      "prompt": "Sääkartta: yhdistä sääilmaus merkitykseen.",
      "answers": [
        "🌬️ tuulee → Hace viento; ☀️ aurinko paistaa → Hace sol; 🌧️ sataa vettä → Llueve; 🌨️ sataa lunta → Nieva"
      ],
      "explanation": "Parit: 🌬️ tuulee = Hace viento; ☀️ aurinko paistaa = Hace sol; 🌧️ sataa vettä = Llueve; 🌨️ sataa lunta = Nieva.",
      "language": "es",
      "type": "match",
      "pairs": [
        {
          "left": "🌬️ tuulee",
          "right": "Hace viento"
        },
        {
          "left": "☀️ aurinko paistaa",
          "right": "Hace sol"
        },
        {
          "left": "🌧️ sataa vettä",
          "right": "Llueve"
        },
        {
          "left": "🌨️ sataa lunta",
          "right": "Nieva"
        }
      ],
      "id": "saaseikkailu-2",
      "section": 0
    },
    {
      "skill": "saa",
      "prompt": "Täydennä: ”On pilvistä.”",
      "answers": [
        "Está"
      ],
      "explanation": "On pilvistä = Está nublado. Tässä käytetään estar-verbiä.",
      "language": "es",
      "type": "select",
      "sentence": "___ nublado.",
      "options": [
        "Hace",
        "Está",
        "Hay"
      ],
      "id": "saaseikkailu-3",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Täydennä: ”Myrskyää.”",
      "answers": [
        "Hay"
      ],
      "explanation": "Myrskyää = Hay tormenta.",
      "language": "es",
      "type": "select",
      "sentence": "___ tormenta.",
      "options": [
        "Hay",
        "Hace",
        "Está"
      ],
      "id": "saaseikkailu-4",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Täydennä: ”On kylmä.”",
      "answers": [
        "frío"
      ],
      "explanation": "Hace frío = on kylmä. Hace calor = on kuuma.",
      "language": "es",
      "type": "select",
      "sentence": "Hace ___.",
      "options": [
        "calor",
        "frío",
        "sol"
      ],
      "id": "saaseikkailu-5",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Valitse oikea vuodenaika: syksy.",
      "answers": [
        "otoño"
      ],
      "explanation": "El otoño = syksy. En otoño = syksyllä.",
      "language": "es",
      "type": "select",
      "sentence": "En ___ hay hojas de muchos colores.",
      "options": [
        "verano",
        "otoño",
        "invierno"
      ],
      "id": "saaseikkailu-6",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Täydennä: ”On 10 astetta pakkasta.”",
      "answers": [
        "bajo"
      ],
      "explanation": "Bajo cero = nollan alapuolella eli pakkasta.",
      "language": "es",
      "type": "select",
      "sentence": "Hace diez grados ___ cero.",
      "options": [
        "de",
        "bajo",
        "con"
      ],
      "id": "saaseikkailu-7",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Kerro: ”On hyvä sää.”",
      "answers": [
        "buen"
      ],
      "explanation": "Kirjan ilmaus on Hace buen tiempo. Buen tulee ennen maskuliinista yksikön substantiivia tiempo.",
      "language": "es",
      "type": "select",
      "sentence": "Hace ___ tiempo.",
      "options": [
        "bien",
        "bueno",
        "buen"
      ],
      "id": "saaseikkailu-8",
      "section": 1
    },
    {
      "skill": "saa",
      "prompt": "Rakenna sääkysymys: ”Millainen sää on?”",
      "answers": [
        "¿Qué tiempo hace?"
      ],
      "explanation": "¿Qué tiempo hace? kysyy, millainen sää on.",
      "language": "es",
      "type": "order",
      "tokens": [
        "hace?",
        "¿Qué",
        "tiempo"
      ],
      "id": "saaseikkailu-9",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kerro: ”On kylmä ja sataa lunta.”",
      "answers": [
        "Hace frío y nieva"
      ],
      "explanation": "Hace frío y nieva. Sanoja yhdistää y = ja.",
      "language": "es",
      "type": "order",
      "tokens": [
        "y",
        "frío",
        "nieva",
        "Hace"
      ],
      "id": "saaseikkailu-10",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kirjoita ”On kuuma.” espanjaksi.",
      "answers": [
        "Hace calor"
      ],
      "explanation": "Hace calor = on kuuma. Espanjaksi ei sanota tässä está calor.",
      "language": "es",
      "id": "saaseikkailu-11",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kirjoita ”On huono sää.” espanjaksi.",
      "answers": [
        "Hace mal tiempo"
      ],
      "explanation": "Hace mal tiempo = on huono sää.",
      "language": "es",
      "id": "saaseikkailu-12",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kirjoita ”Sataa vettä.” espanjaksi (yksi sana).",
      "answers": [
        "Llueve"
      ],
      "explanation": "Llueve = sataa vettä. Nieva = sataa lunta.",
      "language": "es",
      "id": "saaseikkailu-13",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kirjoita kevät espanjaksi. Artikkeli on vapaaehtoinen.",
      "answers": [
        "la primavera",
        "primavera"
      ],
      "explanation": "Kevät = la primavera.",
      "language": "es",
      "id": "saaseikkailu-14",
      "section": 2
    },
    {
      "skill": "saa",
      "prompt": "Kirjoita talvi espanjaksi. Artikkeli on vapaaehtoinen.",
      "answers": [
        "el invierno",
        "invierno"
      ],
      "explanation": "Talvi = el invierno. Vuodenaikoihin kuuluvat myös primavera, verano ja otoño.",
      "language": "es",
      "id": "saaseikkailu-15",
      "section": 2
    },
    {
      "id": "saaseikkailu-16",
      "section": 2,
      "skill": "saa",
      "type": "wordhunt",
      "language": "es",
      "prompt": "Sanasukka: löydä käärmeeseen piilotetut kolme sanaa.",
      "strip": "LUOTOÑOXOINVIERNORALLUEVEZUXXX",
      "words": [
        "otoño",
        "invierno",
        "llueve"
      ],
      "clues": [
        "syksy",
        "talvi",
        "sataa vettä"
      ],
      "answers": [
        "otoño, invierno, llueve"
      ],
      "explanation": "Löydettävät sanat: otoño = syksy; invierno = talvi; llueve = sataa vettä. Sanat kulkevat käärmeen suuntaisesti, myös rivin mutkan yli."
    }
  ]
};
