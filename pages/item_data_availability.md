# Item Data Availability

Field  | Firebase<br>v0  | Scrapers<br>2014-10-01 | Algolia<br>v1 | Description | Sample Data
-----  | --------------- | -------- | ------------- | ----------- | -----------
id     | ✅ | ✅ * | ✅ | unique ID for item | 8422599
title  | ✅ | ✅ | ✅ | title of item<br>(null for comments)| "Hacker News API"
type   | ✅ | ✅ * | ✅ | type of item | "job", "story", "comment", "poll", "pollopt"
url    | ✅ | ✅ | ✅ | story url | "http://blog.ycombinator.com/hacker-news-api"
text   | ✅ | ✅ | ✅ | item text in HTML | ""
score  | ✅ | ✅ | ✅ | item score | 1715
created_at   | ✅ | ✅ * | ✅ * (_created_at_, _created_at_i_) | item creation time, in UNIX time or ISO format | 1412703525, "2014-10-07T17:38:45.000Z"
submitter    | ✅ (_by_)| ✅ | ✅ (_author_) | HN username of submitter | "kevin"
child_ids    | ✅ * (_kids_) | ✅ | ✅ | unique IDs for direct children of item | [ 8422904, 8422922, ... ]
child_count  | ❌ * | ✅ | ✅ | number of children | 329
children     | ❌ * | ✅ | ✅ | child items (comments or pollopts) | ...
parent_id    | ✅ (_parent_) | ✅ | ✅ | unique ID for parent of item | 8423426 (null for stories)
is_dead      | ✅ (_dead_) | ✅ * | ✅ * | true if item is dead | true, false
is_deleted   | ✅ (_deleted_) | ✅ * | ? | true if item is deleted | true, false
parts  | ✅ | ✅ | ? | list of related pollopts, in display order. | ?


## NOTES

### Firebase v0

- **children (and related fields)** Using the Firebase API, child data (including the total number of comments) can be derived by recursing through item children trees (Firebase "_kids_" includes direct children only, children-of-children can be collected in subsequent requests). This requires one API call for each child, and potentially hundreds or thousands per item. (This is a known limitation, which will hopefully be resolved in a future API version)
- see [firebase](/firebase) and [firebase/snippets](/firebase/snippets) for more


### Scrapers 2014-10-01

- **id** Scrapers often cannot determine the unique ID for "job" items. YC companies can post job listings using an external link for the content, and allowing no user voting, flagging, or comments. In these cases, there are no news.ycombinator.com links in the item content to extract the ID from.
- **type** Scrapers must derive item type by inference.
- **created_at** Scrapers need to compute item creation time has backwards from human-friendly date, e.g. "27 minutes ago"
- **is_dead** Scrapers can determine dead items by CSS styling.
- **is_deleted** Scrapers do not see deleted items, but can determine deleted status via a direct request for the item ID.
- see [scrapers](/scrapers) and [scrapers/snippets](/scrapers/snippets) for more


### Algolia v1

- **created_at** The Algolia API offers item creation time in both ISO and UNIX formats.
- **is_dead** Requests for ID return HTTP 500 errors for dead items (!)
- see [algolia](/algolia) and [algolia/snippets](/algolia/snippets) for more


<!--  ✅  †  ‡  ❌  ⚠️   -->

