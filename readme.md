# Empirical Exercise
Web server to track and monitoring the model generation process.

## Web Server
### Installing
run `npm install`

### Start app
run `npm start`

running on default port: `5000`

### API
**Get All Models:**

GET `http://localhost:5000/models`

---
**Get All Models By Sort Score:**

GET `http://localhost:5000/models/score`

Res: Return all models sorted by score.

---

**Get Model With Highest Score:**

GET `http://localhost:5000/model/score`

Res: Return one model with highest score.

---

**Get Top X Models By Sort Score:**

GET `http://localhost:5000/models/score/{number (x)}`

Res: Return x models with highest score.

---

**Get All Models By Model Name:**

GET `http://localhost:5000/models/name/{model_name}`

Res: Return all models with model_name.

---

**Get All Models By Model Name and Sort Score:**

GET `http://localhost:5000/models/score/name/{model_name}`

Res: Return all models with model_name sorted by highest score.

---

**Get Model By Model Name and Highest Score:**

GET `http://localhost:5000/model/score/name/{model_name}`

Res: Return one model with model_name and highest score.

---

**Get Top X Models With Model Name:**

GET `http://localhost:5000/models/score/{number (x)}/name/{model_name}`

Res: Return top x models with model_name and highest score.

---

**Get For Each Model Name The Model With Highest Score:**

GET `http://localhost:5000/models/names/score`

Res: Return for each model_name model with  highest score.

---

**Get All Models With Sort File Size (asc):**

GET `http://localhost:5000/models/size`

Res: Return all models sorted by file size.

---

**Get Top X Models By Sort File Size (asc) and Highest score (desc):**

GET `http://localhost:5000/models/size/score/{number (x)}`

Res: Return top x models with smallest file size and highest score.

---

**Get Model By File Size and Score:**

GET `http://localhost:5000/models/fmin/{fmin}/fmax/{fmax}/smin/{smin}/smax/{smax}`

Res: Return all models in range of file size {fmin, fmax} and score {smin, smax}.

---