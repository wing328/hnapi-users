//
// Run with: node count_children.js
//
// This will print some basic info about the item referred to by hnID,
// including child_count, which has to be computed by multiple API calls
// and can take a surprisingly long time.
//
// Use of this code is highly discouraged (hundreds of API calls for
// a single item!) but it serves as an interesting demo.
//
// JavaScript is not my forte. Improve at will.
//

var hnID = 8422599; // this takes 1-2 seconds to count 301 children
//var hnID = 8532261; // this takes several seconds to count 994 children

var Firebase = require('firebase');
var url_base = 'https://hacker-news.firebaseio.com/v0/';
var ref = new Firebase(url_base);


function timestamp() {
  return new Date().toJSON().slice(0,23);
}

function handleError(errorObject) {
  console.log(timestamp() + ' ERR ' + errorObject.code);
}

function countKids(itemId, cb) {
  console.log(timestamp() + ' ++ getting info for item ' + itemId);

  var all_nodes_count = 0;
  var deleted_nodes_count = 0;
  var active_counters = 0;
  var completed = 0;

  again = function (itemSnap) {
    var item = itemSnap.val();
    if (item.deleted) { deleted_nodes_count++; }
    if (item.kids) {
      all_nodes_count += itemSnap.child('kids').numChildren();
      item.kids.forEach(function (kidId) {
        active_counters++;
        ref.child('item/' + kidId).once('value', again);
      });
    }
    if (completed == all_nodes_count && active_counters === 0) {
      cb(all_nodes_count - deleted_nodes_count);
    }
    completed++;
    active_counters--;
  }

  ref.child('item/' + itemId).once('value', again);
}

function parseItemSnap(itemSnap) {
  var item = itemSnap.val();

  if (item.type != 'job' && item.type != 'story') { return; }

  countKids(item.id, function (total) {
    console.log(timestamp() + ' .. done')
    console.log('  ' + item.id + ' [' + item.type + '] ' +
                '"' + item.title + '" ' +
                '(' + item.score + ' points, ' + total + ' children)');
    console.log('^C to exit');
  });
}

ref.child('item/' + hnID).once('value', parseItemSnap, handleError);

