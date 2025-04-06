Hello!  Thank you for reviewing my submission.

# Back end discussion

The first thing I noticed was that the backend was set up to use Typescript, but types weren't widely in use, like this project might have been adapted from javascript.  If I had more time, I would explicitly state types everywhere instead of letting them be inferred.  

I pulled on that thread and found that Drizzle has two postgres drivers.  I would suggest using the `drizzle-orm/node-postgres` instead of `drizzle-orm/postgres-js` for reasons outlined [here](https://orm.drizzle.team/docs/get-started-postgresql).  

This was my first time using Drizzle, and I found it easier to implement a raw sql query for this specific search operation.  In the end, I think I resolved my issue that led me to the raw sql approach- but I already had this working and was running out of time. 

The next thing I was going to add to this project was using `limit` and `offset` in postgres to move pagination to the backend, so we keep the size of the data sent to the clients manageable and scalable. 

In `route.ts` I'm not sure why req.query couldn't be destructured like I wanted it to, so I worked around it.
I hid a roadblock working on the `Response.error()` to behave how I wanted it to, so I focused my time elsewhere, but given more time I would make sure I send 400 or 500 based on what happened.


# Front end discussion

I noticed that the innerHTML of the input was being modified directly in the onChange handler.  This is a mistake because it skips the virtual DOM, and can lead to differences between the virtual and actual DOM.  React uses the virtual DOM tontarget and re-render only DOM elements whose content has changed.  Under the hood, React relies the diffing algorithm to detect changes in its components to trigger the re-renders.  The solution is to use the `useState` hook, which will hold the state variables and trigger re-renders when it changes. Then, we can also leverage the `useEffect` hook to take action, like invoking API endpoints.

I'm a big fan of hooks and have been using them since they released in 2019.  They are great because they removed the need for component lifecycle methods like `componentDidMount`, and there are many usefull hooks like `useRef` which can give you access to DOM elements directly.  I like to encourage my team to use hooks whenever possible because it is a re-usable and flexible pattern that's here to stay (I think).  I often include a custom `useTheme` hook of my own if one is not provided by the component library.  

As an example, I included a `useDebounce()` hook.  This hook is intended to ignore state changes that happen too frequently, but still always registers the last state change.  This is great when you have an input field connected to a search endpoint because if you type "John", you don't need to make 4 separate api calls for "J", "Jo", "Joh", and "John".  With some frameworks, the debouncing for autocomplete/ search inputs happens under the hood.

I went with MaterialUI because that is the component library I know the best.  I could have spent a lot more time tweaking this user interface and making it more beautiful, but I would want to sit with an actual user to understand their needs and how I can show/ hide the right information in the right places.

Pagination is still handled on the front end, but obviously this would be inefficient with millions or records, so the query parameters `limit` and `offset` would be forwarded to the backend.