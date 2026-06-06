# Progetto Anime Database di Nwafuleze Diandra (s00019524)

## Panoramica del Progetto
Questo progetto è un'applicazione React sviluppata come progetto finale per il corso **EPICODE Frontend Programming**. Si tratta di una piattaforma dedicata al mondo degli anime, in cui gli utenti possono esplorare il catalogo dei titoli, consultare informazioni dettagliate e interagire creando recensioni personali.

## Funzionalità Principali e Requisiti

### 1. State Management
*   **Stato Locale e Side Effects:** L'applicazione fa uso degli hook `useState` e `useEffect` in vari componenti per la gestione reattiva degli stati della UI.
*   **Stato Globale:** È stato implementato **Redux Toolkit** per centralizzare e gestire lo stato di autenticazione dell'utente (Login), i dati relativi agli anime e le preferenze impostate dall'amministratore (Anime in evidenza).
*   **Azioni Asincrone:** Utilizza **Redux Thunk** (`createAsyncThunk`) per gestire in modo efficiente le chiamate API, tracciando e coordinando gli stati di caricamento, successo ed errore.

### 2. Pagine e Routing
L'applicazione implementa **React Router** per garantire una navigazione fluida attraverso **6 pagine distinte**:
1.  **Homepage:** Pagina di benvenuto che offre una panoramica dei contenuti in evidenza e collegamenti rapidi al catalogo e al login.
2.  **Catalogo Anime:** Sezione dedicata all'esplorazione del database tramite API, strutturata con una paginazione per visualizzare 24 anime per pagina.
3.  **Dettagli Anime:** Utilizza il routing dinamico per mostrare la scheda approfondita di uno specifico anime, includendo la trama, il punteggio globale e le recensioni scritte dagli utenti.
4.  **Dashboard Admin:** Area riservata esclusivamente agli amministratori per gestire e curare la lista degli anime "In Evidenza" (Featured) mostrati nella Homepage.
5.  **Profilo Utente:** Pagina personale dedicata alla gestione delle recensioni dell'utente loggato, con funzionalità per crearle, modificarle o eliminarle.
6.  **Login:** Portale dedicato all'autenticazione dell'utente.

### 3. Utenti e Gestione dei Ruoli
*   **Autenticazione Simulata:** Il sistema include un meccanismo di login simulato che verifica le credenziali inserite confrontandole con i dati presenti nel database locale basato su JSON Server.
*   **Ruoli:** Il sistema distingue le autorizzazioni basandosi su duue ruoli utente principali: **Utente Standard** e **Admin**.
*   **Rendering Condizionale:** L'interfaccia si adatta dinamicamente in base ai privilegi dell'utente. Solo gli utenti autenticati possono scrivere e pubblicare recensioni, mentre l'accesso alla Dashboard per gestire la sezione "In Evidenza" è limitato esclusivamente agli account Admin.

### 4. Integrazione API
L'applicazione si interfaccia dinamicamente con due differenti fonti dati per garantire un'esperienza completa:
*   **API Esterna:** Sfrutta l'API pubblica **Jikan API** (https://jikan.moe/) per ottenere informazioni aggiornate in tempo reale sul vasto catalogo anime, recuperando tutti le informazioni necessarie relative ad essi.
*   **API Locale:** Utilizza **JSON Server** per simulare un database di backend (`db.json`). Questo permette di gestire gli account utente, salvare persistentemente le recensioni scritte e aggiornare l'elenco degli anime in evidenza.

### 5. Form e Validazione
Il progetto integra form controllati sviluppati con **React Hook Form**, che includono meccanismi rigorosi di validazione dei dati e gestione degli errori:
1.  **Form di Login:** Verifica il corretto formato dell'indirizzo email e si assicura che il campo della password venga correttamente compilato.
2.  **Form di Creazione Recensioni:** Consente agli utenti loggati di scrivere una recensione.
3.  **Form di Aggiunta Anime in Evidenza (Admin):** Permette agli amministratori di inserire nuovi anime, validando i dati inseriti prima di renderli visibili sulla homepage della piattaforma.

## Tecnologie Principali

*   **Core:** React 19, Vite
*   **Routing:** React Router v7
*   **State Management:** Redux Toolkit, React Redux
*   **Styling:** React Bootstrap, Bootstrap CSS
*   **Form Handling:** React Hook Form
*   **Backend Fittizio:** JSON Server, Concurrently (utilizzato per lanciare il servizio principale React e il server JSON con un singolo comando da terminale).

## Istruzioni per l'Avvio

### Prerequisiti
*   [Node.js] installato sul proprio computer.

### Installazione e Setup

1.  **Terminale:**
    Aprire il terminale GitBash all'interno della cartella principale del progetto.

2.  **Installazione delle dipendenze:**
    Scaricare e installare tutti i pacchetti necessari eseguendo il comando:
    ```bash
    npm install
    ```

3.  **Avvio dell'ambiente di sviluppo:**
    Grazie alla libreria `concurrently`, è possibile avviare sia l'applicazione React che il database simulato contemporaneamente. Digitare:
    ```bash
    npm run dev
    ```

    *   Il frontend React sarà accessibile all'indirizzo: `http://localhost:5173`
    *   Il backend fittizio (JSON Server) sarà in esecuzione su: `http://localhost:5000`

### Account di Test
Per poter esplorare le funzionalità che richiedono un'autenticazione o privilegi specifici, è possibile effettuare il login utilizzando le credenziali già presenti nel database (`db.json`):

*   **Utente Standard:** 
    *   Email: `user@test.com`
    *   Password: `password123`
*   **Utente Admin:** 
    *   Email: `admin@test.com`
    *   Password: `adminpassword`