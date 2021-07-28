export default {
  role: {
    TEACHER: 'TEACHER',
    ADMIN: 'ADMIN',
    STAFF: 'STAFF',
  },
  roleIssue: {
    ONLY_TEACHER: 'Only teacher can asscess this function',
    ONLY_ADMIN: 'Only admin can access this function',
    ONLY_STAFF: 'Only staff member can access this function',
  },
  exam: {
    NOT_FOUND: 'Examination is not found',
  },
  user: {
    CREATE_SUCCESS: 'User created successfully',
    CREATE_ERROR: 'User creation unsuccess',
    LOGIN_SUCCESS: 'User login success',
    LOGIN_ERROR: 'User login unsuccess',
    ALREADY_EXIST: 'User already exists',
    NOT_FOUND: 'User not found',
    PASSWORD_NOT_MATCH: 'Password is not matched',
    CREDENTIAL_REQUIRED: 'Username and the password is required',
  },
  student: {
    INSERTED_SUCCESS: 'Student inserted successfully',
    INSERTED_ERROR: 'Student insertion is Unsuccessful',
    NO_STUDENT: 'Student is not found'
  }
};
