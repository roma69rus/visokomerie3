module.exports = {
    "env": {
        "browser": true, 
        "es6": true,
	"node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "no-unused-vars": ["error", { "caughtErrorsIgnorePattern": "^ignore" }],
        "linebreak-style": [ // Применять согласованный стиль переноса строки
        "error",
        "unix"
    ],
       "no-console": "off",
    }
}
