# XPath Expressions

## List Data

From, e.g., https://news.ycombinator.com/news

### XPath

HN's HTML is complicated and not as hierarchical as we might like, so XPath processing is correspondingly complicated.

You can extract all story URLs directly using `/html/body/center/table/tr[3]/td/table/tr/td[@class="title"]/a`. You generally **won't** want to do that, because not all items have story URLs. All items have a position, a title, and a date. Various submission types might lack one or several other fields.

So, the safest extraction process is to pull out the full set of item data at a higher level, and iterate over each carefully. We can't get the items in a clean set where one child == one item (due to lack of HTML hierarchy), but we can extract groups of three table elements which correspond to single list items.

XPath `/html/body/center/table/tr[3]/td/table` will return 92 children (\<tr\> elements) on a 30-item list.

- Children #0 and #1 will contain data for the first list item
  - child #0
    - list position
    - id
    - url

```html
<tr>
  <td align="right" valign="top" class="title">1.</td>
  <td>
    <center>
      <a id="up_8686934" href="vote?for=8686934&amp;dir=up&amp;whence=%6e%65%77%73"><div class="votearrow" title="upvote"></div></a><span id="down_8686934"></span>
    </center>
  </td>
  <td class="title">
    <a href="https://github.com/composer/composer/commit/ac676f47f7bbc619678a29deae097b6b0710b799">One PHP line changed and Composer run ~70% faster</a><span class="comhead"> (github.com) </span>
  </td>
</tr>
```

  - child #1
    - score
    - submitter
    - created_at
    - num_comments

```html
<tr>
  <td colspan="2"></td>
  <td class="subtext">
    <span id="score_8686934">238 points</span> by <a href="user?id=Damin0u">Damin0u</a> 3 hours ago  | <a href="item?id=8686934">97 comments</a>
  </td>
</tr>
```

- Child #2 will be a table layout spacer row (discard)
- Children #3 and #4 will be part of the second list item
- Child #5 will be another spacer row
- ...


You can then run additional XPath expressions against each list item segment to extract the data needed.



### HTML

```html
<html>
  <head><!-- ... --></head>
  <body>
    <center>
      <table border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
        <tr><!-- ... nav bar ... --></tr>
        <tr style="height:10px"></tr>
        <tr>
          <td>
            <table border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="right" valign="top" class="title">1.</td>
                <td>
                  <center>
                    <a id="up_8686934" href="vote?for=8686934&amp;dir=up&amp;whence=%6e%65%77%73">
                      <div class="votearrow" title="upvote"></div>
                    </a>
                    <span id="down_8686934"></span>
                  </center>
                </td>
                <td class="title"><a href="https://github.com/composer/composer/commit/ac676f47f7bbc619678a29deae097b6b0710b799">One PHP line changed and Composer run ~70% faster</a><span class="comhead"> (github.com) </span></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td class="subtext"><span id="score_8686934">245 points</span> by <a href="user?id=Damin0u">Damin0u</a> 3 hours ago  | <a href="item?id=8686934">99 comments</a></td>
              </tr>
              <tr style="height:5px"></tr>

              <tr>
                <td align="right" valign="top" class="title">2.</td>
                <td>
                  <center>
                    <a id="up_8687804" href="vote?for=8687804&amp;dir=up&amp;whence=%6e%65%77%73">
                      <div class="votearrow" title="upvote"></div>
                    </a>
                    <span id="down_8687804"></span>
                  </center>
                </td>
                <td class="title"><a href="https://www.aerofs.com/blog/immigration-is-about-talent-not-costs/">Immigration is about talent, not costs</a><span class="comhead"> (aerofs.com) </span></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td class="subtext"><span id="score_8687804">36 points</span> by <a href="user?id=gabaix">gabaix</a> 44 minutes ago  | <a href="item?id=8687804">15 comments</a></td>
              </tr>
              <tr style="height:5px"></tr>

              <!-- ... more items .. -->

              <tr style="height:10px"></tr>
              <tr>
                <td colspan="2"></td>
                <td class="title"><a href="news?p=2" rel="nofollow">More</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr><!-- footer nav --></tr>
      </table>
    </center>
  </body>
</html>
```
