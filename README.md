# quotes-api
An API for getting back random quotes for use in applications such as typing speed tests.

## Documentation
1. https://www.apollographql.com/docs/apollo-server/getting-started/
2. https://medium.com/@sppericat/how-to-setup-an-apollo-graphql-server-on-vercel-cc3f2dd72b3e
3. https://www.apollographql.com/docs/apollo-server/api/express-middleware

## Todo
1. Add rate limiting
2. Create a navbar
3. In the navbar, have a tab to take you to an upload page. This will allow users to upload PDFs and add tags to the uploaded PDF to specify where its from (e.g. Books, Movies, etc.) or more specific like (e.g. Animal Farm, Hulk, etc.). Backend will scan the PDF and add the sentences to an existing database. Allows for easy scaling instead of manually putting in quotes myself. For the tags, I can add in checks or some popup that tells the user to search for existing tags before making a new one.