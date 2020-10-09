
const StudentsService = {
    getAllStudents( db ){
        return db
                .select( '*' )
                .from( 'student' )
                .then( students => {
                    return students;
                });
    },
    getStudentById( db, studentId ){
        return db
                .select( '*' )
                .from( 'student' )
                .where("id", studentId)
                .then( student => {
                    return student;
                });
    },
    deleteStudent( db, studentId ){
        return db( 'student' )
                .where({"id" : studentId})
                .delete()

    },
    studentNameUpdate( db, studentId, updatedFields ){
        return db( 'student' )
                .update( updatedFields )
                .where( {id : studentId} )
                .returning( '*' );
    }
}


module.exports = { StudentsService };