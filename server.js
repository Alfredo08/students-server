const express = require( 'express' );
const app = express();
const jsonParser = express.json();
const {StudentsService} = require( './studentsService' );
const knex = require( 'knex' );

const db = knex({
    client : 'pg',
    connection : 'postgresql://alfredosalazar@localhost/studentsdb'
})

app.get( '/api/students', ( req, res ) => {
    StudentsService
        .getAllStudents( db )
        .then( students => {
            return res.status( 200 ).json( students );
        });
});

app.get( '/api/students/getById', ( req, res ) => {
    
    const studentId = req.query.studentId;

    if( !studentId ){
        res.statusMessage = "You need to provide the studentId as a parameter."
        return res.status( 406 ).end();
    }

    StudentsService
        .getStudentById( db, Number(studentId) )
        .then( student => {
            console.log( student );
            if( student.length === 0 ){
                res.statusMessage = "That student id was not found in our list!";
                return res.status( 404 ).end();
            }
        
            return res.status( 200 ).json( student[0] );
        });
});

/*
app.post( '/api/students/add', jsonParser, ( req, res ) => {
    console.log( req.body );

    const newStudent = {
        name : req.body.name,
        id : req.body.id
    };

    if( req.body.name && req.body.id ){
        students.push( newStudent );

        return res.status( 201 ).json( newStudent );
    }

    res.statusMessage = "You need to send both 'id' and 'name' in the body of the request";
    return res.status( 406 ).end();
});

*/

app.delete( "/api/students/delete/:studentId", (req, res) => {
    const studentId = Number(req.params.studentId);

    StudentsService
        .deleteStudent( db, studentId )
        .then( () => {
            return res.status( 204 ).end();
        });
})

app.listen( 8080, () => {
    console.log( "This app is running in port 8080." );
});

module.exports = app;
