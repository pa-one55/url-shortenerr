URL Shortener 

- design a URL Shortener service that takes in a valid URL and returns a shortened URL, redirecting the user to the previously shortened URL.

also keep a track of total clicks/visits on the URL

Routes :
POST/URL - generates a new short url ans returns the shortened url in the format - example.com/random-id

GET/:ID - redirects the user to the original URL

GET/URL/analytics/:id - returns the clicks for the provided short id.

TECH USED :
1 - Node JS
2 - Express - for routing and middleware stuff 
3 - Mongo DB - database
4 - EJS - for server side rendering
5 - Postman - for API requests