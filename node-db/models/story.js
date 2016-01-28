'use strict';

//functional programming, create functions to get stuff done fast
//object oriented programming, maintaining state.

var connPool;

var Story = {
  getAll() {
    //can use `` for line breaks in sql code
    var sql = 'select * from stories order by votes desc, createdOn desc limit 50';
    return connPool.queryAsync(sql);
  },

  insert(story) {
    //Validate data
    var sql = 'insert into stories (url, title) values (?,?)';
    //this prevents sql injection attacks, always use parameter marker
    var params = [story.url, story.title];
    return connPool.queryAsync(sql, params)
      .then(function(results) {
        sql = 'select * from stories where id=?';
        params = [results.insertId];
        return connPool.queryAsync(sql, params);
      })
      .then(function(rows) {
        // before ? is if statement, if true:else
        return rows.length > 0 ? rows[0] : null;
      });
  },

  upVote(id) {
    var sql = 'update stories set votes=votes+1 where id=?';
    var params = [id];
    return connPool.queryAsync(sql, params)
      .then(function(results) {
        sql = 'select * from stories where id=?';
        return connPool.queryAsync(sql, params);
      })
      .then(function(rows) {
        return rows.length > 0 ? rows[0] : null;
      });
  }
};

module.exports.Model = function(connectionPool) {
  connPool = connectionPool;
  return Story;
}
