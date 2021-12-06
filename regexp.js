let converter = function (str) {
    const regexp = /(\s)?'(\s|t|)/g
    let result1 = str.replace(regexp, '$1'===''&&'$2'==='t'?`$1'$2`:`$1"$2`)
    let result2 = str.match(regexp)
    console.log(result1)
    console.log(result2)
}

converter("this is 'simple' string for 'test', but people aren't so smart'")
