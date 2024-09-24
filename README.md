# Rasmus-programmering/Projekt-webbtekniker

## Beskrivning

Detta är en väderapplikation byggd med React som använder Geocoding API och Open-Meteo API för att hämta och visa aktuella och genomsnittliga temperaturer för valda städer, byar, ställen eller världsdelar. Applikationen tillåter användare att spara sökningar och markera favoriter, samt växla mellan Celsius och Fahrenheit.

## Funktioner

- Hämta väderdata för en vald stad
- Visa aktuell temperatur och genomsnittlig temperatur
- Växla mellan Celsius och Fahrenheit
- Spara sökningar
- Lägg till och ta bort favoriter
- Visa väderikoner baserat på väderförhållanden

## Installation

1. Klona detta repo:
    ```bash
    git clone https://github.com/Rasmus-programmering/Projekt-webbtekniker.git
    ```
2. Navigera till projektmappen:
    ```bash
    cd Projekt-webbtekniker
    ```
3. Installera nödvändiga paket:
    ```bash
    npm install
    ```
4. Starta utvecklingsservern:
    ```bash
    npm start
    ```

## Användning

1. Skriv in en stad i sökfältet och klicka på "Sök".
2. Väderdata för staden kommer att visas, inklusive aktuell och genomsnittlig temperatur.
3. Klicka på "Visa i Fahrenheit" för att växla till Fahrenheit, eller "Visa i Celsius" för att växla tillbaka.
4. Spara en sökning genom att klicka på "Lägg till Favoriter" bredvid väderdata.
5. Klicka på "Ta bort" bredvid en sparad sökning eller favorit för att ta bort den.

## Jämförelse med andra ramverk/bibliotek

### React

- **Fördelar:**
  - Stor och aktiv community
  - Komponentbaserad arkitektur som underlättar återanvändning och underhåll
  - Mycket flexibelt och kan integreras med olika verktyg och bibliotek
  - Stöd för server-side rendering (SSR) och statisk webbplatsgenerering via Next.js

- **Nackdelar:**
  - Kräver ibland att tredjepartsbibliotek används för att hantera state management (t.ex. Redux)
  - Kan vara överväldigande för nybörjare på grund av flexibiliteten och antalet valmöjligheter

### Vue

- **Fördelar:**
  - Lätt att lära sig och komma igång med
  - Mycket bra dokumentation och lärresurser
  - Inbyggd state management (Vuex) och routing (Vue Router)
  - Flexibel och kan användas för både små och stora projekt

- **Nackdelar:**
  - Mindre community och ekosystem jämfört med React
  - Kan vara mindre prestandaoptimerat för mycket stora applikationer

### Angular

- **Fördelar:**
  - Fullständigt ramverk med allt inkluderat (t.ex. state management, routing, formulärhantering)
  - Starkt typat med TypeScript vilket minskar risken för buggar
  - Stöd för stora och komplexa applikationer
  - Mycket bra verktyg och CLI (Command Line Interface)

- **Nackdelar:**
  - Brantare inlärningskurva på grund av komplexiteten och mängden koncept att lära sig
  - Kan kännas överväldigande för mindre projekt på grund av dess storlek och komplexitet

## Licens

Detta projekt är licensierat under MIT-licensen.
