# Files #

To setup:
> npm install

To run:
> node app.js

You can now access the URL `http://localhost:3000/api/ls?path=.` and you should see stuff.

Also try:
`http://localhost:3000/api/cat?path=app.js`

### The GUI
..is taking shape at http://localhost:3000/

## TODOs ##

For the API:
* Support POST - creating a new file
* Support PUT - changing the contents of an existing file
* Support filtering in GET-requests

## Current Problems to Solve ##

1. Cannot navigate directly to a file URL (i.e must always start from root)

2. Cannot click on files

3. Cannot manually type path in nav bar (related to 1.)

4. Cannot filter files

5. Cannot sort files