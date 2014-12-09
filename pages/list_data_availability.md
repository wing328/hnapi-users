# List Data Availability

List  | Firebase<br>v0  | Scrapers<br>2014-10-01 | Algolia<br>v1 | Description
----- | --------------- | ---------------------- | ------------- | -----------
Front Page       | ✅  /v0/topstories | ✅ /news?p=x | ❌   | Current front page x
Newest           | ✅ * /v0/updates   | ✅ /newest   | ✅ * | Newest submissions
Active           | ❌   | ✅ /active       | ❌   | Most active current discussions
Best             | ❌   | ✅ /best         | ❌   | Highest voted recent links
Classic          | ❌   | ✅ /classic      | ❌   | Front page by early users
Ask              | ❌   | ✅ /ask          | ❌   | Newest Ask HN submissions
Show HN          | ❌   | ✅ /show         | ❌   | Show HN front page
Show HN (newest) | ❌   | ✅ /shownew      | ❌   | Newest Show HN submissions
Best Comments    | ❌   | ✅ /bestcomments | ❌   | Highest voted recent comments
Noob Stories     | ❌   | ✅ /noobstories  | ❌   | Submissions from new accounts
Noob Comments    | ❌   | ✅ /noobcomments | ❌   | Comments from new accounts
Jobs             | ❌   | ✅ /jobs         | ❌   | YCombinator company job postings
Over             | ❌   | ✅ /over?points=x| ❌   | Recent submissions with scores over x



## NOTES

Some of these lists are historical and likely will not propagate into new features.

### Firebase v0

There are only two lists currently replicable via Firebase, but they showcase the strength of the new API.

Once you bind to an endpoint, you will receive updates approximately every 30 seconds if and when the data changes. You can then spin off other API calls to flesh out the new data as needed.

- **Newest** can be replicated by observing the 'updates' endpoint and skipping users and old items

Some subset of the missing list views will hopefully be available in a future API version.


### Scrapers 2014-10-01

- This is the list availability baseline, so all are green.


### Algolia v1

- **Newest** https://hn.algolia.com/api/v1/search_by_date?tags=story


