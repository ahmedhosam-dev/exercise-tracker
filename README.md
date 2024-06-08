# Exercise Tracker

Simple exercise tracker service. [freecodecmap.org](https://freecodecmap.org/)

# API

### Users

#### Return all users

```url
GET [hostname:port]/api/users
```

##### example josn:

```json
{
  "_id": "user id",
  "username": "user name | strint"
}
```

##### Add user

```url
POST [hostname:posrt]/api/users
```

```json
{
  "username": "user name | string"
}
```

example output same as GET /api/users

---

### Exercises

#### Exercise endpoint add new exercise and create new log

Example input:

```url
POST [hostname:port]/api/:_id/exercises
```

```json
{
  "user": "user id",
  "username": "user name",
  "description": "description of exercise",
  "duration": "duration",
  "date": "date time"
}
```

Example output:

```json
    "_id": "user id",
    "username": "user name",
    "description": "description",
    "duration": "duration",
    "date": "date time"
```

---

### Logs

Exapme output:

```url
GET [hostname:port]/api/users/:_id/logs
```

```json
    "username": "user name",
    "count": "number of exercise",
    "_id": "user id",
    "log": "all exercises"
```

