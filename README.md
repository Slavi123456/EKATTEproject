# EKATTE Project

This project loads and imports data from the official EKATTE files  
(available at the National Statistical Institute: https://www.nsi.bg/nrnm/ekatte/index)  
into a PostgreSQL database.  
A web interface has to be provided for searching settlements and related information.

## TODO

* Load data from the EKATTE JSON files into the database  
* Validate the input data  
* Prevent data duplication when importing multiple times  
* Implement safe SQL queries (avoiding SQL injections)  
* Create a simple web search interface
* Write unit tests

