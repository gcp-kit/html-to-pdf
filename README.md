# html-to-pdf

Convert HTML to PDF

## Usage

```sh
gcloud app deploy --project $PROJECT_ID
```

### How to use on Docker Compose

```yaml
ledger:
  build:
    context: ledger
```

### Try it out

```sh
curl -X POST http://localhost:3000/create_ledger -H 'Content-Type: text/html' -d '<html><body><h1>Hello, world.</h1></body></html>' --output hello.pdf
```
