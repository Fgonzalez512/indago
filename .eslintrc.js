module.exports = {
    "plugins": [ "html", "ejs" ],
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "mocha":true
    },
    "extends": "eslint:recommended",
    "rules": {
      "no-console": ["warn", { allow: ["warn", "error"] }],
        "indent": [
            "error",
            2,
            {
              "VariableDeclarator":{
                  "var": 2,
                  "let": 2,
                  "const": 3
                },
              "MemberExpression": 1,
              "SwitchCase": 1
              }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unused-vars": 1
    },

    "settings": {
        "html/indent": "0",   // code should start at the beginning of the line (no initial indentation).
        "html/indent": "+2",  // indentation is the <script> indentation plus two spaces.
        "html/indent": "space", // indentation is one tab at the beginning of the line.
        "html/report-bad-indent": 2,
    }
};
