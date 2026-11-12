export interface Faq { question: string; answer: string }

// Textes propres à www.iptvnederlandd.com (12/11/2026) : jamais copiés d'un autre site du réseau (règle d'or n°11).
// Faits confirmés seulement (règle d'or n°1) : prix du réseau, 50.000+ / 80.000+ zenders, 140.000+ / 200.000+ films en series,
// SD tot 4K, EPG, direct actief na betaling, hulp 24/7 via WhatsApp, 1 à 4 schermen, actie 12 + 3.

// FAQ de l'accueil
export const HOME_FAQ: Faq[] = [
  {
    question: 'Hoe werkt IPTV kopen bij jullie?',
    answer:
      'Je kiest op de site je pakket, de looptijd en het aantal schermen. Daarna tik je op de groene knop: WhatsApp opent met je keuze al ingevuld. Je krijgt een betaallink, en na het betalen staan je inloggegevens in hetzelfde gesprek.',
  },
  {
    question: 'Hoe snel kan ik kijken?',
    answer:
      'Direct na je betaling. Je gegevens komen meteen binnen in WhatsApp, samen met de stappen voor jouw tv, stick, telefoon of computer.',
  },
  {
    question: 'Wat maakt een IPTV-dienst goed?',
    answer:
      'Een stabiele server, een duidelijke totaalprijs, een programmagids, beeld tot 4K waar je apparaat het aankan, en vooral iemand die je helpt als iets niet lukt. Bij ons is dat hulp in het Nederlands via WhatsApp, dag en nacht.',
  },
  {
    question: 'Standard of Premium: wat kies ik?',
    answer:
      'Standard heeft 50.000+ zenders en 140.000+ films en series. Premium heeft 80.000+ zenders, 200.000+ films en series en een krachtigere server. Kijk je veel tegelijk of op drukke avonden, dan is Premium de veilige keuze.',
  },
  {
    question: 'Op hoeveel schermen kan ik kijken?',
    answer:
      'Op 1, 2, 3 of 4 schermen tegelijk, dat kies je bij het bestellen. Elk extra scherm geeft korting per scherm: 10 % bij 2, 20 % bij 3 en 30 % bij 4.',
  },
  {
    question: 'Welke internetsnelheid heb ik nodig?',
    answer:
      'Reken op ongeveer 10 Mbit/s voor HD en 25 Mbit/s voor 4K, per scherm dat tegelijk kijkt. Met een netwerkkabel naar je tv of kastje is het beeld het rustigst.',
  },
];

// FAQ de la page prix
export const PRICE_FAQ: Faq[] = [
  {
    question: 'Is de grote prijs per maand?',
    answer:
      'Nee, het grote bedrag is wat je in één keer betaalt voor de hele looptijd. Het bedrag per maand eronder is alleen ter vergelijking.',
  },
  {
    question: 'Hoe krijg ik de 3 extra maanden?',
    answer:
      'Kies 12 maanden. Je betaalt 12 maanden en kijkt er 15. Dat geldt voor Standard en Premium en voor elk aantal schermen.',
  },
  {
    question: 'Kan ik later overstappen naar Premium?',
    answer:
      'Stuur ons een bericht in WhatsApp, dan kijken we samen wat het beste past bij je huidige abonnement.',
  },
  {
    question: 'Welke betaalmethoden zijn er?',
    answer:
      'iDEAL, PayPal, Visa, Mastercard en Apple Pay, via een beveiligde betaallink die je in WhatsApp krijgt. De website zelf neemt geen betalingen aan.',
  },
];

// FAQ de la page « IPTV kopen »
export const BUY_FAQ: Faq[] = [
  {
    question: 'Moet ik een account aanmaken om IPTV te kopen?',
    answer: 'Nee. Je bestelling loopt helemaal via WhatsApp: kiezen, betalen en je gegevens ontvangen.',
  },
  {
    question: 'Zit ik na de looptijd ergens aan vast?',
    answer: 'Je betaalt één keer voor 3, 6 of 12 maanden. Wil je daarna verder kijken, dan stuur je ons een bericht.',
  },
  {
    question: 'Wat als het niet lukt op mijn tv?',
    answer: 'Stuur een foto van je scherm in WhatsApp en zeg welk apparaat je hebt. We lopen de stappen samen met je door.',
  },
];

// Page FAQ complète, par rubrique
export const FAQ_GROUPS: { id: string; title: string; items: Faq[] }[] = [
  {
    id: 'iptv',
    title: 'Over IPTV',
    items: [
      {
        question: 'Wat is IPTV?',
        answer:
          'Televisie via je internetverbinding. Je opent een app op je tv, kastje, telefoon of computer en kiest een zender, een film of een serie. Een kabel- of schotelaansluiting heb je er niet voor nodig.',
      },
      HOME_FAQ[2],
      HOME_FAQ[5],
    ],
  },
  {
    id: 'kopen',
    title: 'Kopen en betalen',
    items: [HOME_FAQ[0], HOME_FAQ[1], ...BUY_FAQ.slice(0, 2), PRICE_FAQ[3]],
  },
  { id: 'pakketten', title: 'Pakketten en prijzen', items: [HOME_FAQ[3], HOME_FAQ[4], PRICE_FAQ[0], PRICE_FAQ[1]] },
  {
    id: 'apparaten',
    title: 'Apparaten en installeren',
    items: [
      {
        question: 'Op welke apparaten werkt het?',
        answer:
          'Op Smart TV’s zoals Samsung en LG, Android TV en Google TV, Android-kastjes, Amazon Fire TV Stick, iPhone en iPad, Android-telefoons en tablets, en op Windows en Mac.',
      },
      {
        question: 'Mijn tv is niet smart. Kan ik toch kijken?',
        answer:
          'Ja, met een kastje of stick in de HDMI-ingang. Wil je meteen klaar zijn? Ons Android TV-kastje komt met 12 maanden Premium.',
      },
      BUY_FAQ[2],
    ],
  },
  {
    id: 'beeld',
    title: 'Beeld en hulp',
    items: [
      {
        question: 'In welke kwaliteit kijk ik?',
        answer: 'SD, HD, Full HD of 4K. Dat hangt af van de zender, je apparaat en je internetverbinding.',
      },
      {
        question: 'Wat doe ik als het beeld hapert?',
        answer:
          'Zet je modem en je tv of kastje even uit en weer aan. Gebruik als het kan een netwerkkabel, en kijk of er in huis niet veel tegelijk wordt gedownload. Blijft het haperen, stuur ons dan een bericht.',
      },
      {
        question: 'Wanneer kan ik jullie bereiken?',
        answer: 'Altijd: dag en nacht via WhatsApp, in het Nederlands.',
      },
    ],
  },
];
