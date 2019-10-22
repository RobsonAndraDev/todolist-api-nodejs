# TODO List Rest API
This is a nodejs rest API, that was built by study away. The goal is to use this API as backend from some differents of frontend applications.
This API use mongodb as database and express to handler http requests.

## Usage

* **Insert item:**
`curl -X POST -d '{"id": 2, "name": "go to work", "done": false}' -H "Content-Type: application/json" localhost:3000/add`
* **Remove items:**
``curl localhost:3000/remove/4``