# news.ycombinator.com HTML Scrapers

Scraping has been the traditional way to extract HN list and item data since the beginning.

Scraping is presently still the _only_ way to access _all_ data
(see [list data availability](/pages/list_data_availability.md) and [item data availability](/pages/item_data_availability.md)), but the new Firebase API is evolving and will hopefully replace scraping entirely in the near future.

Note that HN serves a [robots.txt](http://news.ycombinator.com/robots.txt) policy file, which should always be observed to avoid causing excessive server load, and likely being IP-blocked.

## Using XPath

XPath is a query language for parsing XML documents. It can be used on HTML as well, with generally good results. Most programming languages have libraries which support XPath parsing, often by wrapping libxml2.

HTML parsing is highly dependent on the node structure of the page. Small changes to the HTML structure can cause XPath parsing to fail completely.

HN pages are likely to see significant changes to the HTML. They have been stable for quite a long time, but one of the goals after the launch of the new Firebase API is to make HTML improvements.

These improvements will break many or all of the existing XPath parsers. Until we can get all list and item data from the Firebase API, we will need to keep our parsers updated to work with the changing HN HTML.

HN HTML XPath parsing documentation is organized into directory by date (reflecting the HN HTML "version"), and includes:

- Raw HTML examples
  - list pages (e.g. /news)
  - item pages (e.g. /item?id=8422599)
- Formatted HTML extracts
  - list pages
  - item pages
- XPath expressions to extract fields

There are some differences between pages presented to users that are logged in versus not logged in. These include:

- HN username in header bar
- up/downvote arrows, if permitted
- "dead" comments, if enabled

These differences will generally not affect list and item data extraction.


## Resources

- [Scraper code snippets](/scrapers/snippets)
- [Scraper-related issue discussions](https://github.com/hnapi-users/hnapi-users/labels/HTML%20Scrapers)

