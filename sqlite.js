const sqlite3 = require('sqlite3').verbose();
 
// open database in memory
let db = new sqlite3.Database('./sqlite.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');

  db.run('CREATE TABLE IF NOT EXISTS langs(name text)', function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`created table langs`);

    db.run('CREATE INDEX IF NOT EXISTS idx_name ON langs(name)', function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`created table langs`);

        let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
    
        // construct the insert statement with multiple placeholders
        // based on the number of rows
        let placeholders = languages.map((language) => '(?)').join(',');
        let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;
        
        // output the INSERT statement
        console.log(sql);
        
        db.run(sql, languages, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log(`Rows inserted ${this.changes}`);

            console.log(Date.now())
            db.all('SELECT * FROM langs WHERE name = \'Java\' ', [], function(err, rows) {
                //console.log(rows)
                console.log(Date.now())
                console.log(rows)
            })
            

            // close the database connection
            db.close((err) => {
                if (err) {
                console.error(err.message);
                }
                console.log('Close the database connection.');
            });

        });

    });

  });

});
 
