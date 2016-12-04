/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets */

/*
 * Brackets Mel script syntax highlighter
 * 
 * 
 */

define(function (require, exports, module) {
    "use strict";

    var CodeMirror = brackets.getModule("thirdparty/CodeMirror2/lib/codemirror"),
        LanguageManager = brackets.getModule("language/LanguageManager");
    
    CodeMirror.defineMIME("application/x-mel", {
        name: "htmlembedded",
        scriptingModeSpec: "mel"
    });
    
    CodeMirror.defineSimpleMode("mel", {
        start: [
            // The regex matches the token, the token property contains the type
            // match anything between quotes and make it a string
            { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },

            // identify comments

            // single line comments with two back slashes
            { regex: /\/\/.*/, token: "comment"},
            // multiline comments - this seemed to be the only way to handle them
            {regex: /\/\*/, mode: {persistent: 1, end: /\*\//}, token: "comment"},
            
            { regex: /(?:global|proc|string)\b/, token: "attribute" },
            { regex: /(?:int|true|false|float)\b/, token: "atom" },
            { regex: /\(|\)/, token: "tag" },
            { regex: /\{|\}/, token: "tag" },
            { regex: /(?:abstract|as|break|continue|do|else|enum|extern|fn|for|final|if|impl|in|loop|macro|match|mod|move|offsetof|override|proc|return|sizeof|static|struct|super|type|typeof|unsafe|unsized|use|where|while|yield)\b/, token: "keyword" },
            { regex: /(?:print|eval|window|windowPref|formLayout|columnLayout|setParent|internalVar|modelPanel|checkCameraLocked|deleteUI|shelfButton|separator|menuSet|menuSet|text|textScrollList|checkBox|rowColumnLayout|button|formLayout|tokenize|delete|objExists|circle|parent|setAttr|getAttr|addAttr|menuItem|menu|menuBarLayout|paneLayout|intFieldGrp|fprint|intSliderGrp|checkBoxGrp|checkBoxGrp|textFieldButtonGrp|group)\b/, token: "keyword"},
            
            // anything following a -, identifying a property
            { regex: /(-\w+\b)/, token: "attribute" },
            // anything following a $, identifying a variable
            { regex: /(\$\w+\b)/, token: "attribute" },
            
            { regex: /\d+/i, token: "number" },

            // identify operators
            { regex: /[\-+\/*=<>!]+/, token: "operator"},
            
            // indent and dedent properties guide autoindentation
            {regex: /[\{\[\(]/, pop: true, indent: true},
            {regex: /[\}\]\)]/, pop: true, dedent: true}
        ],
        meta: {
            dontIndentStates: ["comment"]
            lineComment: "//",
            blockCommentStart: "/*",
            blockCommentEnd: "*/"
        }
    });

    LanguageManager.defineLanguage("mel", {
        name: "mel",
        mode: "mel",
        fileExtensions: ["mel"]
        blockComment: ["/*", "*/"],
        lineComment: ["//"]
    });
});
