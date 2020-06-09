# Host service

> This service clones Airbnb host module for property description. It is part of Front-end capstone project at Hack Reactor.

## Related Projects

  - https://github.com/RPT20-FEC/similarprops-service-SDC
  - https://github.com/RPT20-FEC/photo-service-SDC
  - https://github.com/RPT20-FEC/sdc-listing-service
  - https://github.com/RPT20-FEC/Anush-sdc-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> API endpoints

GET  /:id
// responds with an HTML page displaying host information for the property with matching listingId or headline

GET  /hosts/:id
// returns host data based on the host id

GET  /listings/:id/hosts
// returns host data based on the listing id

GET  /hosts
// returns all records

GET  /hosts/:id/co-hosts
// returns cohost data for cohost component if a host has cohosts

POST  /hosts
// creates a new host

PUT  /hosts/:id
// updates host data for the host with matching host id

DELETE  /hosts/:id
// deletes the record from database that belongs to the host with matching host id


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 12.16.2
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

