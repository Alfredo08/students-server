const { expect } = require( 'chai' );
const supertest = require( 'supertest' );
const knex = require( 'knex' );
const app = require( '../server' );

describe( 'Testing students API endpoints', () => {
    let db;

    const students = [{
        id : 123,
        name : "Roger"
    },
    {
        id : 456,
        name : "Martha"
    },
    {
        id : 789,
        name : "Ana"
    }];
   
    before ( "Connect to database", () => {
        db = knex({
            client : 'pg',
            connection : 'postgresql://alfredosalazar@localhost/studentsdb'
        });
    });

    before ( "Clean up our student table", () => {
        return db.raw('TRUNCATE TABLE student RESTART IDENTITY;');
    });

    afterEach ( "Clean up our student table previous to each endpoint test", () => {
        return db.raw('TRUNCATE TABLE student RESTART IDENTITY;');
    });

    after ( "Disconnect from the database", () => {
        return db.destroy();
    });

    describe ( "Testing the GET endpoints /api/students", () => {
        beforeEach( "Insert some dummy content to our student table", () => {
            console.log( "beforeEach" );
            return db
                    .insert( students )
                    .into( 'student');
        });

        it ( "GET all students from the student table /api/students", () => {
            console.log( "inside it" );
            return supertest( app )
                    .get( "/api/students" )
                    .expect( 200 )
                    .expect( response => {
                        expect( response.body ).to.be.a('array');

                        response.body.forEach( (student) => {
                            expect( student ).to.have.keys( 'id', 'name' );
                        });

                        expect( response.body.length ).to.equal( students.length );
                    })
        });
    });

});