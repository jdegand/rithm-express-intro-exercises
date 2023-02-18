# Rithm Express Intro Exercises

This is my solution to this [repo](https://github.com/rithmschool/express-intro-exercises).

## Part 1 - Mean, Median, Mode

For this exercise, you will build an express.js application that performs three statistical operations:

1.  **mean** (average)
2.  **median** (midpoint)
3.  **mode** (most frequent)

given an arbitrary amount of numbers.

The operations are invoked via **one route per operation**, and results should be printed to a file.

### Requirements

1.  The three base routes are `/mean`, `/median`, `/mode`. All accept GET requests
1.  Each route takes a query key of `nums` which is a comma-separated list of numbers. For example, if I want to get the mean of 1, 3, 5, and 7, that would look like be a GET request to `/mean?nums=1,3,5,7`.
1.  The response of each operation should be a human-readable string, aka: `'The mean of 1, 3, 5, 7 is 4.'`
1.  The human-readable string response should also be written to a file called `results.txt`.
1.  The `results.txt` file should keep track of **every request issued.** Meaning it does not get overwritten each time, and every new request makes a new entry on a new line of the file.
1.  There should be an additional `/results` route, accepting a GET request, which responds with the printed contents of the `results.txt` file.
1.  The app should "gracefully" handle the following errors:
    - Passing in an invalid number (NaN errors). For instance, `/mean?nums=foo,2,3` should respond with a `400 Bad Request` status code and a response that saying something like: `foo is not a number`.
    - Empty input: `/mean` without passing any `nums` should respond with a `400 Bad Request` status code saying something like `nums are required`.
    - No results file. If there are no results written yet, and the user requests `/results`, there should be a `404 Not Found` status code with a response that says something like: `There are no results yet.`

### Bonus

1.  Sending a `DELETE` request to `/results` should remove the text file, meaning a subsequent `GET` to `/results` would be a 404 Not Found.
1.  Provide special handling for an optional query key called `save` that can be set to `false`. This means the operation will not write to file. For example, `/median?nums=1,3,5&save=false` will return a human-readable response but will not write to `results.txt`.
1.  Make a route called `/all` that does all three operations at the same time, with the response from each of them printed one per line.

## Part 2 - Shopping List

For this exercise we will be building a simple application where we will store a shopping list. You should use an **array** to store your items in the shopping list.

Our application should have the following routes:

1.  `GET /items` - this should render a list of shopping items.
1.  `POST /items` - this route should accept form data and add it to the shopping list.
1.  `GET /items/:id` - this route should display a single item's name and price
1.  `PATCH /items/:id`, this route should modify a single item's name and/or price
1.  `DELETE /items/:id` - this route should allow you to delete a specific item from the array.

## Thoughts

- Could use Mathjs versus adding your own functions for mean, mode, and median.
- Apparently, readFileSync is a lot faster than readFile for larger files. See [github](https://github.com/nodejs/node/issues/41435) for more.  
- Had problems with readFile crashing the server when throwing an error inside.  
- Results response needs a key? - it could be a hassle - i.e. data.data / results.results in the front-end
- Problem with results response where an extra "" is in the array - used .filter(Boolean) to remove newline empty string
- Used truncate to clear the contents of the file versus continually deleting and recreating a results.txt file and having to check if the file exists in each route
- Testing - checking for length and using toContain are problematic 
- Testing - had problems with collisions and nesting of requests
- Testing - I should have varied the nums I passed in more often - I think this contributed to collision problems as the returned numbers were more likely to appear in the results.txt file.
- Testing - run the tests multiple times - get different results - readFileSync sometimes doesn't return in time?
- Testing - best case scenario - 1 test fails and worst case - 4 tests fail
- `npm test -- mean.test.ts` to test individual files

## Useful Resources

- [YouTube](https://www.youtube.com/watch?v=QPE7L9b1bms) - express and typescript
- [Stack Overflow](https://stackoverflow.com/questions/63538665/how-to-type-request-query-in-express-using-typescript) - type request query in express using typescript
- [Blog](https://vhudyma-blog.eu/mean-median-mode-and-range-in-javascript/) - mean, median, mode
- [Github](https://github.com/josdejong/mathjs) - mathjs
- [Blog](https://timmousk.com/blog/typescript-empty-object/) - typescript empty object
- [Code Barbarian](https://thecodebarbarian.com/convert-a-string-to-a-number-in-javascript.html) - convert a string to a number
- [W3 Resource](https://www.w3resource.com/javascript-exercises/javascript-array-exercise-52.php) - find all indexes of NaNs
- [Express](https://expressjs.com/en/guide/migrating-5.html) - migrating to 5 
- [CodeConcisely](https://www.codeconcisely.com/posts/how-to-handle-errors-in-express-with-typescript/) - handle errors in express with typescript
- [Github](https://github.com/CodeConcisely/express-error-handling-with-graceful-shutdown) - express error handling with graceful shutdown
- [YouTube](https://www.youtube.com/watch?v=ui2iny2TZ2k) - express error handling
- [YouTube](https://www.youtube.com/watch?v=foB-h3q5PnI) - Node.js+ Express | Global Error Handler Middleware [Episode 5]
- [Stack Overflow](https://stackoverflow.com/questions/50218878/typescript-express-error-function) - typescript express error function
- [Express Docs](https://expressjs.com/en/guide/error-handling.html) - Error handling
- [Stack Overflow](https://stackoverflow.com/questions/10563644/how-to-specify-http-error-code-using-express-js) - specify http error code using express
- [Stack Overflow](https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname) - go back 1 folder level with dirname
- [YouTube](https://www.youtube.com/watch?v=yQBw8skBdZU) - Reading and Writing Files with Node.js | Node JS Beginners Tutorial
- [Stack Overflow](https://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node) - how to append to a file in node
- [YouTube](https://www.youtube.com/watch?v=Bv0sdSGnX2I) - 3. Setting up express with Error handler | Node JS API Authentication
- [YouTube](https://www.youtube.com/watch?v=9lFkwHfkcyA) - (skip first 20 mins) Global Error Handling Middlewares on a TypeScript Express React Project
- [Upmostly](https://upmostly.com/typescript/reading-and-writing-files-with-typescript#:~:text=Reading%20Files%20Synchronously,is%20using%20UTF%2D8%20encoding.) - reading and writing files with typescript
- [Github](https://github.com/nodejs/node/issues/41435) - readFileSync faster than readFile
- [Stack Overflow](https://stackoverflow.com/questions/17371224/node-js-delete-content-in-file) - node js delete content in file
- [YouTube](https://www.youtube.com/watch?v=f2EqECiTBL8&list=PL0Zuz27SZ-6PFkIxaJ6Xx_X46avTM1aYw&index=16) - Node.js Full Course for Beginners | Complete All-in-One Tutorial | 7 Hours
- [Stack Overflow](https://stackoverflow.com/questions/21089842/how-to-chain-http-calls-with-superagent-supertest) - chain http calls with supertest
- [Blog](https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98) - jest matching objects in array