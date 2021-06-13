module.exports = {
    development: {
        PORT: 5000,
        DB_URI: 'mongodb://localhost:27017/cube',
        COOKIE_NAME: 'USER_SESSION',
        SECRET: '5yPcKpit47ytqIPO9wHFqKACYurek9ny2flK4eOkTHE6ueUBMlaxRtCoQnMCAIt'
    },
    production: {
        port: 80,
        DB_URI: 'mongodb://localhost:27017/cube',
        COOKIE_NAME: 'USER_SESSION',
        SECRET: '5yPcKpit47ytqIPO9wHFqKACYurek9ny2flK4eOkTHE6ueUBMlaxRtCoQnMCAIt'
    }
};

// VICTOR-REPO >>> https://github.com/viktorpts/cubicle-part2