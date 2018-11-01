# Intra Epitech: API URLs

L'intra d'Epitech (`intra.epitech.eu`) possède une API assez vaste mais malheureusement non documentée.
J'ai regroupé ici un certains nombres d'urls concernant cette API.

## Authentication

> POST /login

```JSON
{
    login: "XXXX.YYYY@epitech.eu", (require)
    password: "XXXXXXXXXXXXX", (require)
    remember_me: true (optional),
    format:"json"
}
```

## Page d'accueil

### Infos générales

> GET /

```JSON
{
    format:"json"
}
```

### Notification RDV à venir

> GET /user/notification/coming <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Notification Messages

> GET /user/notification/message <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Notification Alertes

> GET /user/notification/alert <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Notification Alertes

> GET /user/notification/missed <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

## Etudiants

### Informations générales

> GET /user/`{XXXX.YYYY@epitech.eu}` <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Modules et notes

> GET /user/`{XXXX.YYYY@epitech.eu}`/notes <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Netsoul

> GET /user/`{XXXX.YYYY@epitech.eu}`/netsoul <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Binome

> GET /user/`{XXXX.YYYY@epitech.eu}`/binome <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Absences

> GET /user/`{XXXX.YYYY@epitech.eu}`/notification/missed <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

### Documents

> GET /user/`{XXXX.YYYY@epitech.eu}`/documents <sup><sup>[SESSION REQUIRED](#authentication)</sup></sup>

```JSON
{
    format:"json"
}
```

## Planning

> GET /planning/load

```JSON
{
    start: "YYYY/MM/DD",
    end: "YYYY/MM/DD",
    format:"json"
}
```

## Modules

> GET /module/board

```JSON
{
    start: "YYYY/MM/DD",
    end: "YYYY/MM/DD",
    format:"json"
}
```

## Projets

> GET /course/filter

```JSON
{
    location: "FR/PAR"
    course: "master/classic",
    scolaryear: "YYYY",
    preload: 1,
    format:"json"
}
```
